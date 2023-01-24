import { useState, useEffect } from "react";

function useLocalStorage(key, firstValue = null) {
  const initialValue = localStorage.getItem(key) || firstValue;

  const [item, setItem] = useState(initialValue);

  useEffect(
    function setKeyInLocalStorage() {
      console.debug("hooks useLocalStorage useEffect", "item=", item);

      if (item === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, item);
      }
    },
    [key, item]
  );

  return [item, setItem];
}

// function useLocalStorage(key, initialValue = null) {
//   const firstValue = localStorage.getItem(key) || initialValue;
//   const [storedValue, setStoredValue] = useState(firstValue);

//   React.useEffect(() => {
//     localStorage.setItem(key, storedValue);
//     console.debug(
//       "Hook is running & using 'useLocalStorage', useEffect",
//       "storedValue=",
//       storedValue
//     );
//     if (storedValue === null) {
//       localStorage.removeItem(key);
//     } else {
//       localStorage.setItem(key, storedValue);
//     }
//   }, [key, storedValue]);
//   return [storedValue, setStoredValue];
// }

// const useLocalStorage = (key) => {
//   const [value, setValue] = useState(() => {
//     try {
//       const item = window.localStorage.getItem(key);
//       return item ? JSON.parse(item) : null;
//     } catch (err) {
//       console.error(err);
//       return null;
//     }
//   });

//   useEffect(() => {
//     try {
//       window.localStorage.setItem(key, JSON.stringify(value));
//       setValue(value);
//     } catch (err) {
//       console.error(err);
//     }
//   }, [key, value]);

//   return [value, setValue];
// };

export default useLocalStorage;
