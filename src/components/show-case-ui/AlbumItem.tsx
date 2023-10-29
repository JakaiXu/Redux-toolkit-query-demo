import { useRemoveAlbumMutation } from "../../store/store";
import { Card, Container, IconButton, Typography } from "@mui/material";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import { useState } from "react";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import PhotoList from "./PhotoList";
import { cyan } from "@mui/material/colors";
import LoadingButton from "@mui/lab/LoadingButton";
export interface AlbumItemProps {
  id: number;
  title: string;
  clientId: number;
}
const AlbumItem = ({ album }: { album: AlbumItemProps }) => {
  const [showPhotoList, setShowPhotoList] = useState(false);
  const [removeAlbum, results] = useRemoveAlbumMutation();
  const handleRemoveAlbum = () => {
    removeAlbum(album);
  };
  const togglePhotoList = () => {
    setShowPhotoList(!showPhotoList);
  };
  return (
    <>
      {showPhotoList ? (
        <Container sx={styles.photoListContainer}>
          <PhotoList
            album={album}
            key={album.id}
            togglePhotoList={togglePhotoList}
          />
        </Container>
      ) : (
        <Card sx={styles.albumItem}>
          <Typography sx={styles.albumName}>{album.title}</Typography>
          <IconButton sx={styles.iconButton} onClick={togglePhotoList}>
            <AspectRatioIcon />
            <Typography sx={styles.title}>Open Photo List</Typography>
          </IconButton>
          {
            <LoadingButton
              loading={results.isLoading}
              onClick={handleRemoveAlbum}
              sx={styles.deleteButton}
            >
              <DeleteOutlineOutlined />
            </LoadingButton>
          }
        </Card>
      )}
    </>
  );
};

export default AlbumItem;

const styles = {
  photoListContainer: {
    display: "flex",
    flexDirection: "column",
  },
  albumItem: {
    width: 200,
    height: 250,
    bgcolor: cyan[100],
    position: "relative",
  },
  albumName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginY: 2,
  },
  iconButton: {
    width: "100%",
    margin: "0 auto",
    borderRadius: "2px",
  },
  deleteButton: {
    position: "absolute",
    bottom: 10,
    right: 5,
  },
  title: { marginLeft: 1, fontWeight: "bold" },
};
