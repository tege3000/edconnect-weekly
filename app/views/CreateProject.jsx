import React, {useState, useEffect} from 'react';
import Layout from "./shared/Layout";
import {
    Form,
    FormControl,
    Button,
    Container,
} from 'react-bootstrap';


const CreateProject =  ({errors, user}) => {

    return  (
        <Layout user={user}>
            <Container id="small-main">
                {errors !== "" ?
                    <div className = "alert alert-danger"> 
                        {errors.map((error) => (
                            <p>{error}</p>
                        ))}
                    </div>
                : null}
                <h2>Submit Project</h2>
                <Form id="createProjectForm" method="post" action="/projects/submit">
                    <Form.Group>
                        <Form.Label for="project-name">Project Name:</Form.Label>
                        <FormControl name="name" type="text" id="project-name" placeholder="Project Name"/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label for="project-abstract">Project Abstract:</Form.Label>
                        <FormControl name="abstract" as="textarea" id="project-abstract" rows="8"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label for="authors">Authors:</Form.Label>
                        <FormControl name="authors" type="text" id="authors" placeholder="Enter author names (separated by comma)"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label for="tags">Tag(s):</Form.Label>
                        <FormControl name="tags" type="text" id="tags" placeholder="Use # to tag with different topics (e.g. #javascript, #mongodb)"/>
                    </Form.Group>
                    <Button className="btn btn-primary" type="submit">Continue</Button>
                </Form>
            </Container>
        </Layout>
    )   
}

export default CreateProject;