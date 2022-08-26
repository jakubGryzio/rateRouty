import "./App.css";
import MapView from "./components/Map/MapView";
import Avatar from "./components/UI/Avatar";
import CriteriaContainer from "./components/UI/CriteriaContainer";
import Logo from "./components/UI/Logo";
import RouteForm from "./components/UI/RouteForm";
import UserManagement from "./components/User/UserManagement";
import Account from "./components/User/Account/Account";
import RouteGeocoding from "./components/Map/RouteGeocoding";
import { useSelector } from "react-redux";
import React from "react";

const App = () => {
  const modal = useSelector((state) => state.ui.showModal);

  return (
    <React.Fragment>
      <Logo />
      <Avatar />
      <UserManagement />
      {modal && <Account />}
      <CriteriaContainer />
      <RouteForm />
      <MapView />
    </React.Fragment>
  );
};

export default App;
