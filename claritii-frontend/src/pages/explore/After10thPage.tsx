import { useState, useEffect } from "react";
import { Link } from "react-router";
import { WishlistButton } from "@/shared/ui/WishlistButton";
import { AnimatedDots } from "@/shared/ui/AnimatedDots"
import {
  Sigma,
  FlaskConical,
  Network,
  BarChart3,
  Palette,
  ChevronRight,
  Loader2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

// API Base URL (Production me isko .env file se lenge)
const API_URL = "http://localhost:5000/api/v1";

// Icon Mapping Helper (Backend me icon field nahi hai, isliye yahan map kar rahe hain)
const getIconForStream = (streamName: string) => {
  const name = streamName.toLowerCase();
  if (name.includes("pcm") && !name.includes("pcmb")) return Sigma;
  if (name.includes("pcb")) return FlaskConical;
  if (name.includes("pcmb")) return Network;
  if (name.includes("commerce")) return BarChart3;
  if (name.includes("arts")) return Palette;
  return Sigma; // Default icon
};

// Stream ID Helper (URL routing ke liye)
const getStreamId = (streamName: string) => {
  const name = streamName.toLowerCase();
  if (name.includes("pcm") && !name.includes("pcmb")) return "pcm";
  if (name.includes("pcb")) return "pcb";
  if (name.includes("pcmb")) return "pcmb";
  if (name.includes("commerce")) return "commerce";
  if (name.includes("arts")) return "arts";
  return "stream";
};
export const After10thPage = () => {
  const [streams, setStreams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStreams = async () => {
      try {
        setLoading(true);
        setError(null);

        // 🚀 Fetching data from your Backend API
        const response = await fetch(`${API_URL}/streams`);
        const result = await response.json();

        if (result.success) {
          setStreams(result.data);
        } else {
          setError("Failed to fetch streams from server.");
        }
      } catch (err) {
        console.error("API Error:", err);
        setError("Network error. Please check if backend is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchStreams();
  }, []);

  // 1. Loading State
  if (loading) {
    return (
      <div className="min-h-[calc(100vh-72px-300px)] bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2
            className="animate-spin mx-auto mb-4 text-[#3DC6E7]"
            size={48}
          />
          <p className="text-on-surface-variant text-lg">
            Loading streams from database...
          </p>
        </div>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="min-h-[calc(100vh-72px-300px)] bg-background flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <AlertCircle className="mx-auto mb-4 text-error" size={48} />
          <h2 className="text-2xl font-bold text-on-surface mb-2">Oops!</h2>
          <p className="text-on-surface-variant mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-[#3DC6E7] text-white rounded-xl font-semibold hover:bg-[#3DC6E7]-hover transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // 3. Success State (UI)
  return (
    <div className="min-h-[calc(100vh-72px-300px)] bg-background py-16 px-6">
    <AnimatedDots />
      <div className="max-w-[1280px] mx-auto">
        {/* Breadcrumb */}
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
            <span className="text-[#3DC6E7] font-semibold">After 10th</span>
          </div>
        </div>

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1
            className="text-4xl md:text-5xl font-bold text-on-surface mb-4 tracking-tight"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            Which stream would you like to explore?
          </h1>
          <p
            className="text-lg text-on-surface-variant"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            Discover the path that aligns with your passions and strengths to
            shape your academic future.
          </p>
        </div>

        {/* Streams Grid (Rendered from Database) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {streams.map((stream) => {
            const IconComponent = getIconForStream(stream.name);
            const streamId = getStreamId(stream.name);
            const cleanTitle = stream.name.split("(")[0].trim();

            return (
              <Link
                to={`/explore/after-10th/${streamId}`}
                key={stream._id}
                className="group block h-full"
              >
                <div
                  className="relative bg-surface-container-lowest border border-outline-variant/20 rounded-3xl p-8 transition-all duration-300 hover:shadow-card-hover hover:border-[#3DC6E7]/30 hover:-translate-y-1 h-full flex flex-col"
                  style={{ minHeight: "280px" }}
                >
                  {/* ✅ 1. Top Row: Icon (Left) & Wishlist (Right) */}
                  <div className="flex justify-between items-start mb-6">
                    {/* Icon Top-Left */}
                    <div className="w-16 h-16 rounded-full bg-[#3DC6E7]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent
                        className="text-[#3DC6E7]"
                        size={28}
                        strokeWidth={2}
                      />
                    </div>

                    {/* Wishlist Button Top-Right */}
                    <WishlistButton
                      id={stream._id}
                      type="stream"
                      name={stream.name}
                      stream={streamId}
                      path={`/explore/after-10th/${streamId}`}
                      variant="icon"
                    />
                  </div>

                  {/* ✅ 2. Middle Content: Centered Text */}
                  <div className="flex-1 flex flex-col items-center text-center mb-6">
                    <h3
                      className="text-2xl font-bold text-on-surface mb-3"
                      style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                      {cleanTitle}
                    </h3>
                    <p
                      className="text-body-md text-on-surface-variant"
                      style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                      {stream.description}
                    </p>
                  </div>

                  {/* ✅ 3. Bottom Button */}
                  <button
  className="w-full px-6 py-3 rounded-xl text-[15px] font-semibold transition-all duration-300 flex items-center justify-center gap-2 bg-transparent text-[#3DC6E7] border-2 border-[#3DC6E7]/40 hover:bg-[#3DC6E7] hover:text-[#001520] hover:border-[#3DC6E7] hover:shadow-[0_4px_20px_rgba(61,198,231,0.4)]"
  style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
>
  View Details
  <ArrowRight
    size={18}
    className="group-hover:translate-x-1 transition-transform"
  />
</button>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
