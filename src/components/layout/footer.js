const Footer = () => {
    return (
      <footer className="footer mt-auto bg-dark text-white py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>About</h5>
              <p>A modern dashboard for monitoring your business metrics and analytics in real-time.</p>
            </div>
            <div className="col-md-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white">Documentation</a></li>
                <li><a href="#" className="text-white">Support</a></li>
                <li><a href="#" className="text-white">Terms of Service</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Contact</h5>
              <ul className="list-unstyled">
                <li>Email: info@dashboard.com</li>
                <li>Phone: (555) 123-4567</li>
                <li>Address: 123 Dashboard St</li>
              </ul>
            </div>
          </div>
          <hr className="mt-4 mb-4" />
          <div className="text-center">
            <p className="mb-0">© 2024 Dashboard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  