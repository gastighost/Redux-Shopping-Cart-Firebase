import { useDispatch } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../store/cart/cartSlice";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { item } = props;

  const addToCartHandler = () => {
    dispatch(
      addItemToCart({
        id: item.itemId,
        name: item.name,
        price: Number(item.itemPrice),
      })
    );
  };

  const removeFromCartHandler = () => {
    dispatch(removeItemFromCart(item.itemId));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{item.name}</h3>
        <div className={classes.price}>
          ${item.totalPrice.toFixed(2)}{" "}
          <span className={classes.itemprice}>
            (${item.itemPrice.toFixed(2)}/item)
          </span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{item.quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeFromCartHandler}>-</button>
          <button onClick={addToCartHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
