import React, { useState, useEffect } from 'react';
import Step1 from '../../Components/LaunchpadCreateForms/Step1/Step1';
import Step2 from '../../Components/LaunchpadCreateForms/Step2/Step2';
import Step3 from '../../Components/LaunchpadCreateForms/Step3/Step3';
import { Button, Card, Form } from 'react-bootstrap';
import Progress from '../../Components/Progress/Progress';


const LaunchpadCreate = () => {

  const [step, setStep] = useState(1);
  const [description, setDescription] = useState({});

  const handleSubmit = () => { setStep(1) };

  return (
    <Card style={{ width: '100%', maxWidth: '600px', margin: 'auto', marginTop: '20px' }}>
      <Card.Body>
        <center><Card.Title>Verify Token</Card.Title></center>
        <Progress currentStep={step} totalStep={4} />
        <Form>
          {step === 1 && (
            <Step1
              setStep={setStep}
              setDescription={setDescription}
            />
          )}
          {step === 2 && (
            <Step2
              setStep={setStep}
              description={description}
              setDescription={setDescription}
            />
          )}
          {step === 3 && (
            <Step3
              setStep={setStep}
              setDescription={setDescription}
            />
          )}
          {step === 4 && (
            <>
              {console.log(description)}
              <Button variant="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </>
          )}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default LaunchpadCreate;
