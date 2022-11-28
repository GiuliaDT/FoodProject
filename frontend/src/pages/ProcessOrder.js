import React, { useContext, useEffect, useReducer } from 'react';
import LoadSpinner from '../components/LoadSpinner';
import Alert from '../components/Alert';
import { Store } from '../Store';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getError } from '../utils';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };

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

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: '',
  });
  useEffect(() => {
    const getOrder = async () => {
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
    if (!order._id || (order._id && order._id !== orderId)) {
      getOrder();
    }
  }, [order, userInfo, orderId, navigate]);
  return loading ? (
    <LoadSpinner></LoadSpinner>
  ) : error ? (
    <Alert variant="danger">{error}</Alert>
  ) : (
    <div>
      <h1 className="my-3"> You order reference number is # {orderId}</h1>

      <h3> Thank you for shopping with us, come to visit us soon!</h3>
    </div>
  );
}

export default ProcessOrder;
