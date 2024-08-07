import React from 'react'
import { Form } from 'react-bootstrap';
const Input = ({ label, type, placeholder, value, onChange, note, error }) => {
    return (
        <>
            <Form.Group className="mb-3">
                <Form.Label>{label}</Form.Label>

                <Form.Control
                    type = {type}
                    placeholder = {placeholder}
                    value = {value}
                    onChange = {onChange}
                />{note}
                {error && <Form.Text className="text-danger">{error}</Form.Text>}

            </Form.Group>
        </>
    )
}

export default Input