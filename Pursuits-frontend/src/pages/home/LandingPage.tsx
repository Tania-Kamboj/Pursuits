import { Link } from "react-router";
import { Heart, ArrowRight, GraduationCap } from "lucide-react";
import { AnimatedDots } from "@/shared/ui/AnimatedDots"

export const LandingPage = () => {

  return (
    <div 
      className="min-h-screen relative flex items-center justify-center" 
      style={{ backgroundColor: "#021A29" }}
    >
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(61, 198, 231, 0.15) 0%, transparent 60%)",
          }}
        />
       <AnimatedDots />
      </div>

      {/* Main Content - Perfectly Centered */}
      <section className="relative w-full px-6 lg:px-12 pt-0 pb-8 py-2">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-5">
          
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold"
            style={{
              backgroundColor: "rgba(61, 198, 231, 0.15)",
              color: "#3DC6E7",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(61, 198, 231, 0.3)",
            }}
          >
            < Heart size={14} />
            Pursuit — A Journey of Discovery
          </div>

          {/* Headings */}
          <div className="space-y-6">
            <h1
              className="text-[42px] lg:text-[57px] font-bold leading-[1.1] tracking-tight"
              style={{ color: "#E1F8FB", fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Confused about what to do next?
            </h1>
            <h2
              className="text-[30px] lg:text-[40px] font-bold leading-[1.2] tracking-tight"
              style={{ color: "#3DC6E7", fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Let's begin to discover together.
            </h2>
          </div>

          {/* Description */}
          <p
            className="text-[16px] lg:text-[18px] leading-relaxed max-w-2xl mx-auto"
            style={{ color: "#8AB4C8", fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            Explore the best roadmap to your passion. Turn what you love into a future you'll love with Pursuits.
          </p>

          {/* Buttons - Centered */}
          <div className="flex flex-col sm:flex-row gap-15 pt-2 justify-center w-full">
            <Link
              to="/explore/after-10th"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-[15px] font-semibold text-[#001520] transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #3DC6E7 0%, #5DD4EF 100%)",
                boxShadow: "0px 8px 24px rgba(61, 198, 231, 0.4)",
                fontFamily: "Plus Jakarta Sans, sans-serif",
              }}
            >
              I just finished 10th class
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/explore/after-12th"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-[15px] font-semibold text-[#001520] transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #3DC6E7 0%, #5DD4EF 100%)",
                boxShadow: "0px 8px 24px rgba(61, 198, 231, 0.4)",
                fontFamily: "Plus Jakarta Sans, sans-serif",
              }}
            >
              I just finished 12th class
              <GraduationCap size={18} />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
};