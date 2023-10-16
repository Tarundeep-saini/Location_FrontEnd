import { useCallback, useEffect, useRef, useState } from "react";
export const useHttpClient = () => {
  const [isLoading, SetIsLoading] = useState(false);
  const [isError, SetError] = useState(null);

  const activeHttpRequest = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      SetIsLoading(true);

      const httpAbortCtrll = new AbortController();
      activeHttpRequest.current.push(httpAbortCtrll);
      try {
        const response = await fetch(url, {
            method,
            body,
            headers,
            signal: httpAbortCtrll.signal
          });

        const responseData = await response.json();

        activeHttpRequest.current = activeHttpRequest.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrll
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        SetIsLoading(false);
        return responseData;
      } catch (error) {
        SetIsLoading(false);
        SetError(error.message);
        throw error;
      }
    },
    []
  );

  const clearError = () => {
    SetError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequest.current.forEach((abortctrl) => abortctrl.abort());
    };
  }, []);

  return { isLoading, isError, sendRequest, clearError };
};
