import {
  ButtonGroup,
  Card,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import { DeleteTwoTone } from "@mui/icons-material";
import { useThunk } from "../../hooks/useThunk";
import { removeClient } from "../../store/store";
import Skeleton from "../../utils/Skeleton";
import { ClientData } from "../../store/slices/used-for-AsyncThunk/clientsSlice";
import { updateClient } from "../../store/thunks/updateClient";
import { useState } from "react";
import AlbumList from "./AlbumList";
const ClientItem = ({ client }: { client: ClientData }) => {
  const [doRemoveClient, isLoading, error] = useThunk(removeClient);
  const [doUpdateClient, isupdating, updatingError] = useThunk(removeClient);
  const [showAlbum, setShowAlbum] = useState(false);
  const removeHandler = () => {
    doRemoveClient(client);
  };
  const updateHandler = () => {
    doUpdateClient(updateClient);
  };
  const handleCreateAlbum = () => {
    setShowAlbum(!showAlbum);
  };
  return (
    <>
      {showAlbum ? (
        <AlbumList client={client} handleCloseUser={handleCreateAlbum} />
      ) : (
        <Card sx={{ height: 200, width: 350, bgcolor: getRandomColor() }}>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              bgcolor: grey[200],
              opacity: 0.5,
            }}
          >
            <Typography
              sx={{
                height: 40,
                paddingTop: 1,
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              {client.name}'s Disk
            </Typography>
            <ButtonGroup>
              <IconButton onClick={updateHandler}>
                <EditNoteIcon />
              </IconButton>
              <IconButton onClick={removeHandler}>
                <DeleteTwoTone />
              </IconButton>
              <IconButton onClick={handleCreateAlbum}>
                <CreateNewFolderIcon />
              </IconButton>
            </ButtonGroup>
          </Stack>
          {error && (
            <Skeleton times={1} w={350} h={200}>
              Error Deleting Client
            </Skeleton>
          )}
          {isLoading && (
            <Skeleton times={1} w={350} h={200}>
              Is Deleting Client
            </Skeleton>
          )}
          {updatingError && (
            <Skeleton times={1} w={350} h={200}>
              Error Updating Client
            </Skeleton>
          )}
          {isupdating && (
            <Skeleton times={1} w={350} h={200}>
              Is Updating Client
            </Skeleton>
          )}
        </Card>
      )}
    </>
  );
};

export default ClientItem;

const getRandomColor = () => {
  const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)})`;
  return randomColor;
};
