import { useState } from "react";
import { User } from "../Types/User";

export const useLocalStorage = (key: string, initialValue: string) => {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key) ?? "");
    } catch {
      return initialValue;
    }
  });

  const save = (value: User) => {
    setValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  return [value, save];
};
