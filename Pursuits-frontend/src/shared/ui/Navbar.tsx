import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { Menu, X, LogOut } from "lucide-react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/config/firebase"; 
import { Button } from "./Button";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileTooltip, setShowProfileTooltip] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || "User",
          email: firebaseUser.email,
          uid: firebaseUser.uid
        });
        localStorage.setItem("user", JSON.stringify({
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || "User",
          email: firebaseUser.email
        }));
      } else {
        setUser(null);
        localStorage.removeItem("user");
      }
      setLoading(false); 
    });

    return () => {
      window.removeEventListener("resize", check);
      unsubscribe(); 
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/explore" },
    { name: "About", path: "/about" },
  ];

  if (loading) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 h-18 glass-nav flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#3DC6E7] border-t-transparent rounded-full animate-spin" />
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-18 glass-nav">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-[28px] text-[#7DE1F5] tracking-tight font-bold">
          Pursuits
        </Link>

        {/* Desktop Links */}
        {!isMobile && (
          <div className="flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                link.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(link.path);

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-body-md font-medium transition-all border-b-2 ${
                    isActive
                      ? "text-[#3DC6E7] border-[#3DC6E7]"
                      : "text-on-surface-variant border-transparent hover:text-[#3DC6E7] hover:border-[#3DC6E7]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        )}

        {/* Desktop Buttons / Profile */}
        {!isMobile && (
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <div className="relative">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-low rounded-full border border-outline-variant/20 hover:border-[#3DC6E7]/30 transition-all"
                    onMouseEnter={() => setShowProfileTooltip(true)}
                    onMouseLeave={() => setShowProfileTooltip(false)}
                  >
                    <div className="w-7 h-7 rounded-full bg-[#3DC6E7] text-white flex items-center justify-center text-xs font-bold">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <span className="text-sm font-medium text-on-surface pr-1">
                      {user.name}
                    </span>
                  </Link>

                  {/* Tooltip */}
                  {showProfileTooltip && (
                    <div className="absolute top-full right-0 mt-2 px-4 py-2 bg-surface-container-lowest border border-outline-variant/20 rounded-xl shadow-lg z-50 whitespace-nowrap">
                      <p className="text-sm font-medium text-on-surface">
                        Visit Profile Page
                      </p>
                      <div className="absolute -top-1 right-6 w-2 h-2 bg-surface-container-lowest border-t border-l border-outline-variant/20 rotate-45"></div>
                    </div>
                )}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-red-300 hover:bg-red-50/10 rounded-2xl transition-colors text-sm font-medium"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Button variant="secondary" size="sm" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button variant="primary" size="sm" onClick={() => navigate("/register")}>
                  Sign Up
                </Button>
              </>
            )}
          </div>
        )}

        {/* Mobile Toggle */}
        {isMobile && (
          <button onClick={() => setIsOpen(!isOpen)} className="text-[#3DC6E7]">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="md:hidden glass-nav overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => {
                const isActive =
                  link.path === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(link.path);

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-body-lg font-medium transition-colors ${
                      isActive ? "text-[#3DC6E7]" : "text-text-main hover:text-[#3DC6E7]"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="flex flex-col gap-3 pt-4">
                {user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2 text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                ) : (
                  <>
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={() => {
                        navigate("/login");
                        setIsOpen(false);
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={() => {
                        navigate("/register");
                        setIsOpen(false);
                      }}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};