import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FaEthereum } from 'react-icons/fa';
import { useAccount } from 'wagmi';
import { readContract } from '@wagmi/core';
import { wagmiconfig } from '../../../wagmiconfig/wagmiconfig';
import Input from '../../Input/Input';
import abi from '../../../constants/erc20.json';
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
            tokenName: name,
            feeOption,
            currency,
            listingOption,
            choosenChain: chain?.nativeCurrency.name
        }));
        setStep((prevStep) => prevStep + 1);
    };


    return (
        <>{/*neeed to be edited*/}
            <Input
                label={"Token Address*"}
                type={"text"}
                placeholder={"Input token address"}
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                note={(name && symbol && totalSupply) ? (
                    `Name: ${name} Symbol: ${symbol} Total Supply: ${totalSupply.toString()}`
                ) : (
                    "Enter the token address and verify"
                )}
                error={error}
            />

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
