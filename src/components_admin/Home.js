import { Box, Typography, useMediaQuery } from "@mui/material";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
// import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Box>
      <Box
        borderRadius={"5px"}
        paddingBottom={"1vh"}
        borderBottom={"1px solid #bbb"}
      >
        <Typography
          component={isMobile ? "h4" : "h3"}
          variant={isMobile ? "h4" : "h3"}
          marginTop={"3vh"}
        >
          Áttekintés
        </Typography>

        <Typography component={"h6"} variant={"h6"} marginTop={"1.5vh"}>
          Ezen az oldalon egy álltalános áttekintést olvashatsz az
          adminisztrációs felület használatáról.
        </Typography>
      </Box>

      {/* Menük */}
      <Box
        borderRadius={"5px"}
        marginTop={"5vh"}
        paddingBottom={"1.5vh"}
        borderBottom={"1px solid #bbb"}
      >
        <Box
          component={Link}
          to={"/admin/menus"}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "fit-content",
            color: "#06d48f",
            "&:hover": {
              cursor: "pointer",
              backgroundColor: "transparent",
              ".hover-menu": {
                fontSize: "1.5rem",
              },
            },
          }}
        >
          <ListOutlinedIcon
            sx={{
              marginRight: "0.5vw",
              fontSize: "2.5rem",
            }}
          />
          <Typography
            className="hover-menu"
            variant="h6"
            component={"h6"}
            sx={{
              transition: "font-size 0.3s",
            }}
          >
            Menüpontok
          </Typography>
        </Box>
        <Typography
          component={"p"}
          variant={"body1"}
          paddingLeft={"1vw"}
          marginTop={"1vh"}
        >
          A "Menüpontok" oldalon új elemeket lehet hozzáadni a weboldal
          menüjéhez. Minden menüponthoz hozzá lehet rendelni egy szöveges
          oldalt.
        </Typography>
      </Box>

      {/* Oldalak  */}
      <Box
        borderRadius={"5px"}
        marginTop={"2vh"}
        paddingBottom={"1.5vh"}
        borderBottom={"1px solid #bbb"}
      >
        <Box
          component={Link}
          to={"/admin/pages"}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "fit-content",
            color: "#06d48f",
            "&:hover": {
              cursor: "pointer",
              backgroundColor: "transparent",
              ".hover-menu": {
                fontSize: "1.5rem",
              },
            },
          }}
        >
          <MenuBookOutlinedIcon
            sx={{
              marginRight: "0.5vw",
              fontSize: "2.5rem",
            }}
          />
          <Typography
            className="hover-menu"
            variant="h6"
            component={"h6"}
            sx={{
              transition: "font-size 0.3s",
            }}
          >
            Oldalak
          </Typography>
        </Box>
        <Typography
          component={"p"}
          variant={"body1"}
          paddingLeft={"1vw"}
          marginTop={"1.5vh"}
        >
          Az "Oldalak" menüpont alatt lehet létrehozni és szerkeszteni a
          weboldal szöveges oldalait. Meg lehet adni az egyes oldalak címét,
          permalinkjét és tartalmát.
        </Typography>
      </Box>

      {/* Dolgozatok */}
      {/* <Box
        borderRadius={"5px"}
        marginTop={"2vh"}
        paddingBottom={"1.5vh"}
        borderBottom={"1px solid #bbb"}
      >
        <Box
          // component={Link}
          // to={"/admin/menus"}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "fit-content",
            color: "#06d48f",
            "&:hover": {
              cursor: "pointer",
              backgroundColor: "transparent",
              ".hover-menu": {
                fontSize: "1.5rem",
              },
            },
          }}
        >
          <FolderCopyOutlinedIcon
            sx={{
              marginRight: "0.5vw",
              fontSize: "2.5rem",
            }}
          />
          <Typography
            className="hover-menu"
            variant="h6"
            component={"h6"}
            sx={{
              transition: "font-size 0.3s",
            }}
          >
            Dolgozatok
          </Typography>
        </Box>
        <Typography
          component={"p"}
          variant={"body1"}
          paddingLeft={"1vw"}
          marginTop={"1.5vh"}
        >
          A "Dolgozatok" menüpontra kattintva kilistázható, hogy milyen
          dolgozatokat regisztráltak a rendszerbe. A dolgozatokat szakosztályok
          szerint lehet szűrni és a dolgozatok listáját valamint az egyes
          szakosztályokhoz tartozó kivonatos füzeteket le lehet tölteni ODT
          formátumban.
        </Typography>
      </Box> */}
      {/*  Felhasználók */}
      <Box
        borderRadius={"5px"}
        marginTop={"2vh"}
        paddingBottom={"1.5vh"}
        borderBottom={"1px solid #bbb"}
      >
        <Box
          component={Link}
          to={"/admin/users"}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "fit-content",
            color: "#06d48f",
            "&:hover": {
              cursor: "pointer",
              backgroundColor: "transparent",
              ".hover-menu": {
                fontSize: "1.5rem",
              },
            },
          }}
        >
          <GroupsOutlinedIcon
            sx={{
              marginRight: "0.5vw",
              fontSize: "2.5rem",
            }}
          />
          <Typography
            className="hover-menu"
            variant="h6"
            component={"h6"}
            sx={{
              transition: "font-size 0.3s",
            }}
          >
            Felhasználók
          </Typography>
        </Box>
        <Typography
          component={"p"}
          variant={"body1"}
          paddingLeft={"1vw"}
          marginTop={"1.5vh"}
        >
          A "Felhasználók" menüpontra kattintva az összes felhasználó
          megtekinthető. Itt egyaránt kilistázható a regisztrált diákok és
          zsűritagok.
        </Typography>
      </Box>

      {/* Beállítások */}
      <Box
        borderRadius={"5px"}
        marginTop={"2vh"}
        paddingBottom={"1.5vh"}
        borderBottom={"1px solid #bbb"}
      >
        <Box
          component={Link}
          to={"/admin/settings"}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            width: "fit-content",
            color: "#06d48f",
            "&:hover": {
              cursor: "pointer",
              backgroundColor: "transparent",
              ".hover-menu": {
                fontSize: "1.5rem",
              },
            },
          }}
        >
          <SettingsOutlinedIcon
            sx={{
              marginRight: "0.5vw",
              fontSize: "2.5rem",
            }}
          />
          <Typography
            className="hover-menu"
            variant="h6"
            component={"h6"}
            sx={{
              transition: "font-size 0.3s",
            }}
          >
            Beállítások
          </Typography>
        </Box>
        <Typography
          component={"p"}
          variant={"body1"}
          paddingLeft={"1vw"}
          marginTop={"1.5vh"}
        >
          A "Beállítások" menüpont alatt lehet beállítani a regisztrációs
          időszakot, a weboldal címét, a konferencia szponzorait és
          szakosztályait.
        </Typography>
      </Box>
    </Box>
  );
}

export default Home;
