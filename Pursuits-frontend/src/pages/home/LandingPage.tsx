import { Link } from "react-router";
import { Sparkles, ArrowRight, GraduationCap } from "lucide-react";
import { AnimatedDots } from "@/shared/ui/AnimatedDots"

export const LandingPage = () => {

  return (
    <div 
      className="min-h-screen relative flex items-center justify-center" 
      style={{ backgroundColor: "#021A29" }}
    >
      
      {/* Background Effects (Centered for new layout) */}
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
      <section className="relative w-full px-6 lg:px-12 py-20">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
          
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
            <Sparkles size={14} />
            Your Future, Clarified
          </div>

          {/* Headings */}
          <div className="space-y-3">
            <h1
              className="text-[42px] lg:text-[64px] font-bold leading-[1.1] tracking-tight"
              style={{ color: "#E1F8FB", fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Confused about what to do next?
            </h1>
            <h2
              className="text-[32px] lg:text-[48px] font-bold leading-[1.2] tracking-tight"
              style={{ color: "#3DC6E7", fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Let's figure it out together.
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
          <div className="flex flex-col sm:flex-row gap-15 pt-4 justify-center w-full">
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

// import { Link } from "react-router";
// import { Sparkles, ArrowRight, GraduationCap, Heart } from "lucide-react";

// export const LandingPage = () => {
//   return (
//     <div
//       className="min-h-screen relative"
//       style={{ backgroundColor: "#021A29" }}
//     >
//       {/* Background Effects */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div
//           className="absolute inset-0"
//           style={{
//             background:
//               "radial-gradient(ellipse at 30% 50%, rgba(61, 198, 231, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(104, 220, 210, 0.1) 0%, transparent 50%)",
//           }}
//         />
//         {/* Animated Dots */}
//         <div className="absolute top-20 left-10 w-2 h-2 rounded-full bg-[#3DC6E7]/30 animate-pulse" />
//         <div
//           className="absolute top-40 right-20 w-3 h-3 rounded-full bg-[#68DCD2]/30 animate-pulse"
//           style={{ animationDelay: "1s" }}
//         />
//         <div
//           className="absolute bottom-32 left-1/4 w-2 h-2 rounded-full bg-[#93C101]/30 animate-pulse"
//           style={{ animationDelay: "2s" }}
//         />
//       </div>

//       {/* Main Content */}
//       <section className="relative min-h-[calc(100vh-72px)] flex items-center">
//         <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//             {/* ===== LEFT CONTENT ===== */}
//             <div className="space-y-8">
//               {/* Badge */}
//               <div
//                 className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold"
//                 style={{
//                   backgroundColor: "rgba(61, 198, 231, 0.15)",
//                   color: "#3DC6E7",
//                   backdropFilter: "blur(10px)",
//                   border: "1px solid rgba(61, 198, 231, 0.3)",
//                 }}
//               >
//                 <Heart size={14} />
//                 Your Future, Clarified
//               </div>

//               {/* Headings */}
//               <div className="space-y-3">
//                 <h1
//                   className="text-[42px] lg:text-[56px] font-bold leading-[1.1] tracking-tight"
//                   style={{
//                     color: "#E1F8FB",
//                     fontFamily: "Plus Jakarta Sans, sans-serif",
//                   }}
//                 >
//                   Confused about what to do next?
//                 </h1>
//                 <h2
//                   className="text-[32px] lg:text-[44px] font-bold leading-[1.2] tracking-tight"
//                   style={{
//                     color: "#3DC6E7",
//                     fontFamily: "Plus Jakarta Sans, sans-serif",
//                   }}
//                 >
//                    Let’s figure it out together.
//                 </h2>
//               </div>

//               {/* Description */}
//               <p
//                 className="text-[16px] lg:text-[18px] leading-relaxed max-w-lg"
//                 style={{
//                   color: "#8AB4C8",
//                   fontFamily: "Plus Jakarta Sans, sans-serif",
//                 }}
//               >
//                 Explore the best roadmap to your passion.Turn what you love into a future you’ll love with Pursuits.
//               </p>

//               {/* Buttons */}
//               <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                 <Link
//                   to="/explore/after-10th"
//                   className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-[15px] font-semibold text-[#001520] transition-all duration-300 hover:scale-105"
//                   style={{
//                     background:
//                       "linear-gradient(135deg, #3DC6E7 0%, #5DD4EF 100%)",
//                     boxShadow: "0px 8px 24px rgba(61, 198, 231, 0.4)",
//                     fontFamily: "Plus Jakarta Sans, sans-serif",
//                   }}
//                 >
//                   I just finished 10th class
//                   <ArrowRight size={18} />
//                 </Link>

//                 <Link
//                   to="/explore/after-12th"
//                   className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-[15px] font-semibold text-[#001520] transition-all duration-300 hover:scale-105"
//                   style={{
//                     background:
//                       "linear-gradient(135deg, #3DC6E7 0%, #5DD4EF 100%)",
//                     boxShadow: "0px 8px 24px rgba(61, 198, 231, 0.4)",
//                     fontFamily: "Plus Jakarta Sans, sans-serif",
//                   }}
//                 >
//                   I just finished 12th class
//                   <GraduationCap size={18} />
//                 </Link>
//               </div>
//             </div>

//             {/* ===== RIGHT SIDE - ONLY IMAGE ===== */}
//             <div className="relative flex justify-center lg:justify-end items-center mr-20">
//               <div
//                 className="absolute w-[500px] h-[300px] lg:w-[450px] lg:h-[450px] rounded-full blur-[100px] pointer-events-none"
//                 style={{
//                   background:
//                     "radial-gradient(circle, rgba(61, 198, 231, 0.25) 0%, transparent 70%)",
//                 }}
//               />
//               <img
//                 src="src\assets\books.png"
//                 alt="Career Pathway Illustration"
//                 className="w-full h-[600px] max-w-[450px] lg:max-w-[500px] object-contain drop-shadow-2xl"
//               />
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// import { useState } from "react";
// import { Link, useNavigate } from "react-router";
// import { Sparkles, ArrowRight, GraduationCap } from "lucide-react";
// import { motion } from "framer-motion";

// export const LandingPage = () => {
//   const navigate = useNavigate();
//   const [isTransitioning, setIsTransitioning] = useState(false);

//   return (
//     <div
//       className="min-h-screen relative"
//       style={{ backgroundColor: "#021A29" }}
//     >
//       {isTransitioning && (
//         <div className="fixed inset-0 z-50 pointer-events-none">
//           <div
//             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full animate-ping"
//             style={{
//               background:
//                 "radial-gradient(circle, rgba(61, 198, 231, 0.6) 0%, transparent 70%)",
//               animation: "expandCircle 0.8s ease-out forwards",
//             }}
//           />

//           <div
//             className="absolute inset-0 bg-[#3DC6E7]"
//             style={{
//               animation: "flashEffect 0.8s ease-out forwards",
//             }}
//           />
//         </div>
//       )}

//       <section
//         className="relative min-h-[calc(100vh-72px)] flex items-center overflow-hidden transition-opacity duration-500"
//         style={{
//           backgroundColor: "#021A29",
//           opacity: isTransitioning ? 0 : 1,
//         }}
//       >
//         <div
//           className="absolute inset-0"
//           style={{
//             background:
//               "radial-gradient(ellipse at 30% 50%, rgba(61, 198, 231, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(104, 220, 210, 0.1) 0%, transparent 50%)",
//           }}
//         />

//         {/* Animated Background Dots */}
//         <div className="absolute inset-0 overflow-hidden">
//           <div
//             className="absolute top-20 left-10 w-2 h-2 rounded-full bg-[#3DC6E7]/30 animate-pulse"
//             style={{ animationDuration: "3s" }}
//           />
//           <div
//             className="absolute top-40 right-20 w-3 h-3 rounded-full bg-[#68DCD2]/30 animate-pulse"
//             style={{ animationDuration: "4s", animationDelay: "1s" }}
//           />
//           <div
//             className="absolute bottom-32 left-1/4 w-2 h-2 rounded-full bg-[#93C101]/30 animate-pulse"
//             style={{ animationDuration: "3.5s", animationDelay: "2s" }}
//           />
//         </div>

//         <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full relative z-10">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
//             {/* ===== LEFT CONTENT ===== */}
//             <div className="space-y-8 animate-fadeInLeft">
//               <div
//                 className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-transform duration-300 hover:scale-105"
//                 style={{
//                   backgroundColor: "rgba(61, 198, 231, 0.15)",
//                   color: "#3DC6E7",
//                   backdropFilter: "blur(10px)",
//                   border: "1px solid rgba(61, 198, 231, 0.3)",
//                 }}
//               >
//                 <Sparkles size={14} />
//                 Your Future, Clarified
//               </div>

//               <div className="space-y-3">
//                 <h1
//                   className="text-[42px] lg:text-[56px] font-bold leading-[1.1] tracking-tight"
//                   style={{
//                     color: "#E1F8FB",
//                     fontFamily: "Plus Jakarta Sans, sans-serif",
//                   }}
//                 >
//                   Confused about what to do next?
//                 </h1>
//                 <h2
//                   className="text-[32px] lg:text-[44px] font-bold leading-[1.2] tracking-tight"
//                   style={{
//                     color: "#3DC6E7",
//                     fontFamily: "Plus Jakarta Sans, sans-serif",
//                   }}
//                 >
//                   We'll help you find the career that's actually yours.
//                 </h2>
//               </div>

//               <p
//                 className="text-[16px] lg:text-[18px] leading-relaxed max-w-lg"
//                 style={{
//                   color: "#8AB4C8",
//                   fontFamily: "Plus Jakarta Sans, sans-serif",
//                 }}
//               >
//                 Pursuits has everything you need to know about where your
//                 passion can lead you — all at one place.
//               </p>

//               <motion.div
//                 className="flex flex-col sm:flex-row gap-4 pt-4"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.6 }}
//               >
//                 <Link
//                   to="/explore/after-10th"
//                   className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-[15px] font-semibold text-[#001520] transition-all duration-300 hover:scale-105"
//                   style={{
//                     background:
//                       "linear-gradient(135deg, #3DC6E7 0%, #5DD4EF 100%)",
//                     boxShadow: "0px 8px 24px rgba(61, 198, 231, 0.4)",
//                     fontFamily: "Plus Jakarta Sans, sans-serif",
//                   }}
//                 >
//                   I just finished 10th class
//                   <ArrowRight size={18} />
//                 </Link>

//                 <Link
//                   to="/explore/after-12th"
//                   className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-[15px] font-semibold text-[#001520] transition-all duration-300 hover:scale-105"
//                   style={{
//                     background:
//                       "linear-gradient(135deg, #3DC6E7 0%, #5DD4EF 100%)",
//                     boxShadow: "0px 8px 24px rgba(61, 198, 231, 0.4)",
//                     fontFamily: "Plus Jakarta Sans, sans-serif",
//                   }}
//                 >
//                   I just finished 12th class
//                   <GraduationCap size={18} />
//                 </Link>
//               </motion.div>
//             </div>

//             {/* Right Image Card */}
//             <Link
//               to="/explore/after-10th"
//               className="relative flex justify-center lg:justify-end group cursor-pointer"
//             >
//               {/* Offset background card (cyan glow effect) */}
//               <div
//                 className="absolute inset-0 rounded-[32px] transform translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6"
//                 style={{
//                   background:
//                     "linear-gradient(135deg, rgba(61, 198, 231, 0.3) 0%, rgba(104, 220, 210, 0.2) 100%)",
//                   backdropFilter: "blur(20px)",
//                   boxShadow: "0px 20px 60px rgba(61, 198, 231, 0.3)",
//                 }}
//               />

//               {/* Main card with image */}
//               <div
//                 className="relative rounded-[32px] p-6 lg:p-8 transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_0_40px_rgba(61,198,231,0.4)]"
//                 style={{
//                   background:
//                     "linear-gradient(135deg, rgba(61, 198, 231, 0.1) 0%, rgba(104, 220, 210, 0.05) 100%)",
//                   border: "2px solid rgba(61, 198, 231, 0.3)",
//                   boxShadow: "0px 20px 60px rgba(2, 26, 41, 0.5)",
//                 }}
//               >
//                 {/* Click indicator */}
//                 <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-[#3DC6E7] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 z-10">
//                   <svg
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="#001520"
//                     strokeWidth="3"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   >
//                     <path d="M5 12h14M12 5l7 7-7 7" />
//                   </svg>
//                 </div>

//                 <img
//                   src="/assets/books.png"
//                   alt="Career Pathway Illustration"
//                   className="w-full h-auto max-w-[500px] object-contain transition-transform duration-500 group-hover:scale-105"
//                   style={{
//                     filter:
//                       "drop-shadow(0px 10px 30px rgba(61, 198, 231, 0.4))",
//                   }}
//                 />

//                 {/* Hover text overlay */}
//                 <div className="absolute inset-0 rounded-[32px] bg-gradient-to-t from-[#021A29]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
//                   <p
//                     className="text-[#3DC6E7] font-bold text-lg"
//                     style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
//                   >
//                     Click to explore Pursuits
//                   </p>
//                 </div>
//               </div>
//             </Link>

//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
