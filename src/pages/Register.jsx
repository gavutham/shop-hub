import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { login } from "../redux/apiCall";
import { publicRequest } from "../requestMethods";
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
  width: 40%;
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
const Agreement = styled.span`
  font-size: 12px;
  width: 40%;
  margin: 5px auto 15px auto;
  ${mobile({ width: "70%" })}
`;
const Button = styled.button`
  width: 63.5%;
  padding: 10px;
  margin: auto;
  border: 1px solid teal;
  background-color: white;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    background-color: teal;
    color: white;
  }
  &:disabled {
    cursor: not-allowed;
    background-color: gray;
  }
`;

const Error = styled.span`
  color: red;
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      email: email,
      password: password,
    };
    const newUser = await publicRequest.post("auth/register", user);
    console.log(newUser);
    login(dispatch, { email, password });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Create an Account</Title>
        <Form>
          <Input
            type={"test"}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          ></Input>
          <Input
            type={"email"}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
          <Input
            type={"password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
          <Agreement>
            I hereby agree to the <b>Terms and Conditions</b> and{" "}
            <b>Privacy Policy</b>
          </Agreement>
          {error && <Error>Something Went Wrong...Please try again</Error>}
          <Button onClick={handleClick} disabled={isFetching}>
            Create Account
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
