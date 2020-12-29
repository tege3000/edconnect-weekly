import React, {useState, useEffect} from 'react';
import {
    Form,
    FormControl,
    Button,
    Container,
} from 'react-bootstrap';
import Layout from './shared/Layout';

const Signup = ({programs, gradYears, errors}) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [matricNumber, setMatricNumber] = useState("");
    const [program, setProgram] = useState(programs[0]);
    const [gradYear, setGradYear] = useState(gradYears[0]);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        switch(name) {
            case "firstName":
                setFirstName(value);
            break;
            case "lastName":
                setLastName(value);
            break;
            case "email":
                setEmail(value);
            break;
            case "password":
                setPassword(value);
            break;
            case "program":
                setProgram(value);
            break;
            case "matricNumber":
                setMatricNumber(value);
            break;
            case "graduationYear":
                setGradYear(value);
            break;
        }

    }


    return (
        <Layout>
            <>
                <Container id="medium-main">
                    {errors != "" ?
                        <div className = "alert alert-danger"> 
                            {errors.map((error) => (
                                <p>{error}</p>
                            ))}
                        </div>
                    : null}
                    <Form id="signupForm" method="post" action="signup" noValidate>
                        <h2>Sign up</h2>
                        <Form.Row>
                            <Form.Group className="col-md-6">
                                <Form.Label>First Name:</Form.Label>
                                <FormControl name="firstName" type="text" id="inputFirstName" placeholder="First Name" value={firstName} onChange={handleInputChange}/>
                            </Form.Group>
                            <Form.Group className="col-md-6">
                                <Form.Label>Last Name:</Form.Label>
                                <FormControl name="lastName" type="text" className="form-control" id="inputLastName" placeholder="Last Name" value={lastName} onChange={handleInputChange}/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group className="col-md-6">
                                <Form.Label>Email Address:</Form.Label>
                                <FormControl name="email" type="email" id="inputEmailAddress" placeholder="Email Address" value={email} onChange={handleInputChange}/>
                            </Form.Group>
                            <Form.Group className="col-md-6">
                                <Form.Label>Password:</Form.Label>
                                <FormControl name="password" type="password" id="inputPassword" placeholder="Password" value={password} onChange={handleInputChange}/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group className="col-md-3">
                                <Form.Label>Program:</Form.Label>
                                <FormControl as="select" id="inputProgram" name="program" value={program} onChange={handleInputChange}>
                                    {programs.map((program) => (
                                        <option value={program}>{program}</option>
                                    ))}
                                </FormControl>
                            </Form.Group>
                            <Form.Group className="col-md-3">
                                <Form.Label>Matriculation number:</Form.Label>
                                <FormControl name="matricNumber" type="text" id="inputMatricNumber" placeholder="Matric Number" value={matricNumber} onChange={handleInputChange}/>
                            </Form.Group>
                            <Form.Group className="col-md-6">
                                <Form.Label>Graduation year:</Form.Label>
                                <FormControl as="select" id="inputGraduationYear" name="graduationYear" value={gradYear} onChange={handleInputChange}>
                                    {gradYears.map((year) => (
                                        <option value={year}>{year}</option>
                                    ))}
                                </FormControl>
                            </Form.Group>

                        </Form.Row>
                        <Button id="sign-up-button" className="btn btn-primary" type="submit">Sign Up</Button>
                    </Form>
                </Container>
            </>
        </Layout> 
    )
}

export default Signup;