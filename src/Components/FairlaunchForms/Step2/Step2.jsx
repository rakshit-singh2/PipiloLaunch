import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { useAccount } from 'wagmi';
import Input from '../../Input/Input';


const Step2 = ({ description, setDescription, setStep }) => {
  // console.log({description})
  const { isConnected, chain, address } = useAccount();
  const [totalSellingAmount, setTotalSellingAmount] = useState(description.totalSellingAmount || null);
  const [whitelist, setWhitelist] = useState(description.whitelist || 'Disable');
  const [softcap, setSoftcap] = useState(description.softcap || null);
  const [maxBuy, setMaxBuy] = useState(description.maxBuy || null);
  const [liquidity, setLiquidity] = useState(description.liquidity || null);
  const [startTime, setStartTime] = useState(description.startTime || '');
  const [endTime, setEndTime] = useState(description.endTime || '');
  const [liquidityLockup, setLiquidityLockup] = useState(description.liquidityLockup || null);
  const [router, setRouter] = useState(description.router || null);
  const [enableMaxContribution, setEnableMaxContribution] = useState(false);

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
  const [totalSellingAmountError, setTotalSellingAmountError] = useState('null')
  const [softcapError, setSoftcapError] = useState('null')
  const [maxBuyError, setMaxBuyError] = useState('null')
  const [liquidityError, setLiquidityError] = useState('null')
  const [routerError, setRouterError] = useState('null')
  const [endTimeError, setEndTimeError] = useState('null');
  const [liquidityLockupError, setLiquidityLockupError] = useState('null');

  // console.log({
  //   "error":
  //     totalSellingAmountError ||
  //     softcapError ||
  //     maxBuyError ||
  //     liquidityError ||
  //     routerError ||
  //     endTimeError
  // })
  // console.log({ totalSellingAmountError })
  // console.log({ softcapError })
  // console.log({ maxBuyError })
  // console.log({ liquidityError })
  // console.log({ routerError })
  // console.log({ endTimeError })


  const handleTotalSellingAmount = (value) => {
    if (value <= 0) {
      setTotalSellingAmountError('Presale rate must be positive number!');
    } else {
      setTotalSellingAmountError(null);
    }
    setTotalSellingAmount(value);
  };


  const handleSoftcap = (value) => {
    if (value <= 0) {
      setSoftcapError('Softcap must be positive number!');
    } else {
      setSoftcapError(null);
    }
    setSoftcap(value);
  };

  const handleMaxBuy = (value) => {
    if (value <= 0) {
      setMaxBuyError('Maximum buy must be positive number!');
    } else {
      setMaxBuyError(null);
    }
    setMaxBuy(value);
  };


  const handleLiquidity = (value) => {
    if (value <= 50) {
      setLiquidityError('Maximum buy must be greater than 50%!');
    } else {
      setLiquidityError(null);
    }
    setLiquidity(value)
  }

  const handleRouter = (value) => {
    if (value <= 50) {
      setRouterError('Please select a router!');
    } else {
      setRouterError(null);
    }
    setRouter(value)
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
    if (value <= 30) {
      setLiquidityLockupError('Lockup Days rate must be greater than 30 days!');
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
      totalSellingAmount,
      whitelist,
      softcap,
      maxBuy,
      router,
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
        label={"Total Selling Amount*"}
        type={"number"}
        placeholder={"Enter presale rate"}
        min={0}
        value={totalSellingAmount}
        onChange={(e) => handleTotalSellingAmount(e.target.value)}
        note={`If I spend 1 ${chain?.nativeCurrency?.symbol ? chain.nativeCurrency.symbol : 'crypto'}, how many tokens will I receive?`}
        error={totalSellingAmountError != 'null' && <Form.Text className="text-danger">{totalSellingAmountError}</Form.Text>}
      />

      <Form.Group className="mb-3">
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
        <Form.Text className="mb-3 text-muted">You can enable/disable whitelist anytime.</Form.Text>
      </Form.Group>

      <Input
        label={`Softcap (${chain?.nativeCurrency?.symbol ? chain.nativeCurrency.symbol : 'crypto'})*`}
        type={"number"}
        placeholder={"Enter softcap"}
        min={0}
        value={softcap}
        onChange={(e) => handleSoftcap(e.target.value)}
        error={softcapError != 'null' && <Form.Text className="text-danger">{softcapError}</Form.Text>}
      />

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Setting max contribution?"
          checked={enableMaxContribution}
          onChange={() => setEnableMaxContribution(!enableMaxContribution)}
        />
        {enableMaxContribution && (
          <Input
            label={`Maximum buy (${chain?.nativeCurrency?.symbol ? chain.nativeCurrency.symbol : 'crypto'})*`}
            type="number"
            placeholder="Enter maximum buy"
            min={0}
            value={maxBuy}
            onChange={(e) => handleMaxBuy(e.target.value)}
            error={maxBuyError !== 'null' && <Form.Text className="text-danger">{maxBuyError}</Form.Text>}
          />
        )}
      </Form.Group>

      <Input
        label={`Liquidity (%)*`}
        type={"number"}
        placeholder={"Enter maximum buy"}
        min={0}
        value={liquidity}
        onChange={(e) => handleLiquidity(e.target.value)}
        error={liquidityError != 'null' && <Form.Text className="text-danger">{liquidityError}</Form.Text>}
      />

      <Form.Group className="mb-3">
        <Form.Label>Select Router Address*</Form.Label>
        <DropdownButton id="" title={router||"Select a router"}>
          <Dropdown.Item onClick={() => handleRouter("PancakeSwap")}>
            PancakeSwap
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleRouter("Uniswap")}>
            Uniswap
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleRouter("ApeSwap")}>
            ApeSwap
          </Dropdown.Item>
        </DropdownButton>
      </Form.Group>


      <Form.Group className="mb-3">
        <Form.Label>Start Time (UTC)</Form.Label>
        <Form.Control
          type="datetime-local"
          value={startTime}
          min={minTime}
          max={maxTime}
          onChange={(e) => handleStartTime(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
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
          Need {totalSellingAmount} {description.tokenName} to create launchpad.
        </Form.Text>
        {/* Need to be checked */}
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
          totalSellingAmountError ||
          softcapError ||
          maxBuyError ||
          liquidityError ||
          routerError ||
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
