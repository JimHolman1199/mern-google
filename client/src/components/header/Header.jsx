import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Avatar,
  Container,
} from "@material-ui/core";

import { UserContext } from "../../providers/user/UserProvider";

import logo from "../../assets/resultify2.svg";
import defaultPerson from "../../assets/noName.png";

import "./header.scss";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { user, setCurrentUser } = useContext(UserContext);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setCurrentUser();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="global_header">
      <AppBar position="static" className="header_menu">
        <Container maxWidth="lg">
          <Toolbar>
            <IconButton>
              <img src={logo} alt="Company logo" />
            </IconButton>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Google Data Studio links
            </Typography>
            <MenuItem>
              <Link to="/" className="menu-link">
                Home
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/about" className="menu-link">
                About
              </Link>
            </MenuItem>
            {user && (
              <React.Fragment>
                <MenuItem>
                  <a href="/auth/logout" onClick={handleClick} className="menu-link">
                    Logout
                  </a>
                </MenuItem>
                <div>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <Avatar
                      alt="Users photo"
                      src={
                        user.photoUrl
                          ? user.photoUrl
                          : defaultPerson
                      }
                    />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem>{user.userName}</MenuItem>
                    <MenuItem>
                      {user.userEmail
                        ? user.userEmail
                        : "Email here"}
                    </MenuItem>
                  </Menu>
                </div>
              </React.Fragment>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Header;
