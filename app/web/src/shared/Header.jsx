import React, {useState, useEffect} from 'react';
import {
    Nav, 
    Navbar,
    Form, 
    FormControl,
    Button,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const usersUri = "/api/users/";


const Header =  (props) => {
    let history = useHistory();
    const [firstName, setFirstName] = useState("");

    const handleLogout = () => {
        document.cookie += "; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;"; 

        history.push("/");
    }

    useEffect(() => {
        if(document.cookie) {
            const uidCookie = document.cookie.split(';').find(row => row.startsWith('uid')).split('=')[1];
            const usersUriOnLogin = usersUri + uidCookie;

            fetch(usersUriOnLogin)
                .then((response) => {        
                    return response.json(); 
                })
                .then((data) => {
                    setFirstName(data.firstname);
                })
                .catch((error) => {
                    // handling errors
                    console.log(error);
                })
        }
    }, [])

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

                {(document.cookie) ? 
                    <Nav className="justify-content-end">
                        <Nav.Link href="" onClick={handleLogout}>Logout</Nav.Link>
                        <Nav.Link href="">Hi {firstName}</Nav.Link>
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