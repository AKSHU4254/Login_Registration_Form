import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import "../styles/login.css";

import userIcon from "../assets/images/user.png";

const Register = () => {
  const [username, setUserName] = useState("");
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();

    const data = { username, useremail, password, dob };

    try {
      const response = await Axios.post("http://localhost:4000/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.user && response.data.auth) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", JSON.stringify(response.data.auth));
        navigate("/");
      } else {
        alert("Fail to register")
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };


  useEffect(() => {
    const auth = localStorage.getItem("user");

    if (auth) {
      navigate("/");
    }
  });

  return (
    <section>
      <Container fluid>
        <Row>
          <Col className="login__container d-flex justify-content-center align-items-center">
            <div className="login__form">
              <div className="user">
                <img src={userIcon} alt="" />
              </div>

              <h2>Register</h2>

              <Form onSubmit={registerHandler}>
                <FormGroup className="input_field">
                  <i class="fa-solid fa-user"></i>
                  <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className="input_field">
                  <i class="fa-solid fa-cake-candles"></i>
                  <input
                    type="text"
                    placeholder="DOB DD-MM-YY"
                    name="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className="input_field">
                  <i class="fa-solid fa-envelope"></i>
                  <input
                    type="email"
                    placeholder="Email"
                    name="useremail"
                    value={useremail}
                    onChange={(e) => setUseremail(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup className="input_field">
                  <i class="fa-solid fa-lock"></i>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </FormGroup>
                <Button className="btn  auth__btn" type="submit">
                  Create Account
                </Button>
              </Form>
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;
