import React from 'react';
import {
    Form,
    FormControl,
    Button,
    Container,
} from 'react-bootstrap';
import Layout from './shared/Layout';

const Login = ({error}) => {

    return (
        <Layout>
            <>
                <Container id="small-main">
                    {error != "" ?
                        <div className = "alert alert-danger"> 
                            <p>{error}</p>
                        </div>
                    : null}
                    <h2>Login</h2>
                    <Form id="loginForm" method="post" action="login">
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <FormControl name="email" type="email" id="exampleInputEmail1" placeholder="Email address" aria-describedby="emailHelp"/>
                        </Form.Group>

                        <Form.Group className="form-group">
                            <Form.Label>Password</Form.Label>
                            <FormControl name="password" type="password" id="exampleInputPassword1" placeholder="Password" required/>
                        </Form.Group>
                        <Button className="btn btn-primary" type="submit">Login</Button>
                    </Form>
                </Container>
            </>
        </Layout> 
    )
}

export default Login;