import React, { Suspense } from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
// import Users from "./pages/Users";
// import Places from "./pages/Places";
// import Header from "./Shared/Header";
// import AddPlace from "./pages/AddPlace";
// import UpdatePlace from "./pages/UpdatePlace";
// import Auth from "./pages/Auth";
import { AuthContext } from "./context/auth-context";
import { useAuth } from "./Shared/Hooks/auth-hook";
import LoadingSpinner from "./Shared/LoadingSpinner";

const Users = React.lazy(()=>import('./pages/Users'))
const Places = React.lazy(()=>import('./pages/Places'))
const Header = React.lazy(()=>import('./Shared/Header'))
const AddPlace = React.lazy(()=>import('./pages/AddPlace'))
const UpdatePlace = React.lazy(()=>import('./pages/UpdatePlace'))
const Auth = React.lazy(()=>import('./pages/Auth'))

const App = () => {
  const { token, login, logout, userId } = useAuth();

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <BrowserRouter>
          <Header />
          <Suspense fallback={<div> <LoadingSpinner></LoadingSpinner> </div>}  >
          <Routes>
            <Route path="/" element={<Users />} exact />
            <Route path="/:id/places" element={<Places />} exact />
            <Route path="/AddPlace" element={<AddPlace />} exact />
            <Route path="/place/:placeId" element={<UpdatePlace />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Users />} exact />
          </Routes>
          </Suspense>
          
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
};

export default App;
