import SpeedIcon from "@mui/icons-material/Speed";
import { Grid, Paper, Box, Typography } from "@mui/material";
import OpacityIcon from "@mui/icons-material/Opacity";
import CompressIcon from "@mui/icons-material/Compress";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import React from "react";

const icon = {
  wind: SpeedIcon,
  humidity: OpacityIcon,
  pressure: CompressIcon,
  visibility: VisibilityIcon,
  sunrise: WbTwilightIcon,
  sunset: WbTwilightIcon
};

function Today({ value, unit, name, icon_name }) {
  const IconComonent = icon[icon_name];

  return (
    <Grid
      item
      xs={12}
      md={2}>
      <Paper
        elevation={3}
        style={{
          padding: "20px",
          borderRadius: 15
        }}>
        <Box
          display="flex"
          alignItems="center">
          <IconComonent
            fontSize="large"
            style={{ marginRight: 8 }}
          />
          <Typography
            variant="h6"
            fontSize={19}>
            {value} {unit}
          </Typography>
        </Box>
        <Typography variant="body2">{name}</Typography>
      </Paper>
    </Grid>
  );
}

export default Today;
