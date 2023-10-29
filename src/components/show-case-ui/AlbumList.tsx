import {
  Box,
  ButtonGroup,
  Card,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { CloseTwoTone } from "@mui/icons-material";
import { orange } from "@mui/material/colors";
import { useAddAlbumMutation, useFetchAlbumsQuery } from "../../store/store";
import Skeleton from "../../utils/Skeleton";
import AlbumItem, { AlbumItemProps } from "./AlbumItem";
import { ClientData } from "../../store/slices/used-for-AsyncThunk/clientsSlice";
import { LoadingButton } from "@mui/lab";

const AlbumList = ({
  client,
  toggleAlbum,
}: {
  client: ClientData;
  toggleAlbum: () => void;
}) => {
  const { data, isError, isLoading } = useFetchAlbumsQuery(client);
  const [addAlbum, results] = useAddAlbumMutation();
  const handleAddAlbum = () => {
    addAlbum(client);
  };
  let content;
  if (isLoading) {
    content = <Skeleton times={1} w={900} h={200} />;
  } else if (isError) {
    content = <Box>Error loading albums.</Box>;
  } else {
    content = data.map((album: AlbumItemProps) => (
      <AlbumItem album={album} key={album.id} />
    ));
  }
  return (
    <Card sx={styles.container}>
      <Stack sx={styles.title}>
        <Typography sx={styles.albumName}>{client.name}'Albums</Typography>
        <ButtonGroup>
          {
            <LoadingButton loading={results.isLoading} onClick={handleAddAlbum}>
              <AddBoxIcon />
            </LoadingButton>
          }
          <IconButton onClick={toggleAlbum}>
            <CloseTwoTone />
          </IconButton>
        </ButtonGroup>
      </Stack>
      <Container sx={styles.albumItemContainer}>{content}</Container>
    </Card>
  );
};

export default AlbumList;
const styles = {
  container: {
    width: 1100,
    minHeight: "20vh",
    height: "max-content",
    bgcolor: orange[200],
    marginTop: 2,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingX: 10,
    background: "rgba(105,150,150,0.2)",
    alignItems: "center",
    opacity: 0.5,
  },
  albumName: {
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
  },
  albumItemContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
    padding: 2,
  },
};
