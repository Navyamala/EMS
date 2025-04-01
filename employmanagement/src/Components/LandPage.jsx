import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Row, Col, Image, Form, Card } from 'react-bootstrap';
import './Landing.css'; 
import logo from '../assets/logo.png';
import aboutImage from '../assets/about.png';
import featuresImage from '../assets/features.jpg';
import contactImage from '../assets/contact.jpg';
import benefitsImage from '../assets/benefits.jpg';

const Landing = () => {
    const scrollToSection = (id) => {
        window.location.hash = id;
    };

    return (
        <div className="landing-page-wrapper">
            {/* Navbar */}
            <Navbar expand="lg" bg="dark" variant="dark" className="shadow-lg fixed-top custom-navbar">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="brand-glow">
                        <img src={logo} alt="EMS Logo" width="60" height="60" className="d-inline-block align-top me-2 logo-larger" />
                        <span variant="primary" className="btn-glow btn-animated">EffiTrack</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => scrollToSection('home')} className="nav-link-custom">Home</Nav.Link>
                            <Nav.Link onClick={() => scrollToSection('about')} className="nav-link-custom">About</Nav.Link>
                            <Nav.Link onClick={() => scrollToSection('features')} className="nav-link-custom">Features</Nav.Link>
                            <Nav.Link onClick={() => scrollToSection('contact')} className="nav-link-custom">Contact</Nav.Link>
                        </Nav>
                        <Nav>
                            {/* Updated to route to /start */}
                            <Button as={Link} to="/start" variant="primary" className="btn-glow btn-animated">Login</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Home Section */}
            <div id="home" className="landing-container d-flex align-items-center home-gradient">
                <Container className="text-center text-white">
                    <h1 className="display-3 fw-bold hero-title">Empower Your Workforce with EMS</h1>
                    <p className="lead hero-subtitle">A revolutionary platform for streamlined employee management, payroll, and performance tracking.</p>
                    {/* Updated to route to /start */}
                    <Button as={Link} to="/start" variant="primary" size="lg" className="btn-glow btn-animated">Explore EMS</Button>
                </Container>
            </div>

            {/* About Section */}
            <Container id="about" className="about-page-container py-5">
                <h2 className="text-center fw-bold text-primary mb-5 section-heading">Discover the Power of EMS</h2>
                <Row className="align-items-center mb-5">
                    <Col lg={6} className="text-center text-lg-start">
                        <h3 className="fw-bold text-dark mb-3">What is EMS?</h3>
                        <p className="lead about-text">The Employee Management System (EMS) is an innovative HR solution designed to simplify and optimize your organization's human resource processes. From employee onboarding to performance evaluations, EMS provides a comprehensive suite of tools to manage your most valuable asset – your employees.</p>
                    </Col>
                    <Col lg={6} className="text-center">
                        <Image src={aboutImage} alt="About EMS" fluid rounded className="shadow-lg about-image" style={{ width: '400px', height: '300px' }} />
                    </Col>
                </Row>
            </Container>

            {/* Contact Section */}
            <Container id="contact" className="py-5 contact-container">
                <h2 className="text-center fw-bold text-info mb-5 section-heading">Get in Touch with Us</h2>
                <Row className="align-items-center">
                    <Col md={6} className="text-center">
                        <Image src={contactImage} alt="Contact Us" fluid rounded className="shadow-lg contact-image" style={{ width: '450px', height: '400px' }} />
                    </Col>
                    <Col md={6}>
                        <Card className="shadow-lg contact-form-card">
                            <Card.Body>
                                <h3 className="mb-4 fw-bold text-primary">We'd Love to Hear From You!</h3>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formName">
                                        <Form.Label className="form-label-custom">Your Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter your name" required className="form-control-custom" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formEmail">
                                        <Form.Label className="form-label-custom">Your Email</Form.Label>
                                        <Form.Control type="email" placeholder="Enter your email" required className="form-control-custom" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formMessage">
                                        <Form.Label className="form-label-custom">Message</Form.Label>
                                        <Form.Control as="textarea" rows={4} placeholder="Enter your message" required className="form-control-custom" />
                                    </Form.Group>
                                    <Button variant="info" type="submit" className="btn-glow btn-animated">Send Message</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Footer */}
            <footer className="bg-dark text-white py-4 text-center">
                <p>&copy; {new Date().getFullYear()} Employee Management System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Landing;
