import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

export function useThunk(thunk) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const runThunk = useCallback(() => {
    setIsLoading(true);
    dispatch(thunk())
      .unwrap()
      .catch((err: Error | null) => setError(err))
      .finally(() => setIsLoading(false));
  }, [dispatch, thunk]);
  return [runThunk, isLoading, error];
}