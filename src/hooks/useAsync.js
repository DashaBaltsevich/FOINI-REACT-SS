import { useState, useEffect, useCallback } from 'react';

export const useAsync = (asyncFunc, args, deps, immediate = true) => {
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    (...body) => {
      if (!asyncFunc) {
        return Promise.resolve();
      }

      setLoading(true);
      setValue(null);
      setError(null);

      return asyncFunc(...(body.length ? body : args))
        .then((response) => {
          setLoading(true);
          setValue(response);

          return response;
        })
        .catch((error) => {
          setLoading(false);
          setError(error);

          if (!immediate) {
            throw error;
          }
        })
        .finally(() => {
          setLoading(false);
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [asyncFunc, ...deps],
  );

  useEffect(() => {
    if (immediate) {
      execute(...args);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [execute, ...deps]);

  return {
    value,
    error,
    loading,
    execute,
  };
};
