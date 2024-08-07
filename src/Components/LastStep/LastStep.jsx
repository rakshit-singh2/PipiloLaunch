import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useAccount } from 'wagmi';

const LastStep = ({ description, handleSubmit, setStep }) => {

    const { isConnected, chain, address } = useAccount();
    const handlePrevious = () => {
        setStep((prevStep) => prevStep - 1);
    }

    if (!isConnected || chain?.nativeCurrency.name !== description.choosenChain || address !== description.choosenAccount) {
        return <div>
            <center className="text-danger">
                <div class="spinner-border text-danger" role="status">
                    <span class="sr-only"></span>
                </div><br />
                You chose {description.choosenChain} and {description.choosenAccount} chain in Step 1. The verification of token was done for the same.<br />
                Either switch to {description.choosenChain} and {description.choosenAccount} or reload to start again!!!!
            </center>
        </div>;
    }
    return (
        <Card>
            <Card.Body>
                <Card.Title>Pleast verify the details entered:- </Card.Title>
                <ul>
                    {Object.entries(description).map(([key, value]) => (
                        <li key={key}><strong>{key}:</strong> {value}</li>
                    ))}
                </ul>
                <Button variant="secondary" onClick={handlePrevious} className="me-2">
                    Previous
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Card.Body>
        </Card>
    );
};

export default LastStep;