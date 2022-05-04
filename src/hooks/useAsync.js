import { useState, useEffect, useCallback } from "react";


export const useAsync = (
  asyncFunc,
  args,
  deps,
  immediate = true,
) => {
  
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  const execute = useCallback((body) => {

    setLoading("loading");
    setValue(null);
    setError(null);


    return asyncFunc(body)
      .then((response) => {
        console.log(response);
        setValue(response);
        console.log(value)

      })
      .catch((error) => {
        setError(error);

      });
  }, [asyncFunc, value]);

  useEffect(() => {
    if(immediate) {
      execute();
    } 
  }, [execute, immediate])

  return {
    value,
    error,
    loading,
    execute,
  }
}