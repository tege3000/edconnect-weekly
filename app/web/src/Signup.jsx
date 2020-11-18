import React, {useState, useEffect} from 'react';
import {
    Form,
    FormControl,
    Button,
    Container,
} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import Layout from './shared/Layout';

const programsUri = "/api/programs/";
const graduationYearsUri = "/api/graduationYears/";
const registerUri = "/api/register/";

const Signup = (props) => {
    let history = useHistory();
    const [programs, fillPrograms] = useState(["Computer Science", "Mass Comm", "Law"]);
    const [gradYears, fillGradYears] = useState(["2020", "2019", "2018", "2017", "2016"]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [matricNumber, setMatricNumber] = useState("");
    const [program, setProgram] = useState(programs[0]);
    const [gradYear, setGradYear] = useState(gradYears[0]);
    const [errors, setErrors] = useState([""]);

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

    const handleSubmit = (event) => {
        event.preventDefault();

        let signUpDetails = { 
            "firstname": firstName,
            "lastname": lastName,
            "email": email,
            "password": password,
            "matricNumber": matricNumber,
            "program": program,
            "graduationYear": gradYear 
        };

        fetch(registerUri, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(signUpDetails)
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if(data.status === "ok") {
                    let key = "uid";
                    let value = data.data.id;
                    document.cookie = `${key}= ${value}; path=/`;

                    history.push("/");
                }
                else {
                    setErrors(data.errors);
                }       
            })
            .catch((error) => {
                // handling errors
                console.log("ERROR:", error);
            });
        
    }

    useEffect(() => {
        fetch(programsUri)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                fillPrograms(data);
            })
            .catch((error) => {
                console.log("ERROR", error);
            })  
    }, [])

    useEffect(() => {
        fetch(graduationYearsUri)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                fillGradYears(data);
            })
            .catch((error) => {
                console.log("ERROR", error);
            })  
    }, [])

    return (
        <Layout>
            <>
                <Container id="medium-main">
                    {errors[0] !== "" ?
                        <div className = "alert alert-danger"> 
                            {errors.map((error) => (
                                <p>{error}</p>
                            ))}
                        </div>
                    : null}
                    <Form id="signupForm" onSubmit={handleSubmit} noValidate>
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