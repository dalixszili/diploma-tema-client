// const Header = () => {
//   // const [value, setValue] = React.useState(0);

//   // const handleChange = (event, newValue) => {
//   //   setValue(newValue);
//   // };
//   return (
//     <React.Fragment>
//       <AppBar sx={{ background: "#06d48f" }}>
//         <Toolbar>
//           <Typography>TDK ADMIN</Typography>
//           {/* <Tabs
//             value={value}
//             onChange={handleChange}
//             sx={{ marginLeft: "auto" }}
//           >
//             <Tab label="Áttekintés" />
//             <Tab
//               icon={<PeopleIcon />}
//               iconPosition="start"
//               label="Felhasználok"
//             />
//           </Tabs> */}
//           <Button sx={{ marginLeft: "auto" }} color="inherit">
//             <Link to="/admin">Áttekintés</Link>
//           </Button>
//           <Button sx={{ marginLeft: "auto" }} color="inherit">
//             <Link to="/admin/users">Felhasználók</Link>
//           </Button>
//           <Button sx={{ marginLeft: "auto" }} color="inherit">
//             <Link to="/admin/logout">Kijelentkezés</Link>
//           </Button>
//         </Toolbar>
//       </AppBar>
//     </React.Fragment>
//   );
// };

// export default Header;

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, reset } from "../features/AuthSlice";

const pages = [
  { menu: "Áttekintés", page: "" },
  { menu: "Felhasználók", page: "users" },
];
const settings = [
  { menu: "Személyes Adatok", page: "account" },
  { menu: "Kijelentkezés", page: "logout" },
];
function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const baseurl = "/admin";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // const handleUserMenuClick = (event) => {
  //   if (event.currentTarget.value === "Kijelentkezés")
  //     console.log(event.currentTarget);
  // };

  return (
    <AppBar sx={{ background: "#06d48f" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={`${baseurl}`}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 800,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TDKADMIN
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link to={`${baseurl}/${page.page}`}>{page.menu}</Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TDKADMIN
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link
                  style={{ textDecoration: "none", color: "inherit" }}
                  to={`${baseurl}/${page.page}`}
                >
                  {page.menu}
                </Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    // onClick={handleUserMenuClick}
                  >
                    <Link to={`${baseurl}/${setting.page}`}>
                      {setting.menu}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
