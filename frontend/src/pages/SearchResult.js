import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadSpinner from '../components/LoadSpinner';
import Alert from '../components/Alert';
import { getError } from '../utils';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loafing: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        orders: action.payload.orders,
        countOrders: action.payload.countOrders,
        loading: false,
      };
    case 'FETCH_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

function SearchResult() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const query = searchParams.get('query') || 'all';

  const [{ loading, error, orders, countOrders }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      error: '',
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/orders/search?query=${query}`);
        dispatch({
          type: 'FETCH_SUCCESS',
          payload: data,
        });
      } catch (err) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [error, query]);

  return (
    <div>
      <h1> Your Result</h1>
      <Col md={9}>
        {loading ? (
          <LoadSpinner></LoadSpinner>
        ) : error ? (
          <Alert variant="danger"> {error}</Alert>
        ) : (
          <>
            <Row className="jsutify-content-between mb-3">
              <Col md={6}>
                <div>
                  {countOrders === 0 ? 'No' : countOrders} Results
                  {query !== 'all' && ' : ' + query}
                  {query !== 'all' ? (
                    <Button variant="light" onClick={() => navigate('/search')}>
                      <i className="fas fa-times-circle"></i>
                    </Button>
                  ) : null}
                </div>
              </Col>

              {orders.length === 0 && (
                <LoadSpinner>No Orders Found</LoadSpinner>
              )}
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>USER</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PRODUCTS</th>
                    <th>DELIVERED</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>
                        {order.user ? order.user.name : 'User was deleted'}
                      </td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice.toFixed(2)}</td>
                      <td>{order.orderItems.name}</td>

                      <td>
                        {order.isDelivered
                          ? order.deliveredAt.substring(0, 10)
                          : 'No'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Row>
          </>
        )}
      </Col>
    </div>
  );
}

export default SearchResult;
