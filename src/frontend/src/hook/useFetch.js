import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setError(null);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setData(null);
        setIsLoading(false);
      });
  }, [url]);
  return { isLoading, data, error };
};
export default useFetch;
