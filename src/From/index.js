import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userPosts } from "../Redux/usersSlice";
import axios from "axios";
import { toast } from "react-toastify";
import "./style.scss";
const From = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [apiData, setApiData] = useState([]);
  console.log("api", apiData);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmpassword: "",
    webdesign: "",
    graphicsdesign: "",
    logodesign: "",
    others: "",
  });
  console.log(formData);
  const navigate = useNavigate();
  const validateForm = (formData) => {
    const errors = {};

    if (!formData.firstname) {
      errors.firstname = "Name is required";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      errors.email = "Invalid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password should be at least 6 characters";
    }
    return errors;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(userPosts(formData));
    navigate("/list");
    toast.success("Success message!");
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (formData.password === formData.confirmpassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  

    // console.log("status", responces.data);
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(formData));
  }, [formData]);
  return (
    <>
      <h2 className="heading">User Details From</h2>
      <div className="formbold-main-wrapper">
        <div className="formbold-form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="formbold-input-flex">
              <div>
                <label htmlFor="firstname" className="formbold-form-label">
                  {" "}
                  First name{" "}
                </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, firstname: e.target.value })
                  }
                  value={formData.firstname}
                  name="firstname"
                  id="firstname"
                  placeholder="Jane"
                  className="formbold-form-input"
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
              <div>
                <label htmlFor="lastname" className="formbold-form-label">
                  {" "}
                  Last name{" "}
                </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, lastname: e.target.value })
                  }
                  value={formData.lastname}
                  name="lastname"
                  id="lastname"
                  placeholder="Cooper"
                  className="formbold-form-input"
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
            </div>

            <div className="formbold-input-flex">
              <div>
                <label htmlFor="email" className="formbold-form-label">
                  {" "}
                  Mail{" "}
                </label>
                <input
                  type="email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  value={formData.email}
                  name="email"
                  id="email"
                  placeholder="jhon@mail.com"
                  className="formbold-form-input"
                />
                {errors.email && <span className="error">{errors.email}</span>}
              </div>
              <div>
                <label htmlFor="phone" className="formbold-form-label">
                  {" "}
                  Phone{" "}
                </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  value={formData.phone}
                  name="phone"
                  id="phone"
                  placeholder="(319) 555-0115"
                  className="formbold-form-input"
                />
                {errors.name && <span className="error">{errors.name}</span>}
              </div>
            </div>
            <div className="formbold-input-flex">
              <div>
                <label htmlFor="password" className="formbold-form-label">
                  {" "}
                  Password{" "}
                </label>
                <input
                  type="password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  value={formData.password}
                  name="password"
                  id="password"
                  placeholder="jhon@12345"
                  className="formbold-form-input"
                />
                {errors.password && (
                  <span className="error">{errors.password}</span>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="formbold-form-label">
                  {" "}
                  Confirm Password{" "}
                </label>
                <input
                  type="confirmpassword"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmpassword: e.target.value,
                    })
                  }
                  value={formData.confirmpassword}
                  name="confirmpassword"
                  id="confirmpassword"
                  placeholder="jhon@12345"
                  className="formbold-form-input"
                />
                {errors.confirmpassword && (
                  <span className="error">{errors.confirmpassword}</span>
                )}
              </div>
              {!passwordsMatch && (
                <p style={{ color: "red" }}>Passwords do not match.</p>
              )}
            </div>
            <div className="formbold-input-radio-wrapper">
              <label htmlFor="jobtitle" className="formbold-form-label">
                {" "}
                What are you looking for?{" "}
              </label>
              <div className="formbold-radio-flex">
                <div className="formbold-radio-group">
                  <label className="formbold-radio-label">
                    <input
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          webdesign: e.target.value,
                        })
                      }
                      className="formbold-input-radio"
                      type="radio"
                      name="jobtitle"
                      id="jobtitle"
                    />
                    Web Design
                    <span className="formbold-radio-checkmark" />
                  </label>
                </div>
                <div className="formbold-radio-group">
                  <label className="formbold-radio-label">
                    <input
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          graphicsdesign: e.target.value,
                        })
                      }
                      className="formbold-input-radio"
                      type="radio"
                      name="jobtitle"
                      id="jobtitle"
                    />
                    Graphics Design
                    <span className="formbold-radio-checkmark" />
                  </label>
                </div>
                <div className="formbold-radio-group">
                  <label className="formbold-radio-label">
                    <input
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          logodesign: e.target.value,
                        })
                      }
                      className="formbold-input-radio"
                      type="radio"
                      name="jobtitle"
                      id="jobtitle"
                    />
                    Logo Design
                    <span className="formbold-radio-checkmark" />
                  </label>
                </div>
                <div className="formbold-radio-group">
                  <label className="formbold-radio-label">
                    <input
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          others: e.target.value,
                        })
                      }
                      className="formbold-input-radio"
                      type="radio"
                      name="jobtitle"
                      id="jobtitle"
                    />
                    Others
                    <span className="formbold-radio-checkmark" />
                  </label>
                </div>
              </div>
            </div>
            <button className="formbold-btn" onClick={validateForm}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default From;
