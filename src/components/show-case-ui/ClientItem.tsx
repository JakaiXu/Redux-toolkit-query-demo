import {
  ButtonGroup,
  Card,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { DeleteTwoTone } from "@mui/icons-material";
import { useThunk } from "../../hooks/useThunk";
import { removeClient } from "../../store/store";
import PreviewIcon from "@mui/icons-material/Preview";
import { ClientData } from "../../store/slices/used-for-AsyncThunk/clientsSlice";
import { updateClient } from "../../store/thunks/updateClient";
import { useState } from "react";
import AlbumList from "./AlbumList";
import { useDispatch } from "react-redux";
import { SerializedError } from "@reduxjs/toolkit";
import { usePause } from "../../hooks/usePause";
import { getRandomColor } from "../../utils/randomColor";
const ClientItem = ({ client }: { client: ClientData }) => {
  const [doUpdateClient, isupdating, updatingError] = useThunk(updateClient);

  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingError, setDeletingError] = useState<Error | null>(null);
  const [showAlbum, setShowAlbum] = useState(false);
  const dispatch = useDispatch();
  const mapSerializedErrorToError = (error: SerializedError): Error => {
    return new Error(error.message);
  };
  const removeClientHandler = async () => {
    setIsDeleting(true);
    await usePause(1000);

    try {
      const resultAction = await dispatch(removeClient(client));
      if (removeClient.rejected.match(resultAction)) {
        const error = mapSerializedErrorToError(resultAction.error);
        setDeletingError(error);
      }
    } catch (err) {
      if (err instanceof Error) {
        setDeletingError(err);
      } else {
        setDeletingError(new Error("An unexpected error occurred"));
      }
    } finally {
      setIsDeleting(false);
    }
  };
  const updateClientHandler = () => {
    doUpdateClient(client);
  };
  const toggleHandler = () => {
    setShowAlbum(!showAlbum);
  };
  return (
    <>
      {showAlbum ? (
        <AlbumList client={client} toggleAlbum={toggleHandler} />
      ) : (
        <Card sx={styles.albumContainer}>
          <Stack sx={styles.title}>
            {isDeleting ? (
              <Typography sx={{ fontWeight: "bold", color: "red" }}>
                Is Deleting Client
              </Typography>
            ) : isupdating ? (
              <Typography>Is Updating Client</Typography>
            ) : (
              <Typography sx={styles.albumName}>
                {client.name}'s Disk
              </Typography>
            )}
            <ButtonGroup>
              <IconButton onClick={updateClientHandler}>
                <EditNoteIcon />
              </IconButton>
              <IconButton onClick={removeClientHandler}>
                <DeleteTwoTone />
              </IconButton>
              <IconButton onClick={toggleHandler}>
                <PreviewIcon />
              </IconButton>
            </ButtonGroup>
          </Stack>
          {deletingError && <Typography>Error Deleting Client</Typography>}
          {updatingError && <Typography> Error Updating Client</Typography>}
        </Card>
      )}
    </>
  );
};

export default ClientItem;

const styles = {
  albumContainer: {
    height: 200,
    width: 350,
    bgcolor: getRandomColor(),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    bgcolor: grey[200],
    opacity: 0.5,
    width: "100%",
    height: "40%",
  },
  albumName: {
    height: 40,
    paddingTop: 1,
    fontWeight: "bold",
    fontSize: 20,
  },
};
export interface AlbumProps {
  id: number;
  clientId: number;
  title: string;
}
