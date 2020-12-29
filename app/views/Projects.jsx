import React from 'react';
import {Col} from 'react-bootstrap';

const Projects = ({projects}) => {
    return (
        <>
            {(projects.length === 0) || (projects === undefined) ?
                null
            : 
                projects.map((project, index) => (
                    <Col md={3}>
                        <div className="card mb-4 box-shadow">
                            <div className="card-body">
                                <a href={`/project/${project.id}`}><h4>{project.name}</h4></a>
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