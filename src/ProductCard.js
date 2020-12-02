import React, { useContext } from "react";
import {
  Col,
  Card,
  Button,
  CardImg,
  CardTitle,
  // CardText,
  // CardDeck,
  // CardSubtitle,
  CardBody,
} from "reactstrap";
import { sortCartByName, showCollapsedCart } from "./utils/cartUtils";
import { CartContext } from "./CartContext";
// import "./ProductCard.css";

const ProductCard = (props) => {
  const [cart, setCart] = useContext(CartContext);

  const addToCart = () => {
    let match = cart.find((e) => e.code === props.product.code);

    const product = {
      code: props.product.code,
      image: props.product.image,
      name: props.product.name,
      price: props.product.price,
      quantity: match ? match.quantity + 1 : 1,
    };
    match
      ? setCart(
          [
            ...cart.filter((product) => product.code !== match.code),
            product,
          ].sort((a, b) => sortCartByName(a, b))
        )
      : setCart((currentState) =>
          [...currentState, product].sort((a, b) => sortCartByName(a, b))
        );
    if (cart.length === 0) {
      showCollapsedCart();
    }
  };

  return (
    <Col className={props.colWidth} key={props.product.code}>
      <Card className="pill">
        <CardImg
          top
          width="100%"
          src={props.product.image}
          alt="Card image cap"
          className="pill"
        />
        <CardBody className="text-center">
          <CardTitle tag="h5">{props.product.name}</CardTitle>
          <div>Price: {props.product.price}</div>
          <div className="mb-3">Code: {props.product.code}</div>
          <Button className="w-100 pill btn-prime" onClick={addToCart}>
            Add to Cart
          </Button>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ProductCard;
