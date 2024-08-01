import React from 'react';
import { Form, Button } from 'react-bootstrap';

const Step2 = ({ presaleRate, setPresaleRate, whitelist, setWhitelist, softcap, setSoftcap, hardcap, setHardcap, minBuy, setMinBuy, maxBuy, setMaxBuy, refundType, setRefundType, startTime, setStartTime, endTime, setEndTime, handleNext, handlePrevious }) => {
  return (
    <>
      <Form.Group className="mb-3" controlId="formPresaleRate">
        <Form.Label>Presale Rate*</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter presale rate"
          value={presaleRate}
          onChange={(e) => setPresaleRate(e.target.value)}
        />
      </Form.Group>

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
        <Form.Label>Softcap (BNB)*</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter softcap"
          value={softcap}
          onChange={(e) => setSoftcap(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formHardcap">
        <Form.Label>Hardcap (BNB)*</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter hardcap"
          value={hardcap}
          onChange={(e) => setHardcap(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formMinBuy">
        <Form.Label>Minimum buy (BNB)*</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter minimum buy"
          value={minBuy}
          onChange={(e) => setMinBuy(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formMaxBuy">
        <Form.Label>Maximum buy (BNB)*</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter maximum buy"
          value={maxBuy}
          onChange={(e) => setMaxBuy(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formRefundType">
        <Form.Label>Refund Type</Form.Label>
        <Form.Check
          type="radio"
          id="refundTypeRefund"
          label="Refund"
          checked={refundType === 'Refund'}
          onChange={() => setRefundType('Refund')}
        />
        <Form.Check
          type="radio"
          id="refundTypeBurn"
          label="Burn"
          checked={refundType === 'Burn'}
          onChange={() => setRefundType('Burn')}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formStartTime">
        <Form.Label>Start Time (UTC)</Form.Label>
        <Form.Control
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEndTime">
        <Form.Label>End Time (UTC)</Form.Label>
        <Form.Control
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </Form.Group>

      <Form.Text className="text-muted">
        Need 100,000 AMPLE to create launchpad.
      </Form.Text><br />

      <Button variant="secondary" onClick={handlePrevious} className="me-2">
        Previous
      </Button>
      <Button variant="primary" onClick={handleNext}>
        Next
      </Button>
    </>
  )
};

export default Step2;
