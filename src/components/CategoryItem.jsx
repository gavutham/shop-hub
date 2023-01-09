import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  flex: 1;
  margin: 5px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 25px;
`;

const Button = styled.button`
  border: none;
  background-color: white;
  color: gray;
  padding: 5px;
  font-weight: 600;
  font-size: 20px;
  cursor: pointer;
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CategoryItem = (props) => {
  return (
    <Container>
      <Image src={props.item.img} />
      <Info>
        <Title>{props.item.title}</Title>
        <Link to={"/products/" + props.item.cat}>
          <Button>Shop now</Button>
        </Link>
      </Info>
    </Container>
  );
};

export default CategoryItem;
