import React from 'react';
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


const Project =  ({projectName, authors, abstract, tags, projectAuthor, createdAt, updatedAt}) => {
    const CreatedAt = new Date(createdAt).toLocaleDateString()
    const UpdatedAt = new Date(updatedAt).toLocaleDateString()


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
                        <Col id="project_author"md={3}>
                            {projectAuthor}
                        </Col>
                        <Col md={3}>{CreatedAt}</Col>
                        <Col md={3}>{UpdatedAt}</Col>
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