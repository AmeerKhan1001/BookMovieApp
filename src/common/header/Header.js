import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import './Header.css';

function renderLoginLogoutButton() {
    if(sessionStorage.getItem("access-token")) {      
        return <Button className="header-button" variant="contained">Logout</Button>;
    }
    else {
        return <Button className="header-button" variant="contained">Login</Button>;
    }

}

function renderBookShowButton(id) {
    if(sessionStorage.getItem("access-token")) {
        return (
            <Link to={"/bookshow/" + id}>
                <Button className="header-button" color="primary" variant="contained" style={{marginRight: "5px"}}>Book Show</Button>
            </Link>
        );
    }
    else {
        // TODO - When user is not logged in, render button that opens signin/signup modal
    }
}

const Header = (props) => {
    return (
    <div className="header">
        <img className="logo" src={require('../../assets/logo.svg')} alt="logo" />
        {renderLoginLogoutButton()}
        {props.isDetailsPage ? renderBookShowButton(props.match.params.id) : null}
    </div>
    );
}

export default Header;