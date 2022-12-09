import React, {
    useState,
    useEffect
} from "react";


function useLocalStorage(key, initialValue = null) {
    const initialValue = localStorage.getItem(key) || initialValue;
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        console.debug("useLocalStorage useEffect", "value=", value);

        if (value === null) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, value);
        }
    }, [key, value]);

    return [value, setValue];

}

export default useLocalStorage;