import { Box } from "@mui/material";
import Header from "../header/Header";
import { Outlet} from "react-router-dom";

const Layout = () => {

  return (
    <Box>
      <Header />
      <>
        <Outlet />
      </>
    </Box>
  );
};

export default Layout;
