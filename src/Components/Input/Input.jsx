import React from 'react';
import { Form } from 'react-bootstrap';

const Input = ({ label, type, placeholder, min = null, value, onChange, note = null, error }) => {
    return (
        <>
            <Form.Group className="mb-3">
                <Form.Label>{label}</Form.Label>
                <Form.Control
                    type={type}
                    placeholder={placeholder}
                    min={min}
                    value={value}
                    onChange={onChange}
                />
                {error &&
                    <>
                        <Form.Text className="text-danger">
                            {error}
                        </Form.Text>
                        <br />
                    </>
                }
                {<Form.Text className="mb-3 text-muted">{note}</Form.Text>}
            </Form.Group>
        </>
    );
}

export default Input;
