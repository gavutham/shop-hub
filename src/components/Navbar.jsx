import React from "react";
import styled from "styled-components";
// import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px", width: "100vw" })};
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0" })};
`;

// const Left = styled.div`
//   flex: 1;
//   display: flex;
//   align-items: center;
// `;

// const Language = styled.span`
//   font-size: 14px;
//   cursor: pointer;
//   ${mobile({display: 'none'})}
// `;

// const SearchBox = styled.div`
//   align-items: center;
//   border: 1px solid lightgray;
//   display: flex;
//   margin-left: 25px;
//   padding: 5px;
// `;

// const Input = styled.input`
//   border: none;
//   ${mobile({width: '50px'})}
// `;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, marginRight: "15px" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 30px;
  ${mobile({ fontSize: "10px", marginLeft: "10px" })}
`;

const Center = styled.div`
  flex: 1;
  ${mobile({ marginLeft: "10px" })}
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const quantity = useSelector((state) => state.cart.quantity);
  return (
    <Container>
      <Wrapper>
        <Center>
          <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
            <Logo>ShopHub</Logo>
          </Link>
        </Center>
        <Right>
          {user === null ? (
            <>
              <Link
                to={"/login"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem>Log in</MenuItem>
              </Link>
              <Link
                to={"/register"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem>Register</MenuItem>
              </Link>
            </>
          ) : (
            <>
              <Link
                to={"/logout"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MenuItem>Log out</MenuItem>
              </Link>
              <Link to="/cart">
                <MenuItem>
                  <Badge badgeContent={quantity} color="primary">
                    <ShoppingCartOutlinedIcon />
                  </Badge>
                </MenuItem>
              </Link>
            </>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
