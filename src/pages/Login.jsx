import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { login } from "../redux/apiCall";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/4068314/pexels-photo-4068314.jpeg?auto=compress&cs=tinysrgb&w=600")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  padding: 20px;
  width: 30%;
  background-color: white;
  text-align: center;
  ${mobile({ width: "80%" })}
`;
const Title = styled.h1`
  font-size: 30px;
  font-weight: 400;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Input = styled.input`
  width: 80%;
  flex: 1;
  margin: 15px auto;
  padding: 10px;
`;
const Button = styled.button`
  width: 63.5%;
  padding: 10px;
  margin: 20px auto;
  border: 1px solid teal;
  background-color: white;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    background-color: teal;
    color: white;
  }
  &:disabled{
    cursor: not-allowed;
    background-color: gray;
  }
`;
const Link = styled.a`
  color: black;
  text-decoration: none;
  cursor: pointer;
  width: max-content;
  margin: 3px auto;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const {isFetching, error} = useSelector(state => state.user)


  const handleLogin = (event) => {
    event.preventDefault();
    login(dispatch, {email, password});
  };
  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <Form>
          <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} disabled={isFetching}>Login</Button>
          {error && <Error>Something Went Wrong...Please try again</Error>}
          <Link>Forgot Password</Link>
          <Link>Create Account</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
