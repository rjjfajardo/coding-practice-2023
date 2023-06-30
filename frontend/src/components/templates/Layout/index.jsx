import React from "react";
import Box from "@mui/material/Box";

const Layout = ({ children }) => {
  return (
    <Box
      sx={
        {
          // maxHeight: "100vh",
          // background:
          //   "linear-gradient(74deg, rgba(238,174,202,1) 13%, rgba(37,111,199,1) 72%)",
          // margin: { xs: 1, m: 3, lg: 5 },
          // padding: 0,
          // margin: "auto",
          // width: "100%",
          // border: "3px solid green",
          // padding: "10px",
          // margin: "80px 100px 100px 0px",
        }
      }
    >
      {children}
    </Box>
  );
};

export default Layout;
