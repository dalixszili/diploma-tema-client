import React, { useEffect, useState } from "react";
import { Card, CardActionArea, CardMedia, Grid } from "@mui/material";
import axios from "axios";

function Footer() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/sponsors`
      );
      const responseData = response.data;
      setData(responseData);
    };
    fetchData();
  }, []);

  return (
    <Grid
      container
      sx={{
        margin: "0 auto",
        width: { xs: "100%", md: "100%" },
        background: "#06d48f",
        display: "flex",
        direction: "column",
      }}
      spacing={2}
    >
      {data.map((sponsor, index) => (
        <Grid item key={index} sx={{ margin: "2vh 1vh " }}>
          <a href={sponsor.website_url} target="_blank" rel="noreferrer">
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt={`Sponsor ${sponsor.name}`}
                  image={`${process.env.REACT_APP_BACKEND_BASE_URL}/images/${sponsor.logo_file}`}
                  sx={{ minHeight: "35px", height: "6vh", width: "auto" }}
                />
              </CardActionArea>
            </Card>
          </a>
        </Grid>
      ))}
    </Grid>
  );
}

export default Footer;
