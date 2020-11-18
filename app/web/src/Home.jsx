import React from 'react';
import {
    Button,
    Container,
    Row,
    Jumbotron,
} from 'react-bootstrap';
import Projects from './Projects';
import Layout from './shared/Layout';

const Home = (props) => {
    return (
        <Layout>
            <>
                <Container>
                    <Jumbotron>
                        <Container>
                            <h2>Welcome to Project Explorer</h2>
                            <p>
                                Project Explorer is a repository for final year projects across all departments at your institution. You can upload and search projects and learn from others.
                            </p>
                            <Button href="register.html" variant="primary">Get Started</Button>
                            <Button href="login.html" variant="secondary">Login</Button>
                        </Container>
                    </Jumbotron>

                    <div className="album">
                        <Container id="album-container">
                            <Row className="showcase">
                                <Projects type="getAllProjects" />
                            </Row>
                        </Container>
                    </div>
                </Container>
            </>
        </Layout>
            
    )
}

export default Home;