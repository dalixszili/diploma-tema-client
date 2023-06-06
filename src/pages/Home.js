import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Home() {
  const [menuList, setMenuList] = useState([]);
  const [page, setPage] = useState("");
  //   const [anchorElNav, setAnchorElNav] = useState(null);
  //   const [anchorElUser, setAnchorElUser] = useState(null);
  //   const baseurl = "/admin";

  const [activeItem, setActiveItem] = useState(null);

  //   const handleOpenNavMenu = (event) => {
  //     setAnchorElNav(event.currentTarget);
  //   };
  //   const handleOpenUserMenu = (event) => {
  //     setAnchorElUser(event.currentTarget);
  //   };

  //   const handleCloseNavMenu = () => {
  //     setAnchorElNav(null);
  //   };

  //   const handleCloseUserMenu = () => {
  //     setAnchorElUser(null);
  //   };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:5000/menuswithpages");
    const responseData = response.data;
    if (responseData.length > 0) {
      setActiveItem(responseData.at(0).name);
      setPage(responseData.at(0).page.content);
    }
    setMenuList(responseData);
  };
  return (
    <div>
      <AppBar sx={{ background: "#06d48f" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                {pages.map((page, index) => (
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link to={`${baseurl}/${page.page}`}>{page.menu}</Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box> */}

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {menuList.map((menu, index) => (
                <Button
                  key={index}
                  onClick={(e) => {
                    setPage(menu.page.content);
                    setActiveItem(menu.name);
                  }}
                  sx={{
                    my: 2,
                    background:
                      activeItem === menu.name ? "#06f48f" : "#06d48f",
                    ":hover": { bgcolor: "#16ff9f" },

                    color: "white",
                    display: "block",
                  }}
                >
                  {menu.name}
                </Button>
              ))}
            </Box>

            {/* <Box sx={{ flexGrow: 0 }}>
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
                {settings.map((setting, index) => (
                  <MenuItem key={index} onClick={handleCloseUserMenu}>
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
            </Box> */}
          </Toolbar>
        </Container>
      </AppBar>

      <div
        style={{
          marginTop: 100,
          marginLeft: "auto",
          marginRight: "auto",
          width: "60%",
        }}
        dangerouslySetInnerHTML={{ __html: page }}
      />
    </div>
  );
}

export default Home;
