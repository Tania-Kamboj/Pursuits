import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { AnimatedDots } from "@/shared/ui/AnimatedDots";

import {
  ArrowLeft,
  BookOpen,
  Briefcase,
  Trophy,
  Target,
  ChevronRight,
  CheckCircle2,
  BookMarked,
  Lightbulb,
  TrendingUp,
  GraduationCap,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

export const StreamDetailPage = () => {
  const { streamId } = useParams<{ streamId: string }>();
  const navigate = useNavigate();
  const [stream, setStream] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStreamDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/streams`);
        const result = await response.json();

        if (result.success) {
          const foundStream = result.data.find((s: any) => {
            const streamName = s.name.toLowerCase();
            const searchId = streamId?.toLowerCase();

            if (s._id === streamId) return true;

            if (
              searchId === "pcm" &&
              streamName.includes("pcm") &&
              !streamName.includes("pcmb")
            )
              return true;
            if (
              searchId === "pcb" &&
              streamName.includes("pcb") &&
              !streamName.includes("pcmb")
            )
              return true;
            if (searchId === "pcmb" && streamName.includes("pcmb")) return true;
            if (searchId === "commerce" && streamName.includes("commerce"))
              return true;
            if (
              searchId === "arts" &&
              (streamName.includes("arts") || streamName.includes("humanities"))
            )
              return true;

            return false;
          });

          if (foundStream) {
            console.log("Found stream:", foundStream);
            console.log("Career options:", foundStream.careerOptions);
            setStream(foundStream);
          } else {
            setError("Stream not found");
          }
        } else {
          setError("Failed to fetch stream details");
        }
      } catch (err) {
        console.error("Error fetching stream:", err);
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStreamDetails();
  }, [streamId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3DC6E7] mx-auto mb-4"></div>
          <p className="text-on-surface-variant">Loading stream details...</p>
        </div>
      </div>
    );
  }

  if (error || !stream) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-error mb-2">Oops!</h2>
          <p className="text-on-surface-variant mb-6">
            {error || "Stream not found"}
          </p>
          <button
            onClick={() => navigate("/explore/after-10th")}
            className="px-6 py-3 bg-[#3DC6E7] text-white rounded-xl font-semibold hover:bg-[#3DC6E7]-hover"
          >
            Back to Streams
          </button>
        </div>
      </div>
    );
  }

  const shortName = stream.name.split("(")[0].trim();

  return (
    <div className="min-h-screen bg-background">
      <AnimatedDots />
      {/* Breadcrumb */}
      <div className="sticky top-[90px] z-40 backdrop-blur-md ">
        <div className="max-w-[1280px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-body-md">
              <Link
                to="/"
                className="text-on-surface hover:text-[#3DC6E7] transition-colors"
              >
                Home
              </Link>
              <ChevronRight size={16} className="text-outline-variant" />
              <Link
                to="/explore/after-10th"
                className="text-on-surface hover:text-[#3DC6E7] transition-colors"
              >
                After 10th
              </Link>
              <ChevronRight size={16} className="text-outline-variant" />
              <span className="text-[#3DC6E7] font-semibold">{shortName}</span>
            </div>

            <button
              onClick={() => navigate("/explore/after-10th")}
              className="flex items-center gap-2 text-[#3DC6E7] hover:text-[#3DC6E7]-hover font-medium transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Streams
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-12 space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-on-surface mb-4">
            {stream.name}
          </h1>
          <p className="text-lg text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
            {stream.description}
          </p>
        </div>

        {/* Interests AND Subjects */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Interests Section */}
          <div className="lg:col-span-2 bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <Lightbulb className="text-[#3DC6E7]" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-on-surface">
                Best if your interest lies in...
              </h2>
            </div>

            {/*LINEAR LIST instead of grid */}
            <div className="space-y-4">
              {stream.interestsRequired?.map(
                (interest: string, idx: number) => {
                  const [title, ...descParts] = interest.split(":");
                  const description = descParts.join(":").trim();

                  return (
                    <div
                      key={idx}
                      className="flex gap-4 p-5 rounded-xl bg-background border border-outline-variant/10 hover:border-[#3DC6E7]/30 hover:shadow-md transition-all"
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-full bg-[#3DC6E7]/10 flex items-center justify-center">
                          <TrendingUp className="text-[#3DC6E7]" size={18} />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-on-surface mb-1">
                          {title}
                        </h3>
                        {description && (
                          <p className="text-body-md text-on-surface-variant leading-relaxed">
                            {description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>

          {/* Subjects Section */}
          <div className="space-y-4">
            {/* Compulsory */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#3DC6E7]/10 flex items-center justify-center">
                  <BookOpen className="text-[#3DC6E7]" size={20} />
                </div>
                <h2 className="text-lg font-bold text-on-surface">
                  Compulsory
                </h2>
              </div>
              <ul className="space-y-3">
                {stream.subjects?.compulsory?.map(
                  (subj: string, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-body-md text-on-surface list-none"
                    >
                      <CheckCircle2
                        className="text-[#3DC6E7] flex-shrink-0 mt-0.5"
                        size={18}
                      />
                      <span>{subj}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Optional */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <BookMarked className="text-secondary" size={20} />
                </div>
                <h2 className="text-lg font-bold text-on-surface">Optional</h2>
              </div>
              <ul className="space-y-3">
                {stream.subjects?.optional?.map((subj: string, idx: number) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-body-md text-on-surface-variant list-none"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0 mt-2"></div>
                    <span>{subj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 2. Core Topics by Subject */}
        <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#3DC6E7]/10 flex items-center justify-center">
              <Target className="text-[#3DC6E7]" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-on-surface">
              Core Topics to Study
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stream.subjectTopics?.map((subjData: any, idx: number) => (
              <div
                key={idx}
                className="bg-background rounded-xl p-5 border border-outline-variant/10"
              >
                <h3 className="font-bold text-[#3DC6E7] mb-3 flex items-center gap-2">
                  <GraduationCap size={18} />
                  {subjData.subject}
                </h3>
                <ul className="space-y-2">
                  {subjData.topics.map((topic: string, tIdx: number) => (
                    <li
                      key={tIdx}
                      className="flex items-start gap-2 text-sm text-on-surface-variant"
                    >
                      <span className="text-[#3DC6E7] mt-1.5">•</span>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Career Options */}
        <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#3DC6E7]/10 flex items-center justify-center">
              <Briefcase className="text-[#3DC6E7]" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-on-surface">
              Top Career Options
            </h2>
          </div>

          {stream.careerOptions && stream.careerOptions.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {stream.careerOptions.map((career: string, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center justify-center p-4 rounded-xl bg-background border border-outline-variant/20 hover:border-[#3DC6E7]/30 hover:shadow-md transition-all"
                >
                  <span className="text-sm font-semibold text-on-surface text-center leading-tight">
                    {career}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-on-surface-variant bg-background rounded-xl border border-dashed border-outline-variant/30">
              <p>
                Career options are highly flexible and depend on your specific
                subject combination and further specialization.
              </p>
            </div>
          )}
        </div>

        {/* 4. National Entrance Exams */}
        <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#3DC6E7]/10 flex items-center justify-center">
              <Trophy className="text-[#3DC6E7]" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-on-surface">
              National Entrance Exams
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {stream.entranceExams?.map((exam: any, idx: number) => (
              <div key={idx} className="group relative">
                <div
                  className="px-6 py-3 rounded-full text-sm font-semibold cursor-pointer transition-all hover:shadow-lg flex items-center gap-2"
                  style={{
                    backgroundColor: "#5DD4EF3A",
                    color: "#5DD4EF",
                    border: "2px solid rgba(70, 72, 212, 0.2)",
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                  }}
                >
                  <Trophy size={16} />
                  {exam.name}
                </div>
                {/* Tooltip with purpose */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-3 bg-on-surface-variant text-inverse-on-surface text-sm rounded-xl opacity-0 invisible group-hover:opacity-0 group-hover:visible transition-all z-10 shadow-xl max-w-xs text-center">
                  {exam.purpose}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-on-surface"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
