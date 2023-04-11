//Here we create random profile data from https://randomuser.me/api/ using jQuery/ajax and or axios.
//We then use the data to create a new users in our database. We'll use this to create a bunch of fake users for our app.
import React from "react";
import axios from "axios";

// axios.get("https://randomuser.me/api/?format=json?inc=username,password,email,name,picture,city,country,postcode,gender=female,male?page=3&results=10&seed=abc?exc=version,registered,cell")
// axios.get("https://randomuser.me/api/?format=json?inc=first,last,username,password,email,city,state,country,postcode,coordinates,picture?page=3&results=20&seed=abc?exc=info,login,dob,location,title,registered,cell,phone,nat,gender")
//(https://randomuser.me/api/?inc=username,picture,gender=female,male,hobbies?page=3&results=5?exc=version,registered,cell")
export default class UserListData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        `https://randomuser.me/api/?format=json?inc=username,password,email,name,picture,city,country,postcode,gender=female,male?page=3&results=10&seed=abc?exc=version,registered,cell`
      )
      .then((res) => {
        const users = res.data.results;
        this.setState({ users });
      });
  }

  render() {
    return (
      <ul>
        {this.state.users.map((user) => (
          <li>
            {user.name.first} {user.name.last}
          </li>
        ))}
      </ul>
    );
  }
}
