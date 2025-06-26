export const saveToLocalStorage = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadFromLocalStorage = <T>(key: string): T | null => {
  const data = localStorage.getItem(key);
  return data ? (JSON.parse(data) as T) : null;
};
