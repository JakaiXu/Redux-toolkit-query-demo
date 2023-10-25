import { Container, Grid, Button, Box, Typography, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import ClientItem from "./ClientItem";
import { RootState, addClients } from "../../store/store";
import { useEffect } from "react";
import { fetchClients } from "../../store/store";
import Skeleton from "../../utils/Skeleton";
import { useThunk } from "../../hooks/useThunk";

const PhotoManager = () => {
  const { data } = useSelector((state: RootState) => state.clients);
  const [doFetchClients, isLoadingClients, loadingClientsError] =
    useThunk(fetchClients);
  const [doCreateClients, isCreatingClient, creatingClientError] =
    useThunk(addClients);
  useEffect(() => {
    doFetchClients();
  }, [doFetchClients]);
  const handleAddUser = () => {
    doCreateClients(addClients);
  };
  let content;
  if (isLoadingClients) {
    content = <Skeleton times={3} w={350} h={200} />;
  } else if (loadingClientsError) {
    content = <Box>Error fetching data...</Box>;
  } else {
    content = data.map((client) => {
      return (
        <Grid item key={client.id}>
          {isCreatingClient ? (
            <Skeleton times={1} w={350} h={200} />
          ) : (
            <ClientItem key={client.id} client={client} />
          )}
        </Grid>
      );
    });
  }
  return (
    <Container>
      <Stack
        sx={{
          justifyContent: "space-between",
          flexDirection: "row",
          paddingLeft: 3,
          paddingRight: 7,
        }}
      >
        <Typography sx={{ fontSize: 30, fontWeight: "bold" }}>
          Photo Manager
        </Typography>
        <Button
          variant="contained"
          onClick={handleAddUser}
          sx={{ marginBottom: 4 }}
        >
          {isCreatingClient ? "Creating Client" : "Add Client"}
        </Button>
      </Stack>

      <Typography>
        {creatingClientError && "Failed to create a client..."}
      </Typography>
      <Grid container gap={3}>
        {content}
      </Grid>
    </Container>
  );
};

export default PhotoManager;
