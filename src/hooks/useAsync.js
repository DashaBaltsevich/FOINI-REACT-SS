import { useState, useEffect, useCallback } from "react";


export const useAsync = (
  asyncFunc,
  args,
  deps,
  immediate = true,
) => {
  
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback((...body) => {

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
      })
      .finally (() => {
        setLoading(false);
      });
  }, [asyncFunc]);

  useEffect(() => {
    if(immediate) {
      execute(...args);
    } 
  }, [execute, immediate, ...deps])

  return {
    value,
    error,
    loading,
    execute,
  }
}