import React, {useContext} from 'react';

import UserProvider from "../../contexts/userProvider";

import { AppBar, Toolbar, Typography, IconButton, MenuItem, Menu, Avatar, Container } from '@material-ui/core';
import logo from '../../assets/resultify2.svg'
import defaultPerson from '../../assets/noName.png'
import { Link } from 'react-router-dom';

import './header.scss';

const Header = () => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const userData = useContext(UserProvider.context);
  const { userEmail, userName, photoUrl } = userData;

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    userName ? (
      fetch('http://localhost:5000/auth/logout')
      .then(res => res.json())
      .then(res => {
        console.log(res);
        // TODO: wtf, Can you make a normal logout?  
        window.location.reload();
      })
    ) : (
      window.location.assign('http://localhost:5000/auth/google')
    )
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <div className='global_header' >
      <AppBar position="static" className='header_menu'>
      <Container maxWidth='lg'>
        <Toolbar>
          <IconButton >
            <img src = {logo} alt='Company logo'/>
          </IconButton>
          <Typography variant="h6" style={{flexGrow: 1}}>
            Google Data Studio links
          </Typography>
            <MenuItem>
              <Link to ='/' className='menu-link'>
                Home
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to ='/about' className='menu-link'>
                About 
              </Link>
            </MenuItem>
            {userName && (
                <MenuItem>
                  <Link to='' onClick={handleClick} className='menu-link'>Logout</Link>
                </MenuItem>
              )
            }
          {userName && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar alt="Users photo" src={ photoUrl ? photoUrl : defaultPerson  } />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem >{userName}</MenuItem>
                <MenuItem >{userEmail ? userEmail: 'Email here'}</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default Header;
