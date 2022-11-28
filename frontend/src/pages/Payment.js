import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Store } from '../Store';

function Payment() {
  const navigate = useNavigate();
  const { state, dispatch: newDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [selectedPayment, setSelectedPayment] = useState(
    paymentMethod || 'PayPal'
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    newDispatch({ type: 'SAVE_PAYMENT', payload: selectedPayment });
    localStorage.setItem('paymentMethod', selectedPayment);
    navigate('/confirmorder');
  };

  return (
    <Form onSubmit={submitHandler}>
      <div className="mb-3">
        <h2>Review your payment information</h2>
        <Form.Check
          type="radio"
          id="PayPal"
          label="PayPal"
          value="PayPal"
          checked={selectedPayment === 'PayPal'}
          onChange={(e) => setSelectedPayment(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <Form.Check
          type="radio"
          id="Stripe"
          label="Stripe"
          value="Stripe"
          checked={selectedPayment === 'Stripe'}
          onChange={(e) => setSelectedPayment(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <Form.Check
          type="radio"
          id="Credit Card"
          label="Credit Card"
          value="Credit Card"
          checked={selectedPayment === 'Credit Card'}
          onChange={(e) => setSelectedPayment(e.target.value)}
        />
      </div>

      <Button type="submit">Continue</Button>
    </Form>
  );
}

export default Payment;
