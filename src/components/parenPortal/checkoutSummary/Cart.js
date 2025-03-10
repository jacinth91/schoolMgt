import React from "react";
import CartItem from "./CartItem";
import { Button } from "@mui/material";

const CartStep = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <>
              <CartItem />
            </>
          </div>
          <div className="col-md-4">
            <div className="card">
              <div className="card-body">
                <div className=" h4 text-center">Sub Total (1) Item</div>
                <div className="pt-3 py-4">
                  <Button className="w-100" variant="outlined">
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartStep;
