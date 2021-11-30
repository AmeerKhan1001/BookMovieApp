import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import SignInSignUpModal from "../modal/Modal";
import "./Header.css";

function renderLoginLogoutButton(setShowModal, isLoggedIn, logoutHandler) {
  if (isLoggedIn) {
    return (
      <Button className="header-button" variant="contained" onClick={() => logoutHandler(false)}>
        Logout
      </Button>
    );
  } else {
    return (
      <Button className="header-button" variant="contained" onClick={() => setShowModal(true)}>
        Login
      </Button>
    );
  }
}

function renderBookShowButton(id, setShowModal, isLoggedIn) {
  if (isLoggedIn) {
    return (
      <Link to={"/bookshow/" + id}>
        <Button
          className="header-button"
          color="primary"
          variant="contained"
          style={{ marginRight: "5px" }}
        >
          Book Show
        </Button>
      </Link>
    );
  } else {
    return (
      <Button
        onClick={() => setShowModal(true)}
        className="header-button"
        color="primary"
        variant="contained"
        style={{ marginRight: "5px" }}
      >
        Book Show
      </Button>
    );
  }
}

const Header = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("access-token") != null ? true : false
  );
  const closeModalHandler = () => setShowModal(false);

  const logoutHandler = () => {
    sessionStorage.removeItem("access-token");
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <div className="header">
        <img
          className="logo"
          src={require("../../assets/logo.svg")}
          alt="logo"
        />
        {renderLoginLogoutButton(setShowModal, isLoggedIn, logoutHandler)}
        {props.isDetailsPage
          ? renderBookShowButton(props.match.params.id, setShowModal, isLoggedIn)
          : null}
      </div>
      <SignInSignUpModal baseUrl={props.baseUrl} show={showModal} close={closeModalHandler} setIsLoggedIn={setIsLoggedIn}/>
    </React.Fragment>
  );
};

export default Header;
