import React, { useState, useContext, useEffect } from "react";
import { useHistory, NavLink, Redirect } from "react-router-dom";
import UserContext from "../context/UserContext";
// import { Form, FormGroup, FormText, Input, Button, Label } from "reactstrap";

/** Form for logging in. */

function LoginForm({ login }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState([]);
  const { currentUser } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = await login(formData);
    if (result.success) {
      history.push("/profile");
    } else {
      setFormErrors(result.errors);
    }
  };

  if (currentUser) return <Redirect to="/profile" />;
  return (
    <div className="LoginForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="mb-3">Log In</h3>
        <div className="LoginForm-errors alert alert-danger"></div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-primary float-right">Login</button>
        </form>
        <p className="mt-3">
          New to UrGuide? <NavLink to="/signup">Sign Up</NavLink>
        </p>
      </div>
    </div>
  );
}

// function LoginForm({ login }) {
//   const initialState = {
//     username: "",
//     password: "",
//   };

//   const [formData, setFormData] = useState(initialState);
//   const [error, setError] = useState([]);
//   const [success, setSuccess] = useState(null);
//   const { currentUser } = useContext(UserContext);
//   const history = useHistory();

//   React.useEffect(() => {
//     console.debug(
//       "LoginForm useEffect",
//       "login=",
//       typeof login,
//       "currentUser=",
//       currentUser,
//       "formData=",
//       formData
//     );
//   }, [currentUser, formData, login]);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     let result = await login(formData);
//     if (result === success) {
//       setSuccess(true);
//       setFormData(initialState);
//       history.push("/profile");
//     } else {
//       setSuccess(false);
//       setError(result);
//     }
//   }

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setFormData((f) => ({ ...f, [name]: value }));
//   }

//   return (
//     <div className="LoginForm">
//       <div className="container col-md-6">
//         <h3 className="mt-3">Log In</h3>

//         <div className="card">
//           <div className="card-body">
//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label>Username</label>
//                 <input
//                   name="username"
//                   className="form-control"
//                   value={formData.username}
//                   onChange={handleChange}
//                 />
//               </div>
//               <div className="form-group">
//                 <label>Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   className="form-control"
//                   value={formData.password}
//                   onChange={handleChange}
//                 />
//               </div>
//               <button
//                 className="btn btn-primary float-left mt-3"
//                 onSubmit={handleSubmit}
//               >
//                 Submit
//               </button>
//               <div className="mt-3">
//                 <NavLink to="/signup" activeClassName="active">
//                   Sign up
//                 </NavLink>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
//}

export default LoginForm;
