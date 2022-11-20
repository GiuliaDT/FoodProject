import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Product(props) {
  const { product } = props;
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
          <i class="fa-solid fa-tag"></i> {product.price}{' '}
        </Card.Text>
        <Card.Text>
          {' '}
          <i class="fa-sharp fa-solid fa-location-dot"></i>
          {product.origin}{' '}
        </Card.Text>
        <Card.Text>
          <i class="fa-solid fa-utensils"></i>
          {product.occasion}
        </Card.Text>
      </Card.Body>
      <Button>Add to Cart</Button>
    </Card>
  );
}

export default Product;
