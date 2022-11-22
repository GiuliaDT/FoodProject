import React, { useContext } from 'react';
import axios from 'axios';
import { Store } from '../Store';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from '../components/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';

function Cart() {
  const navigate = useNavigate();
  const { state, dispatch: newDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCart = async (item, qnty) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.stock < qnty) {
      window.alert('Product is cuurently out of stock');
      return;
    }
    newDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, qnty },
    });
  };
  const removeItem = (item) => {
    newDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const goToCheckOut = () => {
    navigate('/signin?redirect=/shipping');
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Alert>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </Alert>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{' '}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        onClick={() => updateCart(item, item.qnty - 1)}
                        variant="light"
                        disabled={item.qnty === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{item.qnty}</span>
                      <Button
                        variant="light"
                        onClick={() => updateCart(item, item.qnty + 1)}
                        disabled={item.qnty === item.stock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}> {item.price}€</Col>
                    <Col md={2}>
                      <Button variant="light" onClick={() => removeItem(item)}>
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Total ({cartItems.reduce((a, c) => a + c.qnty, 0)} products)
                    : {cartItems.reduce((a, c) => a + c.price * c.qnty, 0)} €
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={goToCheckOut}
                      disabled={cartItems.length === 0}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Cart;
