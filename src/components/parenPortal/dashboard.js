
import { Users, DollarSign, TrendingUp } from "lucide-react";
import Navbar from "../layout/Navbar";
import Footer from "../layout/footer";

const Dashboard = () => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Navbar */}
      <Navbar/>

      {/* Banner */}
      <div className="banner d-flex align-items-center justify-content-center text-white">
        <div className="text-center">
          <h1 className="display-4 fw-bold">Welcome to Your Dashboard</h1>
          <p className="lead">Monitor your business metrics in real-time</p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container">
        <div className="dashboard-grid">
          <div className="stat-card">
            <div className="d-flex align-items-center mb-3">
              <Users className="text-primary me-2" size={24} />
              <h3 className="mb-0">Users</h3>
            </div>
            <h2 className="display-6 mb-0">1,234</h2>
            <p className="text-success mb-0">+12% from last month</p>
          </div>

          <div className="stat-card">
            <div className="d-flex align-items-center mb-3">
              <DollarSign className="text-primary me-2" size={24} />
              <h3 className="mb-0">Revenue</h3>
            </div>
            <h2 className="display-6 mb-0">$45,678</h2>
            <p className="text-success mb-0">+8% from last month</p>
          </div>

          <div className="stat-card">
            <div className="d-flex align-items-center mb-3">
              <TrendingUp className="text-primary me-2" size={24} />
              <h3 className="mb-0">Growth</h3>
            </div>
            <h2 className="display-6 mb-0">23%</h2>
            <p className="text-success mb-0">+5% from last month</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
