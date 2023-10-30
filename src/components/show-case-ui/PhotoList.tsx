import {
  Box,
  ButtonGroup,
  Card,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import PreviewIcon from "@mui/icons-material/Preview";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { blueGrey } from "@mui/material/colors";
import { AlbumItemProps } from "./AlbumItem";
import { useAddPhotoMutation, useFetchPhotosQuery } from "../../store/store";
import Skeleton from "../../utils/Skeleton";
import PhotoItem from "./PhotoItem";
import { LoadingButton } from "@mui/lab";
export interface PhotoProps {
  id: number;
  url: string;
  albumId: number;
}
const PhotoList = ({
  togglePhotoList,
  album,
}: {
  togglePhotoList: () => void;
  album: AlbumItemProps;
}) => {
  const { data, isError, isLoading } = useFetchPhotosQuery(album);
  const [addPhoto, results] = useAddPhotoMutation();
  const handleAddPhoto = () => {
    addPhoto(album);
  };
  let content;
  if (isLoading) {
    content = <Skeleton times={1} w={200} h={200} />;
  } else if (isError) {
    content = <Box>Error loading photos.</Box>;
  } else {
    content = data.map((photo: PhotoProps) => (
      <PhotoItem photo={photo} key={photo.id} />
    ));
  }
  return (
    <Card sx={styles.container}>
      <Stack sx={styles.title}>
        <Typography sx={styles.photoListTitle}>{album.title}</Typography>
        <ButtonGroup>
          {
            <LoadingButton loading={results.isLoading} onClick={handleAddPhoto}>
              <AddBoxIcon />
            </LoadingButton>
          }
          <IconButton onClick={togglePhotoList}>
            <PreviewIcon />
          </IconButton>
        </ButtonGroup>
      </Stack>
      {<Container sx={styles.photoList}>{content}</Container>}
    </Card>
  );
};

export default PhotoList;
const styles = {
  container: {
    width: 1000,
    minHeight: 300,
    height: "max-content",
    bgcolor: blueGrey[100],
    marginTop: 2,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingX: 3,
    background: "rgba(105,150,150,0.2)",
    alignItems: "center",
    opacity: 0.5,
  },
  photoList: { display: "flex", flexDirection: "row", gap: 2, padding: 2 },
  photoListTitle: {
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
  },
};
