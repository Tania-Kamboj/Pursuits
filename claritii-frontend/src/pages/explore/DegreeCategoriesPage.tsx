import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { Navbar } from "@/shared/ui/Navbar";
import { Footer } from "@/shared/ui/Footer";
import { AnimatedDots } from "@/shared/ui/AnimatedDots";

import {
  ChevronRight,
  ArrowLeft,
  GraduationCap,
  Target,
  Briefcase,
  Bookmark,
  BookmarkCheck,
  TrendingUp,
} from "lucide-react";
import { DashboardSidebar } from "@/features/dashboard/DashboardSidebar";

interface Category {
  _id: string;
  name: string;
  stream: string;
  interests: string[];
  focusAreas: string[];
  careers: string[];
}

const API_URL = "http://localhost:5000/api/v1";

export const DegreeCategoriesPage = () => {
  const { streamId } = useParams<{ streamId: string }>();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [streamName, setStreamName] = useState("PCM");
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    if (streamId) {
      setStreamName(streamId.toUpperCase());
    }

    // Fetch categories from backend
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const stream = streamId || "pcm";
        const response = await fetch(
          `${API_URL}/degree-categories?stream=${stream}`,
        );
        const data = await response.json();

        if (data.success) {
          setCategories(data.data || []);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    // Load wishlist from localStorage
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      setWishlist(JSON.parse(storedWishlist));
    }

    fetchCategories();
  }, [streamId]);

  // Toggle wishlist
  const toggleWishlist = (categoryId: string, categoryName: string) => {
    const newWishlist = wishlist.includes(categoryId)
      ? wishlist.filter((id) => id !== categoryId)
      : [...wishlist, categoryId];

    setWishlist(newWishlist);
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));

    // Backend ko bhi bhejo (optional)
    // await fetch(`${API_URL}/wishlist/toggle`, { ... })
  };

  const isInWishlist = (id: string) => wishlist.includes(id);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AnimatedDots />
      <Navbar />
      <div className="flex flex-1 w-full max-w-[1400px] mx-auto px-8 py-10 gap-10 pt-24">
        {/* ✅ Dashboard Sidebar - Graduation Active */}
        <DashboardSidebar activeTab="graduation" streamName={streamName} />

        {/* Main Content */}
        <main className="flex-1 min-w-0 pb-20">
          {/* Breadcrumb & Back Button */}
          <div className="flex items-center justify-between mb-8 sticky top-[90px] z-40 backdrop-blur-md py-4 px-6 -mx-6 ">
            <div className="flex items-center gap-2 text-body-md text-on-surface-variant">
              <Link to="/" className="hover:text-[#3DC6E7] transition-colors">
                Home
              </Link>
              <ChevronRight size={16} className="text-outline-variant" />
              <Link
                to="/explore/after-12th"
                className="hover:text-[#3DC6E7] transition-colors"
              >
                After 12th
              </Link>
              <ChevronRight size={16} className="text-outline-variant" />
              <Link
                to={`/explore/after-12th/dashboard/${streamId}`}
                className="hover:text-[#3DC6E7] transition-colors"
              >
                {streamName}
              </Link>
              <ChevronRight size={16} className="text-outline-variant" />
              <span className="text-[#3DC6E7] font-semibold">
                Degree Categories
              </span>
            </div>

            <button
              onClick={() =>
                navigate(`/explore/after-12th/dashboard/${streamId}`)
              }
              className="flex items-center gap-2 text-[#3DC6E7] hover:text-[#3DC6E7]-hover font-medium transition-colors whitespace-nowrap"
            >
              <ArrowLeft size={18} />
              Back to {streamName} Options
            </button>
          </div>

          {/* Header Section */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3DC6E7]/10 text-[#3DC6E7] text-xs font-bold mb-4 tracking-wide">
              <GraduationCap size={14} />
              {streamName} STREAM DEGREES
            </div>
            <h1
              className="text-4xl md:text-5xl font-bold text-on-surface mb-4 tracking-tight"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Graduation Categories
            </h1>
            <p
              className="text-lg text-on-surface-variant leading-relaxed max-w-3xl"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Explore comprehensive degree programs tailored for your{" "}
              {streamName} background. Bookmark your favorites for future
              reference.
            </p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3DC6E7] mx-auto mb-4"></div>
              <p className="text-on-surface-variant">
                Loading degree categories...
              </p>
            </div>
          ) : (
            /* Categories Grid */
            <div className="grid grid-cols-1 gap-6">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/20 hover:border-[#3DC6E7]/30 hover:shadow-card-hover transition-all duration-300"
                >
                  {/* Header with Bookmark */}
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3
                        className="text-2xl font-bold text-on-surface mb-2"
                        style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                      >
                        {category.name}
                      </h3>

                    </div>
                  </div>

                  {/* Content Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Interests */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-on-surface">
                        <TrendingUp size={16} className="text-[#3DC6E7]" />
                        Interests
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {category.interests.map((interest, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 rounded-lg text-sm"
                            style={{
                              backgroundColor: "#5DD4EF3A",
                              color: "#5DD4EF",
                              border: "2px solid rgba(70, 72, 212, 0.2)",
                              fontFamily: "Plus Jakarta Sans, sans-serif",
                            }}
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Focus Areas */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-on-surface">
                        <Target size={16} className="text-[#3DC6E7]" />
                        Focus Areas
                      </div>
                      <ul className="space-y-2">
                        {category.focusAreas.map((area, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm text-on-surface-variant"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-[#3DC6E7] mt-2 flex-shrink-0"></div>
                            <span>{area}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Careers */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm font-semibold text-on-surface">
                        <Briefcase size={16} className="text-[#3DC6E7]" />
                        Careers
                      </div>
                      <ul className="space-y-2">
                        {category.careers.map((career, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm text-on-surface-variant"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                            <span>{career}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <div className="mt-6 pt-6 border-t border-outline-variant/20">
                    <Link
                      to={`/explore/after-12th/${streamId}/degrees/category/${category._id}`}
                      className="inline-flex items-center gap-2 text-[#3DC6E7] font-semibold text-[15px] hover:gap-3 transition-all"
                    >
                      View Degree Programs
                      <ChevronRight size={18} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && categories.length === 0 && (
            <div className="text-center py-12 bg-surface-container-lowest rounded-2xl border border-outline-variant/20">
              <GraduationCap
                className="mx-auto mb-4 text-outline-variant"
                size={48}
              />
              <p className="text-lg text-on-surface-variant">
                No degree categories available for this stream yet.
              </p>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};
