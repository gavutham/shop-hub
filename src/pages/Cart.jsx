import React, { useEffect } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
// import StripeCheckout from "react-stripe-checkout";
// import { userRequest } from "../requestMethods";
import { Link, Navigate } from "react-router-dom";
import { afterCheckout, getCartCall } from "../redux/apiCall";
import { userRequest } from "../requestMethods";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 400;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: ${(props) => (props.Dis === true ? "no-drop" : "pointer")};
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

// const Toptexts = styled.div`
//   ${mobile({ display: "none" })}
// `;

// const Toptext = styled.span`
//   text-decoration: underline;
//   cursor: pointer;
//   margin: 0 10px;
// `;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;
const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  ${mobile({ margin: "auto" })}
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;
const ProductSize = styled.span``;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${mobile({ flexDirection: "row", justifyContent: "space-around" })}
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 20px" })}
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;
// const Hr = styled.hr`
//   border: none;
//   height: 2px;
//   background-color: #d4d4d4;
// `;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: fit-content;
`;
const SummaryTitle = styled.h1`
  font-weight: 300;
  margin-bottom: 15px;
`;
const SummaryItem = styled.div`
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: #fff;
  font-weight: 600;
  cursor: ${(props) => (props.Dis === true ? "no-drop" : "pointer")};
`;

const Cart = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  if (user === null) {
    return <Navigate to={"/login"} />;
  }

  const userId = user.others._id;

  useEffect(() => {
    getCartCall(dispatch, userId);
    console.log("done");
  }, []);

  const cart = useSelector((state) => state.cart);

  const handleCheckout = async () => {
    var products = [];
    cart.products.forEach((product) => {
      products.push({
        productId: product.product._id,
        quantity: product.item.quantity,
      });
    });
    const order = {
      userId: userId,
      products: products,
      amount: cart.total,
      address: "",
    };
    const res = await userRequest.post("/orders/", order);
    afterCheckout(dispatch, userId);
    alert("Order placed successfully!")
    console.log(res.data);
  };

  const disabled = cart.total === 0 ? true : false;

  // const [stripeToken, setStripeToken] = useState(null);
  // const history = useNavigate();

  // const onToken = (token) => {
  //   setStripeToken(token);
  // };

  // useEffect(() => {
  //   const makeRequest = async () => {
  //     try {
  //       console.log(1);
  //       const response = await userRequest.post("/checkout/payment", {
  //         tokenId: stripeToken.id,
  //         amount: cart.total,
  //       });
  //       console.log("success");
  //       history.push("/success", { data: response.data });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   stripeToken && makeRequest();
  // }, [stripeToken]);

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>Your Cart</Title>
        <Top>
          <Link to={"/"} style={{ textDecoration: "none", color: "inherit" }}>
            <TopButton>Continue Shopping</TopButton>
          </Link>
          {/* <Toptexts>
            <Toptext>Shopping Cart (2)</Toptext>
            <Toptext>Wishlist (0)</Toptext>
          </Toptexts> */}
          <TopButton type="filled" onClick={handleCheckout} Dis={disabled} disabled={disabled}>
            Checkout Now
          </TopButton>
        </Top>
        <Bottom>  
          <Info>
            {cart.products.map((product) => (
              <Product key={new Date().getTime()}>
                <ProductDetail>
                  <Image src={product.product.img} />
                  <Details>
                    <ProductName>
                      <b>Product: </b>
                      {product.product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID: </b>
                      {product.product._id}
                    </ProductId>
                    <ProductColor color={product.item.color} />
                    <ProductSize>
                      <b>Size: </b> {product.item.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <AddIcon style={{ cursor: "pointer" }} />
                    <ProductAmount>{product.item.quantity}</ProductAmount>
                    <RemoveIcon style={{ cursor: "pointer" }} />
                  </ProductAmountContainer>
                  <ProductPrice>
                    ₹ {product.product.price * product.item.quantity}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>Order Summary</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>₹ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Cost</SummaryItemText>
              <SummaryItemPrice>₹ 200</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Discount</SummaryItemText>
              <SummaryItemPrice>₹ -200</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>₹ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            {/* <StripeCheckout
              stripeKey=""
              name="ShopHub"
              image="https://upload.wikimedia.org/wikipedia/commons/8/8e/Shop.svg"
              billingAddress
              shippingAddress
              description={"Your total is " + cart.total}
              amount={cart.total * 100}
              token={onToken}
              currency="INR"
            > 
            </StripeCheckout> */}
            <Button onClick={handleCheckout} Dis={disabled} disabled={disabled}>Checkout</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
