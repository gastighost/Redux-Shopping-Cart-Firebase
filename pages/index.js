import { useSelector } from "react-redux";

import Cart from "../components/Cart/Cart";
import Layout from "../components/Layout/Layout";
import Products from "../components/Shop/Products";

const Home = () => {
  const { cartIsVisible } = useSelector((store) => store.ui);

  return (
    <Layout>
      {cartIsVisible && <Cart />}
      <Products />
    </Layout>
  );
};

export default Home;
