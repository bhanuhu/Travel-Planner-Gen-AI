
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MenuIcon, X, User, LogOut } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Auth state
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  
  useEffect(() => {
    // Check auth state on mount and when location changes
    const checkAuthState = () => {
      const user = localStorage.getItem("user");
      const admin = localStorage.getItem("admin");
      setIsLoggedIn(!!user);
      setIsAdmin(!!admin);
    };
    
    checkAuthState();
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleLogout = () => {
    if (isAdmin) {
      localStorage.removeItem("admin");
      setIsAdmin(false);
    } else {
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    }
    
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link to="/" className="flex items-center">
          <h1 className="text-xl font-bold">Travel Planner</h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          <Link to="/" className={`text-sm font-medium ${location.pathname === "/" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}>
            Home
          </Link>
          <Link to="/search" className={`text-sm font-medium ${location.pathname === "/search" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}>
            Plan Trip
          </Link>
          
          {isLoggedIn && !isAdmin && (
            <Link to="/dashboard" className={`text-sm font-medium ${location.pathname === "/dashboard" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}>
              My Trips
            </Link>
          )}
          
          {isAdmin && (
            <Link to="/admin/dashboard" className={`text-sm font-medium ${location.pathname === "/admin/dashboard" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}>
              Admin Dashboard
            </Link>
          )}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex md:items-center md:gap-2">
          {isLoggedIn || isAdmin ? (
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/auth?tab=signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" className="p-2 md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
        </Button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <Card className="absolute left-0 right-0 z-50 w-[calc(100%-2rem)] mx-4 mt-2 top-16 md:hidden">
            <div className="p-4 space-y-3">
              <Link to="/" className="block" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">Home</Button>
              </Link>
              <Link to="/search" className="block" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">Plan Trip</Button>
              </Link>
              
              {isLoggedIn && !isAdmin && (
                <Link to="/dashboard" className="block" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">My Trips</Button>
                </Link>
              )}
              
              {isAdmin && (
                <Link to="/admin/dashboard" className="block" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">Admin Dashboard</Button>
                </Link>
              )}
              
              <div className="pt-2 border-t">
                {isLoggedIn || isAdmin ? (
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start" 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <>
                    <Link to="/auth" className="block" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        <User className="w-4 h-4 mr-2" />
                        Login
                      </Button>
                    </Link>
                    <Link to="/auth?tab=signup" className="block" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full mt-2">Sign Up</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </Card>
        )}
      </div>
    </header>
  );
};

export default Navbar;
