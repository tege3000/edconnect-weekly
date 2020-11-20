import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {
        Container,
        Form,
        Jumbotron,
        Row,
        Col,
        Button,
        ListGroup,
    } 
from 'react-bootstrap';
import Layout from "./shared/Layout";
const projectsUri = "/api/projects/";

const Project =  (props) => {
    const params = useParams();
    const viewProjectUri = projectsUri + params['id']; 
    console.log(viewProjectUri);
    const [projectName, setProjectName] = useState("");
    const [authors, setAuthors] = useState([""]);
    const [abstract, setAbstract] = useState("");
    const [tags, setTags] = useState([""]);
    const [createdBy, setCreatedBy] = useState("");

    useEffect(() => {
        fetch(viewProjectUri)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);

                setProjectName(data.name);
                setAuthors(data.authors);
                setAbstract(data.abstract);
                setTags(data.tags);
                setCreatedBy(data.createdBy);
            })
            .catch((error) => {
                console.log("ERROR", error);
            })  
    }, [])
    
    return  (
        <Layout>
            <Container>
                <h2 id="project_name">{projectName}</h2>

                <Jumbotron id="special-jumbotron">
                    <Row>
                        <Col md={3}>Created By: </Col>
                        <Col md={3}>Date Created: </Col>
                        <Col md={3}>Last Updated: </Col>
                        <Col md={3}>
                            <a href="editProject.html" className="btn btn-primary" type="button" id=
                            "project-btn">Edit Project</a> 
                        </Col>
                    </Row>

                    <Row>
                        <Col md={3}>
                            {createdBy}
                        </Col>
                        <Col md={3}>2020-03-03</Col>
                        <Col md={3}>2020-07-13</Col>
                    </Row>
                </Jumbotron>

                <Row class="row">
                    <Col md={6}>
                        <h4>Project Abstract</h4>
                        <p id ="project_abstract">
                            {abstract}
                        </p>

                        <Form>
                            <Form.Group>
                                <Form.Label for="comments">Comments:</Form.Label>
                                <Form.Control as="textarea" name="comments" id="comments" rows="6"/>
                            </Form.Group>

                            <Button className="btn btn-primary" type="submit">Submit</Button>
                        </Form>
                        <hr/>
                        <p className="text-center">
                            No comments added yet
                        </p>
                    </Col>

                    <Col md={6}>
                        <h4>Project Details</h4>
                        <ListGroup id="proj-details">
                            <ListGroup.Item className="bg-light">
                                <h6>Author(s)</h6>
                            </ListGroup.Item>
                            <div id="project_authors"> 
                                {authors.map((author) => (
                                    <ListGroup.Item>
                                        {author}
                                    </ListGroup.Item>
                                ))}
                            </div>
                            <ListGroup.Item id ="project_tags" className="bg-light">
                                {tags.map((tag) => (
                                    <span className="text-primary">{tag}</span>
                                ))}
                            </ListGroup.Item>
                        </ListGroup>
                        <br/>
                        <ListGroup>
                            <ListGroup.Item className="bg-light">
                                Project files
                            </ListGroup.Item>
                            <ListGroup.Item className="text-center">No file uploaded yet</ListGroup.Item>
                        </ListGroup>
                    </Col>

                </Row>
		    </Container>
        </Layout>
    )   
};

export default Project;