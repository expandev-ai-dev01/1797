import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

/**
 * @hook useQueryString
 * @summary Manages URL query string parameters for state persistence.
 * @domain core
 * @type utility-hook
 * @category navigation
 */
export const useQueryString = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setParam = useCallback(
    (key: string, value: string | number | null) => {
      const newSearchParams = new URLSearchParams(searchParams);
      if (value === null || value === '') {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, String(value));
      }
      setSearchParams(newSearchParams, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const getParam = useCallback(
    (key: string) => {
      return searchParams.get(key);
    },
    [searchParams]
  );

  const getArray = useCallback(
    (key: string) => {
      return searchParams.getAll(key);
    },
    [searchParams]
  );

  const setArray = useCallback(
    (key: string, values: string[]) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete(key);
      values.forEach((value) => newSearchParams.append(key, value));
      setSearchParams(newSearchParams, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  return {
    searchParams,
    setParam,
    getParam,
    getArray,
    setArray,
  };
};
