const storage = localStorage;

export const getData = (key: string) => {
  return storage.getItem(key);
};

export const storeData = (key: string, value: string) => {
  return storage.setItem(key, value);
};

export const removeData = (key: string) => {
  return storage.removeItem(key);
};
