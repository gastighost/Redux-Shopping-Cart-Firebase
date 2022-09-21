import classes from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleVisibility } from "../../store/ui/uiSlice";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const { totalQuantity } = useSelector((store) => store.cart);

  const toggleCartHandler = () => {
    dispatch(toggleVisibility());
  };

  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
