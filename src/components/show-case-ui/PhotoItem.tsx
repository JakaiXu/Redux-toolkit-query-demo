import { PhotoProps } from "./PhotoList";
import { Box } from "@mui/material";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { useRemovePhotoMutation } from "../../store/store";
import { LoadingButton } from "@mui/lab";

const PhotoItem = ({ photo }: { photo: PhotoProps }) => {
  const [removePhoto, results] = useRemovePhotoMutation();
  const handleRemovePhoto = () => {
    removePhoto(photo);
  };
  return (
    <Box
      sx={{ position: "relative", cursor: "pointer" }}
      onClick={handleRemovePhoto}
    >
      <Box component="img" sx={styles.img} src={photo.url} />
      <Box sx={styles.hoverBox}>
        {
          <LoadingButton loading={results.isLoading}>
            <DeleteOutlineOutlined sx={styles.icon} />
          </LoadingButton>
        }
      </Box>
    </Box>
  );
};

export default PhotoItem;
const styles = {
  img: { width: 200, height: 200, objectFit: "cover" },
  hoverBox: {
    position: "absolute",
    inset: 0,
    width: 200,
    height: 200,
    opacity: 0,
    "&: hover": {
      bgcolor: "grey",
      opacity: 0.6,
    },
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 48,
    color: "white",
  },
};
