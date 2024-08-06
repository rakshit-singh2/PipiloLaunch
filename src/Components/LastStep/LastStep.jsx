import React from 'react';
import { Button, Card } from 'react-bootstrap';

const LastStep = ({ description, handleSubmit, setStep }) => {
    const handlePrevious = () => {
        setStep((prevStep) => prevStep - 1);
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