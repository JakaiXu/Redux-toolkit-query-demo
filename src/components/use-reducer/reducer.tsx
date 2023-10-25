export enum CountActionKind {
  INCREASE = "INCREASE",
  DECREASE = "DECREASE",
}
interface CountAction {
  type: CountActionKind;
  payload: number;
}
interface CountState {
  age: number;
}

export const countReducer = (state: CountState, action: CountAction) => {
  const { type, payload } = action;
  switch (type) {
    case CountActionKind.INCREASE:
      return {
        // state = state + 1  XXX Wrong Way
        ...state,
        age: state.age + payload,
      };
    case CountActionKind.DECREASE:
      return {
        ...state,
        age: state.age - payload,
      };
    default:
      return state;
  }
};
