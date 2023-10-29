import { AsyncThunk } from "@reduxjs/toolkit";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

export function useThunk<T>(
  thunk: AsyncThunk<T, undefined, Record<string, never>>
)  {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<T | null>(null);
  const runThunk = useCallback(() => {
    setIsLoading(true);
    dispatch(thunk())
      .unwrap()
      .catch((err: T | null) => setError(err))
      .finally(() => setIsLoading(false));
  }, [dispatch, thunk]);
  return [runThunk, isLoading, error];
}
