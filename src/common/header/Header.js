import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import SignInSignUpModal from "../modal/Modal";
import "./Header.css";

function renderLoginLogoutButton() {
  if (sessionStorage.getItem("access-token")) {
    return (
      <Button className="header-button" variant="contained">
        Logout
      </Button>
    );
  } else {
    return (
      <Button className="header-button" variant="contained">
        Login
      </Button>
    );
  }
}

function renderBookShowButton(id, setShowModal) {
  if (sessionStorage.getItem("access-token")) {
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
  const closeModalHandler = () => setShowModal(false);

  return (
    <React.Fragment>
      <div className="header">
        <img
          className="logo"
          src={require("../../assets/logo.svg")}
          alt="logo"
        />
        {renderLoginLogoutButton()}
        {props.isDetailsPage
          ? renderBookShowButton(props.match.params.id, setShowModal)
          : null}
      </div>
      <SignInSignUpModal show={showModal} close={closeModalHandler} />
    </React.Fragment>
  );
};

export default Header;
