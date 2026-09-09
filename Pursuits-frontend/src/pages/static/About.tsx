import { Link } from "react-router";
import { Compass, BookOpen, Target, Heart, ArrowRight } from "lucide-react";
import { Navbar } from "@/shared/ui/Navbar";

export const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-16 pt-28">
        {/* 1. Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3DC6E7]/10 text-[#3DC6E7] text-sm font-semibold mb-6">
            <Heart size={16} />
            Our Story & Vision
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-on-surface mb-6 tracking-tight capitalize"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            Because your career decisions <br className="hidden md:block" />{" "}
            deserves a <span className="text-[#3DC6E7]">Direction</span>.
          </h1>
          <p
            className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-3xl mx-auto"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            Pursuits is built for students who have just finished 10th or 12th
            grade and feel buried by the endless career options. We are here to
            helps you explore the paths that actually match your interests, subjects, and goals.
          </p>
        </div>

        {/* 2. The Problem We Are Solving */}
        <div className="mb-24">
          <h2
            className="text-3xl font-bold text-[#3DC6E7] mb-6"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            The Problem
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-body-lg text-on-surface-variant leading-relaxed">
                Finishing 10th or 12th grade is exciting, but only if no one
                asks what you wanna do next. A stream, degree, or a career that
                will define the rest of your life.
              </p>
              <p className="text-body-lg text-on-surface-variant leading-relaxed">
                The internet is full of excessive but unorganized information.
                You find random options with a lot of confusion. Its hard to
                know if the decision you are taking is aligned with your
                interests and passion or not.
              </p>
            </div>
            <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/20 flex flex-col justify-center">
              <p className="text-xl text-on-surface font-medium italic">
                "We realized that many students don't get guidance for what they
                should do next. So we built Pursuits to help those,
                <span className="text-[#3DC6E7]">
                  {" "}
                  who are in position where we were years ago
                </span>
                ."
              </p>
            </div>
          </div>
        </div>

        {/* 3. Our Vision */}
        <div className="mb-24 bg-[#3DC6E7]/5 rounded-3xl p-10 md:p-14 border border-[#3DC6E7]/10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#3DC6E7] flex items-center justify-center">
              <Compass className="text-white" size={24} />
            </div>
            <h2
              className="text-3xl font-bold text-on-surface"
              style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
            >
              Our Vision
            </h2>
          </div>
          <p className="text-body-lg text-on-surface-variant leading-relaxed mb-6">
            We want to build a platform where students can easily opt for career
            options that they are genuinely interested in. Whether you studied
            or want to study PCM, PCB, PCMB, Commerce, or Arts, your path
            forward should be clear until you get where you want to be.
          </p>
          <p className="text-body-lg text-on-surface-variant leading-relaxed">
            Our goal is simple: To help you make the right decision, we gathered
            the data and listed it based on students' interests. We want you to
            know exactly what you will study, what exams you need to clear, and
            what kind of jobs you can get <em>before</em> you commit your time
            and money to education.
          </p>
        </div>

        {/* 4. How Pursuits Helps You */}
        <div className="mb-24">
          <h2
            className="text-3xl font-bold text-on-surface mb-10 text-center"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            How Pursuits Helps You
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/20 hover:shadow-card-hover transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#3DC6E7]/10 flex items-center justify-center mb-6">
                <BookOpen className="text-[#3DC6E7]" size={24} />
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3">
                Clear Paths
              </h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                We break down your options into simple streams, categories:
                Degrees, Diplomas, and National Exams. Just organized data about
                what is relevant to your interests.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/20 hover:shadow-card-hover transition-all">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                <Target className="text-secondary" size={24} />
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3">
                Real Details
              </h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                For every option, we tell you the core interests, subjects, the
                eligibility, the entrance exams, and the actual career options
                you can expect.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/20 hover:shadow-card-hover transition-all">
              <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center mb-6">
                <Heart className="text-tertiary" size={24} />
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3">
                Honest Guidance
              </h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                We do not push you toward specific colleges or paid courses. We
                simply give you the facts so you can choose what is best for
                you.
              </p>
            </div>
          </div>
        </div>

        {/* 5. Our Promise / CTA */}
        <div className="text-center bg-surface-container-low rounded-3xl p-10 md:p-16 border border-outline-variant/20">
          <h2
            className="text-3xl md:text-4xl font-bold text-on-surface mb-6"
            style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}
          >
            Ready to find your own path?
          </h2>
          <p className="text-body-lg text-on-surface-variant leading-relaxed max-w-2xl mx-auto mb-8">
            Stop stressing and start exploring with Pursuits. Just take a few
            minutes to look through the options available for your aligned
            interests.
            <br />
            Your pursuit starts here.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#3DC6E7] text-white rounded-xl font-semibold text-lg hover:bg-[#3DC6E7]-hover transition-colors shadow-lg"
          >
            Start Exploring
            <ArrowRight size={20} />
          </Link>
        </div>
      </main>
    </div>
  );
};
