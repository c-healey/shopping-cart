import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Jumbotron,
  // Button,
} from "reactstrap";

import TopNav from "./TopNav";
import Products from "./Products";
import meijer from "./api/meijer";
import { CartProvider } from "./CartContext";
import { Cart } from "./Cart";

import { LoggedInProvider } from "./LoggedInContext";

class App extends Component {
  state = { products: [] };
  onLoadStore = async () => {
    const response = await meijer.get(`/products`, {});

    this.setState({ products: response.data });
  };

  componentDidMount() {
    this.onLoadStore();
  }
  render() {
    return (
      <LoggedInProvider>
        <CartProvider>
          <TopNav />
          <Jumbotron className="position-relative">
            <Container fluid>
              <Row>
                <Col className="col-lg-11">
                  <div className="shop">
                    <Products products={this.state.products} />
                  </div>
                  
                    <Cart Format="FULLWIDTH"  />
                  
                </Col>
              </Row>
            </Container>
          </Jumbotron>
          <Cart Format="SIDEBAR" />
          
        </CartProvider>
      </LoggedInProvider>
    );
  }
}

export default App;
