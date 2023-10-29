import { Container, Grid, Button, Box, Typography, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import ClientItem from "./ClientItem";
import { RootState, addClients } from "../../store/store";
import Skeleton from "../../utils/Skeleton";
import { useEffect } from "react";
import { fetchClients } from "../../store/store";
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
  const handleAddClient = () => {
    doCreateClients();
  };
  return (
    <>
      {isLoadingClients ? (
        <Container>
          <Skeleton times={3} w={350} h={200} />
        </Container>
      ) : loadingClientsError ? (
        <Container>
          <Box>Loading Clients failed.</Box>
        </Container>
      ) : (
        <Container>
          <Stack sx={styles.title}>
            <Typography sx={{ fontSize: 30, fontWeight: "bold" }}>
              Photo Manager
            </Typography>
            <Button
              variant={isCreatingClient ? "outlined" : "contained"}
              onClick={handleAddClient}
              sx={{ marginBottom: 4 }}
            >
              {isCreatingClient ? "Creating Client" : "Add Client"}
            </Button>
          </Stack>
          <Typography>
            {creatingClientError && "Failed to create a client..."}
          </Typography>
          <Grid container gap={3}>
            {data.map((client) => {
              return (
                <Grid item key={client.id}>
                  <ClientItem key={client.id} client={client} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      )}
    </>
  );
};

export default PhotoManager;

const styles = {
  title: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 3,
    paddingRight: 7,
  },
};
