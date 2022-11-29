import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import LoadSpinner from '../components/LoadSpinner';
import { Store } from '../Store';
import { getError } from '../utils';
import Alert from '../components/Alert';
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        products: action.payload,
        ...state,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'CREATE_REQUEST':
      return { ...state, loadingCreate: true };
    case 'CREATE_SUCCESS':
      return {
        ...state,
        loadingCreate: false,
      };
    case 'CREATE_FAIL':
      return { ...state, loadingCreate: false };

    default:
      return state;
  }
};

export default function ProductList() {
  const [{ loading, products, error, loadingCreate }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      error: '',
    }
  );
  const { state } = useContext(Store);
  const { userInfo } = state;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/products/admin', {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  const navigate = useNavigate();
  const createHandler = async () => {
    if (window.confirm('Are you sure to create?')) {
      try {
        dispatch({ type: 'CREATE_REQUEST' });
        const { data } = await axios.post(
          '/api/products',
          {},
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );

        dispatch({ type: 'CREATE_SUCCESS' });
        navigate(`/admin/product/${data.product._id}`);
      } catch (err) {
        window.alert(getError(error));
        dispatch({
          type: 'CREATE_FAIL',
        });
      }
    }
  };
  return (
    <div>
      <Row>
        <Col>
          <h1> Products</h1>
        </Col>
        <Col className="col text-end">
          <div>
            <Button type="button" onClick={createHandler}>
              {' '}
              Create Product
            </Button>
          </div>
        </Col>
      </Row>

      {loadingCreate && <LoadSpinner></LoadSpinner>}
      {loading ? (
        <LoadSpinner></LoadSpinner>
      ) : error ? (
        <Alert variant="danger"> {error}</Alert>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>ORIGIN</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(products).map((item, i) => (
                <tr key={i}>
                  <td> {products[item]._id} </td>
                  <td> {products[item].name} </td>
                  <td> {products[item].price} </td>
                  <td> {products[item].category} </td>
                  <td> {products[item].origin} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
