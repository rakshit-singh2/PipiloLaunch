import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAccount } from 'wagmi';


const Step2 = ({ description, setDescription, setStep }) => {
  // console.log({description})
  const { isConnected, chain, address } = useAccount();
  const [presaleRate, setPresaleRate] = useState(description.presaleRate || null);
  const [whitelist, setWhitelist] = useState(description.whitelist || 'Disable');
  const [hardcap, setHardcap] = useState(description.hardcap || null);
  const [softcap, setSoftcap] = useState(description.softcap || null);
  const [minBuy, setMinBuy] = useState(description.minBuy || null);
  const [maxBuy, setMaxBuy] = useState(description.maxBuy || null);
  const [refundType, setRefundType] = useState(description.refundType || 'Refund');
  const [liquidity, setLiquidity] = useState(description.liquidity || null);
  const [listingRate, setListingRate] = useState(description.listingRate || null);
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
  const [liquidityError, setLiquidityError] = useState(null)
  const [listingRateError, setListingRateError] = useState(null)
  const [endTimeError, setEndTimeError] = useState(null);

  const handlePresaleRate = (value) => {
    if (value <= 0) {
      setPresaleRateError('Presale rate must be positive number!');
    } else {
      setPresaleRateError(null);
    }
    setPresaleRate(value);
  };

  const handleHardcap = (value) => {
    if (value <= 0) {
      setHardcapError('Hardcap must be positive number!');
    } else if (value <= softcap) {
      setHardcapError('Hardcap must be greater than hardcap!');
    } else {
      setHardcapError(null);
    }
    setHardcap(value);
  };

  const handleSoftcap = (value) => {
    if (value <= 0) {
      setSoftcapError('Softcap must be positive number!');
    } else if (value <= 0.25 * hardcap) {
      setSoftcapError('Softcap must be >= 25% of Hardcap!');
    } else {
      setSoftcapError(null);
    }
    setSoftcap(value);
  };

  const handleMinBuy = (value) => {
    if (value <= 0) {
      setMinBuyError('Minimum buy must be positive number!');
    } else if (value >= maxBuy) {
      setMinBuyError('Minimum buy must be less than Maximum buy!');
    } else {
      setMinBuyError(null);
    }
    setMinBuy(value);
  };

  const handleMaxBuy = (value) => {
    if (value <= 0) {
      setMaxBuyError('Maximum buy must be positive number!');
    } else if (value <= minBuy) {
      setMaxBuyError('Maximum buy must be greater than Minimum buy!');
    } else {
      setMaxBuyError(null);
    }
    setMaxBuy(value);
  };

  const handleRefundType = (value) => {
    setRefundType(value)
  }

  const handleLiquidity= (value) => {
    if (value <= 50) {
      setLiquidityError('Maximum buy must be greater than 50%!');
    } else {
      setLiquidityError(null);
    }
    setLiquidity(value)
  }

  const handleListingRate= (value) => {
    if (value <= 0) {
      setListingRateError('Maximum buy must be positive number!');
    } else {
      setListingRateError(null);
    }
    setListingRate(value)
  }

  const handleStartTime = (value) => {
    setStartTime(value);
  };

  const handleEndTime = (value) => {
    if (new Date(value) <= new Date(startTime)) {
      setEndTimeError('End time must be later than start time');
    } else {
      setEndTimeError(null);
    }
    setEndTime(value);
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
      liquidity,
      choosenAccount: address
    }));
    setStep((prevStep) => prevStep + 1);
  }

  if (!isConnected || chain?.nativeCurrency.name !== description.choosenChain) {
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
        If I spend 1 {chain?.nativeCurrency?.symbol ? chain.nativeCurrency.symbol : 'crypto'}, how many tokens will I receive?
      </Form.Text><br/>
      {presaleRateError && <Form.Text className="text-danger">{presaleRateError}</Form.Text>}

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
        <Form.Label>Softcap ({chain?.nativeCurrency?.symbol ? chain.nativeCurrency.symbol : 'crypto'})*</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter softcap"
          min={0}
          value={softcap}
          onChange={(e) => handleSoftcap(e.target.value)}
        />
      </Form.Group>
      {softcapError && <Form.Text className="text-danger">{softcapError}</Form.Text>}

      <Form.Group className="mb-3" controlId="formHardcap">
        <Form.Label>Hardcap ({chain?.nativeCurrency?.symbol ? chain.nativeCurrency.symbol : 'crypto'})*</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter hardcap"
          min={0}
          value={hardcap}
          onChange={(e) => handleHardcap(e.target.value)}
        />
      </Form.Group>
      {hardcapError && <Form.Text className="text-danger">{hardcapError}</Form.Text>}

      <Form.Group className="mb-3" controlId="formMinBuy">
        <Form.Label>Minimum buy ({chain?.nativeCurrency?.symbol ? chain.nativeCurrency.symbol : 'crypto'})*</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter minimum buy"
          min={0}
          value={minBuy}
          onChange={(e) => handleMinBuy(e.target.value)}
        />
      </Form.Group>
      {minBuyError && <Form.Text className="text-danger">{minBuyError}</Form.Text>}

      <Form.Group className="mb-3" controlId="formMaxBuy">
        <Form.Label>Maximum buy ({chain?.nativeCurrency?.symbol ? chain.nativeCurrency.symbol : 'crypto'})*</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter maximum buy"
          min={0}
          value={maxBuy}
          onChange={(e) => handleMaxBuy(e.target.value)}
        />
      </Form.Group>
      {maxBuyError && <Form.Text className="text-danger">{maxBuyError}</Form.Text>}

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
      
      <Form.Group className="mb-3" controlId="formMaxBuy">
        <Form.Label>Listing rate*</Form.Label>
        <Form.Control
          type="number"
          placeholder="Listing rate"
          min={0}
          value={listingRate}
          onChange={(e) => handleListingRate(e.target.value)}
        />
      </Form.Group>
      <Form.Text className="text-muted">
        1 {chain?.nativeCurrency?.symbol ? chain.nativeCurrency.symbol : 'crypto'} = {listingRate} {description.tokenName}
      </Form.Text><br />
      {listingRateError && <Form.Text className="text-danger">{listingRateError}</Form.Text>}

      <Form.Group className="mb-3" controlId="formMaxBuy">
        <Form.Label>Liquidity (%)*</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter maximum buy"
          min={0}
          value={liquidity}
          onChange={(e) => handleLiquidity(e.target.value)}
        />
      </Form.Group>
      {liquidityError && <Form.Text className="text-danger">{liquidityError}</Form.Text>}

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
        Need {hardcap * 2} {description.tokenName} to create launchpad.
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
          liquidityError ||
          listingRateError ||
          endTimeError
        )}
      >
        Next
      </Button>
    </>
  );
};

export default Step2;
