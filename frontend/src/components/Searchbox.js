import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

function Searchbox() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const submitSearch = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };
  return (
    <div>
      <Form className="d-flex me-auto" onSubmit={submitSearch}>
        <InputGroup>
          <FormControl
            type="date"
            name="q"
            id="q"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search by date"
            aria-label="Search by Date"
            aria-describedby="button-search"
          ></FormControl>
          <Button variant="outline-primary" type="submit" id="button-search">
            <i className="fas fa-search"></i>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
}
export default Searchbox;
