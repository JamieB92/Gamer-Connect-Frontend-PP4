import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"; 
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal"

import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const [show, setShow] = useState(false);

  useRedirect('loggedIn')

  const handleClose = () => {
    setShow(false);
    history.push("/signin");
  };
  const handleShow = () => setShow(true);


  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});

  const history = useHistory()

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      handleShow();
    } catch (err) {
      setErrors(err.response?.data);

    }
  };

  return (
    <Row className={styles.Row}>
      <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignUpCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={
            "https://res.cloudinary.com/dxxzc99pz/image/upload/v1701376374/pexels-soumil-kumar-735911_2_k5bxio.jpg"
          }
        />
      </Col>
      <Col className="my-auto py-2 p-md-2" md={6}>
        <Container className={`${appStyles.Content} p-4 `}>
          <h1 className={styles.Header}>sign up</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                className={styles.Input}
                type="text"
                placeholder="Enter Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, idx) =>
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}

            <Form.Group controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Password"
                name="password1"
                value={password1}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password1?.map((message, idx) =>
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}
            <Form.Group controlId="password2">
              <Form.Label className="d-none">Confirm Password</Form.Label>
              <Form.Control
                className={styles.Input}
                type="password"
                placeholder="Confirm Password"
                name="password2"
                value={password2}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password2?.map((message, idx) =>
              <Alert variant="warning" key={idx}>{message}</Alert>
            )}

            <Button className={`${btnStyles.btn}`} type="submit">
              Submit
            </Button>
            {errors.non_field_errors?.map((message, idx) =>
              <Alert variant="warning" className="mt-3" key={idx}>{message}</Alert>
            )}
          </Form>
        </Container>
        <Container className={`mt-3 ${appStyles.Content}`}>
          <Link className={styles.Link} to="/signin">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
          {/*Congratulations model on signup */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Congratulations and Welcome</Modal.Title>
          </Modal.Header>
          <Modal.Body>You have succesfully signed up to GamerConnect!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Please sign in with you credentials
            </Button>
          </Modal.Footer>
        </Modal>
      </Col>
    </Row>
  );
};

export default SignUpForm;