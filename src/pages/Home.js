import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Footer from "../components/Footer";
import Login from "../components/Login";
import UserProjects from "../components/UserProjects";
import Registration from "../components/Registration";
import { GetMe } from "../features/AuthSlice";

const imageURL = `${process.env.REACT_APP_BACKEND_BASE_URL}/images/HeaderImage.png`;
const menusURL = `${process.env.REACT_APP_BACKEND_BASE_URL}/menuswithpages`;
const dateURL = `${process.env.REACT_APP_BACKEND_BASE_URL}/activesettings`;

const settings = [
  { menu: "Személyes Adatok", page: "account" },
  { menu: "Kijelentkezés", page: "logout" },
];

function Home() {
  const [menuList, setMenuList] = useState([]);
  const [page, setPage] = useState("");
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [deadlines, setDeadlines] = useState({});
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [activeItem, setActiveItem] = useState(null);
  const [searchParams] = useSearchParams();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(() => {
    dispatch(GetMe());
  }, [dispatch]);

  useEffect(() => {
    if (user && deadlines && searchParams.get("p") === "documents") {
      setActiveItem("Dolgozatok");
      setPage(<UserProjects user_id={user.id} deadlines={deadlines} />);
    }
    if (!user && Object.keys(deadlines).length === 0) {
      const fetchData = async () => {
        const response = await axios.get(menusURL);
        const responseData = response.data;

        const dateresponse = await axios.get(dateURL);
        setDeadlines(() => dateresponse.data);

        if (responseData.length > 0) {
          if (searchParams.get("p") === null) {
            navigate(`/?p=${responseData.at(0).name}`);
            setActiveItem(responseData.at(0).name);
            setPage(responseData.at(0).page.content);
          } else {
            if (
              searchParams.get("p") !== "login" &&
              searchParams.get("p") !== "documents" &&
              searchParams.get("p") !== "register"
            ) {
              setActiveItem(searchParams.get("p"));
              const pagef = responseData.find(
                ({ name }) => name === searchParams.get("p")
              );
              if (pagef !== undefined) {
                setPage(pagef.page.content);
              }
            }
          }
          if (searchParams.get("p") === "login") {
            setActiveItem("Belépés/Regisztráció");
            setPage(<Login setPage={setPage} />);
          }

          if (searchParams.get("p") === "register") {
            setActiveItem("Belépés/Regisztráció");
            setPage(
              <Registration setPage={setPage} deadlines={dateresponse.data} />
            );
          }
          if (searchParams.get("p") === "documents" && !user) {
            setActiveItem("Belépés/Regisztráció");
            setPage(<Login setPage={setPage} />);
          }
          setMenuList(responseData);
        }
      };

      fetchData();
    }
  }, [navigate, user, deadlines, searchParams]);

  useEffect(() => {
    window.onpopstate = () => {
      if (
        searchParams.get("p") !== "login" &&
        searchParams.get("p") !== "documents" &&
        searchParams.get("p") !== "register"
      ) {
        setActiveItem(searchParams.get("p"));
        const pagef = menuList.find(
          ({ name }) => name === searchParams.get("p")
        );
        if (pagef !== undefined) {
          setPage(pagef.page.content);
        }
      }
      if (searchParams.get("p") === "login") {
        setActiveItem("Belépés/Regisztráció");
        setPage(<Login setPage={setPage} />);
      }

      if (searchParams.get("p") === "register") {
        setActiveItem("Belépés/Regisztráció");
        setPage(<Registration setPage={setPage} deadlines={deadlines} />);
      }
      if (searchParams.get("p") === "documents" && user && deadlines) {
        setActiveItem("Dolgozatok");
        setPage(<UserProjects user_id={user.id} deadlines={deadlines} />);
      }
      if (searchParams.get("p") === "documents" && !user) {
        setActiveItem("Belépés/Regisztráció");
        setPage(<Login setPage={setPage} />);
      }
    };
  });

  if (
    searchParams.get("p") === "documents" &&
    user &&
    activeItem !== "Dolgozatok" &&
    Object.keys(deadlines).length !== 0
  ) {
    setActiveItem("Dolgozatok");
    setPage(<UserProjects user_id={user.id} deadlines={deadlines} />);
  }
  return (
    <Box>
      <style>
        {`
          .scrollbox::-webkit-scrollbar {
            display: none;
          }
          .scrollbox{
            -ms-overflow-style: none;
          }
        `}
      </style>
      {/* <AppBar sx={{ width: "80%", background: "#06d48f" }}> */}
      {/* <Grid item> */}
      <Box display="flex" justifyContent="center">
        {/* <Grid sx={{ width: { md: "70%", xs: "100%" } }}> */}
        <Grid sx={{ width: "100vw", maxheight: "50vh" }}>
          <img
            style={{
              width: "100%",
              height: "100%",
              // maxheight: "50vh",
            }}
            alt="Header"
            src={imageURL}
          />
        </Grid>
      </Box>
      {/* </Grid> */}
      <AppBar
        position="static"
        sx={{
          // width: { md: "70%", xs: "100%" },
          width: "100%",
          margin: "0",
          background: "#06d48f",
        }}
      >
        <Toolbar>
          <Box
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            justify="space-between"
          >
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
              {menuList.map((menu, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Button
                    key={index}
                    component={NavLink}
                    to={`/?p=${menu.name}`}
                  >
                    {menu.name}
                  </Button>
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
            TDK
          </Typography>

          <Box
            className="scrollbox"
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              overflowX: "auto",
              minWidth: "100px",
            }}
          >
            {menuList.map((menu, index) => (
              <Button
                key={index}
                variant="text"
                component={NavLink}
                to={`/?p=${menu.name}`}
                sx={{
                  backgroundColor: `${
                    activeItem === menu.name ? "#2B405D" : "#06d48f"
                  } `,
                  ":hover": { bgcolor: "#3fffaf" },
                  mx: 1,
                  color: "white",
                  minWidth: "auto",
                }}
                onClick={(e) => {
                  setPage(menu.page.content);
                  setActiveItem(menu.name);
                }}
              >
                {menu.name}
              </Button>
            ))}
          </Box>
          {user ? (
            <>
              <Button
                component={NavLink}
                to={"/?p=documents"}
                sx={{
                  minWidth: "auto",
                  mr: 3,
                  background:
                    activeItem === "Dolgozatok" ? "#2B405D" : "#068057",
                  ":hover": { bgcolor: "#3fffaf" },
                  flexGrow: 0,
                  color: "white",
                  display: { xs: "none", md: "block" },
                }}
                onClick={(e) => {
                  setPage(
                    <UserProjects user_id={user.id} deadlines={deadlines} />
                  );
                  setActiveItem("Dolgozatok");
                }}
              >
                Dolgozatok
              </Button>

              <Box sx={{ flexGrow: 0 }}>
                <AccountCircleIcon
                  onClick={handleOpenUserMenu}
                  style={{
                    marginRight: 0,
                    width: "40",
                    height: "40",
                  }}
                  sx={{
                    ":hover": { color: "#eeeeee" },
                  }}
                />
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
                      <Button component={NavLink} to={`/${setting.page}`}>
                        {setting.menu}
                      </Button>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          ) : (
            <Button
              component={NavLink}
              to={"/?p=login"}
              // onClick={(e) => {
              //   setPage(<Login />);
              //   setActiveItem("Belépés/Regisztráció");
              // }}
              sx={{
                my: 2,
                background:
                  activeItem === "Belépés/Regisztráció" ? "#2B405D" : "#068057",
                ":hover": { bgcolor: "#3fffaf" },
                minWidth: "200px",
                color: "white",
                display: { xs: "none", md: "block" },
                marginLeft: 2,
              }}
              onClick={(e) => {
                setPage(<Login setPage={setPage} />);
                setActiveItem("Dolgozatok");
              }}
            >
              Belépés/Regisztráció
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {activeItem === "Belépés/Regisztráció" || activeItem === "Dolgozatok" ? (
        <Grid
          sx={{
            background: "white",
            margin: "0 auto",
            padding: { md: "2% 5% ", xs: "1%" },
            // width: { md: "100%", xs: "100%" },
          }}
        >
          {page}
        </Grid>
      ) : (
        <Grid
          sx={{
            background: "white",
            margin: "0 auto",
            padding: "2% 5% ",
            // width: { md: "100%", xs: "100%" },
          }}
          dangerouslySetInnerHTML={{ __html: page }}
        />
      )}
      <Footer />
    </Box>
  );
}

export default Home;
