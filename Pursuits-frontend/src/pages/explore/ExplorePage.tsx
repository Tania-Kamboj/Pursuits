import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { AnimatedDots } from "@/shared/ui/AnimatedDots";

const journeyCards = [
  {
    id: "10th",
    title: "I just finished 10th class",
    desc: "Once you know your interests, pick the group of subjects that fits your passion.",
    badge: "Foundation",
    badgeColor: "bg-[#C4E08A] text-[#0A1A02]",
    icon: ArrowRight,
    link: "/explore/after-10th",
  },
  {
    id: "12th",
    title: "I just finished 12th class",
    desc: "Discover college courses, entrance exams, and professional guides.",
    badge: "Specialization",
    badgeColor: "bg-[#C4E08A] text-[#0A1A02]",
    icon: ArrowRight,
    link: "/explore/after-12th",
  },
];

export const ExplorePage = () => {
  return (
    <div className="min-h-[calc(100vh-72px-300px)] bg-background py-20 px-6">
      <AnimatedDots />
      <div className="max-w-[1100px] mx-auto">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h1
            className="text-4xl md:text-5xl font-bold text-on-surface mb-4 tracking-tight"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            Where are you on your education journey?
          </h1>
          <p
            className="text-lg text-on-surface-variant leading-relaxed"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            Select your current stage of study to find the perfect career and
            study plan for you.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {journeyCards.map((card) => {
            const Icon = card.icon;

            return (
              <Link to={card.link} key={card.id} className="group block">
                <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-8 h-full transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 hover:border-[#3DC6E7]/30">
                  {/* Top Row: Icon & Badge */}
                  <div className="flex items-start justify-between mb-8">
                    {/* Icon Circle */}
                    <div className="w-12 h-12 rounded-full bg-[#3DC6E7]/10 flex items-center justify-center">
                      <Icon
                        className="text-[#3DC6E7]"
                        size={24}
                        strokeWidth={2}
                      />
                    </div>

                    {/* Badge */}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${card.badgeColor}`}
                    >
                      {card.badge}
                    </span>
                  </div>

                  {/* Content */}
                  <h3
                    className="text-2xl font-bold text-on-surface mb-3"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  >
                    {card.title}
                  </h3>
                  <p
                    className="text-body-md text-on-surface-variant leading-relaxed"
                    style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
                  >
                    {card.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};
