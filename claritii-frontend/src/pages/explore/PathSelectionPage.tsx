import { Link, useParams } from "react-router";
import { DashboardSidebar } from '@/features/dashboard/DashboardSidebar'
import { AnimatedDots } from "@/shared/ui/AnimatedDots";

import {
  ChevronRight,
  Building2,
  Award,
  BookOpen,
  ArrowRight,
} from "lucide-react";

export const PathSelectionPage = () => {
  const { streamId } = useParams<{ streamId: string }>();
  const streamName = streamId ? streamId.toUpperCase() : "PCM";

const milestones = [
  {
    id: "exams",
    title: "National Government Exams",
    description: "Explore competitive exams for public sector roles, defense, and administrative services.",
    icon: Building2,
    linkText: "Explore Exams",
    linkTo: `/explore/after-12th/${streamId}/exams`,
    accentColor: "from-primary/10 to-primary/5",
    iconBg: "bg-[#3DC6E7]/10",
    iconColor: "text-[#3DC6E7]",
  },
  {
    id: "diploma",
    title: "Diploma Options",
    description: "Discover specialized, skill-based professional diplomas for rapid industry entry.",
    icon: Award,
    linkText: "View Diplomas",
    linkTo: `/explore/after-12th/${streamId}/diplomas`,
    accentColor: "from-secondary/10 to-secondary/5",
    iconBg: "bg-[#3DC6E7]/10",
    iconColor: "text-[#3DC6E7]",
  },
  {
    id: "graduation",
    title: "Graduation Options",
    description: "Browse comprehensive degree courses like B.Tech, B.Sc, and other undergraduate programs.",
    icon: BookOpen,
    linkText: "Find Degrees",
    linkTo: `/explore/after-12th/degree-categories/${streamId || 'pcm'}`, 
    accentColor: "from-tertiary/10 to-tertiary/5",
    iconBg: "bg-[#3DC6E7]/10",
    iconColor: "text-[#3DC6E7]",
  },
];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AnimatedDots />
      <div className="flex flex-1 w-full max-w-[1400px] mx-auto px-8 py-10 gap-10">
        
        <DashboardSidebar activeTab="streams" streamName={streamName} />
       
        <main className="flex-1 min-w-0 pb-20">
          <div className="flex items-center justify-between mb-8 sticky top-[90px] z-40 backdrop-blur-md py-4 px-6 -mx-6 ">
            <div className="flex items-center gap-2 text-body-md text-on-surface-variant">
              <Link to="/" className="text-on-surface hover:text-[#3DC6E7] transition-colors">Home</Link>
            <ChevronRight size={16} className="text-outline-variant" />
            <Link to="/explore" className="text-on-surface hover:text-[#3DC6E7] transition-colors">Explore</Link>
            <ChevronRight size={16} className="text-outline-variant" />
            <Link to="/explore/after-12th" className="text-on-surface hover:text-[#3DC6E7] transition-colors">After 12th</Link>
            <ChevronRight size={16} className="text-outline-variant" />
            <span className="text-[#3DC6E7] font-semibold">Path Selection</span>
          </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3DC6E7]/10 border border-[#3DC6E7]/20 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#3DC6E7]"></div>
            <span className="text-sm font-semibold text-[#3DC6E7] tracking-wide">
              {streamName} STREAM
            </span>
          </div>

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-on-surface mb-4 tracking-tight" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              Choose Your Next <span className="text-[#3DC6E7]">Move</span>
            </h1>
            <p className="text-lg text-on-surface-variant leading-relaxed max-w-3xl" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              You've selected the {streamName} stream. Explore the three main avenues available to you and discover which aligns best with your career aspirations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestones.map((milestone) => (
              <Link to={milestone.linkTo} key={milestone.id} className="group block">
                <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/20 hover:border-[#3DC6E7]/30 hover:shadow-card-hover transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                  <div className={`w-14 h-14 rounded-xl ${milestone.iconBg} flex items-center justify-center mb-6 relative z-10`}>
                    <milestone.icon className={milestone.iconColor} size={28} strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-bold text-on-surface mb-3 relative z-10" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                    {milestone.title}
                  </h3>
                  <p className="text-body-md text-on-surface-variant leading-relaxed mb-6 flex-grow relative z-10" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
                    {milestone.description}
                  </p>
                  <div className="flex items-center gap-2 text-[#3DC6E7] font-semibold text-[15px] group-hover:gap-3 transition-all relative z-10">
                    {milestone.linkText}
                    <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};