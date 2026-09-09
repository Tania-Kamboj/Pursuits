import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { ChevronRight, ArrowLeft, Trophy, Users } from "lucide-react";
import { DashboardSidebar } from "@/features/dashboard/DashboardSidebar";
import { useActiveStream } from "@/hooks/useActiveStream";
import { Navbar } from "@/shared/ui/Navbar";
import { WishlistButton } from "@/shared/ui/WishlistButton";
import { useNavigate } from "react-router";
import { AnimatedDots } from "@/shared/ui/AnimatedDots";

interface Exam {
  _id: string;
  name: string;
  stream: string;
  conductingBody: string;
  purpose: string;
  eligibility: string;
  subjectsAndWeightage: string;
  attemptAndPattern: string;
  preparation: string;
  category: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1"
export const ExamsPage = () => {
  const { streamId } = useParams<{ streamId: string }>();
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const activeStreamId = useActiveStream();
  const streamName = activeStreamId.toUpperCase();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoading(true);
        const stream = streamId || activeStreamId;
        const response = await fetch(`${API_URL}/exams?stream=${stream}`);
        const result = await response.json();

        if (result.success) {
          setExams(result.data || []);
        }
      } catch (error) {
        console.error("Error fetching exams:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [streamId, activeStreamId]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AnimatedDots />
      <Navbar />

      <div className="flex flex-1 w-full max-w-[1400px] mx-auto px-8 py-10 gap-10 pt-24">
        {/* Dashboard Sidebar */}
        <DashboardSidebar activeTab="exams" streamName={streamName} />

        {/* Main Content */}
        <main className="flex-1 min-w-0 pb-20">
          {/* Sticky Breadcrumb */}
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
                to={`/explore/after-12th/dashboard/${activeStreamId}`}
                className="hover:text-[#3DC6E7] transition-colors"
              >
                {streamName}
              </Link>
              <ChevronRight size={16} className="text-outline-variant" />
              <span className="text-[#3DC6E7] font-semibold">
                National Exams
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
              <Trophy size={14} />
              {streamName} STREAM EXAMS
            </div>
            <h1
              className="text-4xl md:text-5xl font-bold text-on-surface mb-4 tracking-tight"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              National Government Exams
            </h1>
            <p
              className="text-lg text-on-surface-variant leading-relaxed max-w-3xl"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Explore premier government entry examinations suitable for{" "}
              {streamName} stream students. Secure your future in defence,
              railways, and central administration.
            </p>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3DC6E7] mx-auto mb-4"></div>
              <p className="text-on-surface-variant">Loading exam options...</p>
            </div>
          ) : (
            /* Exams Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exams.map((exam) => (
                <Link
                  to={`/explore/after-12th/${activeStreamId}/exams/${exam._id}`}
                  key={exam._id}
                  className="group block"
                >
                  <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/20 hover:border-[#3DC6E7]/30 hover:shadow-card-hover transition-all duration-300 h-full flex flex-col">
                    {/* Header with Icon and Category */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#3DC6E7]/10 flex items-center justify-center">
                        <Trophy className="text-[#3DC6E7]" size={24} />
                      </div>

                      <WishlistButton
                        id={exam._id}
                        type="exam"
                        name={exam.name}
                        stream={activeStreamId}
                        path={`/explore/after-12th/${activeStreamId}/exams/${exam._id}`}
                        variant="icon"
                      />
                    </div>

                    {/* Exam Name */}
                    <h3
                      className="text-xl font-bold text-on-surface mb-3"
                      style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                      {exam.name}
                    </h3>

                    {/* Conducting Body */}
                    <div className="flex items-center gap-2 text-sm text-on-surface-variant mb-4">
                      <Users size={16} />
                      <span>{exam.conductingBody}</span>
                    </div>

                    {/* Purpose */}
                    <p className="text-body-md text-on-surface-variant mb-6 flex-grow line-clamp-3">
                      {exam.purpose}
                    </p>

                    {/* View Details Button */}
                    <div className="flex items-center gap-2 text-[#3DC6E7] font-semibold text-[15px] group-hover:gap-3 transition-all mt-auto">
                      View Details
                      <ChevronRight size={18} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && exams.length === 0 && (
            <div className="text-center py-12 bg-surface-container-lowest rounded-2xl border border-outline-variant/20">
              <Trophy className="mx-auto mb-4 text-outline-variant" size={48} />
              <p className="text-lg text-on-surface-variant">
                No exams available for this stream yet.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
