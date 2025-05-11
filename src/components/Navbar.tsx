import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MenuIcon, X, LogOut } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Auth state - only keeping admin state
  const [isAdmin, setIsAdmin] = React.useState(false);
  
  useEffect(() => {
    // Check admin auth state on mount and when location changes
    const checkAuthState = () => {
      const admin = localStorage.getItem("admin");
      setIsAdmin(!!admin);
    };
    
    checkAuthState();
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleLogout = () => {
    if (isAdmin) {
      localStorage.removeItem("admin");
      setIsAdmin(false);
      
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully.",
      });
      navigate("/");
    }
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
          
          {isAdmin && (
            <Link to="/admin/dashboard" className={`text-sm font-medium ${location.pathname === "/admin/dashboard" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}>
              Admin Dashboard
            </Link>
          )}
        </nav>

        {/* Desktop Admin Auth Button */}
        <div className="hidden md:flex md:items-center md:gap-2">
          {isAdmin ? (
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          ) : null}
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
              
              {isAdmin && (
                <Link to="/admin/dashboard" className="block" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">Admin Dashboard</Button>
                </Link>
              )}
              
              <div className="pt-2 border-t">
                {isAdmin && (
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
