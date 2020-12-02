import React, { useContext } from "react";
import {
  Row,
  Col,
  Card,
  CardTitle,
  //   CardText,
  // CardDeck,
  // CardSubtitle,
  CardBody,
  Button,
} from "reactstrap";
import {  sortCartByName } from "./utils/cartUtils";

import { CartContext } from "./CartContext";
// import Paypal from "./Paypal";
const cartPlusMinusBtns = (
  cartItem,
  updateCartPlus,
  updateCartMinus,
  updateCartRemove,
  cartStyle='COLLAPSED'
) => {
  let btnIconClass = "btn-icon-sm";
  if (cartStyle !== 'COLLAPSED') {
    btnIconClass = "btn-icon";
  }
  return (
    <span>
      <span>
      <i
        className={`fa fa-plus ${btnIconClass}`}
        onClick={() => updateCartPlus(cartItem.code)}
      ></i>
      <span className="px-1 pb-1 border-bottom">{cartItem.quantity}</span>
      <i
        className={`fa fa-minus ${btnIconClass}`}
        onClick={() => updateCartMinus(cartItem.code)}
      ></i>
    </span>
    <div
            className="small btn-remove"  
            onClick={() => updateCartRemove(cartItem.code)}
          >
            Remove
          </div>
    </span>
    
  );
};

export const cartCard=(cartItem,
  updateCartPlus,
  updateCartMinus,
  updateCartRemove,
  cartStyle='COLLAPSED')=>{
  switch (cartStyle){
    case 'FULLWIDTH':
        return(
          <Row key={'FULLWIDTH' + cartItem.code}>
          <Col>{cartItem.name}</Col>
          <Col>{cartItem.price}</Col>
          <Col>
            {" "}
            {cartPlusMinusBtns(
              cartItem,
              updateCartPlus,
              updateCartMinus,
              updateCartRemove,
              'COLLAPSED'
            )}
          </Col>
          <Col>
            {(
              parseFloat(cartItem.price.replace("$", "")) *
              cartItem.quantity
            ).toFixed(2)}
          </Col>
        </Row>
        )
    case 'EXPANDED':
      return (
        <Card className="sidebar-cards" key={cartItem.code}>
          <CardBody>
            <Row>
              <Col>
                <img
                    src={cartItem.image}
                    alt={cartItem.image} className='cart-img'/>
              </Col>
              <Col>
                <div>
                  {(
                    parseFloat(cartItem.price.replace("$", "")) *
                    cartItem.quantity
                  ).toFixed(2)}
                </div>
                <div>{cartItem.name}</div>
              </Col>
            </Row>
            <Row>
              <Col className="text-center">
                { cartPlusMinusBtns(cartItem,
                    updateCartPlus,
                    updateCartMinus,
                    updateCartRemove,
                    cartStyle)}
              </Col>
            </Row>
          </CardBody>
        </Card>)
    case 'COLLAPSED':
    default:
      return (
      <Card className="sidebar-cards" key={cartItem.code}>
        <CardBody>
          <Row>
            <Col>
              <img
                  src={cartItem.image}
                  alt={cartItem.image} className='cart-img'/>
            </Col>
          </Row>
          <Row>
            <Col className="text-center">
              { cartPlusMinusBtns(cartItem,
                  updateCartPlus,
                  updateCartMinus,
                  updateCartRemove,
                  cartStyle)}
            </Col>
          </Row>
        </CardBody>
      </Card>)
  }
  

}


const cartDynamic=(cart,
  updateCartPlus,
  updateCartMinus,
  updateCartRemove,
  cartStyle)=>{

  return  cart.map((cartItem, index) => {
    return cartCard(cartItem,
      updateCartPlus,
      updateCartMinus,
      updateCartRemove,
      cartStyle);
    
  });
  
}
const cartSummaryDynamic = (cart, cartStyle)=>{
  if(cart.length > 0){
    switch(cartStyle){
      
      case 'EXPANDED':
        return (
        <div className='cart-sidebar-summary'>
          <Card>
            <CardBody>
              <CardTitle>
                Estimated subtotal: ${cartTotalPrice(cart).toFixed(2)}
              </CardTitle>
              <Button
                className="mt-2 btn btn-prime pill w-100"
                onClick={() => console.log("Checkout")}
              >
                View Cart
              </Button>
            </CardBody>
          </Card>
        </div>)
      case 'COLLAPSED':
        default:
          return (
            <div className="cart-sidebar-summary">
        <Card>
          <div className=" d-flex flex-column align-items-center justify-content-center py-2">
            <i
              className="fa fa-shopping-cart"
              onClick={() => handleCartClick()}
            ></i>
  
            <div>
              <CartQuantity />
            </div>
            <div>
              <CartTotal />
            </div>
          </div>
        </Card>
      </div>
          )
    }
  
  }
}

const cartTotalPrice = (cart) => {
  return cart.reduce(
    (acc, curr) =>
      acc + parseFloat(curr.price.replace("$", "") * curr.quantity),
    0
  );
};
const cartTotalQuantity = (cart) => {
  return cart.reduce((acc, curr) => acc + curr.quantity, 0);
};
export const CartQuantity = () => {
  const [cart] = useContext(CartContext);

  return cartTotalQuantity(cart);
};
export const CartTotal = () => {
  const [cart] = useContext(CartContext);

  return <span>${cartTotalPrice(cart).toFixed(2)}</span>;
};

// export const CartSummary = () => {
//   const [cart] = useContext(CartContext);
//   const totalPrice = cartTotalPrice(cart);
//   const totalQuantity = cartTotalQuantity(cart);

//   return (
//     <Card className="mb-4">
//       <CardBody>
//         <Row>
//           <Col>
//             <CardTitle tag="h5">Cart Summary</CardTitle>
//           </Col>
//           <Col className="text-center">
//             <h6>items in cart: {totalQuantity}</h6>
//           </Col>
//           <Col className="text-center">
//             <h6>total price: {totalPrice.toFixed(2)}</h6>
//           </Col>
//         </Row>
//       </CardBody>
//     </Card>
//   );
// };
export const handleCartClick = () => {
  document.querySelector(".cart-fullwidth").classList.toggle("d-none");
  document.querySelector(".shop").classList.toggle("d-none");
};
const handleSidebarToggle = () => {
  document.querySelector(".cart-sidebar-expanded").classList.toggle("d-none");
  document.querySelector(".cart-sidebar-collapsed").classList.toggle("d-none");
};
const hideCart = () => {
  document.querySelector(".cart-sidebar-expanded").classList.add("d-none");
  document.querySelector(".cart-sidebar-collapsed").classList.add("d-none");
};

export const Cart = (props) => {
  const [cart, setCart] = useContext(CartContext);

  const updateCartPlus = (props) => {
    let match = cart.find((e) => e.code === props);

    match.quantity++;

    setCart(
      [
        ...cart.filter((product) => product.code !== props),
        match,
      ].sort((a, b) => sortCartByName(a, b))
    );
  };

  const updateCartMinus = (props) => {
    let match = cart.find((e) => e.code === props);

    if (match.quantity > 0) {
      match.quantity--;
    }

    setCart(
      [
        ...cart.filter((product) => product.code !== props),
        match,
      ].sort((a, b) => sortCartByName(a, b))
    );
  };

  const updateCartRemove = (props) => {
    setCart(cart.filter((product) => product.code !== props));
    if (cart.length === 0) {
      hideCart();
    }
  };

  let cartContent;
  let cartContentExpanded;
  let fullWidthCart;
  
  if (props.Format === "FULLWIDTH") {
    fullWidthCart = cartDynamic(
      cart,
      updateCartPlus,
      updateCartMinus,
      updateCartRemove,
      'FULLWIDTH'
    );
    return (
      <div className="cart-fullwidth d-none">
      <Card  >
        <CardBody>
          <CardTitle>
            Shopping Cart
          </CardTitle>
          {fullWidthCart}
          
        </CardBody>
      </Card>
      </div>
    )
  } else if (props.Format === "SIDEBAR") {
   
    cartContent = cartDynamic(
      cart,
      updateCartPlus,
      updateCartMinus,
      updateCartRemove,
      'COLLAPSED'
    );
    cartContentExpanded = cartDynamic(
      cart,
      updateCartPlus,
      updateCartMinus,
      updateCartRemove,
      'EXPANDED'
    );
  
const cartSummarySidebarCollapsed = cartSummaryDynamic(cart, 'COLLAPSED');
const cartSummarySidebarExpanded = cartSummaryDynamic(cart, 'EXPANDED');

  return (
    <div className="sidebar">
      <Card className="cart-sidebar-collapsed d-none">
        <CardBody>
          <CardTitle>
            <i
              className="fa fa-angle-left btn-round ml-auto"
              onClick={() => handleSidebarToggle()}
            ></i>
          </CardTitle>
          {cartContent}
          {cartSummarySidebarCollapsed}
        </CardBody>
      </Card>
      <Card className="cart-sidebar-expanded d-none">
        <CardBody>
          <CardTitle>
            <div className=" d-flex align-items-center">
              Shopping Cart
              <i
                className="fa fa-times btn-round ml-auto"
                onClick={() => handleSidebarToggle()}
              ></i>
            </div>
          </CardTitle>
          {cartContentExpanded}
          {cartSummarySidebarExpanded}
        </CardBody>
      </Card>
    </div>
  );
  }
};
