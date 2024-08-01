import React from 'react';
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FaEthereum } from 'react-icons/fa';
import { useAccount } from 'wagmi';

const Step1 = ({ tokenAddress, setTokenAddress, currency, setCurrency, feeOption, setFeeOption, listingOption, setListingOption, handleNext, error }) => {
    const { isConnected } = useAccount();
    return (
        <>
            <Form.Group className="mb-3" controlId="formTokenAddress">
                <Form.Label>Token Address*</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Input token address"
                    value={tokenAddress}
                    onChange={(e) => setTokenAddress(e.target.value)}
                />
                <Form.Text className="text-danger">{error && 'Token address cannot be blank'}</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCurrency">
                <Form.Label>Currency</Form.Label>
                <DropdownButton id="dropdown-currency" title={
                    <>
                        <FaEthereum style={{ marginRight: '5px' }} /> {currency}
                    </>
                }>
                    <Dropdown.Item onClick={() => setCurrency('ETH')}>
                        <FaEthereum style={{ marginRight: '5px' }} /> ETH
                    </Dropdown.Item>
                </DropdownButton>
                <Form.Text>Users will pay with {currency} for your token</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFeeOptions">
                <Form.Label>Fee Options</Form.Label>
                <Form.Check
                    type="radio"
                    id="feeOption1"
                    label="5% ETH raised only"
                    checked={feeOption === '5% ETH raised only'}
                    onChange={() => setFeeOption('5% ETH raised only')}
                />
                <Form.Check
                    type="radio"
                    id="feeOption2"
                    label="2% ETH raised + 2% token sold"
                    checked={feeOption === '2% ETH raised + 2% token sold'}
                    onChange={() => setFeeOption('2% ETH raised + 2% token sold')}
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
                <Button variant="primary" onClick={handleNext} disabled={!error == ''}>
                    Next
                </Button>
            ) : (
                <ConnectButton />
            )}
        </>
    )
};

export default Step1;
