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
import { sortCartByName } from "./utils/cartUtils";

import { CartContext } from "./CartContext";
// import Paypal from "./Paypal";
const cartPlusMinusBtns = (
  code,
  quantity,
  updateCartPlus,
  updateCartMinus,
  expanded
) => {
  let btnIconClass = "btn-icon";
  if (expanded !== true) {
    btnIconClass = "btn-icon-sm";
  }
  return (
    <span>
      <i
        className={`fa fa-plus ${btnIconClass}`}
        onClick={() => updateCartPlus(code)}
      ></i>
      <span className="px-1 pb-1 border-bottom">{quantity}</span>
      <i
        className={`fa fa-minus ${btnIconClass}`}
        onClick={() => updateCartMinus(code)}
      ></i>
    </span>
  );
};

const cartBody = (cart, updateCartPlus, updateCartMinus, updateCartRemove) => {
  return cart.map((shoppingList, index) => {
    return (
      <Row key={index + shoppingList.code}>
        <Col>{shoppingList.name}</Col>
        <Col>{shoppingList.price}</Col>
        <Col>
          {" "}
          {cartPlusMinusBtns(
            shoppingList.code,
            shoppingList.quantity,
            updateCartPlus,
            updateCartMinus
          )}
        </Col>
        <Col>
          {(
            parseFloat(shoppingList.price.replace("$", "")) *
            shoppingList.quantity
          ).toFixed(2)}
        </Col>
      </Row>
    );
  });
};
const cartSidebar = (
  cart,
  updateCartPlus,
  updateCartMinus,
  updateCartRemove,
  Expanded
) => {
  return cart.map((shoppingList, index) => {
    let expandedContent1 = "";
    let expandedContent2 = "";
    if (Expanded === true) {
      expandedContent1 = (
        <Col>
          <div>
            {(
              parseFloat(shoppingList.price.replace("$", "")) *
              shoppingList.quantity
            ).toFixed(2)}
          </div>
          <div>{shoppingList.name}</div>
        </Col>
      );
    }
    expandedContent2 = (
      <Row>
        <Col className="text-center">
          {cartPlusMinusBtns(
            shoppingList.code,
            shoppingList.quantity,
            updateCartPlus,
            updateCartMinus,
            Expanded
          )}

          <div
            className="small btn-remove"
            onClick={() => updateCartRemove(shoppingList.code)}
          >
            Remove
          </div>
        </Col>
      </Row>
    );

    return (
      <Card className="sidebar-cards" key={index + shoppingList.code}>
        <CardBody>
          <Row>
            <Col>
              <img
                src={shoppingList.image}
                alt={shoppingList.name}
                style={{ width: "80px", height: "80px" }}
              />
            </Col>
            {expandedContent1}
          </Row>
          {expandedContent2}
        </CardBody>
      </Card>
    );
  });
};
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

export const CartSummary = () => {
  const [cart] = useContext(CartContext);
  const totalPrice = cartTotalPrice(cart);
  const totalQuantity = cartTotalQuantity(cart);

  return (
    <Card className="mb-4">
      <CardBody>
        <Row>
          <Col>
            <CardTitle tag="h5">Cart Summary</CardTitle>
          </Col>
          <Col className="text-center">
            <h6>items in cart: {totalQuantity}</h6>
          </Col>
          <Col className="text-center">
            <h6>total price: {totalPrice.toFixed(2)}</h6>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};
export const handleCartClick = () => {
  document.querySelector(".cart").classList.toggle("d-none");
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
  let cartPosition = "";
  let checkoutBtnPosition = "";
  if (props.Format === "ROW") {
    cartContent = cartBody(
      cart,
      updateCartPlus,
      updateCartMinus,
      updateCartRemove
    );
  } else if (props.Format === "SIDEBAR") {
    cartPosition = "sidebar";
    checkoutBtnPosition = "cart-sidebar-summary";
    cartContent = cartSidebar(
      cart,
      updateCartPlus,
      updateCartMinus,
      updateCartRemove,
      false
    );
    cartContentExpanded = cartSidebar(
      cart,
      updateCartPlus,
      updateCartMinus,
      updateCartRemove,
      true
    );
  }

  const buttonExpanded = cart.length ? (
    <div className={checkoutBtnPosition}>
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
    </div>
  ) : (
    ""
  );
  const button = cart.length ? (
    <div className={checkoutBtnPosition}>
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
  ) : (
    ""
  );

  return (
    <div className={cartPosition}>
      <Card className="cart-sidebar-collapsed d-none">
        <CardBody>
          <CardTitle>
            <i
              className="fa fa-angle-left btn-round ml-auto"
              onClick={() => handleSidebarToggle()}
            ></i>
          </CardTitle>
          {cartContent}
          {button}
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
          {buttonExpanded}
        </CardBody>
      </Card>
    </div>
  );
};
