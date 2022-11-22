import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../Store';

function Product(props) {
  const { product } = props;
  const { state, dispatch: newDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCart = async (item) => {
    const addedProduct = cartItems.find((x) => x._id === product._id);
    const qnty = addedProduct ? addedProduct.qnty + 1 : 1;
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
  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title> {product.name} </Card.Title>
        </Link>
        <Card.Text>
          <i class="fa-solid fa-tag"></i> {product.price}
        </Card.Text>
        <Card.Text>
          <i class="fa-sharp fa-solid fa-location-dot"></i> {product.origin}
        </Card.Text>
        <Card.Text>
          <i class="fa-solid fa-utensils"></i> {product.category}
        </Card.Text>
      </Card.Body>
      {product.stock === 0 ? (
        <Button variant="light" disabled>
          {' '}
          Out of Stock
        </Button>
      ) : (
        <Button onClick={() => addToCart(product)}>Add to Cart</Button>
      )}
    </Card>
  );
}

export default Product;
