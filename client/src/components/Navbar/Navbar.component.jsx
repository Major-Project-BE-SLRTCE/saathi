import useAuth from "../../hooks/useAuth";
import {
  NavbarContainer,
  NavbarLink,
  NavbarRedirectLinkWrapper,
  NavbarRedirectLink
} from "./Navbar.styled";

const Navbar = () => {
  const { auth } = useAuth();

  // console.log(auth);

  return (
    <NavbarContainer>
      <NavbarLink to="/">Saathi</NavbarLink>

      <NavbarRedirectLinkWrapper>
        {!auth.isLoggedIn ? (
          <>
            <NavbarRedirectLink to="/login">Login</NavbarRedirectLink>
            <NavbarRedirectLink to="/signup">Register</NavbarRedirectLink>
            <NavbarRedirectLink to="/forgot-password">
              Forgot Pwd.
            </NavbarRedirectLink>
            <NavbarRedirectLink to="/reset-password">
              Reset Pwd.
            </NavbarRedirectLink>
          </>
        ) : (
          <NavbarRedirectLink to="/dashboard">Dashboard</NavbarRedirectLink>
        )}
      </NavbarRedirectLinkWrapper>
    </NavbarContainer>
  );
};

export default Navbar;
