import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { AnimatedDots } from "@/shared/ui/AnimatedDots";

import {
  ChevronRight,
  ArrowLeft,
  Award,
  Target,
  BookOpen,
  Trophy,
  Briefcase,
  Clock,
} from "lucide-react";
import { DashboardSidebar } from "@/features/dashboard/DashboardSidebar";
import { useActiveStream } from "@/hooks/useActiveStream";

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

export const DiplomaDetailsPage = () => {
  const { diplomaId } = useParams<{ diplomaId: string }>();
  const navigate = useNavigate();
  const [diploma, setDiploma] = useState<Diploma | null>(null);
  const [loading, setLoading] = useState(true);
  const [streamName, setStreamName] = useState("PCM");
  const streamId = useActiveStream();

  useEffect(() => {
    if (streamId) setStreamName(streamId.toUpperCase());

    const fetchDiplomaDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/diplomas/${diplomaId}`);
        const result = await response.json();

        if (result.success) {
          setDiploma(result.data);
        }
      } catch (error) {
        console.error("Error fetching diploma:", error);
      } finally {
        setLoading(false);
      }
    };

    if (diplomaId) fetchDiplomaDetails();
  }, [diplomaId, streamId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3DC6E7]"></div>
      </div>
    );
  }

  if (!diploma) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-xl text-on-surface-variant mb-4">
            Diploma not found.
          </p>
          <button
            onClick={() => navigate("/explore/after-12th/diplomas")}
            className="px-6 py-3 bg-[#3DC6E7] text-white rounded-xl font-semibold hover:bg-[#3DC6E7]-hover"
          >
            Back to Diplomas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AnimatedDots />
      <div className="flex flex-1 w-full max-w-[1400px] mx-auto px-8 py-10 gap-10">
        <DashboardSidebar activeTab="diploma" streamName={streamName} />

        <main className="flex-1 min-w-0 pb-20">
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
                {streamName.toUpperCase()}
              </Link>
              <ChevronRight size={16} className="text-outline-variant" />
              <Link
                to={`/explore/after-12th/${streamId}/diplomas`}
                className="hover:text-[#3DC6E7] transition-colors"
              >
                Diplomas
              </Link>
              <ChevronRight size={16} className="text-outline-variant" />
              <span className="text-[#3DC6E7] font-semibold truncate max-w-[200px]">
                {diploma.name}
              </span>
            </div>

            <button
              onClick={() =>
                navigate(`/explore/after-12th/${streamId}/diplomas`)
              }
              className="flex items-center gap-2 text-[#3DC6E7] hover:text-[#3DC6E7]-hover font-medium transition-colors whitespace-nowrap"
            >
              <ArrowLeft size={18} />
              Back to Diplomas
            </button>
          </div>

          <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3DC6E7]/10 text-[#3DC6E7] text-xs font-bold mb-4 tracking-wide">
                <Award size={14} />
                {streamName} STREAM DIPLOMA
              </div>
              <h1
                className="text-4xl md:text-5xl font-bold text-on-surface tracking-tight"
                style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
              >
                {diploma.name}
              </h1>
            </div>
            <div className="flex items-center gap-2 px-5 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm">
              <Clock className="text-[#3DC6E7]" size={20} />
              <div>
                <p className="text-xs text-on-surface-variant font-medium">
                  Duration
                </p>
                <p className="text-sm font-bold text-on-surface">
                  {diploma.duration}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#3DC6E7]/10 flex items-center justify-center">
                  <Target className="text-[#3DC6E7]" size={20} />
                </div>
                <h2 className="text-xl font-bold text-on-surface">
                  Best if you are interested in
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {diploma.interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-lg text-sm font-medium"
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

            <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <BookOpen className="text-secondary" size={20} />
                </div>
                <h2 className="text-xl font-bold text-on-surface">
                  Core Subjects
                </h2>
              </div>
              <ul className="space-y-3">
                {diploma.coreSubjects.map((subject, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-body-md text-on-surface"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2.5 flex-shrink-0"></div>
                    <span>{subject}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Trophy className="text-secondary" size={20} />
                </div>
                <h2 className="text-xl font-bold text-on-surface">
                  Entrance Exams
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {diploma.entranceExams.map((exam, idx) => (
                  <div
                    key={idx}
                    className="px-4 py-2 rounded-full text-sm font-semibold border-2"
                    style={{
                      backgroundColor: "#5DD4EF3A",
                      color: "#5DD4EF",
                      border: "2px solid rgba(70, 72, 212, 0.2)",
                      fontFamily: "Plus Jakarta Sans, sans-serif",
                    }}
                  >
                    {exam}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Briefcase className="text-secondary" size={20} />
                </div>
                <h2 className="text-xl font-bold text-on-surface">
                  Career Options
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {diploma.careers.map((career, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl bg-background border border-outline-variant/10"
                  >
                    <div className="w-2 h-2 rounded-full bg-secondary flex-shrink-0"></div>
                    <span className="text-sm font-medium text-on-surface">
                      {career}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
