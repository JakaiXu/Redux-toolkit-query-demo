import {
  ButtonGroup,
  Card,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { CloseTwoTone, DeleteTwoTone } from "@mui/icons-material";
import { useState } from "react";
import PhotoList from "./PhotoList";
import { ClientData } from "../../store/slices/used-for-AsyncThunk/clientsSlice";
import { orange } from "@mui/material/colors";

const AlbumList = ({
  client,
  handleCloseUser,
}: {
  client: ClientData;
  handleCloseUser: () => void;
}) => {
  const [showPhoto, setShowPhoto] = useState(false);
  const handleAddPhoto = () => {
    setShowPhoto(!showPhoto);
  };
  return (
    <>
      {showPhoto ? (
        <PhotoList handleCloseAlbum={handleAddPhoto} />
      ) : (
        <Card sx={{ width: "70vw", height: "30vh", bgcolor: orange[200] }}>
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
              {client.name}'Album
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
              <IconButton onClick={() => handleCloseUser()}>
                <CloseTwoTone />
              </IconButton>
            </ButtonGroup>
          </Stack>
        </Card>
      )}
    </>
  );
};

export default AlbumList;
