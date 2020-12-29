import React from 'react';
import {
    Form,
    FormControl,
    Button,
    Container,
} from 'react-bootstrap';
import Layout from './shared/Layout';

const Signup = ({programs, gradYears, errors}) => {

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
                                <FormControl name="firstname" type="text" id="inputFirstName" placeholder="First Name"/>
                            </Form.Group>
                            <Form.Group className="col-md-6">
                                <Form.Label>Last Name:</Form.Label>
                                <FormControl name="lastname" type="text" className="form-control" id="inputLastName" placeholder="Last Name"/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group className="col-md-6">
                                <Form.Label>Email Address:</Form.Label>
                                <FormControl name="email" type="email" id="inputEmailAddress" placeholder="Email Address"/>
                            </Form.Group>
                            <Form.Group className="col-md-6">
                                <Form.Label>Password:</Form.Label>
                                <FormControl name="password" type="password" id="inputPassword" placeholder="Password" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group className="col-md-3">
                                <Form.Label>Program:</Form.Label>
                                <FormControl as="select" id="inputProgram" name="program">
                                    {programs.map((program) => (
                                        <option value={program}>{program}</option>
                                    ))}
                                </FormControl>
                            </Form.Group>
                            <Form.Group className="col-md-3">
                                <Form.Label>Matriculation number:</Form.Label>
                                <FormControl name="matricNumber" type="text" id="inputMatricNumber" placeholder="Matric Number"/>
                            </Form.Group>
                            <Form.Group className="col-md-6">
                                <Form.Label>Graduation year:</Form.Label>
                                <FormControl as="select" id="inputGraduationYear" name="graduationYear">
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