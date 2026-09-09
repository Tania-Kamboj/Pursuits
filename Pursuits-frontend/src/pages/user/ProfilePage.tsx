import { useState } from "react";
import { Link } from "react-router";
import {
  User,
  MessageSquare,
  Shield,
  LayoutDashboard,
  LogOut,
  Sparkles,
  Heart,
  ArrowRight,
  Save,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { Navbar } from "@/shared/ui/Navbar";
import { useWishlist } from "@/hooks/useWishlist";

const API_URL = "http://localhost:5000/api/v1";

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<
    "overview" | "profile" | "feedback" | "security"
  >("overview");
  const { items } = useWishlist();

  const [user, setUser] = useState<any>(() => {
    const stored = localStorage.getItem("user");
    return stored
      ? JSON.parse(stored)
      : { name: "Student", email: "", phone: "", stream: "PCM" };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("General Feedback");
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const totalSaved = items.length;

  const streamCounts: Record<string, number> = {};
  items.forEach((item) => {
    streamCounts[item.stream] = (streamCounts[item.stream] || 0) + 1;
  });
  const topStream =
    Object.keys(streamCounts).length > 0
      ? Object.keys(streamCounts).reduce((a, b) =>
          streamCounts[a] > streamCounts[b] ? a : b,
        )
      : user.stream?.toLowerCase() || "pcm";

  const topInterest =
    items.length > 0
      ? `${topStream.toUpperCase()} Stream Options`
      : "Start saving options!";

  const uniqueTypesExplored = new Set(items.map((i) => i.type)).size;

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email) && email.length >= 5;
  };

  const validatePassword = (pass: string) => {
    if (pass.length < 8) return "Password must be at least 8 characters long.";
    if (!/[A-Z]/.test(pass))
      return "Must contain at least one uppercase letter.";
    if (!/[0-9]/.test(pass)) return "Must contain at least one number.";
    return "";
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(user.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    setIsEditing(false);
    localStorage.setItem("user", JSON.stringify(user)); // Update local storage
  };

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`${API_URL}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: user.email,
          userName: user.name,
          type: feedbackType,
          message: feedback,
        }),
      });
      setFeedbackSent(true);
      setFeedback("");
      setTimeout(() => setFeedbackSent(false), 4000);
    } catch (error) {
      console.error("Feedback error:", error);
      alert("Failed to send feedback. Please try again.");
    }
  };

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "profile", label: "Personal Info", icon: User },
    { id: "feedback", label: "Feedback & Support", icon: MessageSquare },
    { id: "security", label: "Account Security", icon: Shield },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-16 pt-28 flex flex-col md:flex-row gap-8">
        {/* Left Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-4 sticky top-28">
            <div className="flex items-center gap-3 px-3 py-4 mb-4 border-b border-outline-variant/20">
              <div className="w-12 h-12 rounded-full bg-[#3DC6E7] text-white flex items-center justify-center text-xl font-bold">
                {user.name ? user.name.charAt(0).toUpperCase() : "S"}
              </div>
              <div>
                <p className="font-bold text-on-surface">
                  {user.name || "Student"}
                </p>
                <p className="text-xs text-on-surface-variant">
                  {user.stream || "Unknown"} • {user.currentClass || "Student"}
                </p>
              </div>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      activeTab === item.id
                        ? "bg-[#3DC6E7]/10 text-[#3DC6E7]"
                        : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </button>
                );
              })}

              <div className="pt-4 mt-4 border-t border-outline-variant/20">
                <Link
                  to="/wishlist"
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-on-surface-variant hover:bg-surface-container-low hover:text-[#3DC6E7] transition-all"
                >
                  <Heart size={18} />
                  My Wishlist ({totalSaved})
                </Link>
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all mt-1">
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </nav>
          </div>
        </aside>

        {/* Right Content */}
        <div className="flex-1 min-w-0">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                {/* ✅ 3. Real User Name */}
                <h1
                  className="text-3xl font-bold text-on-surface mb-2"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  Welcome back,{" "}
                  {user.name ? user.name.split(" ")[0] : "Student"}! 👋
                </h1>
                <p className="text-on-surface-variant">
                  Here is your real career exploration snapshot.
                </p>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-secondary/5 rounded-3xl p-8 border border-[#3DC6E7]/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#3DC6E7] flex items-center justify-center">
                    <Sparkles className="text-white" size={20} />
                  </div>
                  <h2 className="text-xl font-bold text-on-surface">
                    Your Pursuits Snapshot
                  </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-[#3DC6E7]/10 backdrop-blur-sm rounded-2xl p-5 border border-[#3DC6E7]/10">
                    <p className="text-sm text-on-surface-variant mb-1">
                      Wishlist Diversity
                    </p>
                    <p className="text-3xl font-bold text-[#3DC6E7]">
                      {uniqueTypesExplored}/3
                    </p>
                    <p className="text-xs text-on-surface-variant mt-2">
                      Types of options saved
                    </p>
                  </div>
                  <div className="bg-[#3DC6E7]/10 backdrop-blur-sm rounded-2xl p-5 border border-[#3DC6E7]/10">
                    <p className="text-sm text-on-surface-variant mb-1">
                      Total Saved Options
                    </p>
                    <p className="text-3xl font-bold text-[#3DC6E7]">
                      {totalSaved}
                    </p>
                    <Link
                      to="/wishlist"
                      className="text-xs text-[#3DC6E7] hover:underline mt-2 inline-block"
                    >
                      View Wishlist →
                    </Link>
                  </div>
                  <div className="bg-[#3DC6E7]/10 backdrop-blur-sm rounded-2xl p-5 border border-[#3DC6E7]/10">
                    <p className="text-sm text-on-surface-variant mb-1">
                      Top Interest Leaning
                    </p>
                    <p className="text-lg font-bold text-tertiary">
                      {topInterest}
                    </p>
                    <p className="text-xs text-on-surface-variant mt-2">
                      Based on your saves
                    </p>
                  </div>
                </div>

                {/* ✅ 2. Dynamic Next Step Link */}
                {totalSaved > 0 && (
                  <div className="mt-6 p-4 rounded-xl bg-[#26b3d6] text-white flex items-start gap-3">
                    <CheckCircle2 size={20} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">
                        Recommended Next Step
                      </p>
                      <p className="text-sm text-white/80 mt-1">
                        You are heavily exploring{" "}
                        <strong>{topStream.toUpperCase()}</strong>. Check out
                        the entrance exams required for these paths to stay
                        ahead.
                      </p>
                      <Link
                        to={`/explore/after-12th/${topStream}/exams`}
                        className="inline-flex items-center gap-1 text-sm font-bold mt-3 hover:underline"
                      >
                        Explore {topStream.toUpperCase()} Exams{" "}
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PERSONAL INFO */}
          {activeTab === "profile" && (
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-8">
              <div className="flex items-center justify-between mb-8">
                <h2
                  className="text-2xl font-bold text-on-surface"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  Personal Information
                </h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-sm font-medium text-[#3DC6E7] hover:underline"
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
              </div>

              <form
                onSubmit={handleProfileUpdate}
                className="space-y-6 max-w-2xl"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={user.name || ""}
                      disabled={!isEditing}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant/20 bg-background text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user.email || ""}
                      disabled={!isEditing}
                      required
                      pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant/20 bg-background text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-2">
                      Phone Number
                    </label>
                    <div className="flex gap-3">
                      {/* Country Code Dropdown */}
                      <select
                        value={user.countryCode || "+91"}
                        disabled={!isEditing}
                        onChange={(e) =>
                          setUser({ ...user, countryCode: e.target.value })
                        }
                        className="w-28 px-2 py-3 rounded-xl border border-outline-variant/20 bg-background text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
                      >
                        <option value="+91">🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+61">🇺 +61</option>
                        <option value="+971">🇦🇪 +971</option>
                      </select>

                      {/* Actual Phone Number Input */}
                      <input
                        type="tel"
                        value={user.phone || ""}
                        disabled={!isEditing}
                        required
                        maxLength={10} // Sirf 10 digits allow honge
                        pattern="\d{10}" // Regex for exactly 10 digits
                        onChange={(e) => {
                          // Sirf numbers allow karo, letters/spaces hata do
                          const onlyNumbers = e.target.value.replace(/\D/g, "");
                          setUser({ ...user, phone: onlyNumbers });
                        }}
                        placeholder="10-digit mobile number"
                        className="flex-1 px-4 py-3 rounded-xl border border-outline-variant/20 bg-background text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
                      />
                    </div>
                    {/* Validation Error Message */}
                    {user.phone && user.phone.length !== 10 && (
                      <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                        <AlertCircle size={12} /> Phone number must be exactly
                        10 digits.
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-2">
                      Current Stream
                    </label>
                    <select
                      value={user.stream || "PCM"}
                      disabled={!isEditing}
                      onChange={(e) =>
                        setUser({ ...user, stream: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant/20 bg-background text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
                    >
                      <option value="PCM">PCM</option>
                      <option value="PCB">PCB</option>
                      <option value="PCMB">PCMB</option>
                      <option value="Commerce">Commerce</option>
                      <option value="Arts">Arts</option>
                    </select>
                  </div>
                </div>
                {isEditing && (
                  <div className="pt-4 flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-3 bg-[#26b3d6] text-white rounded-xl font-semibold hover:bg-[#3DC6E7]-hover transition-colors"
                    >
                      <Save size={18} /> Save Changes
                    </button>
                  </div>
                )}
              </form>
            </div>
          )}

          {/* TAB 3: FEEDBACK */}
          {activeTab === "feedback" && (
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-8">
              <h2
                className="text-2xl font-bold text-on-surface mb-2"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                Feedback & Support
              </h2>
              <p className="text-on-surface-variant mb-8">
                Help us make Pursuits better. Your feedback goes directly to our
                admin team.
              </p>

              {feedbackSent ? (
                <div className="bg-green-50 border border-green-200 text-green-700 rounded-2xl p-6 flex items-center gap-3">
                  <CheckCircle2 size={24} />
                  <div>
                    <p className="font-semibold">
                      Thank you! Feedback sent successfully.
                    </p>
                    <p className="text-sm">
                      Our admin team will review it shortly.
                    </p>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleFeedbackSubmit}
                  className="space-y-6 max-w-2xl"
                >
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-2">
                      Category
                    </label>
                    <select
                      value={feedbackType}
                      onChange={(e) => setFeedbackType(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant/20 bg-background text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option>General Feedback</option>
                      <option>Report a Bug</option>
                      <option>Request a New Feature</option>
                      <option>Missing Career Information</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-2">
                      Your Message
                    </label>
                    <textarea
                      rows={6}
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Tell us how we can improve..."
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant/20 bg-background text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 bg-[#26b3d6] text-white rounded-xl font-semibold hover:bg-[#3DC6E7]-hover transition-colors"
                  >
                    <MessageSquare size={18} /> Submit Feedback
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 4: SECURITY */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 p-8">
                <h2
                  className="text-2xl font-bold text-on-surface mb-6"
                  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                >
                  Change Password
                </h2>
                <div className="space-y-4 max-w-2xl">
                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        onChange={(e) =>
                          setPasswordError(validatePassword(e.target.value))
                        }
                        className="w-full px-4 py-3 rounded-xl border border-outline-variant/20 bg-background text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="Min 8 chars, 1 uppercase, 1 number"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-on-surface-variant"
                      >
                        {showPassword ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                    {passwordError && (
                      <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                        <AlertCircle size={12} /> {passwordError}
                      </p>
                    )}
                  </div>
                  <button className="px-6 py-3 bg-[#26b3d6] text-white rounded-xl font-semibold hover:bg-[#3DC6E7]-hover transition-colors">
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
