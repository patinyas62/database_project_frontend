import React, { Component } from 'react'
import './Navbar.scss'
import {Container,Nav,Navbar} from 'react-bootstrap'

export default class Navbarr extends Component {

    constructor(props){
        super(props);
        this.state = {
            setCount: 0
        }
    }

    render() {
        return (
            <div>
                <Navbar className="bgg" variant="light">
                    <Container>
                    <Navbar.Brand href="/">EnronEmail</Navbar.Brand>
                    <Nav className="me-auto">
                    <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                    {/* <Nav.Link href="#features">Features</Nav.Link> */}
                    
                    </Nav>
                    </Container>
                </Navbar>
            </div>
            
        )
    }
}

