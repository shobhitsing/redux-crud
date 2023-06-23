import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";

import { fetchProducts } from "../store/productSlice";

const Products = () => {
  const dispatch = useDispatch();
  const [renderData, setRenderData] = useState([]);
  const [filter, setFilter] = useState([]);
  const { data: products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
    setRenderData(products);
  }, [products]);

  const handleAdd = (product) => {
    dispatch(add(product));
  };
  const handelInputChange = (e) => {
    const _products = renderData;
    const data = _products.filter((items) => {
      return items?.title?.toLowerCase().includes(e.target.value);
    });
    console.log(data, "mydata");
    setFilter(data);
    setRenderData(data);
    return data;
  };
  console.log("filter", filter);

  return (
    <>
      <div className="style" style={{ height: "50px", width: "40px" }}>
        <input
          type="text"
          placeholder="Search..."
          onChange={handelInputChange}
        />
      </div>
      {filter.length == 0 ? (
        <div className="productsWrapper">
          {renderData.map((product, i) => (
            <div className="card" key={i}>
              <img src={product.image} alt="" />
              <h4>{product.title}</h4>
              <h5>{product.price}</h5>
              <button onClick={() => handleAdd(product)} className="btn">
                Add to favourite
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="productsWrapper">
          {filter.map((product, i) => (
            <div className="card" key={i}>
              <img src={product.image} alt="" />
              <h4>{product.title}</h4>
              <h5>{product.price}</h5>
              <button onClick={() => handleAdd(product)} className="btn">
                Add to favourite
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Products;
