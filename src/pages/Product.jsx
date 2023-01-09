import React, { useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { Navigate, useLocation } from "react-router-dom";
import { publicRequest } from "../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { addProductCall } from "../redux/apiCall";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  background-color: #f0feff;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;
const ImageContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 80vh;
  object-fit: contain;
  ${mobile({ height: "40vh" })}
`;
const Info = styled.div`
  flex: 1;
  padding: 0 50px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 300;
`;
const Desc = styled.p`
  margin: 30px 0;
`;
const Price = styled.span`
  font-weight: 200;
  font-size: 40px;
`;
const FilterContainer = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
  margin: 30px 0;
  ${mobile({ width: "100%" })}
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 5px;
  cursor: pointer;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  justify-content: space-between;
  margin-top: 50px;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 50px;
  height: 30px;
  border: 1px solid teal;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
`;

const Button = styled.button`
  padding: 10px;
  border: 2px solid teal;
  background-color: #fff;
  cursor: pointer;

  &:hover {
    background-color: teal;
    color: white;
  }
`;

const Product = () => {
  const id = useLocation().pathname.split("/")[2];
  const user = useSelector((state) => state.user.currentUser);

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState();
  const [size, setSize] = useState();
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (user === null) {
      alert("log in to add the item to your cart")
      return <Navigate to="/login"/>
    }
    const userId = user.others._id;

    const item = { quantity, size, color };
    addProductCall(dispatch, { product, item }, userId);
    alert("Item added to cart");

  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await publicRequest.get("/product/find/" + id);
        setProduct(response.data);
        setColor(response.data.color[0]);
        setSize(response.data.size[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);
  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <ImageContainer>
          <Image src={product.img} />
        </ImageContainer>
        <Info>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>₹{product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color:</FilterTitle>
              {product.color &&
                product.color.map((c) => (
                  <FilterColor color={c} key={c} onClick={() => setColor(c)} />
                ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size &&
                  product.size.map((s) => (
                    <FilterSizeOption key={s}>{s}</FilterSizeOption>
                  ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <RemoveIcon
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                style={{ cursor: "pointer" }}
              />
              <Amount>{quantity}</Amount>
              <AddIcon
                onClick={() => setQuantity(quantity + 1)}
                style={{ cursor: "pointer" }}
              />
            </AmountContainer>
            <Button onClick={handleAdd}>Add to Cart</Button>
          </AddContainer>
        </Info>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
