// src/components/Footer.jsx
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" bg-deepPlum/95 text-white py-8 px-4 border border-t-2 border-warmPeach/50">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h2 className="text-xl font-bold text-warmPeach mb-2">Muhurtham ❤️</h2>
          <p className="text-sm">
            Your trusted Tamil matrimony platform focused on love, culture, and commitment.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-warmPeach mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/home" className="hover:text-warmPeach">Home</Link></li>
            <li><Link to="/matches" className="hover:text-warmPeach">Matches</Link></li>
            <li><Link to="/interest" className="hover:text-warmPeach">Interest</Link></li>
            <li><Link to="/profile" className="hover:text-warmPeach">Profile</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-warmPeach mb-2">Support</h3>
          <ul className="space-y-1 text-sm">
            <li>Email: support@muhurtham.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Customer Care: 24/7</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-warmPeach">
        © {new Date().getFullYear()} Muhurtham Matrimony. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
