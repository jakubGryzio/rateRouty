import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

function buttonFactory(isLogged) {
  if (!isLogged) return <LoginButton />;
  return <LogoutButton />;
}

export default buttonFactory;
