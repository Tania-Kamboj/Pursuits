import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { AnimatedDots } from "@/shared/ui/AnimatedDots";
import {
  GraduationCap,
  HelpCircle,
  LogOut,
  ChevronRight,
  Calculator,
  Microscope,
  FlaskConical,
  Store,
  Palette,
} from "lucide-react";

const navItems = [
  {
    name: "Streams",
    icon: GraduationCap,
    active: true,
    to: "/explore/after-12th",
  },
];

const streams = [
  {
    id: "pcm",
    title: "PCM",
    subtitle: "Physics, Chem, Math",
    icon: Calculator,
  },
  { id: "pcb", title: "PCB", subtitle: "Physics, Chem, Bio", icon: Microscope },
  { id: "pcmb", title: "PCMB", subtitle: "All Sciences", icon: FlaskConical },
  {
    id: "commerce",
    title: "Commerce",
    subtitle: "With/Without Math",
    icon: Store,
  },
  {
    id: "arts",
    title: "Arts",
    subtitle: "History, Geo, Pol Sci",
    icon: Palette,
  },
];

export const After12thDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex max-w-[auto] bg-background px-6 py-10 gap-10 w-full min-h-[calc(100vh-72px)]">
      <AnimatedDots />
      <aside className="w-64 flex-shrink-0 sticky top-[90px] h-[calc(100vh-140px)] self-start">
        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/10 h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-8 px-2">
              <div className="w-10 h-10 rounded-full bg-[#3DC6E7] flex items-center justify-center text-white font-bold text-sm">
                {user?.name ? user.name.charAt(0).toUpperCase() : "FL"}
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-[#3DC6E7] leading-tight">
                  {user?.name || "Future Leader"}
                </h3>
                <p className="text-[12px] text-on-surface-variant">
                  12th Grade - PCM
                </p>
              </div>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  to={item.to}
                  key={item.name}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200 ${
                    item.active
                      ? "bg-[#3DC6E7] text-white shadow-md"
                      : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                  }`}
                >
                  <item.icon size={20} strokeWidth={2} />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-6 pt-6 border-t border-outline-variant/20 space-y-3">
            <button className="w-full bg-[#3DC6E7] text-white py-3 rounded-full font-semibold text-[15px] hover:bg-[#3DC6E7]-hover transition-colors shadow-md">
              Get Counseling
            </button>

            <div className="space-y-1">
              <Link
                to="#"
                className="flex items-center gap-3 px-4 py-2 text-[14px] text-on-surface-variant hover:text-on-surface transition-colors rounded-lg hover:bg-surface-container-high"
              >
                <HelpCircle size={18} />
                Help
              </Link>

              {/* ✅ WORKING LOGOUT BUTTON */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2 text-[14px] text-red-500 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50 w-full text-left"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0 pb-20">
        <div className="flex items-center justify-between mb-8 sticky top-[90px] z-40 backdrop-blur-md py-4 px-6 -mx-6 ">
          <div className="flex items-center gap-2 text-body-md text-on-surface-variant">
            <Link
              to="/"
              className="text-on-surface hover:text-[#3DC6E7] transition-colors"
            >
              Home
            </Link>
            <ChevronRight size={16} className="text-outline-variant" />
            <Link
              to="/explore"
              className="text-on-surface hover:text-[#3DC6E7] transition-colors"
            >
              Explore
            </Link>
            <ChevronRight size={16} className="text-outline-variant" />
            <span className="text-[#3DC6E7] font-semibold">After 12th</span>
          </div>
        </div>

        <div className="mb-12 max-w-3xl">
          <h1
            className="text-4xl font-bold text-on-surface mb-4 tracking-tight"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            Which stream did you study till 12th?
          </h1>
          <p
            className="text-lg text-on-surface-variant leading-relaxed"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            Select your high school stream to discover tailored career pathways,
            degrees, and professional certifications suited for your academic
            background.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 ">
          {streams.map((stream) => (
            <Link
              to={`/explore/after-12th/dashboard/${stream.id}`}
              key={stream.id}
              onClick={() => localStorage.setItem("activeStream", stream.id)}
              className="group flex flex-col items-center text-center p-6 bg-surface-container-lowest rounded-3xl border border-outline-variant/20 hover:shadow-card-hover hover:border-[#3DC6E7]/30 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="mb-4 p-4 rounded-full bg-[#3DC6E7]/10 border border-outline-variant/20 group-hover:border-[#3DC6E7]/30 group-hover:shadow-sm transition-all">
                <stream.icon
                  className="text-on-surface group-hover:text-[#3DC6E7] transition-colors"
                  size={28}
                  strokeWidth={1.5}
                />
              </div>
              <h3
                className="text-[16px] font-bold text-on-surface mb-1"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                {stream.title}
              </h3>
              <p
                className="text-[13px] text-on-surface-variant"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                {stream.subtitle}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};
