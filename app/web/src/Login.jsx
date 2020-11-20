import React, {useState} from 'react';
import {
    Form,
    FormControl,
    Button,
    Container,
} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import Layout from './shared/Layout';
const loginUri = "/api/login/";


const Login = (props) => {
    let history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        switch(name) {
            case "email":
                setEmail(value);
            break;
            case "password":
                setPassword(value);
            break;
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let loginDetails = { 
            "email": email,
            "password": password
        };

        fetch(loginUri, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(loginDetails)
        })
            .then((response) => {
                if(response.status === 200) {
                    return response.json();
                }
                else {
                    throw new Error("Invalid email/password");
                }
            })
            .then((data) => {
                // console.log(data);
    
                if(data.status === "ok") {
                    let key = "uid";
                    let value = data.data.id;
                    document.cookie = `${key}= ${value}; path=/`;
                    history.push("/");
                }
                else {    
                    setError("Invalid email/password");
                }
            })
            .catch((error) => {
                console.log("ERROR", error);
            });
    }

    return (
        <Layout>
            <>
                <Container id="small-main">
                    {error !== "" ?
                        <div className = "alert alert-danger"> 
                            <p>{error}</p>
                        </div>
                    : null}
                    <h2>Login</h2>
                    <Form id="loginForm" onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <FormControl name="email" type="email" id="exampleInputEmail1" placeholder="Email address" aria-describedby="emailHelp" value={email} onChange={handleInputChange}/>
                        </Form.Group>

                        <Form.Group className="form-group">
                            <Form.Label>Password</Form.Label>
                            <FormControl name="password" type="password" id="exampleInputPassword1" placeholder="Password" value={password} onChange={handleInputChange} required/>
                        </Form.Group>
                        <Button className="btn btn-primary" type="submit">Login</Button>
                    </Form>
                </Container>

            </>
        </Layout> 
    )
}

export default Login;