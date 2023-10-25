import { Box, Stack, Typography, keyframes, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { ReactNode } from "react";

const Skeleton = ({
  times,
  w,
  h,
  children,
}: {
  times: number;
  w: number;
  h: number;
  children?: ReactNode;
}) => {
  const boxes = Array(times)
    .fill(0)
    .map((_, i) => {
      return (
        <Box
          key={i}
          sx={{
            position: "relative",
            overflow: "hidden",
            bgcolor: grey[200],
            borderRadius: 1,
            marginBottom: 2,
            width: w,
            height: h,
          }}
        >
          <StyledBox />
          <Typography sx={{ textAlign: "center", marginTop: "15%" }}>
            {children}
          </Typography>
        </Box>
      );
    });
  return (
    <Stack flexDirection="row" gap={3}>
      {boxes}
    </Stack>
  );
};

export default Skeleton;

const shimmer = keyframes`
  0% {
    transform: translateX(-100%)
  }
  100% {
    transform: translateX(100%)
  }
`;
const StyledBox = styled(Box)(() => ({
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  background: "linear-gradient(to right, #eeeeee 0%, white 50%, #eeeeee 100%)",
  animation: `${shimmer} 1.5s infinite ease`,
}));
