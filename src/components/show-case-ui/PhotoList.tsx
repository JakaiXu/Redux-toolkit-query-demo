import {
  ButtonGroup,
  Card,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { CloseOutlined, DeleteTwoTone } from "@mui/icons-material";
import { blueGrey } from "@mui/material/colors";
const PhotoList = ({handleCloseAlbum}:{handleCloseAlbum:() => void}) => {
  const handleAddPhoto = () => {};
  return (
    <Card sx={{ width: "70vw", height: "50vh", bgcolor: blueGrey[100] }}>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingX: 10,
          background: "rgba(105,150,150,0.2)",
          alignItems: "center",
          opacity: 0.5,
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: 20,
            color: "black",
          }}
        >
          PhotoList
        </Typography>
        <ButtonGroup>
          <IconButton>
            <EditNoteIcon />
          </IconButton>
          <IconButton>
            <DeleteTwoTone />
          </IconButton>
          <IconButton onClick={handleAddPhoto}>
            <AddBoxIcon />
          </IconButton>
          <IconButton onClick={()=>handleCloseAlbum()}>
            <CloseOutlined />
          </IconButton>
        </ButtonGroup>
      </Stack>
    </Card>
  );
};

export default PhotoList;
