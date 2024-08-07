import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FaEthereum } from 'react-icons/fa';
import { useAccount } from 'wagmi';
import { readContract } from '@wagmi/core';
import { wagmiconfig } from '../../../wagmiconfig/wagmiconfig';

const Step1 = ({ description, setDescription, setStep }) => {
    const { isConnected, chain } = useAccount();
    const [tokenAddress, setTokenAddress] = useState(description.tokenAddress || '');
    const [feeOption, setFeeOption] = useState(description.feeOption || `5% ${chain?.nativeCurrency?.symbol ? chain.nativeCurrency.symbol : 'crypto'} raised only`);
    const [currency, setCurrency] = useState(description.currency || chain?.nativeCurrency?.symbol ? chain.nativeCurrency.symbol : 'crypto');
    const [listingOption, setListingOption] = useState(description.listingOption || 'Auto Listing');
    const [name, setName] = useState(null);
    const [symbol, setSymbol] = useState(null);
    const [totalSupply, setTotalSupply] = useState(null);
    const [error, setError] = useState('');

    const abi = [
        {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [{ "name": "", "type": "string" }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [{ "name": "", "type": "string" }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [{ "name": "", "type": "uint256" }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [{ "name": "account", "type": "address" }],
            "name": "balanceOf",
            "outputs": [{ "name": "", "type": "uint256" }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [{ "name": "", "type": "uint8" }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];

    const verifyToken = async () => {
        if (!tokenAddress) return;

        try {
            // console.log("first")
            const name = await readContract(wagmiconfig, {
                abi,
                address: tokenAddress,
                functionName: 'name',
            });
            // console.log({name})
            setName(name);

            const symbol = await readContract(wagmiconfig, {
                abi,
                address: tokenAddress,
                functionName: 'symbol',
            });
            // console.log({symbol})
            setSymbol(symbol);

            const totalSupply = await readContract(wagmiconfig, {
                abi,
                address: tokenAddress,
                functionName: 'totalSupply',
            });
            // console.log({totalSupply})
            setTotalSupply(totalSupply);

            setError('');
        } catch (err) {
            setName(null);
            setSymbol(null);
            setTotalSupply(null);
            setError('Invalid token address or data');
            console.error(err);
        }
    };

    useEffect(() => {
        verifyToken();
    }, [tokenAddress, chain]);

    const handleNext = () => {
        setDescription((prevDescription) => ({
            ...prevDescription,
            tokenAddress,
            tokenName:name,
            feeOption,
            currency,
            listingOption,
            choosenChain: chain?.nativeCurrency.name
        }));
        setStep((prevStep) => prevStep + 1);
    };


    return (
        <>
            <Form.Group className="mb-3" controlId="formTokenAddress">
                <Form.Label>Token Address*</Form.Label>

                <Form.Control
                    type="text"
                    placeholder="Input token address"
                    value={tokenAddress}
                    onChange={(e) => setTokenAddress(e.target.value)}
                />{(name && symbol && totalSupply) ? (
                    <Form.Text className="mb-3 text-muted">
                        Name: {name} <br />
                        Symbol: {symbol} <br />
                        Total Supply: {totalSupply.toString()}
                    </Form.Text>
                ) : (
                    <>
                        <Form.Text className="mb-3 text-muted">
                            Enter the token address and verify
                        </Form.Text>
                        <br />
                    </>
                )}
                {error && <Form.Text className="text-danger">{error}</Form.Text>}

            </Form.Group>

            <Form.Group className="mb-3" controlId="formCurrency">
                <Form.Label>Currency</Form.Label>
                <DropdownButton id="dropdown-currency" title={
                    <>
                        <FaEthereum style={{ marginRight: '5px' }} /> {chain?.nativeCurrency?.symbol ? chain.nativeCurrency.symbol : 'crypto'}
                    </>
                }>
                    <Dropdown.Item onClick={() => setCurrency(chain?.nativeCurrency?.symbol ? chain.nativeCurrency.symbol : 'crypto')}>
                        <FaEthereum style={{ marginRight: '5px' }} /> {chain?.nativeCurrency?.symbol ? chain.nativeCurrency.symbol : 'crypto'}
                    </Dropdown.Item>
                </DropdownButton>
                <Form.Text>Users will pay with {currency} for your token</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFeeOptions">
                <Form.Label>Fee Options</Form.Label>
                <Form.Check
                    type="radio"
                    id="feeOption1"
                    label={`5% ${chain?.nativeCurrency?.symbol ? chain.nativeCurrency.symbol : 'crypto'} raised only`}
                    checked={feeOption === `5% ${chain?.nativeCurrency?.symbol ? chain.nativeCurrency.symbol : 'crypto'} raised only`}
                    onChange={() => setFeeOption(`5% ${chain?.nativeCurrency?.symbol ? chain.nativeCurrency.symbol : 'crypto'} raised only`)}
                />
                <Form.Check
                    type="radio"
                    id="feeOption2"
                    label={`2% ${chain?.nativeCurrency?.symbol ? chain.nativeCurrency.symbol : 'crypto'} raised + 2% token sold`}
                    checked={feeOption === `2% ${chain?.nativeCurrency?.symbol ? chain.nativeCurrency.symbol : 'crypto'} raised + 2% token sold`}
                    onChange={() => setFeeOption(`2% ${chain?.nativeCurrency?.symbol ? chain.nativeCurrency.symbol : 'crypto'} raised + 2% token sold`)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formListingOptions">
                <Form.Label>Listing Options</Form.Label>
                <Form.Check
                    type="radio"
                    id="listingOptionAuto"
                    label="Auto Listing"
                    checked={listingOption === 'Auto Listing'}
                    onChange={() => setListingOption('Auto Listing')}
                />
                <Form.Check
                    type="radio"
                    id="listingOptionManual"
                    label="Manual Listing"
                    checked={listingOption === 'Manual Listing'}
                    onChange={() => setListingOption('Manual Listing')}
                />
                <Form.Text className="text-muted">
                    For auto listing, after you finalize the pool your token will be auto listed on DEX.
                </Form.Text>
            </Form.Group>

            {isConnected ? (
                <Button variant="primary" onClick={handleNext} disabled={!(name && symbol && totalSupply)}>
                    Next
                </Button>
            ) : (
                <ConnectButton />
            )}
        </>
    );
};

export default Step1;
