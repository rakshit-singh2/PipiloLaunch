import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAccount } from 'wagmi';
import Input from '../../Input/Input';


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
  const [liquidityLockup, setLiquidityLockup] = useState(description.liquidityLockup || null);

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
  const [presaleRateError, setPresaleRateError] = useState('null')
  const [hardcapError, setHardcapError] = useState('null')
  const [softcapError, setSoftcapError] = useState('null')
  const [minBuyError, setMinBuyError] = useState('null')
  const [maxBuyError, setMaxBuyError] = useState('null')
  const [liquidityError, setLiquidityError] = useState('null')
  const [listingRateError, setListingRateError] = useState('null')
  const [endTimeError, setEndTimeError] = useState('null');
  const [liquidityLockupError, setLiquidityLockupError] = useState('null');

  console.log({
    "error":
      presaleRateError ||
      hardcapError ||
      softcapError ||
      minBuyError ||
      maxBuyError ||
      liquidityError ||
      listingRateError ||
      endTimeError
  })
  console.log({ presaleRateError })
  console.log({ hardcapError })
  console.log({ softcapError })
  console.log({ minBuyError })
  console.log({ maxBuyError })
  console.log({ liquidityError })
  console.log({ listingRateError })
  console.log({ endTimeError })



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
      setSoftcapError(null);
    }
    setHardcap(value);
  };

  const handleSoftcap = (value) => {
    if (value <= 0) {
      setSoftcapError('Softcap must be positive number!');
    } else if (value <= 0.25 * hardcap) {
      setSoftcapError('Softcap must be greater or equal to 25% of Hardcap!');
    } else if (value > hardcap) {
      setSoftcapError('Softcap must be less than to 25% of Hardcap!');
    } else {
      setHardcapError(null);
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
      setMaxBuyError(null);
    }
    setMinBuy(value);
  };

  const handleMaxBuy = (value) => {
    if (value <= 0) {
      setMaxBuyError('Maximum buy must be positive number!');
    } else if (value <= minBuy) {
      setMaxBuyError('Maximum buy must be greater than Minimum buy!');
    } else {
      setMinBuyError(null);
      setMaxBuyError(null);
    }
    setMaxBuy(value);
  };

  const handleRefundType = (value) => {
    setRefundType(value)
  }

  const handleLiquidity = (value) => {
    if (value <= 50) {
      setLiquidityError('Maximum buy must be greater than 50%!');
    } else {
      setLiquidityError(null);
    }
    setLiquidity(value)
  }

  const handleListingRate = (value) => {
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

  const handleLiquidityLockup = (value) => {
    if (value <= 0) {
      setLiquidityLockupError('Presale rate must be positive number!');
    } else {
      setLiquidityLockupError(null);
    }
    setLiquidityLockup(value);
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
      liquidityLockup,
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
      <Input
        label={"Presale Rate*"}
        type={"number"}
        placeholder={"Enter presale rate"}
        min={0}
        value={presaleRate}
        onChange={(e) => handlePresaleRate(e.target.value)}
        note={`If I spend 1 ${chain?.nativeCurrency?.symbol ? chain.nativeCurrency.symbol : 'crypto'}, how many tokens will I receive?`}
        error={presaleRateError != 'null' && <Form.Text className="text-danger">{presaleRateError}</Form.Text>}
      />

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

      <Input
        label={`Softcap (${chain?.nativeCurrency?.symbol ? chain.nativeCurrency.symbol : 'crypto'})*`}
        type={"number"}
        placeholder={"Enter softcap"}
        min={0}
        value={softcap}
        onChange={(e) => handleSoftcap(e.target.value)}
        note={"Softcap must be >= 25% of Hardcap!"}
        error={softcapError != 'null' && <Form.Text className="text-danger">{softcapError}</Form.Text>}
      />

      <Input
        label={`Hardcap (${chain?.nativeCurrency?.symbol ? chain.nativeCurrency.symbol : 'crypto'})*`}
        type={"number"}
        placeholder={"Enter hardcap"}
        min={0}
        value={hardcap}
        onChange={(e) => handleHardcap(e.target.value)}

        error={hardcapError != 'null' && <Form.Text className="text-danger">{hardcapError}</Form.Text>}
      />

      <Input
        label={`Minimum buy (${chain?.nativeCurrency?.symbol ? chain.nativeCurrency.symbol : 'crypto'})*`}
        type={"number"}
        placeholder={"Enter minimum buy"}
        min={0}
        value={minBuy}
        onChange={(e) => handleMinBuy(e.target.value)}
        error={minBuyError != 'null' && <Form.Text className="text-danger">{minBuyError}</Form.Text>}
      />

      <Input
        label={`Maximum buy (${chain?.nativeCurrency?.symbol ? chain.nativeCurrency.symbol : 'crypto'})*`}
        type={"number"}
        placeholder={"Enter maximum buy"}
        min={0}
        value={maxBuy}
        onChange={(e) => handleMaxBuy(e.target.value)}
        error={maxBuyError != 'null' && <Form.Text className="text-danger">{maxBuyError}</Form.Text>}
      />

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

      <Input
        label={`Listing rate*`}
        type={"number"}
        placeholder={"Listing rate"}
        min={0}
        value={listingRate}
        onChange={(e) => handleListingRate(e.target.value)}
        note={`1 ${chain?.nativeCurrency?.symbol ? chain.nativeCurrency.symbol : 'crypto'} = ${listingRate ? listingRate : 0} ${description.tokenName}`}
        error={listingRateError != 'null' && <Form.Text className="text-danger">{listingRateError}</Form.Text>}
      />

      <Input
        label={`Liquidity (%)*`}
        type={"number"}
        placeholder={"Enter maximum buy"}
        min={0}
        value={liquidity}
        onChange={(e) => handleLiquidity(e.target.value)}
        error={liquidityError != 'null' && <Form.Text className="text-danger">{liquidityError}</Form.Text>}
      />

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

      <Input
        label={`Liquidity lockup (days)*`}
        type={"number"}
        placeholder={"Enter Liquidity lockup days"}
        min={0}
        value={liquidityLockup}
        onChange={(e) => handleLiquidityLockup(e.target.value)}
        error={liquidityLockupError != 'null' && <Form.Text className="text-danger">{liquidityLockupError}</Form.Text>}
      />
      <center>
        <Form.Text>
          Need {hardcap * 2} {description.tokenName} to create launchpad.
        </Form.Text>
      </center><br />
      {/* <Input
        label = {``}
        type = {}
        placeholder = {}
        min={}
        value = {}
        onChange = {}
        note = {}
        error = {}
      /> */}

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
          endTimeError ||
          liquidityLockupError
        )}
      >
        Next
      </Button>
    </>
  );
};

export default Step2;
