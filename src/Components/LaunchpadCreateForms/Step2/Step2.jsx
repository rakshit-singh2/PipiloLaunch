import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAccount } from 'wagmi';


const Step2 = ({ description, setStep }) => {
  const { isConnected, chain } = useAccount();
  const [presaleRate, setPresaleRate] = useState(0);
  const [whitelist, setWhitelist] = useState('Disable');
  const [hardcap, setHardcap] = useState(0);
  const [softcap, setSoftcap] = useState(0);
  const [minBuy, setMinBuy] = useState(0);
  const [maxBuy, setMaxBuy] = useState(0);
  const [refundType, setRefundType] = useState('Refund');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');


  const handlePresaleRate = (rate) => {
    if (rate <= 0) {

    }
    setPresaleRate(rate)
  }

  const handleHardcap = (hcap) => {
    setHardcap(hcap)
  }
  const handleSoftcap = (scap) => {
    setSoftcap(scap)
  }
  const handleMinBuy = (mibuy) => {
    setMinBuy(mibuy)
  }
  const handleMaxBuy = (mabuy) => {
    setMaxBuy(mabuy)
  }
  const handleRefundType = (rt) => {
    setRefundType(rt)
  }
  const handleStartTime = (st) => {
    setStartTime(st)

  }
  const handleEndTime = (et) => {
    setEndTime(et)
  }

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  }

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  }

  if (!isConnected || chain.nativeCurrency.name !== description.choosenChain) {
    return <div>
      <center className="text-danger">
        <div class="spinner-border text-danger" role="status">
          <span class="sr-only">Loading...</span>
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
          onChange={(e) => handleStartTime(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEndTime">
        <Form.Label>End Time (UTC)</Form.Label>
        <Form.Control
          type="datetime-local"
          value={endTime}
          onChange={(e) => handleEndTime(e.target.value)}
        />
      </Form.Group>

      <Form.Text className="text-muted">
        Need {hardcap * 2} AMPLE to create launchpad.
      </Form.Text><br />

      <Button variant="secondary" onClick={handlePrevious} className="me-2">
        Previous
      </Button>
      <Button variant="primary" onClick={handleNext} disabled={true}>
        Next
      </Button>
    </>
  );
};

export default Step2;
