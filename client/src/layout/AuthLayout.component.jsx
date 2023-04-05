import Navbar from "../components/Navbar/Navbar.component";

const AuthLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default AuthLayout;
