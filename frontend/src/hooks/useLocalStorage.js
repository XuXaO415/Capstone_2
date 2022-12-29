import React, { useState, useEffect } from "react";

function useLocalStorage(key, initialValue = null) {
  const firstValue = localStorage.getItem(key) || initialValue;
  const [storedValue, setStoredValue] = useState(firstValue);

  React.useEffect(() => {
    localStorage.setItem(key, storedValue);
    console.debug(
      "Hook is running & using 'useLocalStorage', useEffect",
      "storedValue=",
      storedValue
    );
    if (storedValue === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, storedValue);
    }
  }, [key, storedValue]);
  return [storedValue, setStoredValue];
}

export default useLocalStorage;
