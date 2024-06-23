import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import General from "./settings_components/General";
import Categories from "./settings_components/Categories";
import Sponsors from "./settings_components/Sponsors";

function SettingsContent() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box>
      <Typography variant={"body"} component={"h1"} paddingTop={3}>
        Beállítások
      </Typography>
      <Typography variant={"body"} component={"h3"} paddingTop={3}>
        Időpontok, szakosztályok és egyéb beállítások.
      </Typography>

      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        centered
        TabIndicatorProps={{
          style: {
            backgroundColor: "#06d48f",
          },
        }}
      >
        <Tab
          label="Általános"
          sx={{ "&.Mui-selected": { color: "#06d48f" } }}
        />
        <Tab
          label="Szakosztályok"
          sx={{ "&.Mui-selected": { color: "#06d48f" } }}
        />
        <Tab
          label="Szponzorok"
          sx={{ "&.Mui-selected": { color: "#06d48f" } }}
        />
      </Tabs>

      {selectedTab === 0 && (
        <div style={{ marginTop: "3vh" }}>
          <General />
        </div>
      )}
      {selectedTab === 1 && (
        <div style={{ marginTop: "3vh" }}>
          <Categories />
        </div>
      )}
      {selectedTab === 2 && (
        <div style={{ marginTop: "3vh" }}>
          <Sponsors />
        </div>
      )}
    </Box>
  );
}

export default SettingsContent;
