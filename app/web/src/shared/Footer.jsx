import React from 'react';
import {
    Jumbotron,
} from 'react-bootstrap';

const Footer =  (props) => {
    return (
        <>
            <footer className="container" id="footer-el">
                <Jumbotron id="footer-jumbotron">
                    <p className="text-right text-muted" id="footer-text">Project Explorer &copy; 2020 <a href="mailto:teetoegeonu@gmail.com">Egeonu Tito</a></p>
                </Jumbotron>
            </footer> 
        </>
    )
}

export default Footer;