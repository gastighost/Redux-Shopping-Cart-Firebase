import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: "p1",
    price: 6,
    title: "My first book",
    description: "My first book ever",
  },
  {
    id: "p2",
    price: 5,
    title: "My second book",
    description: "The second book I've written",
  },
];
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((item, index) => {
          return <ProductItem key={index} item={item} />;
        })}
      </ul>
    </section>
  );
};

export default Products;
