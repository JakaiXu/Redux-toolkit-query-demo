import { Box, Button, Card, InputBase, Stack, Typography } from "@mui/material";
import { deepOrange, lime, orange, teal } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { RootState, addHob, removeHob, addUser,removeUser } from "../../store/store";
import { useState } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const { users, hobs } = useSelector((state: RootState) => state);
  const addUserHandler = () => {
    dispatch(addUser({ name: inputValue }));
    setInputValue("");
  };
  const removeUserHandler = (id: string) => {
    dispatch(removeUser({ id: id }));
  };
  const addHobHandler = () => {
    dispatch(addHob({ hob: inputValue }));
    setInputValue("");
  };
  const removeHobHandler = (whatever: string) => {
    dispatch(removeHob({ hob: whatever }));
  };
  return (
    <Box sx={styles.container}>
      <InputBase
        placeholder="please enter your content..."
        sx={styles.input}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Stack flexDirection="row" gap={4}>
        <StyledCard sx={{ bgcolor: teal[200] }}>
          Users:
          {users.map((user) => (
            <Box key={user.id}>
              <Typography sx={{ fontSize: 20 }}>{user.name}</Typography>
              <Button onClick={() => removeUserHandler(user.id)}>
                Remove User
              </Button>
            </Box>
          ))}
          <Button onClick={addUserHandler}>Add User</Button>
        </StyledCard>
        <StyledCard sx={{ bgcolor: lime[200] }}>
          Hobbies:
          {hobs.map((hob) => (
            <Box key={hob.id}>
              <Typography sx={{ fontSize: 20 }}>{hob.hob}</Typography>
              <Button onClick={() => removeHobHandler(hob.id)}>
                Remove Hobby
              </Button>
            </Box>
          ))}
          <Button onClick={addHobHandler}>Add an Hobby</Button>
        </StyledCard>
        <StyledCard sx={{ bgcolor: orange[200] }}>
          Colors:
          <Typography sx={{ fontSize: 20 }}>Red</Typography>
        </StyledCard>
        <StyledCard sx={{ bgcolor: deepOrange[200] }}>
          Favors:
          <Typography sx={{ fontSize: 20 }}>Tomato</Typography>
        </StyledCard>
      </Stack>
    </Box>
  );
};

export default Home;

const StyledCard = styled(Card)(() => ({
  height: "max-content",
  width: 300,
  fontSize: 20,
  fontWeight: "bold",
  letterSpacing: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  paddingBlock: 30,
}));
const styles = {
  container: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    flexFlow: "wrap",
    gap: 2,
    paddingX:20
  },
  input: {
    border: "1px solid grey",
    width: "100%",
    paddingLeft: 2,
    borderRadius: 2,
    height: 50,
  },
};
