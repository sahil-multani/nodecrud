import { useState } from "react";
import "./login.scss";
import { toast } from "react-toastify";
import axiosInstance from "../../api";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState({});
  const [isDisabled, setDisabled] = useState(true);
  /**
   *
   * @param {"email"|"password"} name
   * @returns
   */
  const handleChange = (name) => (event) => {
    // console.log({ event: event.target.value, name });
    let value = event.target.value;
    setForm({
      ...form,
      [name]: value,
    });

    validateOnChange(name, value);
  };

  const validateOnChange = (name, value) => {
    let err = { ...error };
    switch (name) {
      case "email": {
        let reg =
          /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/;

        if (reg.test(value)) {
          console.log("delete err", name, value);
          delete err[name];
        } else {
          let len = value.trim().length;
          if (len === 0) {
            err[name] = "this field is required";
          } else {
            err[name] = "invalid email";
          }
        }
        break;
      }
      case "password": {
        let len = value.trim().length;

        if (len === 0) {
          err[name] = "this field is required";
        } else {
          delete err[name];
        }
      }

      default:
        break;
    }

    let hasError = Object.keys(err).length > 0;
    setDisabled(hasError);
    setError(err);
  };

  const validateOnsubmit = (form) => {
    let keys = Object.keys(form);
    let err = {};
    for (let key of keys) {
      console.log({ key });
      if (!form[key].trim()) {
        err[key] = `this field is required`;
      }
    }
    console.log(err);
    let hasError = Object.keys(err).length > 0;
    setError(err);
    setDisabled(hasError);
    return !hasError;
  };

  const handleSubmit = async () => {
    try {
      if (validateOnsubmit(form)) {
        let res = await axiosInstance.post(
          "http://localhost:5000/user/login",
          form
        )
        // .then(aaa=>{console.log({aaa})})
        console.log(res)
        if (res?.data?.status) {
          console.log(res.data)
          // localStorage.setItem("token", res.data.data.token);
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
        // console.log(res.data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="wrapper">
        <form className="form-signin">
          <h2 className="form-signin-heading">User Login</h2>
          <div class="form-group">
            <label for="exampleInputEmail1">Email:</label>
            <input
              onChange={handleChange("email")}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small style={{ color: "red" }}>{error?.email}</small>
          </div>

          <div class="form-group my-1">
            <label for="exampleInputEmail1">Password:</label>
            <input
              onChange={handleChange("password")}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small style={{ color: "red" }}>{error?.password}</small>
          </div>
          <button
            className="btn btn-lg mt-2 btn-primary btn-block"
            type="button"
            style={{ width: "100%" }}
            disabled={isDisabled}
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};
export default Login;
