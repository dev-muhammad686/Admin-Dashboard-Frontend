import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { logInSchema } from "../../schemas";
import { Link, useNavigate } from 'react-router-dom';
import "./login.scss";
import { signIn } from "../../apiCalls";
import {useDispatch, useSelector} from "react-redux";
import { toast } from "react-toastify";

const initialValues = {
  username: "",
  password: "",
};

const LogIn = () => {
  // const [reRender, setRerender] = useState(false);
  // const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  const navigate = useNavigate();

  // const existingUser = useSelector(state => state.signIn.existingUser);

  // useEffect(() => {
  //   if (existingUser) {
  //     navigate("/"); // Redirect if user is logged in
  //   }
  // }, [existingUser, navigate]);


  const { values, errors, handleBlur, handleChange, touched, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: logInSchema,
      onSubmit: (values, action) => {
          signIn(dispatch, values, navigate);
          action.resetForm();
      }
      });
    
  return (
    <div className="container">
      <div className="wrapper">
        <h1 className="title">LOG IN</h1>
        <form className="form" onSubmit={handleSubmit}>
          <label className="label"  htmlFor="username">
            Username<p className="special">*</p>
          </label>
          <input className="input"
            type="text"
            id="username"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            // onChange={(e)=>setUsername(e.target.value)}
            placeholder="Enter your username"
          />
          {errors.username && touched.username ? (
            <p
              style={{
                color: "red",
                fontSize: "1rem",
              }}
            >
              {errors.username}
            </p>
          ) : null}

          <label className="label" htmlFor="password">
            Password<p className="special">*</p>
          </label>
          <input className="input"
            type="password"
            id="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            // onChange={(e)=>setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          {errors.password && touched.password ? (
            <p
              style={{
                color: "red",
                fontSize: "1rem",
              }}
            >
              {errors.password}
            </p>
          ) : null}


          <button className="button" aria-label="Submit Form" type="submit">
            LOG IN
          </button>
          {/* {user ? <Navigate to="/"/> : <Login/>} */}
          {/* {error && <Error>Something went wrong...</Error>} */}
          <a className="link">Forgot Password?</a>
        </form>
      </div>
    </div>
  );
};

export default LogIn;