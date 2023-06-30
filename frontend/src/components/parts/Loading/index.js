import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loading = () => {
  return (
    <Box margin="auto" width="10%" bottom="50%" marginTop={40}>
      <CircularProgress color="primary" size={50} />
    </Box>
  );
};

export default Loading;
