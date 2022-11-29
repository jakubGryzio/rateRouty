import "./App.css";
import MapView from "./components/Map/MapView";
import Avatar from "./components/UI/Avatar";
import CriteriaContainer from "./components/UI/CriteriaContainer";
import Logo from "./components/UI/Logo";
import RouteForm from "./components/UI/RouteForm";
import UserManagement from "./components/User/UserManagement";
import Account from "./components/User/Account/Account";
// import RouteGeocoding from "./components/Map/RouteGeocoding";
import { useSelector } from "react-redux";
import React, { useRef } from "react";

const App = () => {
  const modal = useSelector((state) => state.ui.showModal);
  const map = useRef();

  return (
    <React.Fragment>
      <Logo />
      <Avatar />
      <UserManagement map={map} />
      {modal && <Account />}
      <CriteriaContainer map={map} />
      <RouteForm />
      <MapView ref={map} />
    </React.Fragment>
  );
};

export default App;
