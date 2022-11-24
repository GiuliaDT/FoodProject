import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { Store } from '../Store';

function ShippingPayment() {
  const navigate = useNavigate();
  const { state, dispatch: newDispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [zipCode, setZipCode] = useState(shippingAddress.zipCode || '');

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/shipping');
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    newDispatch({
      type: 'SAVE_ADDRESS',
      payload: {
        fullName,
        address,
        city,
        zipCode,
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({ fullName, address, city, zipCode })
    );
    navigate('/payment');
  };

  return (
    <Container className="small-container">
      <h1 className="my-3">Shipping & Payment</h1>
      <h2>Review your shipping information</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            value={fullName}
            type="text"
            required
            onChange={(e) => setFullName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            value={address}
            type="text"
            required
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            value={city}
            type="text"
            required
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="zipCode">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            value={zipCode}
            type="number"
            required
            onChange={(e) => setZipCode(e.target.value)}
          />
        </Form.Group>
        <div>
          <Button variant="primary" type="submit">
            Continue to Payment
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default ShippingPayment;
