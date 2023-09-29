import { Navigate, Outlet, Route, useLocation  } from "react-router-dom";

export default function Protected() {
  const cookie = decodeURIComponent(document.cookie);
  const session = cookie.split("=")[0];  

  let location = useLocation();

  if(!session) {
     return (
      <>
        <Outlet />
        <Navigate to="/" />
      </>
    );
    }else {
      return (
        <>
          <Outlet />
          <Navigate to={location.pathname || "/dashboard"}/>
        </>
      );
    }
}
