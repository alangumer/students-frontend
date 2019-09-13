import React, { useState, useRef, createRef } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { API_URL } from './App';

interface Props {
  onStudentCreated: () => void
}

const NewStudent: React.FC<Props> = ({ onStudentCreated }) => {

  const [show, setShow] = useState(false);
  const formRef: any = createRef();
  const nameRef: any = useRef();
  const birthdateRef: any = useRef();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formRef.current.reportValidity()) {
      const birthDate = new Date(birthdateRef.current.value);
      const data = {
        name: nameRef.current.value,
        birthdate: birthDate.toISOString()
      };
      
      const response = await fetch(API_URL + 'students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (response.status === 200) {
        setShow(false);
        alert('Student created');
        onStudentCreated();
      } else {
        alert('Error occurred on the API.');
      }
    }
  }

  return (
    <div>
      <Row>
        <Col className="text-right">
          <Button variant="primary" onClick={handleShow}>
            New Student
          </Button>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Student</Modal.Title>
        </Modal.Header>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group controlId="formGroupName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" ref={nameRef} required />
            </Form.Group>
            <Form.Group controlId="formGroupBirthdate">
              <Form.Label>Birhtdate</Form.Label>
              <Form.Control type="date" placeholder="Birthdate" ref={birthdateRef} required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default NewStudent;