export const debounce = (func, ms) => {
  let timeout;

  // eslint-disable-next-line
  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      func.apply(this, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, ms);
  };
};
