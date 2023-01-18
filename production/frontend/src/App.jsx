import MapView from "./components/MapView/MapView";
import Avatar from "./layout/Avatar";
import CriteriaContainer from "./components/Criteria/CriteriaContainer";
import Logo from "./layout/Logo";
import RouteForm from "./components/RouteForm/RouteForm";
import UserManagement from "./components/UserManagement/UserManagement";
import { Fragment, useRef } from "react";
import MapContext from "./context/MapContext";

const App = () => {
  const map = useRef();

  return (
    <Fragment>
      <MapContext.Provider value={map}>
        <UserManagement />
        <RouteForm />
        <CriteriaContainer />
        <MapView />
      </MapContext.Provider>
      <Logo />
      <Avatar />
    </Fragment>
  );
};

export default App;
