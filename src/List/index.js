import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CustomModal from "../Components/CustomModal";
import { Link } from "react-router-dom";
import { fetchPosts } from "../Redux/fetchSlice";
import "./css/style.css";

const List = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  console.log(id, "iddd");
  const { fetchData, loading } = useSelector((state) => state?.fetchData);
  console.log(fetchData, "dsddsd");
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  // if (loading) {
  //   return <h2>Loading...</h2>;
  // }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/posts/${id}`);
      dispatch(fetchPosts());
    } catch (error) {
      console.log("this is error");
    }
  };

  return (
    <>
      <section className="intro">
        <div className="">
          <div className="mask d-flex">
            <div className="container">
              <div className="row justify-content-center">
                <h4 style={{ color: "green" }}>Data List For All Users</h4>
                {showPopup && (
                  <CustomModal
                    id={id}
                    showPopup={showPopup}
                    setShowPopup={setShowPopup}
                  />
                )}
                <div className="col-12">
                  <div
                    className="card shadow-2-strong"
                    style={{ backgroundColor: "#f5f7fa" }}
                  >
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-borderless mb-0">
                          <thead>
                            <tr>
                              <th scope="col">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="checkbox"
                                    defaultValue=""
                                    id="flexCheckDefault"
                                  />
                                </div>
                              </th>
                              <th scope="col">Name</th>
                              <th scope="col">Email</th>
                              <th scope="col">Phone</th>
                              <th scope="col">Designation</th>
                              <th scope="col">View</th>
                              <th scope="col">Edit</th>
                              <th scope="col">Delete</th>
                            </tr>
                          </thead>
                          <tbody>
                            {fetchData &&
                              fetchData.map((item) => {
                                return (
                                  <tr key={item.id}>
                                    <th scope="row">
                                      <div className="form-check">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          defaultValue=""
                                          id="flexCheckDefault7"
                                          defaultChecked=""
                                        />
                                      </div>
                                    </th>
                                    <td>{item.firstname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.webdesign}</td>
                                    <td>
                                      <button
                                        onClick={() => [
                                          setId(item.id),
                                          setShowPopup(true),
                                        ]}
                                        type="button"
                                        className="btn btn-success btn-sm px-3"
                                      >
                                        <i className="fa fa-eye" />
                                      </button>
                                    </td>
                                    <td>
                                      <Link to={`/edit/${item.id}`}>
                                        <button
                                          type="button"
                                          className="btn btn-info btn-sm px-3"
                                        >
                                          <i className="fa fa-edit" />
                                        </button>
                                      </Link>
                                    </td>
                                    <td>
                                      <button
                                        onClick={() => handleDelete(item.id)}
                                        type="button"
                                        className="btn btn-danger btn-sm px-3"
                                      >
                                        <i className="fas fa-times" />
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default List;
