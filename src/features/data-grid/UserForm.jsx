import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { BsPlusLg, BsXLg } from "react-icons/bs";
import CloseButton from 'react-bootstrap/CloseButton'

export function UserForm({userData, handleSubmit, cancelForm}) {
    const [formData, setFormData] = useState(userData);
    const [validated, setValidated] = useState(false);

    const validAndSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity() === true) {
            handleSubmit(formData);
        }
        setValidated(true);
    };

    const saveInfo = (e) => {
        setFormData(data => ({
            ...data,
            [e.target.name]: e.target.value
        }));
    }

    return (
        <Form noValidate validated={validated} onSubmit={(e) => validAndSubmit(e)}>
            <CloseButton variant="white" />
            <Row>
                <Form.Group as={Col} md="3">
                    <Form.Label className='float-start'>First name</Form.Label>
                    <Form.Control
                        size='sm'
                        name="firstName" 
                        value={formData.firstName} 
                        placeholder="First name"
                        onChange={(e) => saveInfo(e)}
                        required 
                    />
                    <Form.Control.Feedback type="invalid" className='text-start'>Please Provide First Name</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="2">
                    <Form.Label className='float-start'>Last name</Form.Label>
                    <Form.Control
                        size='sm'
                        name="lastName"
                        value={formData.lastName}
                        placeholder="Last name"
                        onChange={(e) => saveInfo(e)}
                        required
                    />
                    <Form.Control.Feedback type="invalid" className='text-start'>Please Provide Last Name</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3">
                    <Form.Label className='float-start'>Email</Form.Label>
                    <Form.Control
                        size='sm'
                        name="email"
                        value={formData.email}
                        placeholder="Email"
                        onChange={(e) => saveInfo(e)}
                        required
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    />
                    <Form.Control.Feedback type="invalid" className='text-start'>Please Provide Email</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="2">
                    <Form.Label className='float-start'>Status</Form.Label>
                    <Form.Select size='sm' name='status' value={formData.status} onChange={(e) => saveInfo(e)}>
                        <option value="INITIATED">Initiated</option>
                        <option value="REGISTERED">Registred</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md="2" className='pt-4'>
                    <Button type="submit" size="sm" variant="outline-primary" className='m-2'>{ userData.id ? 'Update': <BsPlusLg /> }</Button>
                    <Button type="button" size="sm" variant="outline-danger" className='m-2' onClick={(e) => { cancelForm(false); e.stopPropagation();} }><BsXLg /></Button>
                </Form.Group>
            </Row>
        </Form>
    );
}