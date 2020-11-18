import React, {useState, useEffect} from 'react';
import Layout from "./shared/Layout";
import {
    Form,
    FormControl,
    Button,
    Container,
} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';

const projectsUri = "/api/projects/";


const CreateProject =  (props) => {
    let history = useHistory();

    const [projectName, setName] = useState("");
    const [abstract, setAbstract] = useState("");
    const [authors, setAuthors] = useState([""]);
    const [tags, setTags] = useState([""]);
    const [errors, setErrors] = useState([""]);


    const handleInputChange = (event) => {
        const {name, value} = event.target;
        switch(name) {
            case "projectName":
                setName(value);
            break;
            case "abstract":
                setAbstract(value);
            break;
            case "authors":
                setAuthors(value);
            break;
            case "tags":
                setTags(value);
            break;
        }
    }


    const handleSubmit = (event) => {
        event.preventDefault();

        let createProjectDetails = {
            "name" : projectName,
            "abstract" : abstract,
            "authors" : authors,
            "tags" : tags
        };

        fetch(projectsUri, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(createProjectDetails)
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
            
                if(data.status === "ok") {
                    history.push("/");
                }
                else {
                    setErrors(data.errors);
                }

            })
            .catch((error) => {
                console.log("ERROR", error);
            });

    }

    useEffect(() => {
        if(!document.cookie) {
            history.push("/login");
        } 
    })

    return  (
        <Layout>
            <Container id="small-main">
                {errors[0] !== "" ?
                    <div className = "alert alert-danger"> 
                        {errors.map((error) => (
                            <p>{error}</p>
                        ))}
                    </div>
                : null}
                <h2>Submit Project</h2>
                <Form id="createProjectForm" onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label for="project-name">Project Name:</Form.Label>
                        <FormControl name="name" type="text" id="project-name" placeholder="Project Name" value={projectName} onChange={handleInputChange}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label for="project-abstract">Project Abstract:</Form.Label>
                        <FormControl name="abstract" as="textarea" id="project-abstract" rows="8" value={abstract} onChange={handleInputChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label for="authors">Authors:</Form.Label>
                        <FormControl name="authors" type="text" id="authors" placeholder="Enter author names (separated by comma)" value={authors} onChange={handleInputChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label for="tags">Tag(s):</Form.Label>
                        <FormControl name="tags" type="text" id="tags" placeholder="Use # to tag with different topics (e.g. #javascript, #mongodb)" value={tags} onChange={handleInputChange}/>
                    </Form.Group>
                    <Button className="btn btn-primary" type="submit">Continue</Button>
                </Form>
            </Container>
        </Layout>
    )   
}

export default CreateProject;