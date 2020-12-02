
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
// import {cartCardCollapsed} from '../templates/cart-templates';
const cartCardCollapsed = `
  <Card className="sidebar-cards" key='%%CODE%%'>
    <CardBody>
      <Row>
        <Col>
                <img
                    src='%%IMAGE%%'
                    alt='%%NAME%%' className='cart-img'/>
          </Col>
        </Row>
        <Row>
        <Col className="text-center">
                %%PLUSMINUS%%
                <div class="small btn-remove">Remove</div>
            
        </Col>
    </Row>
  </CardBody>
</Card>`;

export const sortCartByName = (a, b) => {
  if (a.name < b.name) {
    return -1;
  } else if (a.name > b.name) {
    return 1;
  } else return 0;
};

export const showCollapsedCart = () => {
  
  document.querySelector(".cart-sidebar-collapsed").classList.remove("d-none");
};

