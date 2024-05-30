import Spinner from 'react-bootstrap/Spinner'

const Spin=()=> {
    return (
        <>
        <Spinner animation="grow" variant="primary" style={{display:'block'}} />
        <Spinner animation="grow" variant="secondary" style={{display:'block'}} />
        <Spinner animation="grow" variant="success" style={{display:'block'}} />
        <Spinner animation="grow" variant="danger" style={{display:'block'}} />
        <Spinner animation="grow" variant="warning" style={{display:'block'}} />
        <Spinner animation="grow" variant="info" style={{display:'block'}} />
        <Spinner animation="grow" variant="light" style={{display:'block'}} />
        <Spinner animation="grow" variant="dark" style={{display:'block'}} />
        </>
    )
  }
  
  export default Spin;