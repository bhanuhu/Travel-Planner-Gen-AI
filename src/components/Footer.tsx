
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8 mt-12 border-t bg-background">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold">Travel Planner</h3>
            <p className="text-muted-foreground">
              Find your perfect travel experience with personalized trip planning and seamless booking.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-foreground">
                <Facebook size={18} />
              </a>
              <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground">
                <Twitter size={18} />
              </a>
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-foreground">
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-medium uppercase">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-muted-foreground hover:text-foreground">
                  Plan a Trip
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-muted-foreground hover:text-foreground">
                  Login / Sign Up
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">
                  My Trips
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-medium uppercase">Our Partners</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">ZingBus</li>
              <li className="text-muted-foreground">RedBus</li>
              <li className="text-muted-foreground">Ramada</li>
              <li className="text-muted-foreground">Oyo</li>
              <li className="text-muted-foreground">Uber</li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-medium uppercase">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-muted-foreground">
                <Mail className="w-4 h-4 mr-2" />
                <span>support@travelplanner.com</span>
              </li>
              <li className="flex items-center text-muted-foreground">
                <Phone className="w-4 h-4 mr-2" />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col items-center pt-8 mt-8 text-sm border-t md:flex-row md:justify-between">
          <p className="text-muted-foreground">
            © {new Date().getFullYear()} Travel Planner. All rights reserved.
          </p>
          <div className="flex mt-4 space-x-6 md:mt-0">
            <Link to="#" className="text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link to="#" className="text-muted-foreground hover:text-foreground">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
