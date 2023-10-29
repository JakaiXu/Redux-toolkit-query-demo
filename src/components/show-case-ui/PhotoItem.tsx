import { PhotoProps } from "./PhotoList";
import { Box, Stack, Typography } from "@mui/material";
import { DeleteOutlineOutlined } from "@mui/icons-material";
import { getRandomColor } from "../../utils/randomColor";
import { useRemovePhotoMutation } from "../../store/store";
import { LoadingButton } from "@mui/lab";

const PhotoItem = ({ photo }: { photo: PhotoProps }) => {
  const [removePhoto, results] = useRemovePhotoMutation();
  const handleRemovePhoto = () => {
    removePhoto(photo);
  };
  return (
    <Box>
      <Box component="img" sx={styles.img} src={photo.url} />
      <Stack sx={styles.title}>
        <Typography sx={styles.label}>{photo.id}</Typography>
        {
          <LoadingButton
            loading={results.isLoading}
            onClick={handleRemovePhoto}
          >
            <DeleteOutlineOutlined />
          </LoadingButton>
        }
      </Stack>
    </Box>
  );
};

export default PhotoItem;
const styles = {
  title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingX: 2,
    bgcolor: getRandomColor(),
  },
  label: {
    bgcolor: "grey",
    width: "30px",
    height: "30px",
    borderRadius: "50px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.6,
  },
  img: { width: 200, height: 200, objectFit: "cover" },
};
