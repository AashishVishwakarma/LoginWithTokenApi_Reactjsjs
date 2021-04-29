import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Login from "../Login/Login";
import baseInstance from "../../api";
import "./Dashboard.css";
import { Redirect, useHistory } from "react-router";

function Dashboard() {
  let history = useHistory();
  const [UserData, SetUserData] = useState([]);

  function GetAllUSers() {
    axios
      .get("https://reqres.in/api/users?page=2")
      .then((response) => {
        console.log(response.data);
        const { data } = response.data;
        SetUserData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    GetAllUSers();
  }, []);

  function deleteData(id) {
    console.log(id);
    if (window.confirm("Are you sure ?")) {
      // fetch("https://reqres.in/api/users/${id}", {
      fetch("https://reqres.in/api/users/" + id, {
        method: "DELETE",
      }).then((result) => {
        console.log(result);
      });
      SetUserData(UserData.filter((element) => element.id !== id));
    }

    // fetch("https://reqres.in/api/users/?page=2" + id, {
    //   method: "DELETE",
    // }).then((result) => {
    //   result.json().then((resp) => {
    //     console.warn(resp);
    //   });
    // });
  }

  // async function handleRemove(id) {
  //   console.log(id);
  // remove item
  // const newList = UserData.filter((item) => item.id !== id);

  // SetUserData(newList);
  // if (window.confirm("Are you sure ?")) {
  //   await fetch("https://reqres.in/api/users/${id}", {
  //     method: "DELETE",
  //   }).then((result) => {
  //     result.json().then((resp) => {
  //       console.warn(resp);
  //     });
  //   });
  // }

  // this.isLoading = true;
  // const response = await fetch("https://reqres.in/api/users/${id}");
  // const status = await response.status;

  // if (status === 200) {
  //   this.isLoading = false;
  //   this.fetchAll();
  // }
  // }

  // function Logout() {
  //   localStorage.clear("token");
  //   history.push("/");
  // }
  function Logout() {
    SetUserData({
      sessionToken: "",
    });
    localStorage.clear();

    history.push("/");
  }
  return (
    <Fragment>
      <div className="Dashboard">
        <h1>Hello All users!</h1>
        <div>
          <button onClick={() => Logout()}>LogOut</button>
        </div>
        <div className="flex">
          {UserData.length &&
            UserData.map((user) => {
              return (
                <div key={user.id}>
                  <p>
                    <strong>{user.first_name}</strong>
                  </p>
                  <p>{user.email}</p>
                  <img key={user.avatar} src={user.avatar} />
                  <div>
                    <button onClick={() => deleteData(user.id)}>Delete</button>
                    {/* <button onClick={() => this.deleteData(user.id)}>
                      Delete
                    </button> */}
                    {/* <button onClick={() => handleRemove(user.id)}>
                      Delete
                    </button> */}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Fragment>
  );
}
export default Dashboard;
