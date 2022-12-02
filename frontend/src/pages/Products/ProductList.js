import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import LoadSpinner from '../../components/LoadSpinner';
import { Store } from '../../Store';
import { getError } from '../../utils';
import Alert from '../../components/Alert';
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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

    // case 'CREATE_REQUEST':
    //   return { ...state, loadingCreate: true };
    // case 'CREATE_SUCCESS':
    //   return {
    //     ...state,
    //     loadingCreate: false,
    //   };
    // case 'CREATE_FAIL':
    //   return { ...state, loadingCreate: false };
    case 'DELETE_REQUEST':
      return { ...state, loadingDelete: true, successDelete: false };
    case 'DELETE_SUCCESS':
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case 'DELETE_FAIL':
      return { ...state, loadingDelete: false, successDelete: false };

    case 'DELETE_RESET':
      return { ...state, loadingDelete: false, successDelete: false };

    default:
      return state;
  }
};

export default function ProductList() {
  const [{ loading, error, products, loadingDelete, successDelete }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });
  const navigate = useNavigate();
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
        // dispatch({
        //   type: 'FETCH_FAIL',
        //   payload: getError(err),
        // });
      }
    };
    fetchData();
    if (successDelete) {
      dispatch({ type: 'DELETE_RESET' });
    } else {
      fetchData();
    }
  }, [userInfo, successDelete]);

  // const createHandler = async () => {
  //   if (window.confirm('Are you sure to create a new item?')) {
  //     try {
  //       dispatch({ type: 'CREATE_REQUEST' });
  //       const { data } = await axios.post('/api/product', {
  //         headers: { Authorization: `Bearer ${userInfo.token}` },
  //       });
  //       window.alert('product created successfully');
  //       dispatch({ type: 'CREATE_SUCCESS' });
  //       navigate(`/admin/products/${data.product._id}`);
  //       console.log(data);
  //     } catch (err) {
  //       window.alert(getError(error));
  //       dispatch({
  //         type: 'CREATE_FAIL',
  //       });
  //     }
  //   }
  // };
  const deleteHandler = async (productId) => {
    if (window.confirm('Are you sure you want to remove this item? ')) {
      try {
        await axios.delete(`/api/products/${productId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        window.alert('Product deleted successfully');
        dispatch({ type: 'DELETE_SUCCESS' });
      } catch (err) {
        window.alert(getError(error));
        dispatch({
          type: 'DELETE_FAIL',
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
            {' '}
            <Link to="/create" className="btn btn-outline-info mx-1 mt-5 mb-3">
              Create
            </Link>
            {/* <Button type="button" onClick={createHandler}>
              {' '}
              Create Product
            </Button> */}
          </div>
        </Col>
      </Row>

      {/* {loadingCreate && <LoadSpinner></LoadSpinner>} */}
      {loadingDelete}
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
                <th>STOCK</th>
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
                  <td> {products[item].stock} </td>
                  <td>
                    <Button
                      variant="light"
                      type="button"
                      onClick={() =>
                        navigate(`/admin/product/${products[item]._id}`)
                      }
                    >
                      {' '}
                      Edit
                    </Button>
                    <Button
                      variant="light"
                      type="button"
                      onClick={() => deleteHandler(products[item]._id)}
                    >
                      {' '}
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
