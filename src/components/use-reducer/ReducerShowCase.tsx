import { useReducer, useState } from "react";
import { CountActionKind, countReducer } from "./reducer";
import {
  Box,
  Button,
  ButtonGroup,
  OutlinedInput,
  Typography,
} from "@mui/material";

const initialState = {
  age: 18,
};
const ReducerShowCase = () => {
  const [inputValue, setInputValue] = useState(0);
  const [state, dispatch] = useReducer(countReducer, initialState);

  const handleAddAge = () => {
    // state = state + 1  XXX Wrong Way
    dispatch({
      type: CountActionKind.INCREASE,
      payload: inputValue,
    });
  };
  const handleRedAge = () => {
    dispatch({
      type: CountActionKind.DECREASE,
      payload: inputValue,
    });
  };
  return (
    <Box>
      <Typography sx={{ fontSize: 32, fontWeight: 900 }}>
        Mary--Age:{state.age}
      </Typography>
      <ButtonGroup sx={{ marginTop: 2 }}>
        <Button variant="contained" onClick={handleAddAge}>
          + Add
        </Button>
        <Button
          variant="contained"
          sx={{ bgcolor: "green" }}
          onClick={handleRedAge}
        >
          - Dec
        </Button>
      </ButtonGroup>
      <OutlinedInput
        sx={{ height: 36, marginLeft: 3 }}
        value={inputValue}
        onChange={(e) => setInputValue(+e.target.value)}
      />
    </Box>
  );
};

export default ReducerShowCase;
