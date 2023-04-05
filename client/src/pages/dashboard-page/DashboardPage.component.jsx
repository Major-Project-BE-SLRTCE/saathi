import useAuth from "../../hooks/useAuth";
const DashboardPage = () => {
  const { user } = useAuth();
  return <h1>Dashboard</h1>;
};

export default DashboardPage;
