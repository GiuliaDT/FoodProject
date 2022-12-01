import React, { useContext, useEffect, useReducer } from 'react';
import Alert from '../../components/Alert';
import { Store } from '../../Store';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getError } from '../../utils';
import Button from 'react-bootstrap/Button';
import LoadSpinner from '../../components/LoadSpinner';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'DELIVER_REQUEST':
      return { ...state, loadingDeliver: true };
    case 'DELIVER_SUCCESS':
      return { ...state, loadingDeliver: false, successDeliver: true };
    case 'DELIVER_FAIL':
      return { ...state, loadingDeliver: false };
    case 'DELIVER_RESET':
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };
    default:
      return state;
  }
}

function ProcessOrder() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

  const [{ loading, error, order, loadingDeliver, successDeliver }, dispatch] =
    useReducer(reducer, {
      loading: true,
      order: {},
      error: '',
    });
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };

    if (!userInfo) {
      return navigate('/login');
    }
    if (!order._id || successDeliver || (order._id && order._id !== orderId)) {
      fetchOrder();
      if (successDeliver) {
        dispatch({ type: 'DELIVER_RESET' });
      }
    }
  }, [order, userInfo, orderId, navigate, successDeliver]);

  async function deliverOrderHandler() {
    try {
      dispatch({ type: 'DELIVER_REQUEST' });
      const { data } = await axios.put(
        `/api/orders/${order._id}/deliver`, //orderId
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: 'DELIVER_SUCCESS', payload: data });
      window.alert('Order set as delivered');
    } catch (err) {
      window.alert(getError(err));
      dispatch({ type: 'DELIVER_FAIL' });
    }
  }

  return loading ? (
    <LoadSpinner></LoadSpinner>
  ) : error ? (
    <Alert variant="danger">{error}</Alert>
  ) : (
    <div>
      <title>Thank you for shopping with us</title>
      <h1>Your Order confirmation number is #{orderId}</h1>
      <h2>
        {' '}
        You order will be shipped in 2 working days. You can chek the status
        here
      </h2>
      {order.isDelivered ? (
        <Alert variant="success">Delivered at {order.deliveredAt}</Alert>
      ) : (
        <Alert variant="danger">Not Delivered</Alert>
      )}
      <h3> Come to visit us soon! </h3>
      {userInfo.isAdmin && !order.isDelivered && (
        <div>
          {loadingDeliver && <LoadSpinner></LoadSpinner>}

          <Button type="button" onClick={deliverOrderHandler}>
            Deliver Order
          </Button>
        </div>
      )}
    </div>
  );
}

export default ProcessOrder;
