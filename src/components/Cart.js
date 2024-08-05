import React, { useContext } from "react";
import empty from "../pictures/shopping-bag.png";
import "./Cart.css";
import { CartContext } from "./context/CartContext";

function Cart() {
  const { state, dispatch } = useContext(CartContext);

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: id });
  };

  const handleQuantityChange = (id, change) => {
    dispatch({ type: "CHANGE_QUNATITY", payload: { id, change } });
  };

  const TotalAmount = state.carts.reduce((accumulator, prd) => {
    return accumulator + prd.price * prd.quantity;
  }, 0);

  const handleClearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <div className="cart">
      {state.carts.length > 0 ? (
        <>
          <div className="bag">YOUR SHOPPING CART</div>
          <div className="prd-card">
            <div className="itm-head">Item</div>
            <div className="itm-head">Price</div>
            <div className="itm-head">Quantity</div>
            <div className="itm-head">Total</div>
          </div>
          {state.carts.map((prd) => {
            return (
              <div className="prd-cards" key={prd.id}>
                <div className="prd-img-div">
                  <img src={prd.thumbnail} alt={prd.title} className="prd-img" />
                  <div className="inside-prd-img">
                    <div className="brn">{prd.title}</div>
                    <div className="brnd">{prd.brand}</div>
                    <div className="rm" onClick={() => handleRemove(prd.id)}>
                      remove
                    </div>
                  </div>
                </div>

                <div className="prd-price">${prd.price}</div>

                <div className="quantity">
                  <button
                    onClick={() => handleQuantityChange(prd.id, -1)}
                    disabled={prd.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{prd.quantity}</span>
                  <button onClick={() => handleQuantityChange(prd.id, 1)}>
                    +
                  </button>
                </div>

                <div className="prd-sub">${prd.price * prd.quantity}</div>

                <div className="card-div-res" key={prd.id}>
                  <div className="prd-card-div1">
                    <img src={prd.thumbnail} alt={prd.title} className="prd-img" />
                    <div>
                      <div className="res-title">{prd.title}</div>
                      <div className="res-brand">{prd.brand}</div>
                      <div className="res-price">
                        ${prd.price * prd.quantity}
                      </div>
                      <div
                        className="res-remove"
                        onClick={() => handleRemove(prd.id)}
                      >
                        remove
                      </div>
                    </div>
                  </div>
                  <div className="quantitys">
                    <button
                      onClick={() => handleQuantityChange(prd.id, -1)}
                      disabled={prd.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{prd.quantity}</span>
                    <button onClick={() => handleQuantityChange(prd.id, 1)}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="tt-amount">
            <p>TotalAmount:</p>
            <p>${TotalAmount.toFixed(2)}</p>
          </div>
          <button className="clr-btn" onClick={handleClearCart}>
            Clear Cart
          </button>
        </>
      ) : (
        <div className="empty-cart">
          <div>YOUR CART IS EMPTY</div>
          <img src={empty} className="empty-bag" />
        </div>
      )}
    </div>
  );
}

export default Cart;
