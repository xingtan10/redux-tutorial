import { CartIcon } from "../icons";
import { useSelector } from "react-redux";

const Navbar = () => {
  //state.cart1 is the same as store.js
  const { amount } = useSelector((state) => state.cart1);
  // console.log(
  //   useSelector((state) => {
  //     console.log(state.cart1);
  //   })
  // );
  return (
    <nav>
      <div className="nav-center">
        <h3>redux toolkit</h3>
        <div className="nav-container">
          <CartIcon />
          {/* <Testing /> */}
          <div className="amount-container">
            <p className="total-amount">{amount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
