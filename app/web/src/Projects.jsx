import React, {useState, useEffect} from 'react';
import {Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
const projectsUri = "/api/projects/";

const Projects = (props) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch(projectsUri)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                // console.log(data);
                setProjects(data);
            })
            .catch((error) => {
                console.log("ERROR", error);
            })  
    }, [])

    return (
        <>
            {(projects.length == 0) || (projects === undefined) ?
                null
            : 
                projects.map((project, index) => (
                    <Col md={3}>
                        <div className="card mb-4 box-shadow">
                            <div className="card-body">
                                <Link to={`/project/${project.id}`}><h4>{project.name}</h4></Link>
                                {project.authors.map((author) => (<small key={author} className="text-muted">{author}</small>))}
                                <p className="card-text">{project.abstract}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="">
                                        {project.tags.map((tag) => (<span key={tag} className="text-primary">{tag}</span>))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                ))
            }
            
        </>
    )
}

export default Projects;