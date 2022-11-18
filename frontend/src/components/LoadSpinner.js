import Spinner from 'react-bootstrap/Spinner';

export default function LoadSpinner() {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden"></span>
    </Spinner>
  );
}
