export const debounce = (func, timeOut = 600) => {
  let timer;
  return (...args) => {
    const context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, args);
    }, timeOut);
  };
};
