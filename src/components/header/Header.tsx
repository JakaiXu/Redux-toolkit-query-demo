import { Box, Button, ButtonGroup } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginY: 5 }}>
      <ButtonGroup>
        <Button>
          <Link to="rtk" style={{ textDecoration: "none", color: "darkgray" }}>
            RTK
          </Link>
        </Button>
        <Button>
          <Link to="rtkq" style={{ textDecoration: "none", color: "darkgray" }}>
            RTKQ
          </Link>
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default Header;
