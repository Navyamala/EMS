import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Row, Col, Form, Card } from 'react-bootstrap';
import './Landing.css';
import logo from '../assets/logo.png';
import contactImage from '../assets/contact.jpg';

const Landing = () => {
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="landing-page-wrapper">
            {/* Navbar */}
            <Navbar expand="lg" bg="dark" variant="dark" className="shadow-lg fixed-top custom-navbar">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="brand-glow">
                        <img src={logo} alt="EMS Logo" width="60" height="60" className="d-inline-block align-top me-2 logo-larger" />
                        <span className="btn-glow btn-animated">EffiTrack</span>
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
                    <Button as={Link} to="/start" variant="primary" size="lg" className="btn-glow btn-animated">Explore EMS</Button>
                </Container>
            </div>

            {/* About Section */}
            <Container id="about" className="about-page-container py-5">
                <h2 className="text-center fw-bold text-primary mb-5 section-heading">Discover the Power of EMS</h2>
                <Row className="align-items-center mb-5">
                    <Col>
                        <h3 className="fw-bold text-dark mb-3">What is EMS?</h3>
                        <p className="lead about-text">
                            EMS (Employee Management System) is your all-in-one digital HR toolkit designed to simplify employee lifecycle processes.
                            From hiring to exit formalities, EMS supports every step with automated workflows and secure data management.
                        </p>
                        <p className="lead about-text">
                            It enhances visibility across the organization by offering real-time updates, role-specific dashboards, and streamlined communication between HR, management, and employees.
                            With built-in compliance checks and smart alerts, EMS ensures accuracy, accountability, and peace of mind.
                        </p>
                        <p className="lead about-text">
                            Whether you're tracking performance, generating payroll, or storing confidential documents, EMS provides an intuitive, scalable, and cost-effective platform to do it all in one place.
                        </p>
                    </Col>
                </Row>
            </Container>

            {/* Features Section */}
            <Container id="features" className="py-5 features-container">
                <h2 className="text-center fw-bold text-success mb-5 section-heading">Key Features of EMS</h2>
                <Row>
                    <Col>
                        <ul className="lead features-list">
                            <li><strong>Centralized Employee Database:</strong> A single source of truth for all employee data, accessible anytime, anywhere.</li>
                            <li><strong>Custom Workflow Automation:</strong> Automate tasks like onboarding, approvals, and document generation with ease.</li>
                            <li><strong>Smart Attendance Monitoring:</strong> Integrates with biometric devices or mobile apps for real-time attendance updates.</li>
                            <li><strong>Payroll Integration:</strong> Generate accurate pay slips, handle tax calculations, and manage reimbursements in just a few clicks.</li>
                            <li><strong>Performance & Feedback:</strong> Set goals, provide 360-degree feedback, and track growth with visual progress charts.</li>
                            <li><strong>Leave Management:</strong> Empower employees to request leave, view balances, and receive approvals with transparency.</li>
                            <li><strong>Policy & Document Sharing:</strong> Seamlessly distribute company policies, notices, and training material.</li>
                            <li><strong>Advanced Analytics:</strong> Generate insightful reports for strategic decision-making and compliance audits.</li>
                            <li><strong>Multi-role Access:</strong> Provide tailored access to HRs, team leads, and employees while keeping data secure.</li>
                            <li><strong>Mobile Ready:</strong> Access and manage tasks on-the-go via mobile and tablet-friendly UI.</li>
                        </ul>
                    </Col>
                </Row>
            </Container>

            {/* Contact Section */}
            <Container id="contact" className="py-5 contact-container">
                <h2 className="text-center fw-bold text-info mb-5 section-heading">Get in Touch with Us</h2>
                <Row className="align-items-center">
                    <Col md={6} className="text-center">
                        <img src={contactImage} alt="Contact Us" className="shadow-lg contact-image" style={{ width: '450px', height: '400px', borderRadius: '8px' }} />
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
                <p>Designed & Developed with ❤️ by Team EffiTrack</p>
            </footer>
        </div>
    );
};

export default Landing;
