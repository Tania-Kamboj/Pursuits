import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { ChevronRight, ArrowLeft, Award } from "lucide-react";
import { DashboardSidebar } from "@/features/dashboard/DashboardSidebar";
import { WishlistButton } from "@/shared/ui/WishlistButton";
import { AnimatedDots } from "@/shared/ui/AnimatedDots";

interface Diploma {
  _id: string;
  name: string;
  interests: string[];
  duration: string;
  coreSubjects: string[];
  entranceExams: string[];
  careers: string[];
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1"
export const DiplomaPage = () => {
  const { streamId } = useParams<{ streamId: string }>();
  const navigate = useNavigate();
  const [diplomas, setDiplomas] = useState<Diploma[]>([]);
  const [loading, setLoading] = useState(true);
  const [streamName, setStreamName] = useState("PCM");

  useEffect(() => {
    if (streamId) {
      setStreamName(streamId.toUpperCase());
    } else {
      setStreamName("PCM"); 
    }

    const fetchDiplomas = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_URL}/diplomas?stream=${streamId || "pcm"}`,
        );
        const result = await response.json();

        if (result.success) {
          setDiplomas(result.data || []);
        }
      } catch (error) {
        console.error("Error fetching diplomas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiplomas();
  }, [streamId]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AnimatedDots />
      <div className="flex flex-1 w-full max-w-[1400px] mx-auto px-8 py-10 gap-10">
        <DashboardSidebar activeTab="diploma" streamName={streamName} />

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
                to="/explore/after-12th"
                className="text-on-surface hover:text-[#3DC6E7] transition-colors"
              >
                After 12th
              </Link>
              <ChevronRight size={16} className="text-outline-variant" />
              <Link
                to={`/explore/after-12th/dashboard/${streamId}`}
                className="text-on-surface hover:text-[#3DC6E7] transition-colors"
              >
                {streamName}
              </Link>
              <ChevronRight size={16} className="text-outline-variant" />
              <span className="text-[#3DC6E7] font-semibold">Diplomas</span>
            </div>

            <button
              onClick={() =>
                navigate(`/explore/after-12th/dashboard/${streamId}`)
              }
              className="flex items-center gap-2 text-[#3DC6E7] hover:text-[#3DC6E7]-hover font-medium transition-colors"
            >
              <ArrowLeft size={18} />
              Back to {streamName} Options
            </button>
          </div>

          <div className="mb-12">
            <h1
              className="text-4xl md:text-5xl font-bold text-on-surface mb-4 tracking-tight"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Diploma Options
            </h1>
            <p
              className="text-lg text-on-surface-variant leading-relaxed max-w-3xl"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Explore practical, skill-based diploma courses tailored for your{" "}
              {streamName} background to jumpstart your career.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3DC6E7] mx-auto mb-4"></div>
              <p className="text-on-surface-variant">
                Loading diploma options...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {diplomas.map((diploma) => (
                <Link
                  to={`/explore/after-12th/diplomas/${diploma._id}`}
                  key={diploma._id}
                  className="group block"
                >
                  <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/20 hover:border-[#3DC6E7]/30 hover:shadow-card-hover transition-all duration-300 h-full">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#3DC6E7]/10 flex items-center justify-center">
                        <Award className="text-[#3DC6E7]" size={24} />
                      </div>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-surface-container-low text-on-surface-variant border border-outline-variant/20">
                        Duration: {diploma.duration}
                      </span>
                      <WishlistButton
                        id={diploma._id}
                        type="diploma"
                        name={diploma.name}
                        stream={streamId || "pcm"}
                        path={`/explore/after-12th/${streamId}/diplomas/${diploma._id}`}
                        variant="icon"
                      />
                    </div>

                    <h3
                      className="text-xl font-bold text-on-surface mb-3"
                      style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                    >
                      {diploma.name}
                    </h3>

                    <div className="mb-6">
                      <p className="text-sm font-semibold text-on-surface-variant mb-2">
                        Key Interests:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {diploma.interests.slice(0, 3).map((interest, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-full text-sm"
                            style={{
                              backgroundColor: "#5DD4EF3A",
                              color: "#7DE1F5",
                              border: "2px solid rgba(70, 72, 212, 0.2)",
                            }}
                          >
                            {interest}
                          </span>
                        ))}
                        {diploma.interests.length > 3 && (
                          <span className="px-3 py-1 rounded-full text-sm text-on-surface-variant">
                            +{diploma.interests.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[#3DC6E7] font-semibold text-[15px] group-hover:gap-3 transition-all">
                      View Details
                      <ChevronRight size={18} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && diplomas.length === 0 && (
            <div className="text-center py-12 bg-surface-container-lowest rounded-2xl border border-outline-variant/20">
              <Award className="mx-auto mb-4 text-outline-variant" size={48} />
              <p className="text-lg text-on-surface-variant">
                No diploma options available for this stream yet.
              </p>
              <p className="text-sm text-outline-variant mt-2">
                Please check back later or contact support.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
