import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './style.css';

const Header = () => {
  return (
    <>
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="#home" >Klash</Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#Problems">Problems</Nav.Link>
                <Nav.Link href="#Contests">Contests</Nav.Link>
                <Nav.Link href="#Contact">Contact</Nav.Link>
                <Nav.Link href="#Sign_In" className='signin'>Sign In</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    </>
  )
}

export default Header