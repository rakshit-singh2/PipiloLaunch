import React from 'react'
import "./Documents.css";
import { Button } from 'react-bootstrap';
const Documents = () => {
  return (
    <div className="container">
      <div className="404box">
        <div className="404">404</div>
        <div className="Oops">Oops, page not found.</div>
        <Button href="/">Back Home</Button>

      </div>
    </div>
  )
}

export default Documents