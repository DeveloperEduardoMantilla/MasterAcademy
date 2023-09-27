import { Navigate, Outlet } from "react-router-dom";

export default function Protected({children}) {
  const cookie = decodeURIComponent(document.cookie);
  const session = cookie.split("=")[0];  
 
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
        <Navigate to="/dashboard" />
      </>
    );
  }
}
