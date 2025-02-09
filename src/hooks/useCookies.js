import { useState } from "react";

const useCookies = () => {
  const getCookie = (name) => {
    const cookieString = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`));
    return cookieString ? cookieString.split("=")[1] : null;
  };

  const setCookie = (name, value, days = 7) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/`;
  };

  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  return { getCookie, setCookie, deleteCookie };
};

export default useCookies;