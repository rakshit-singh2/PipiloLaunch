import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAccount } from 'wagmi';


const Step2 = ({ description, setDescription, setStep }) => {
  // console.log({description})
  const { isConnected, chain, address } = useAccount();
  const [presaleRate, setPresaleRate] = useState(description.presaleRate || 0);
  const [whitelist, setWhitelist] = useState(description.whitelist || 'Disable');
  const [hardcap, setHardcap] = useState(description.hardcap || 0);
  const [softcap, setSoftcap] = useState(description.softcap || 0);
  const [minBuy, setMinBuy] = useState(description.minBuy || 0);
  const [maxBuy, setMaxBuy] = useState(description.maxBuy || 0);
  const [refundType, setRefundType] = useState(description.refundType || 'Refund');
  const [startTime, setStartTime] = useState(description.startTime || '');
  const [endTime, setEndTime] = useState(description.endTime || '');

  //Form features
  const [minTime, setMinTime] = useState('');
  const [maxTime, setMaxTime] = useState('');

  useEffect(() => {
    const now = new Date();
    const oneHourFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const maxFutureTime = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000); // 1 year from now

    setMinTime(oneHourFromNow.toISOString().slice(0, 16));
    setMaxTime(maxFutureTime.toISOString().slice(0, 16));
  }, []);

  //errors
  const [presaleRateError, setPresaleRateError] = useState(null)
  const [hardcapError, setHardcapError] = useState(null)
  const [softcapError, setSoftcapError] = useState(null)
  const [minBuyError, setMinBuyError] = useState(null)
  const [maxBuyError, setMaxBuyError] = useState(null)

  const [endTimeError, setEndTimeError] = useState(null);

  const handlePresaleRate = (rate) => {
    if (rate <= 0) {
      setPresaleRateError('Presale rate must be greater than 0');
    } else {
      setPresaleRateError(null);
    }
    setPresaleRate(rate);
  };

  const handleHardcap = (hcap) => {
    if (hcap <= 0) {
      setHardcapError('Hardcap must be greater than 0');
    } else {
      setHardcapError(null);
    }
    setHardcap(hcap);
  };

  const handleSoftcap = (scap) => {
    if (scap <= 0) {
      setSoftcapError('Softcap must be greater than 0');
    } else {
      setSoftcapError(null);
    }
    setSoftcap(scap);
  };

  const handleMinBuy = (mibuy) => {
    if (mibuy <= 0) {
      setMinBuyError('Minimum buy must be greater than 0');
    } else {
      setMinBuyError(null);
    }
    setMinBuy(mibuy);
  };

  const handleMaxBuy = (mabuy) => {
    if (mabuy <= 0) {
      setMaxBuyError('Maximum buy must be greater than 0');
    } else {
      setMaxBuyError(null);
    }
    setMaxBuy(mabuy);
  };

  const handleRefundType = (rt) => {
    setRefundType(rt)
  }
  const handleStartTime = (st) => {
    setStartTime(st);
  };

  const handleEndTime = (et) => {
    if (new Date(et) <= new Date(startTime)) {
      setEndTimeError('End time must be later than start time');
    } else {
      setEndTimeError(null);
    }
    setEndTime(et);
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  }

  const handleNext = () => {
    setDescription((prevDescription) => ({
      ...prevDescription,
      presaleRate,
      whitelist,
      hardcap,
      softcap,
      minBuy,
      maxBuy,
      refundType,
      choosenAccount: address
    }));
    setStep((prevStep) => prevStep + 1);
  }

  if (!isConnected || chain.nativeCurrency.name !== description.choosenChain) {
    return <div>
      <center className="text-danger">
        <div class="spinner-border text-danger" role="status">
          <span class="sr-only"></span>
        </div><br />
        You chose {description.choosenChain} chain in Step 1. The verification of token was done for the same.<br />
        Either switch to {description.choosenChain} or reload to start again!!!!
      </center>
    </div>;
  }

  return (
    <>
      <Form.Group className="mb-3" controlId="formPresaleRate">
        <Form.Label>Presale Rate*</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter presale rate"
          min={0}
          value={presaleRate}
          onChange={(e) => handlePresaleRate(e.target.value)}
        />
      </Form.Group>
      <Form.Text>
        If I spend 1 {chain.nativeCurrency.symbol}, how many tokens will I receive?
      </Form.Text>

      <Form.Group className="mb-3" controlId="formWhitelist">
        <Form.Label>Whitelist</Form.Label>
        <Form.Check
          type="radio"
          id="whitelistEnable"
          label="Enable"
          checked={whitelist === 'Enable'}
          onChange={() => setWhitelist('Enable')}
        />
        <Form.Check
          type="radio"
          id="whitelistDisable"
          label="Disable"
          checked={whitelist === 'Disable'}
          onChange={() => setWhitelist('Disable')}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formSoftcap">
        <Form.Label>Softcap ({chain.nativeCurrency.symbol})*</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter softcap"
          min={0}
          value={softcap}
          onChange={(e) => handleSoftcap(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formHardcap">
        <Form.Label>Hardcap ({chain.nativeCurrency.symbol})*</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter hardcap"
          min={0}
          value={hardcap}
          onChange={(e) => handleHardcap(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formMinBuy">
        <Form.Label>Minimum buy ({chain.nativeCurrency.symbol})*</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter minimum buy"
          min={0}
          value={minBuy}
          onChange={(e) => handleMinBuy(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formMaxBuy">
        <Form.Label>Maximum buy ({chain.nativeCurrency.symbol})*</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter maximum buy"
          min={0}
          value={maxBuy}
          onChange={(e) => handleMaxBuy(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formRefundType">
        <Form.Label>Refund Type</Form.Label>
        <Form.Check
          type="radio"
          id="refundTypeRefund"
          label="Refund"
          checked={refundType === 'Refund'}
          onChange={() => handleRefundType('Refund')}
        />
        <Form.Check
          type="radio"
          id="refundTypeBurn"
          label="Burn"
          checked={refundType === 'Burn'}
          onChange={() => handleRefundType('Burn')}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formStartTime">
        <Form.Label>Start Time (UTC)</Form.Label>
        <Form.Control
          type="datetime-local"
          value={startTime}
          min={minTime}
          max={maxTime}
          onChange={(e) => handleStartTime(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEndTime">
        <Form.Label>End Time (UTC)</Form.Label>
        <Form.Control
          type="datetime-local"
          value={endTime}
          min={startTime}
          onChange={(e) => handleEndTime(e.target.value)}
        />
      </Form.Group>

      <Form.Text className="text-muted">
        Need {hardcap * 2} AMPLE to create launchpad.
      </Form.Text><br />

      <Button variant="secondary" onClick={handlePrevious} className="me-2">
        Previous
      </Button>
      <Button
        variant="primary"
        onClick={handleNext}
        disabled={(
          presaleRateError ||
          hardcapError ||
          softcapError ||
          minBuyError ||
          maxBuyError ||
          endTimeError
        )}
      >
        Next
      </Button>
    </>
  );
};

export default Step2;
