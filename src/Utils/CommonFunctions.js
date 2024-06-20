import { useEffect, useState } from "react";
import { Sort, SortAsc, SortDesc } from "./Images";

export const debounce = (func, timeOut = 600) => {
  let timer;
  return (...args) => {
    const context = this;
    const trimmedArgs = args.map(arg => typeof arg === 'string' ? arg.trim() : arg);
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      func.apply(context, trimmedArgs); 
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

export const useTableScreenResponsive = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
};
