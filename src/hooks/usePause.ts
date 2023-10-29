export const usePause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export const delay = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};
