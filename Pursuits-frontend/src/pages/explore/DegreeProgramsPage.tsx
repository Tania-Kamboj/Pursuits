import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { AnimatedDots } from "@/shared/ui/AnimatedDots";
import { WishlistButton } from "@/shared/ui/WishlistButton";
import { DashboardSidebar } from "@/features/dashboard/DashboardSidebar";
import { useActiveStream } from "@/hooks/useActiveStream";

import {
  ChevronRight,
  ArrowLeft,
  GraduationCap,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

interface Degree {
  _id: string;
  name: string;
  interests: string[];
  duration: string;
  coreSubjects: string[];
  entranceExams: string[];
  careers: string[];
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export const DegreeProgramsPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [categoryName, setCategoryName] = useState("Degree Programs");
  const [loading, setLoading] = useState(true);

  const streamId = useActiveStream();
  const streamName = streamId ? streamId.toUpperCase() : "STREAM";

  useEffect(() => {
  let isMounted = true;
  let abortController = new AbortController();

  const fetchDegrees = async () => {
    if (!categoryId || !streamId) {
      return;
    }

    try {
      setLoading(true);
      
      const url = `${API_URL}/degrees?category=${categoryId}&stream=${streamId}`;
      
      const response = await fetch(url, { 
        signal: abortController.signal 
      });
      const data = await response.json();
      
      if (isMounted) {
        if (data.success) {
          setDegrees(data.data || []);
          if (data.categoryName) setCategoryName(data.categoryName);
        }
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }
      if (isMounted) {
        console.error(" Error fetching degrees:", error);
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  fetchDegrees();

  return () => {
    isMounted = false;
    abortController.abort();
  };
}, [categoryId, streamId]); 

  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <AnimatedDots />

      <div className="flex flex-1 w-full max-w-[1400px] mx-auto px-4 lg:px-8 py-6 lg:py-10 gap-6 lg:gap-10 pt-20 lg:pt-24">
        
        {/* Dashboard Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-[90px] h-fit self-start">
          <DashboardSidebar activeTab="graduation" streamName={streamName} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 pb-20 w-full">
          
          {/* Breadcrumb */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 lg:mb-8 sticky top-[72px] lg:top-[90px] z-40 backdrop-blur-md py-3 lg:py-4 -mx-4 lg:mx-0 px-4 lg:px-0 border-b lg:border-0 border-outline-variant/10">
            <div className="flex items-center gap-1.5 lg:gap-2 text-xs lg:text-body-md text-on-surface-variant flex-wrap">
              <Link to="/" className="hover:text-[#3DC6E7] transition-colors">Home</Link>
              <ChevronRight size={14} className="text-outline-variant" />
              <Link to="/explore/after-12th" className="hover:text-[#3DC6E7] transition-colors">After 12th</Link>
              <ChevronRight size={14} className="text-outline-variant" />
              <Link to={`/explore/after-12th/dashboard/${streamId}`} className="hover:text-[#3DC6E7] transition-colors">{streamName}</Link>
              <ChevronRight size={14} className="text-outline-variant" />
              <Link to={`/explore/after-12th/${streamId}/degree-categories`} className="hover:text-[#3DC6E7] transition-colors">Degree Categories</Link>
              <ChevronRight size={14} className="text-outline-variant" />
              <span className="text-[#3DC6E7] font-semibold truncate max-w-[200px] lg:max-w-[300px]">
                {categoryName}
              </span>
            </div>

            <button
              onClick={() => navigate(`/explore/after-12th/${streamId}/degree-categories`)}
              className="flex items-center gap-2 text-[#3DC6E7] hover:text-[#3DC6E7]/80 font-medium transition-colors whitespace-nowrap mt-3 sm:mt-0 text-sm lg:text-base"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Back to Categories</span>
              <span className="sm:hidden">Back</span>
            </button>
          </div>

          {/* Header Section */}
          <div className="mb-8 lg:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3DC6E7]/10 text-[#3DC6E7] text-xs font-bold mb-4 tracking-wide">
              <GraduationCap size={14} />
              {streamName} STREAM DEGREES
            </div>
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface mb-3 lg:mb-4 tracking-tight"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              {categoryName}
            </h1>
            <p
              className="text-base lg:text-lg text-on-surface-variant leading-relaxed max-w-3xl"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Explore professional undergraduate programs designed to launch
              your career in this specialized field.
            </p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 lg:h-12 lg:w-12 border-b-2 border-[#3DC6E7] mx-auto mb-4"></div>
              <p className="text-on-surface-variant text-sm lg:text-base">
                Loading degree programs...
              </p>
            </div>
          ) : (
            /* Degrees Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {degrees.map((degree) => (
                <div
                  key={degree._id}
                  className="bg-surface-container-lowest rounded-2xl p-4 sm:p-6 lg:p-8 border border-outline-variant/20 hover:border-[#3DC6E7]/30 hover:shadow-card-hover transition-all duration-300 flex flex-col"
                >
                  {/* Header with Icon and Duration */}
                  <div className="flex items-start justify-between mb-4 lg:mb-6">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-[#3DC6E7]/10 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="text-[#3DC6E7]" size={20} />
                    </div>
                    <WishlistButton
                      id={degree._id}
                      type="degree" 
                      name={degree.name}
                      stream={streamId}
                      path={`/explore/after-12th/${streamId}/degrees/${degree._id}`}
                      variant="icon"
                    />
                  </div>

                  {/* Degree Name */}
                  <h3
                    className="text-lg lg:text-xl font-bold text-on-surface mb-3 lg:mb-4"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  >
                    {degree.name}
                  </h3>

                  {/* Interests */}
                  <div className="mb-6 flex-grow">
                    <div className="flex items-center gap-2 text-sm font-semibold text-on-surface mb-3">
                      <TrendingUp size={16} className="text-[#3DC6E7]" />
                      Key Interests
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {degree.interests.slice(0, 3).map((interest, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-lg text-xs"
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
                      {degree.interests.length > 3 && (
                        <span className="px-3 py-1.5 rounded-lg text-xs text-on-surface-variant">
                          +{degree.interests.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Link
                    to={`/explore/after-12th/${streamId}/degrees/category/${categoryId}/details/${degree._id}`}
                    className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl text-[#3DC6E7] font-semibold text-sm lg:text-[15px] border-2 border-[#3DC6E7]/20 hover:border-[#3DC6E7] hover:bg-[#3DC6E7] hover:text-white transition-all mt-auto"
                  >
                    View Curriculum
                    <ArrowRight size={18} />
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && degrees.length === 0 && (
            <div className="text-center py-12 bg-surface-container-lowest rounded-2xl border border-outline-variant/20">
              <GraduationCap className="mx-auto mb-4 text-outline-variant" size={48} />
              <p className="text-base lg:text-lg text-on-surface-variant px-4">
                No degree programs available in this category yet.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
