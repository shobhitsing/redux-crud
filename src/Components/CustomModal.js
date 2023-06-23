import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../Redux/fetchSlice";

import "./style.css";

const CustomModal = ({ id, showPopup, setShowPopup }) => {
  const dispatch = useDispatch();
  const { fetchData } = useSelector((state) => state?.fetchData);

  console.log(fetchData, "single");

  const singleUser = fetchData.filter((item) => item.id == id);
  console.log(singleUser, "name");

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <p>{singleUser[0].firstname}</p>
        <p>{singleUser[0].email}</p>
      </div>
    </div>
  );
};

export default CustomModal;
