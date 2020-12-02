import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import LoginHooks from "./LoginHooks";
import LogoutHooks from "./LogoutHooks";

import { CartQuantity, CartTotal, handleCartClick } from "./Cart";

const TopNav = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="nav-sticky">
      <Navbar color="secondary" dark expand="md">
        <NavbarBrand href="/">Meijer</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <LoginHooks />
              <LogoutHooks />
            </NavItem>
            <NavItem>
              <NavLink onClick={() => handleCartClick()}>
                <i className="fa fa-shopping-cart"></i>

                <span className="px-2">
                  <CartQuantity />
                </span>
                <span>
                  <CartTotal />
                </span>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default TopNav;
