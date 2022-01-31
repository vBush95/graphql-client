import React, { useEffect, useState, useCallback } from "react";
import { setAccessToken } from "./context/accessToken";

import App from "./App";

const AppRefresh = () => {
  const [loading, setLoading] = useState(true);

  const fetchRefreshToken = useCallback(async () => {
    const result = await fetch(
      "https://server-meine-tolle-seite-1.herokuapp.com/refresh_token",
      {
        method: "POST",
        credentials: "include",
      }
    );
    const { ok, accessToken } = await result.json();
    //console.log("accessToken", accessToken);
    setAccessToken(accessToken);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRefreshToken();
    const interval = setInterval(() => {
      // refetch refresh token before it expires
      fetchRefreshToken();
    }, 895000);

    return () => clearInterval(interval);
  }, [fetchRefreshToken]);

  if (loading) {
    return <div>loading...</div>;
  }
  return <App />;
};

export default AppRefresh;
