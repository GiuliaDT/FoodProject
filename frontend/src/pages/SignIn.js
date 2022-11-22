import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function SignIn() {
  const { search } = useLocation();
  const redirectPath = new URLSearchParams(search).get('redirect');
  const redirect = redirectPath ? redirectPath : '/';
  return (
    <div>
      <Container className="singin-container">
        <h1>Sign In</h1>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" required />
          </Form.Group>
        </Form>
        <Button type="submit"> Sign In </Button> {''}
        Not a customer?
        <Link to={`/signup?/redirect=${redirect}`}>Create a new account</Link>
      </Container>
    </div>
  );
}

export default SignIn;
