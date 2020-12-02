import { Row } from "reactstrap";
import ProductCard from "./ProductCard";

const productsInARow = 4;
const Products = (props) => {
  let products = props.products;
  let deck = [];
  let nextXProducts = null;
  let colWidth = `col-12 col-md-${12 / productsInARow}`;

  for (let i = 0; i < products.length; i += productsInARow) {
    nextXProducts = products.slice(i, i + productsInARow);
    deck.push(
      <Row className="mb-4" key={i}>
        {nextXProducts.map((product) => (
          <ProductCard
            product={product}
            colWidth={colWidth}
            key={product.code}
          />
        ))}
      </Row>
    );
  }

  return deck;
};
export default Products;
