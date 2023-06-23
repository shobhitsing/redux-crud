import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateData } from "../Redux/updateSlice";
import { toast } from "react-toastify";
import axios from "axios";
import "./style.css";
import { useDispatch } from "react-redux";

const Edit = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  console.log("data", data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/posts/${id}`);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/posts/${id}`,
        data
      );
    } catch (error) {
      console.error("Error updating data:", error);
    }
    toast.success("Updata Data Success message!");
    navigate("/list");
  };

  return (
    <>
      <div className="container" style={{ backgroundColor: "#697c37" }}>
        <div className="row">
          <div className="col-md-5 mr-auto">
            <h3 className="mb-3">Update Data </h3>
            <p style={{ color: "white" }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Recusandae sequi, ipsa hic alias officia facilis eveniet, neque
              laborum cumque maxime soluta. Neque atque necessitatibus ipsam
              sequi soluta magni, iste vero fuga inventore, explicabo totam quis
              quia nemo possimus cupiditate doloribus?
            </p>
            <p style={{ color: "white" }}>
              Quasi optio numquam pariatur amet laudantium, dicta ullam
              obcaecati nihil eveniet et aperiam beatae illum vitae in
              asperiores, a ex. Voluptates accusantium, beatae dolorem natus
              delectus nostrum, iusto nemo optio quas eum, quis a in
              reprehenderit totam, sequi distinctio impedit.
            </p>
            <p style={{ color: "white" }}>
              Dolor aliquid, commodi vitae dolorum veniam amet error! Nemo nam
              quibusdam delectus dolore eveniet officia harum eum sit magnam
              possimus. Eum optio dolores repellat ea impedit, in unde, rem
              ipsam rerum autem iusto vero facilis blanditiis explicabo sapiente
              consequatur provident? <a href="#">sshobhit479@gmail.com</a>
            </p>
          </div>
          <div className="col-md-6">
            <div className="box">
              <h3 className="heading">Update Data</h3>
              <form
                className="mb-5"
                onSubmit={handleSubmit}
                method="post"
                id="contactForm"
                name="contactForm"
              >
                <div className="row">
                  <div className="col-md-12 form-group">
                    <label htmlFor="name" className="col-form-label">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={data?.firstname}
                      onChange={(e) =>
                        setData({
                          ...data,
                          firstname: e.target.value,
                        })
                      }
                      className="form-control"
                      name="name"
                      id="name"
                      placeholder="Your name"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 form-group">
                    <label htmlFor="email" className="col-form-label">
                      Email *
                    </label>
                    <input
                      type="text"
                      value={data?.email}
                      onChange={(e) =>
                        setData({
                          ...data,
                          email: e.target.value,
                        })
                      }
                      className="form-control"
                      name="email"
                      id="email"
                      placeholder="Your email address"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 form-group">
                    <label htmlFor="message" className="col-form-label">
                      Phone *
                    </label>
                    <input
                      type="text"
                      value={data?.phone}
                      onChange={(e) =>
                        setData({
                          ...data,
                          phone: e.target.value,
                        })
                      }
                      className="form-control"
                      name="phone"
                      id="phone"
                      placeholder="Your phone address"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 form-group">
                    <label htmlFor="message" className="col-form-label">
                      Degisation *
                    </label>
                    <input
                      type="text"
                      value={data?.graphicsdesign}
                      onChange={(e) =>
                        setData({
                          ...data,
                          graphicsdesign: e.target.value,
                        })
                      }
                      className="form-control"
                      name="degisation"
                      id="degisation"
                      placeholder="Your degisation "
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <input
                      type="submit"
                      defaultValue="Send Message"
                      className="btn btn-block btn-primary rounded-0 py-2 px-4"
                    />
                    <span className="submitting" />
                  </div>
                </div>
              </form>
              <div id="form-message-warning mt-4" />
              <div id="form-message-success">
                Your message was sent, thank you!
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
