import useAuth from "../hooks/useAuth";

import "./css/patient-dashboard.css";

const PatientDashboard = () => {
  const { auth, setAuth } = useAuth();

  document.title = "Dashboard - Saathi";

  return (
    <div className="p-dash">
      <h1>
        {`${auth?.userType[0]?.toUpperCase()}${auth?.userType?.slice(1)}`}'s
        Dashboard
      </h1>

      <span>
        <strong>Name:</strong> {auth.name}
      </span>
    </div>
  );
};

export default PatientDashboard;
