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

function App() {
  const { state, dispatch: newDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signOutEvent = () => {
    newDispatch({
      type: 'SIGN_OUT',
    });
    localStorage.removeItem('userInfo');
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
              <Nav className="me-auto">
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
                    <NavDropdown.Divider />
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
              <Route path="/product/:slug" element={<Product />} />
            </Routes>
          </Container>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
