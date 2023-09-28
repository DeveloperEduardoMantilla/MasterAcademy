import { Navigate, Outlet, Route } from "react-router-dom";
/*
export default function PrivateRoute({path, children, redirectTo }){
  const cookie = decodeURIComponent(document.cookie);
  const session = cookie.split("=")[0];  

  return (
    <Route
      path={path}
      element={session ? <Navigate to={redirectTo} /> : children}
    >
    </Route>
  )
}*/

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
