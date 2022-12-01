import React, { useContext, useEffect, useReducer, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Store } from '../../Store';
import { getError } from '../../utils';
import axios from 'axios';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'CREATE_SUCCESS':
      return {
        ...state,
        loading: false,
        product: action.payload,
      };
    case 'CREATE_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
function ProductCreate() {
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
    product: {},
  });
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [origin, setOrigin] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');

  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const createHandler = async () => {
    if (window.confirm('Are you sure to create a new item?')) {
      try {
        dispatch({ type: 'CREATE_REQUEST' });
        const { data } = await axios.post(
          '/create',
          { name, price, category, stock, origin },
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        window.alert('product created successfully');
        dispatch({ type: 'CREATE_SUCCESS' });
        navigate('/admin/products');
        console.log(data);
      } catch (err) {
        window.alert(getError(err));
        dispatch({
          type: 'CREATE_FAIL',
        });
      }
    }
  };

  return (
    <Container className="small-container">
      <h1 className="my-3">Create Product</h1>
      <Form>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="category">
          <Form.Label>category</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => setCategory(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>price</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="origin">
          <Form.Label>origin</Form.Label>
          <Form.Control
            type="text"
            required
            onChange={(e) => setOrigin(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="stock">
          <Form.Label> stock</Form.Label>
          <Form.Control
            type="number"
            required
            onChange={(e) => setStock(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="button" onClick={createHandler}>
            Create
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default ProductCreate;
