import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import { addProduct, getCart, setInitial } from "./cartRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getCartCall = async (dispatch, id) => {
  try {
    const res = await userRequest.get("/cart/find/"+id);
    
    if (res.data != null) {
      const total = res.data.total
      const products = res.data.products;
      let Products = []
      products.forEach( async item => {
        const res = await publicRequest.get("/product/find/"+item.productId);
        const product = res.data
        Products = [...Products, {item, product }]
        if (products.length === Products.length) {
          const cart = {products: Products, quantity:products.length, total:total}
          dispatch(getCart(cart))
        }
      })
      
    } else {
      const cart = await userRequest.post("cart/", {userId:id})
      console.log(cart.data);
    }
    
  } catch(err){
    console.log(err);
  }
};

export const addProductCall = async (dispatch, product, id) => {
  dispatch(addProduct(product))
  var cartRes = await userRequest("/cart/find/"+id);
  if (cartRes.data === null) {
    cartRes = await userRequest.post("cart/", {userId:id})
  }
  const cartId = cartRes.data._id; 

  const prevProducts = cartRes.data.products
  const prevTotal = cartRes.data.total

  const newProduct = {productId:product.product._id, quantity: product.item.quantity, size: product.item.size, color: product.item.color }
  const neWtotal = prevTotal +  (product.item.quantity * product.product.price)

  const updated = await userRequest.put("/cart/"+cartId, {products:[...prevProducts, newProduct], total:neWtotal})
  console.log(updated);
}

export const afterCheckout = async (dispatch, id) => {
  dispatch(setInitial())
  const cartRes = await userRequest("/cart/find/"+id);
  const cartId = cartRes.data._id;
  const res = await userRequest.delete("cart/"+cartId);
  const cart = await userRequest.post("cart/", {userId:id})  
  console.log(res.data, cart.data);
}
