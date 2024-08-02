import React, { useState, useEffect } from 'react';
import Step1 from '../../Components/LaunchpadCreateForms/Step1/Step1';
import Step2 from '../../Components/LaunchpadCreateForms/Step2/Step2';
import Step3 from '../../Components/LaunchpadCreateForms/Step3/Step3';
import { Button, Card, Form } from 'react-bootstrap';
import Progress from '../../Components/Progress/Progress';
import { useReconnect } from 'wagmi';

const LaunchpadCreate = () => {
  const { reconnect } = useReconnect()

  const [step, setStep] = useState(1);
  const [tokenAddress, setTokenAddress] = useState('');
  const [currency, setCurrency] = useState('ETH');
  const [feeOption, setFeeOption] = useState('5% ETH raised only');
  const [listingOption, setListingOption] = useState('Auto Listing');
  const [presaleRate, setPresaleRate] = useState('');
  const [whitelist, setWhitelist] = useState('Enable');
  const [softcap, setSoftcap] = useState('');
  const [hardcap, setHardcap] = useState('');
  const [minBuy, setMinBuy] = useState('');
  const [maxBuy, setMaxBuy] = useState('');
  const [refundType, setRefundType] = useState('Refund');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [logoURL, setLogoURL] = useState('');
  const [website, setWebsite] = useState('');
  const [facebook, setFacebook] = useState('');
  const [twitter, setTwitter] = useState('');
  const [github, setGithub] = useState('');
  const [telegram, setTelegram] = useState('');
  const [instagram, setInstagram] = useState('');
  const [discord, setDiscord] = useState('');
  const [reddit, setReddit] = useState('');
  const [youtube, setYoutube] = useState('');
  const [whitelistLink, setWhitelistLink] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setStep(1);
  }, [reconnect]);

  const handleNext = () => {
    if (step === 1 && tokenAddress.trim() === '') {
      setError('Token address cannot be blank');
      console.log({ error })
    } else if (step === 2 && presaleRate.trim() === '') {
      setError('Presale rate cannot be blank');
      console.log({ error })
    } else if (step === 3 && description.trim() === '') {
      setError('Description cannot be blank');
      console.log({ error })
    } else {
      setError('');
      setStep(step + 1);
      console.log({ step })
    }
  };

  const handlePrevious = () => { setStep(step - 1) };
  const handleSubmit = () => { setStep(1) };

  return (
    <Card style={{ width: '100%', maxWidth: '600px', margin: 'auto', marginTop: '20px' }}>
      <Card.Body>
        <center><Card.Title>Verify Token</Card.Title></center>
        <Progress currentStep={step} totalStep={4} />
        <Card.Subtitle className="mb-3 text-muted">Enter the token address and verify</Card.Subtitle>

        <Form>
          {step === 1 && (
            <Step1
              tokenAddress={tokenAddress}
              setTokenAddress={setTokenAddress}
              currency={currency}
              setCurrency={setCurrency}
              feeOption={feeOption}
              setFeeOption={setFeeOption}
              listingOption={listingOption}
              setListingOption={setListingOption}
              handleNext={handleNext}
              error={error}
            />
          )}
          {step === 2 && (
            <Step2
              presaleRate={presaleRate}
              setPresaleRate={setPresaleRate}
              whitelist={whitelist}
              setWhitelist={setWhitelist}
              softcap={softcap}
              setSoftcap={setSoftcap}
              hardcap={hardcap}
              setHardcap={setHardcap}
              minBuy={minBuy}
              setMinBuy={setMinBuy}
              maxBuy={maxBuy}
              setMaxBuy={setMaxBuy}
              refundType={refundType}
              setRefundType={setRefundType}
              startTime={startTime}
              setStartTime={setStartTime}
              endTime={endTime}
              setEndTime={setEndTime}
              handleNext={handleNext}
              handlePrevious={handlePrevious}
            />
          )}
          {step === 3 && (
            <Step3
              logoURL={logoURL}
              setLogoURL={setLogoURL}
              website={website}
              setWebsite={setWebsite}
              facebook={facebook}
              setFacebook={setFacebook}
              twitter={twitter}
              setTwitter={setTwitter}
              github={github}
              setGithub={setGithub}
              telegram={telegram}
              setTelegram={setTelegram}
              instagram={instagram}
              setInstagram={setInstagram}
              discord={discord}
              setDiscord={setDiscord}
              reddit={reddit}
              setReddit={setReddit}
              youtube={youtube}
              setYoutube={setYoutube}
              whitelistLink={whitelistLink}
              setWhitelistLink={setWhitelistLink}
              description={description}
              setDescription={setDescription}
              handlePrevious={handlePrevious}
              handleNext={handleNext}
            />
          )}
          {step === 4 && (
            <>

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
