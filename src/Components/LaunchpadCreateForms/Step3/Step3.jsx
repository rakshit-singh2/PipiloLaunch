import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAccount } from 'wagmi';

const Step3 = ({ description, setDescription, handleNext, handlePrevious }) => {
  const { isConnected, chain } = useAccount();
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
      <Form.Group className="mb-3" controlId="formLogoURL">
        <Form.Label>Logo URL*</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter logo URL"
          value={logoURL}
          onChange={(e) => setLogoURL(e.target.value)}
        />
        <Form.Text className="text-muted">URL must end with a supported image extension png, jpg, jpeg, or gif.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formWebsite">
        <Form.Label>Website*</Form.Label>
        <Form.Control
          type="url"
          placeholder="Enter website URL"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formFacebook">
        <Form.Label>Facebook</Form.Label>
        <Form.Control
          type="url"
          placeholder="Enter Facebook URL"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formTwitter">
        <Form.Label>Twitter</Form.Label>
        <Form.Control
          type="url"
          placeholder="Enter Twitter URL"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formGithub">
        <Form.Label>Github</Form.Label>
        <Form.Control
          type="url"
          placeholder="Enter Github URL"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formTelegram">
        <Form.Label>Telegram</Form.Label>
        <Form.Control
          type="url"
          placeholder="Enter Telegram URL"
          value={telegram}
          onChange={(e) => setTelegram(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formInstagram">
        <Form.Label>Instagram</Form.Label>
        <Form.Control
          type="url"
          placeholder="Enter Instagram URL"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDiscord">
        <Form.Label>Discord</Form.Label>
        <Form.Control
          type="url"
          placeholder="Enter Discord URL"
          value={discord}
          onChange={(e) => setDiscord(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formReddit">
        <Form.Label>Reddit</Form.Label>
        <Form.Control
          type="url"
          placeholder="Enter Reddit URL"
          value={reddit}
          onChange={(e) => setReddit(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formYoutube">
        <Form.Label>Youtube</Form.Label>
        <Form.Control
          type="url"
          placeholder="Enter Youtube URL"
          value={youtube}
          onChange={(e) => setYoutube(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formWhitelistLink">
        <Form.Label>Whitelist Link</Form.Label>
        <Form.Control
          type="url"
          placeholder="Enter whitelist link URL"
          value={whitelistLink}
          onChange={(e) => setWhitelistLink(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDescription">
        <Form.Label>Description*</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Button variant="secondary" onClick={handlePrevious} className="me-2">
        Previous
      </Button>
      <Button variant="primary" onClick={handleNext}>
        Next
      </Button>
    </>
  )
};

export default Step3;
