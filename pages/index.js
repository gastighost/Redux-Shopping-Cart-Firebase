import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartData, sendCartData } from "../store/cart/cartSlice";

import Cart from "../components/Cart/Cart";
import Layout from "../components/Layout/Layout";
import Products from "../components/Shop/Products";
import Notification from "../components/UI/Notification";

let isInitial = true;
const Home = () => {
  const dispatch = useDispatch();
  const { cartIsVisible } = useSelector((store) => store.ui);
  const cart = useSelector((store) => store.cart);
  const { notification } = useSelector((store) => store.ui);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.fetched) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
};

export default Home;
