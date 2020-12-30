import React, {useState, } from 'react';
import {
    Nav, 
    Navbar,
    Form, 
    FormControl,
    Button,
} from 'react-bootstrap';

const Header =  ({user}) => {

    return (
        <>
            <Navbar bg="primary" variant="dark" expand="md" className="justify-content-between">
                <Nav>
                    <Navbar.Brand href="/">Project Explorer</Navbar.Brand>
                    <Button className="navbar-toggler" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </Button>

                    <Form name="prp" inline>
                        <FormControl id="search_term" className="mr-sm-2" type="text" placeholder="Search Projects"></FormControl>
                        <Button id="search-btn" variant="outline-light" className="my-2 my-sm-0" type="submit">Search</Button>
                    </Form>

                    <Nav>
                        <Nav.Link href="/search">Projects</Nav.Link>
                        <Nav.Link href="/projects/submit">Submit</Nav.Link>
                    </Nav>
                </Nav>

                    {user ? 
                        <Nav className="justify-content-end">
                            <Nav.Link href="/logout">Logout</Nav.Link>
                            <Nav.Link id="username" href="">Hi, {user.firstname}</Nav.Link>
                        </Nav>
                    :
                        <Nav className="justify-content-end">
                            <Nav.Link href="/signup">Sign Up</Nav.Link>
                            <Nav.Link href="/login">Login</Nav.Link>
                        </Nav> 
                    } 
            </Navbar>
        </>
    )
}

export default Header;