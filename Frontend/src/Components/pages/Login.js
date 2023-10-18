import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import userIcon from "../assets/images/user.png";

const Login = () => {
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("")
    const navigate = useNavigate();

    useEffect(() => {
      const auth = localStorage.getItem("user");
  
      if (auth) {
        navigate("/");
      }
    } );
  
    const loginHandle = async (e) => {
      e.preventDefault();
      
      try {
        const response = await axios.post("http://localhost:4000/login", {
          username,
          password
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        });
    
        const result = response.data;
    
        if (result.auth) {
          localStorage.setItem("user", JSON.stringify(result.user));
          localStorage.setItem("token", JSON.stringify(result.auth));
          navigate("/");
        } else {
          alert("Please enter the correct details");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

  return (
    <section>
      <Container fluid>
        <Row>
          <Col className="login__container d-flex justify-content-center align-item-center">
            <div className="login__form">
              <div className="user">
                <img src={userIcon} alt="" />
              </div>

              <h2>Login</h2>

              <Form onSubmit={loginHandle}>
                <FormGroup className="input_field">
                  <i class="fa-solid fa-user"></i>
                  <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
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
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                  />
                </FormGroup>
                <Button className="btn secondary__btn auth__btn" type="submit">
                  Login
                </Button>
              </Form>
              <p>
                Dont have an account? <Link to="/signup">Register</Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
