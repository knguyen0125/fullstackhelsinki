let savedItems = {};

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item;
  },
  getItem: key => savedItems[key],
  clear: () => {
    savedItems = {};
  },
  removeItem: key => {
    delete savedItems[key];
  }
};

Object.defineProperty(window, "localStorage", { value: localStorageMock });
