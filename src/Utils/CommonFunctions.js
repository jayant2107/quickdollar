import { Sort, SortAsc, SortDesc } from "./Images";

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

export const srcSortImage = (Basis, sortParam) => {
  if (Basis === sortParam.sortBasis) {
    if (sortParam.sortType === "asc") {
      return SortAsc;
    } else {
      return SortDesc;
    }
  } else {
    return Sort;
  }
};