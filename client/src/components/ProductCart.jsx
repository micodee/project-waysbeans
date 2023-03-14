import React, { useState } from "react";

const ProductCart = (props) => {
  const { handleQty, handleTotal } = props;
  const [count, setCount] = useState(props.item.order_qty);

  const handleAdd = () => {
    setCount(count + 1);
    handleQty(1);
    handleTotal(1, props.product.price);
  };

  const handleLess = () => {
    if (count === 0) return;
    setCount(count - 1);
    handleQty(-1);
  };

  return (
    <div>
      <hr style={{ height: "2px", backgroundColor: "black" }} />
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex gap-3 align-items-center">
          <img
            src={`http://localhost:5001/uploads/${props.product.photo}`}
            alt="product"
            height={80}
            style={{ width: "80px" }}
          />
          <div>
            <h6 style={{ fontWeight: "900", color: "#613D2B" }}>
              {props.product.name}
            </h6>
            <div className="d-flex align-items-center gap-2">
              <span className="lessQty" onClick={handleLess}></span>
              <span
                style={{
                  backgroundColor: "#F6E6DA",
                  padding: "0rem .75rem",
                  borderRadius: "5px",
                }}
              >
                {count}
              </span>
              <span className="addQty" onClick={handleAdd}></span>
            </div>
          </div>
        </div>
        <div>
          <p>Rp.{props.product.price}</p>
          <div className="d-flex justify-content-end">
            <img
              src={`/img/crash.png`}
              alt="crash"
              height={20}
              style={{ width: "17px", cursor: "pointer" }}
              onClick={props.delete}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
