import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import { Store } from './Store';
import { useContext } from 'react';
import Cart from './pages/Cart';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import ConfirmOrder from './pages/ConfirmOrder';
import ProcessOrder from './pages/ProcessOrder';
import OrderHistory from './pages/OrderHistory';
import User from './pages/User';
import AdminDash from './pages/AdminDash';
import RestrictedUser from './components/RestrictedUser';
import RestrictedAdmin from './components/RestrictedAdmin';
import ProductList from './pages/ProductList';
function App() {
  const { state, dispatch: newDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signOutEvent = () => {
    newDispatch({
      type: 'SIGN_OUT',
    });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>PlantyFood</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto w-100 justify-content-end">
                <Link to="/cart" className="nav-link">
                  <i class="fa-solid fa-cart-shopping"></i>
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="success">
                      {cart.cartItems.reduce((a, c) => a + c.qnty, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item> Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item> History</NavDropdown.Item>
                    </LinkContainer>
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signOutEvent}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title="Admin" id="admin-nav-dropdown">
                    <LinkContainer to="/admin/dashboard">
                      <NavDropdown.Item>Dashboard</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/products">
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/orders">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/users">
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />

              <Route
                path="/profile"
                element={
                  <RestrictedUser>
                    <User />
                  </RestrictedUser>
                }
              ></Route>
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/product/:slug" element={<Product />} />
              <Route path="/confirmorder" element={<ConfirmOrder />} />
              <Route
                path="/order/:id"
                element={
                  <RestrictedUser>
                    <ProcessOrder />
                  </RestrictedUser>
                }
              ></Route>
              <Route
                path="/orderhistory"
                element={
                  <RestrictedUser>
                    <OrderHistory />
                  </RestrictedUser>
                }
              ></Route>
              <Route
                path="/admin/dashboard"
                element={
                  <RestrictedAdmin>
                    <AdminDash />
                  </RestrictedAdmin>
                }
              ></Route>
              <Route
                path="/admin/products"
                element={
                  <RestrictedAdmin>
                    <ProductList />
                  </RestrictedAdmin>
                }
              ></Route>
            </Routes>
          </Container>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
