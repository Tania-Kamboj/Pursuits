import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { AnimatedDots } from "@/shared/ui/AnimatedDots";

import {
  ChevronRight,
  ArrowLeft,
  GraduationCap,
  Target,
  BookOpen,
  Trophy,
  Briefcase,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { DashboardSidebar } from "@/features/dashboard/DashboardSidebar";

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

export const DegreeDetailsPage = () => {
  const { degreeId, categoryId, streamId } = useParams<{
    degreeId: string;
    categoryId: string;
    streamId: string;
  }>();
  const navigate = useNavigate();
  const [degree, setDegree] = useState<Degree | null>(null);
  const [loading, setLoading] = useState(true);

  const streamName = streamId?.toUpperCase() || "";

  useEffect(() => {
    const fetchDegreeDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/degrees/${degreeId}`);
        const result = await response.json();

        if (result.success) {
          setDegree(result.data);
        }
      } catch (error) {
        console.error("Error fetching degree:", error);
      } finally {
        setLoading(false);
      }
    };

    if (degreeId) fetchDegreeDetails();
  }, [degreeId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3DC6E7]"></div>
      </div>
    );
  }

  if (!degree) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-xl text-on-surface-variant mb-4">
            Degree not found.
          </p>
          <button
            onClick={() =>
              navigate(
                `/explore/after-12th/${streamId}/degrees/category/${categoryId}`,
              )
            }
            className="px-6 py-3 bg-[#3DC6E7] text-white rounded-xl font-semibold hover:bg-[#3DC6E7]-hover"
          >
            Back to Degrees
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AnimatedDots />
      <div className="flex flex-1 w-full max-w-[1400px] mx-auto px-8 py-10 gap-10">
        
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-[90px] h-fit self-start">
          <DashboardSidebar activeTab="graduation" streamName={streamName} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 pb-20 w-full">
          {/* Breadcrumb & Back Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 lg:mb-8 sticky top-[72px] lg:top-[90px] z-40 backdrop-blur-md py-3 lg:py-4 -mx-4 lg:mx-0 px-4 lg:px-0 border-b lg:border-0 border-outline-variant/10">
            <div className="flex items-center gap-1.5 lg:gap-2 text-xs lg:text-body-md text-on-surface-variant flex-wrap">
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
                to={`/explore/after-12th/dashboard/${streamName.toLowerCase()}`}
                className="hover:text-[#3DC6E7] transition-colors"
              >
                {streamName}
              </Link>
              <ChevronRight size={16} className="text-outline-variant" />
              <Link
                to={`/explore/after-12th/${streamId}/degrees/category/${categoryId}`}
                className="hover:text-[#3DC6E7] transition-colors"
              >
                Degrees
              </Link>
              <ChevronRight size={16} className="text-outline-variant" />
              <span className="text-[#3DC6E7] font-semibold truncate max-w-[200px]">
                {degree.name}
              </span>
            </div>

            <button
              onClick={() =>
                navigate(
                  `/explore/after-12th/${streamId}/degrees/category/${categoryId}`,
                )
              }
              className="flex items-center gap-2 text-[#3DC6E7] hover:text-[#3DC6E7]-hover font-medium transition-colors whitespace-nowrap"
            >
              <ArrowLeft size={18} />
              Back to Degrees
            </button>
          </div>

          {/* Header Section */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3DC6E7]/10 text-[#3DC6E7] text-xs font-bold mb-4 tracking-wide">
              <GraduationCap size={14} />
              {streamName} STREAM DEGREE
            </div>
            <h1
              className="text-4xl md:text-5xl font-bold text-on-surface tracking-tight mb-4"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              {degree.name}
            </h1>

            {/* Duration Badge */}
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 shadow-sm mt-2">
              <Clock className="text-[#3DC6E7]" size={20} />
              <div>
                <p className="text-xs text-on-surface-variant font-medium">
                  Duration & Format
                </p>
                <p className="text-sm font-bold text-on-surface">
                  {degree.duration}
                </p>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 1. Core Subjects */}
            <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#3DC6E7]/10 flex items-center justify-center">
                  <BookOpen className="text-[#3DC6E7]" size={20} />
                </div>
                <h2 className="text-xl font-bold text-on-surface">
                  Core Subjects
                </h2>
              </div>
              <ul className="space-y-4">
                {degree.coreSubjects.map((subject, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-body-md text-on-surface"
                  >
                    <CheckCircle2
                      className="text-[#3DC6E7] flex-shrink-0 mt-0.5"
                      size={18}
                    />
                    <span>{subject}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Top Career Options */}
            <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#3DC6E7]/10 flex items-center justify-center">
                  <Briefcase className="text-[#3DC6E7]" size={20} />
                </div>
                <h2 className="text-xl font-bold text-on-surface">
                  Top Career Options
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {degree.careers.map((career, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl bg-background border border-outline-variant/10"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#3DC6E7] flex-shrink-0"></div>
                    <span className="text-sm font-medium text-on-surface">
                      {career}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Entrance Exams (Left Column) */}
            <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#3DC6E7]/10 flex items-center justify-center">
                  <Trophy className="text-[#3DC6E7]" size={20} />
                </div>
                <h2 className="text-xl font-bold text-on-surface">
                  Entrance Exams
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {degree.entranceExams.map((exam, idx) => (
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

            {/* 4. Interests (Right Column) */}
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
                {degree.interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-lg text-sm font-medium"
                    style={{
                      backgroundColor: "#5DD4EF3A",
                      color: "#5DD4EF",
                      border: "2px solid rgba(70, 72, 212, 0.2)",
                    }}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};