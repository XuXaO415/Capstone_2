import React, {
    useState,
    useEffect
} from "react";


function useLocalStorage(key, initialValue = null) {
    const [value, setValue] = useState(() => {
        const item = localStorage.getItem(key);
        return item ? item : initialValue;
    });



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