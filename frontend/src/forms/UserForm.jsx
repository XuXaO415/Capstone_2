// import React, { useState, useEffect, Component } from "react";
// import UrGuideApi from "../api";
// import { BrowserRouter as Router, Link, Route } from "react-router-dom";
// import UserContext from "../context/UserContext";
// import jwt from "jsonwebtoken";
// class Forms extends Component {
//   static contextType = UserContext;
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: "",
//       password: "",
//       firstName: "",
//       lastName: "",
//       email: "",
//       city: "",
//       country: "",
//       zipCode: "",
//       imageUrl: "",
//       hobbies: "",
//       interests: "",
//       errors: [],
//       signup: false,
//       currentUser: null,
//       infoLoaded: false,
//       potentialMatches: [],
//     };
//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.setCurrentUser = this.setCurrentUser.bind(this);
//     this.setInfoLoaded = this.setInfoLoaded.bind(this);
//     this.setPotentialMatches = this.setPotentialMatches.bind(this);
//   }

//   async handleSubmit(e) {
//     e.preventDefault();
//     try {
//       let token = await UrGuideApi.signup(this.state);
//       localStorage.setItem("urGuide-token", token);
//       let { username } = jwt.decode(token);
//       let currentUser = await UrGuideApi.getCurrentUser(username);
//       this.setCurrentUser(currentUser);
//     } catch (errors) {
//       this.setState({ errors });
//     }
//   }

//   handleChange(e) {
//     this.setState({
//       [e.target.name]: e.target.value,
//     });
//   }

//   render() {
//     return (
//       <div>
//         <form onSubmit={this.handleSubmit}>
//           <label htmlFor="username">Username</label>
//           <input
//             id="username"
//             name="username"
//             value={this.state.username}
//             onChange={this.handleChange}
//           />
//           <label htmlFor="password">Password</label>
//           <input
//             id="password"
//             name="password"
//             value={this.state.password}
//             onChange={this.handleChange}
//           />
//           <label htmlFor="firstName">First Name</label>
//           <input
//             id="firstName"
//             name="firstName"
//             value={this.state.firstName}
//             onChange={this.handleChange}
//           />
//           <label htmlFor="lastName">Last Name</label>
//           <input
//             id="lastName"
//             name="lastName"
//             value={this.state.lastName}
//             onChange={this.handleChange}
//           />
//           <label htmlFor="email">Email</label>
//           <input
//             id="email"
//             name="email"
//             value={this.state.email}
//             onChange={this.handleChange}
//           />
//           <label htmlFor="city">City</label>
//           <input
//             id="city"
//             name="city"
//             value={this.state.city}
//             onChange={this.handleChange}
//           />
//           <label htmlFor="country">Country</label>
//           <input
//             id="country"
//             name="country"
//             value={this.state.country}
//             onChange={this.handleChange}
//           />
//           <label htmlFor="zipCode">Zip Code</label>
//           <input
//             id="zipCode"
//             name="zipCode"
//             value={this.state.zipCode}
//             onChange={this.handleChange}
//           />
//           <label htmlFor="imageUrl">Image Url</label>
//           <input
//             id="imageUrl"
//             name="imageUrl"
//             value={this.state.imageUrl}
//             onChange={this.handleChange}
//           />
//           <label htmlFor="hobbies">Hobbies</label>
//           <input
//             id="hobbies"
//             name="hobbies"
//             value={this.state.hobbies}
//             onChange={this.handleChange}
//           />
//           <label htmlFor="interests">Interests</label>
//           <input
//             id="interests"
//             name="interests"
//             value={this.state.interests}
//             onChange={this.handleChange}
//           />
//           <button>Submit</button>
//         </form>
//       </div>
//     );
//   }
// }

// export default Forms;
