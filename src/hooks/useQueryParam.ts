import { useCallback } from 'react';
import { NavigateOptions, useSearchParams } from 'react-router-dom';

export function useQueryParam(
  key: string
): [string | undefined, (newQuery: string, options?: NavigateOptions) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramValue = searchParams.get(key) || '';

  const setValue = useCallback(
    (newValue: string, options?: NavigateOptions) => {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(key, newValue);
      setSearchParams(newSearchParams, options);
    },
    [key, searchParams, setSearchParams]
  );

  return [paramValue, setValue];
}
