/* HOOK: USE_SESSION_STORAGE
   ========================================================================== */

/**
 * Persist the state with session storage so that it remains after a page refresh
 * but will be removed when tab closed.
 * This can be useful for recording session information.
 * This hook is used in the same way as useState except that you must pass
 * the storage key in the 1st parameter. If the window object is not present (as in SSR),
 * useSessionStorage() will return the default value.
 *
 * @param key the storage key
 * @param initialValue default value if not specific
 * @returns a set of value and callback to modify value
 *
 * @example
 * ```
 * import React from 'react'
 * import { useLocalStorage } from 'usehooks-ts'
 *
 * // Usage
 * export default function Component() {
 *    const [isDarkTheme, setDarkTheme] = useSessionStorage('darkTheme', true)
 *
 *    const toggleTheme = () => {
 *        setDarkTheme(prevValue => !prevValue)
 *    }
 *
 *    return (
 *        <button onClick={toggleTheme}>
 *            {`The current theme is ${isDarkTheme ? `dark` : `light`}`}
 *        </button>
 *    )
 * }
 * ```
 */

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { parseJSON } from "utils/functions";
import useEventListener from "./useEventListener";

type SetValue<T> = Dispatch<SetStateAction<T>>;

const useSessionStorage = <T>(
  key: string,
  initialValue: T
): [T, SetValue<T>] => {
  // Get from session storage then parse stored json or return initialValue
  const readValue = (): T => {
    // Prevent build error "window is undefined"
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const item = window.sessionStorage.getItem(key);
      return item ? (parseJSON(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading sessionStorage key “${key}”:`, error);
      return initialValue;
    }
  };

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to sessionStorage.
  const setValue: SetValue<T> = (value) => {
    // Prevent build error "window is undefined"
    if (typeof window == "undefined") {
      console.warn(
        `Tried setting sessionStorage key “${key}” even though environment is not a client`
      );
    }

    try {
      // Allow value to be a function so we have the same API as useState
      const newValue = value instanceof Function ? value(storedValue) : value;

      // Save to session storage
      window.sessionStorage.setItem(key, JSON.stringify(newValue));

      // Save state
      setStoredValue(newValue);

      // We dispatch a custom event so every useSessionStorage hook are notified
      window.dispatchEvent(new Event("session-storage"));
    } catch (error) {
      console.warn(`Error setting sessionStorage key “${key}”:`, error);
    }
  };

  useEffect(() => {
    setStoredValue(readValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStorageChange = () => {
    setStoredValue(readValue());
  };

  // this only works for other documents, not the current one
  useEventListener("storage", handleStorageChange);

  // this is a custom event, triggered in writeValueToSessionStorage
  useEventListener("session-storage", handleStorageChange);

  return [storedValue, setValue];
};

export default useSessionStorage;
