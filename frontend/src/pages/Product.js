import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useReducer, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import LoadSpinner from '../components/LoadSpinner';
import ErrorBox from '../components/Alert';
import { getError } from '../utils';
import { Store } from '../Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function Product() {
  const params = useParams();
  const { slug } = params;
  const navigate = useNavigate;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const getData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const res = await axios.get(`/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    getData();
  }, [slug]);

  const { state, dispatch: newDispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async () => {
    const addedProduct = cart.cartItems.find((x) => x._id === product._id);
    const qnty = addedProduct ? addedProduct.qnty + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.stock < qnty) {
      window.alert('Product temporarily out of stock');
      return;
    }
    newDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, qnty },
    });
    navigate('/cart');
  };

  return loading ? (
    <LoadSpinner />
  ) : error ? (
    <ErrorBox variant="danger">{error}</ErrorBox>
  ) : (
    <div>
      <Row>
        <Col md={5}>
          <img
            className="img-small"
            src={product.image}
            alt={product.name}
          ></img>
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Category:{product.category}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Origin:{product.origin}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <h3>Price:{product.price}€</h3>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>{product.price}€</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.stock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.stock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button onClick={addToCartHandler} variant="primary">
                        Add to Cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Product;
