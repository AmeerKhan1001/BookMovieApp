import React, { useState } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";

export default function SignInSignUpModal({
  baseUrl,
  show,
  close,
  setIsLoggedIn,
}) {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  return (
    <div className="modal">
      <Modal
        isOpen={show}
        onRequestClose={close}
        contentLabel="Example Modal"
        style={customStyles}
        ariaHideApp={false}
      >
        <FullWidthTabs
          baseUrl={baseUrl}
          show={show}
          close={close}
          setIsLoggedIn={setIsLoggedIn}
        />
      </Modal>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function FullWidthTabs({ baseUrl, show, close, setIsLoggedIn }) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: 350 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        aria-label="login register tabs"
        centered
      >
        <Tab label="LOGIN" {...a11yProps(0)} />
        <Tab label="REGISTER" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <LoginForm
          baseUrl={baseUrl}
          show={show}
          close={close}
          setIsLoggedIn={setIsLoggedIn}
        />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <RegisterForm
          baseUrl={baseUrl}
          show={show}
          close={close}
          setIsLoggedIn={setIsLoggedIn}
        />
      </TabPanel>
    </Box>
  );
}

function LoginForm({ baseUrl, show, close, setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameValid, isUsernameValid] = useState(true);
  const [passwordValid, isPasswordValid] = useState(true);

  function onSubmitHandler(e) {
    e.preventDefault();
    isUsernameValid(username !== "");
    isPasswordValid(password !== "");

    if (usernameValid && passwordValid) {
      fetch(baseUrl + "auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          Authorization: "Basic " + window.btoa(username + ":" + password),
        },
      })
        .then((response) => {
          sessionStorage.setItem(
            "access-token",
            response.headers.get("access-token")
          );
          return response.json();
        })
        .then((response) => {
          if (response.status === "ACTIVE") {
            setIsLoggedIn(true);
            close();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  const formControlStyle = {
    margin: "10px",
  };

  const labelStyle = {
    left: "-14px",
  };

  const buttonStyle = {
    marginTop: "40px",
  };

  const helperTextStyle = {
    marginLeft: "0px",
  };

  return (
    <Grid align="center">
      <FormControl style={formControlStyle} required>
        <InputLabel style={labelStyle} color="secondary" htmlFor="username">
          Username
        </InputLabel>
        <Input
          id="username"
          value={username}
          color="secondary"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        {!usernameValid && (
          <FormHelperText style={helperTextStyle} error>
            required
          </FormHelperText>
        )}
      </FormControl>
      <FormControl style={formControlStyle} required>
        <InputLabel style={labelStyle} color="secondary" htmlFor="password">
          Password
        </InputLabel>
        <Input
          id="password"
          value={password}
          color="secondary"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {!passwordValid && (
          <FormHelperText style={helperTextStyle} error>
            required
          </FormHelperText>
        )}
      </FormControl>
      <Typography style={buttonStyle}>
        <Button variant="contained" onClick={onSubmitHandler}>
          LOGIN
        </Button>
      </Typography>
    </Grid>
  );
}

function RegisterForm({ baseUrl, show, close, setIsLoggedIn }) {
  const [firstNameValid, isFirstNameValid] = useState(true);
  const [lastnameValid, isLastNameValid] = useState(true);
  const [emailValid, isEmailValid] = useState(true);
  const [passwordValid, isPasswordValid] = useState(true);
  const [contactValid, isContactValid] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");

  const [validRegistrationDetails, isValidRegistrationDetails] =
    useState(false);

  function onSubmitHandler(e) {
    if (firstName) isFirstNameValid(true);
    else isFirstNameValid(false);
    if (lastName) isLastNameValid(true);
    else isLastNameValid(false);
    if (email) isEmailValid(true);
    else isEmailValid(false);
    if (password) isPasswordValid(true);
    else isPasswordValid(false);
    if (contact) isContactValid(true);
    else isContactValid(false);
    if (firstName && lastName && email && password && contact) {
      let registrationDetails = JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email_address: email,
        mobile_number: contact,
        password: password,
      });

      fetch(baseUrl + "signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: registrationDetails,
      })
        .then((response) => response.json())
        .then((response) => {
          isValidRegistrationDetails(
            response.status === "ACTIVE" ? true : false
          );
        });
    } else isValidRegistrationDetails(false);
  }

  const formControlStyle = {
    margin: "10px",
  };

  const labelStyle = {
    left: "-14px",
  };

  const buttonStyle = {
    marginTop: "40px",
  };

  const helperTextStyle = {
    marginLeft: "0px",
  };

  return (
    <Grid align="center">
      <FormControl style={formControlStyle} required>
        <InputLabel style={labelStyle} color="secondary" htmlFor="firstName">
          First Name
        </InputLabel>
        <Input
          id="firstName"
          value={firstName}
          color="secondary"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        {!firstNameValid && (
          <FormHelperText style={helperTextStyle} error>
            required
          </FormHelperText>
        )}
      </FormControl>
      <FormControl style={formControlStyle} required>
        <InputLabel style={labelStyle} color="secondary" htmlFor="lastName">
          Last Name
        </InputLabel>
        <Input
          id="lastName"
          value={lastName}
          color="secondary"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        {!lastnameValid && (
          <FormHelperText style={helperTextStyle} error>
            required
          </FormHelperText>
        )}
      </FormControl>
      <FormControl style={formControlStyle} required>
        <InputLabel style={labelStyle} color="secondary" htmlFor="email">
          Email
        </InputLabel>
        <Input
          id="email"
          value={email}
          color="secondary"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {!emailValid && (
          <FormHelperText style={helperTextStyle} error>
            required
          </FormHelperText>
        )}
      </FormControl>
      <FormControl style={formControlStyle} required>
        <InputLabel style={labelStyle} color="secondary" htmlFor="password">
          Password
        </InputLabel>
        <Input
          id="password"
          value={password}
          color="secondary"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        {!passwordValid && (
          <FormHelperText style={helperTextStyle} error>
            required
          </FormHelperText>
        )}
      </FormControl>
      <FormControl style={formControlStyle} required>
        <InputLabel style={labelStyle} color="secondary" htmlFor="contact">
          Contact No.
        </InputLabel>
        <Input
          id="contact"
          value={contact}
          color="secondary"
          type="number"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          onChange={(e) => {
            setContact(e.target.value);
          }}
        />
        {!contactValid && (
          <FormHelperText style={helperTextStyle} error>
            required
          </FormHelperText>
        )}
      </FormControl>
      {validRegistrationDetails && (
        <p>Registration Successful. Please Login!</p>
      )}
      <Typography style={buttonStyle}>
        <Button variant="contained" onClick={onSubmitHandler}>
          REGISTER
        </Button>
      </Typography>
    </Grid>
  );
}
