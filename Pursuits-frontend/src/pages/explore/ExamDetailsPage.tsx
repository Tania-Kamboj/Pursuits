import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router'
import { AnimatedDots } from "@/shared/ui/AnimatedDots";
import { DashboardSidebar } from '@/features/dashboard/DashboardSidebar'
import { useActiveStream } from '@/hooks/useActiveStream'

import { 
  ChevronRight, 
  ArrowLeft, 
  Trophy, 
  Users,
  Target,
  BookOpen,
  ClipboardList,
  TrendingUp,
  Award,
  CheckCircle2,
  Clock,
  GraduationCap,
  MapPin,
} from 'lucide-react'

interface Exam {
  _id: string
  name: string
  stream: string
  conductingBody: string
  purpose: string
  eligibility: string
  subjectsAndWeightage: string
  attemptAndPattern: string
  preparation: string
  category: string
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1"

export const ExamDetailsPage = () => {
  const { examId } = useParams<{ examId: string }>()
  const navigate = useNavigate()
  const [exam, setExam] = useState<Exam | null>(null)
  const [loading, setLoading] = useState(true)
  
  const streamId = useActiveStream()
  const streamName = streamId.toUpperCase()

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${API_URL}/exams/${examId}`)
        const result = await response.json()
        
        if (result.success) {
          setExam(result.data)
        }
      } catch (error) {
        console.error('Error fetching exam:', error)
      } finally {
        setLoading(false)
      }
    }

    if (examId) fetchExamDetails()
  }, [examId])

  const splitLines = (text: string) => {
    if (!text) return []
    return text.split(/[\n,]/).map(line => line.trim()).filter(line => line)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background relative">
        <AnimatedDots />
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3DC6E7]"></div>
      </div>
    )
  }

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background relative">
        <AnimatedDots />
        <div className="text-center px-4">
          <p className="text-lg text-on-surface-variant mb-4">Exam not found.</p>
          <button 
            onClick={() => navigate(`/explore/after-12th/${streamId}/exams`)}
            className="px-6 py-3 bg-[#3DC6E7] text-white rounded-xl font-semibold hover:bg-[#3DC6E7]/90 transition-colors"
          >
            Back to Exams
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background relative">
      <AnimatedDots />
      
      {/* Main Layout Container */}
      <div className="flex flex-1 w-full max-w-[1400px] mx-auto px-4 lg:px-8 py-6 lg:py-10 gap-6 lg:gap-10 pt-20 lg:pt-24">
        
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0 sticky top-[90px] h-fit self-start">
          <DashboardSidebar activeTab="exams" streamName={streamName} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 pb-20 w-full">
          
          {/* Breadcrumb & Back Button */}
          <div className="sticky top-[72px] lg:top-[90px] z-40  backdrop-blur-md py-3 lg:py-4 -mx-4 lg:-mx-8 px-4 lg:px-8 mb-6 lg:mb-8 border-b border-outline-variant/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 lg:gap-2 text-xs lg:text-body-md text-on-surface-variant flex-wrap">
                <Link to="/" className="hover:text-[#3DC6E7] transition-colors">Home</Link>
                <ChevronRight size={14} className="text-outline-variant" />
                <Link to="/explore/after-12th" className="hover:text-[#3DC6E7] transition-colors">After 12th</Link>
                <ChevronRight size={14} className="text-outline-variant" />
                <Link to={`/explore/after-12th/dashboard/${streamId}`} className="hover:text-[#3DC6E7] transition-colors">{streamName}</Link>
                <ChevronRight size={14} className="text-outline-variant" />
                <Link to={`/explore/after-12th/${streamId}/exams`} className="hover:text-[#3DC6E7] transition-colors">National Exams</Link>
                <ChevronRight size={14} className="text-outline-variant" />
                <span className="text-[#3DC6E7] font-semibold truncate max-w-[200px] lg:max-w-[300px]">{exam.name}</span>
              </div>

              <button 
                onClick={() => navigate(`/explore/after-12th/${streamId}/exams`)}
                className="flex items-center gap-2 text-[#3DC6E7] hover:text-[#3DC6E7]/80 font-medium transition-colors whitespace-nowrap text-sm lg:text-base"
              >
                <ArrowLeft size={16} />
                <span className="hidden sm:inline">Back to Exams</span>
                <span className="sm:hidden">Back</span>
              </button>
            </div>
          </div>

          {/* Header Section */}
          <div className="mb-8 lg:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3DC6E7]/10 text-[#3DC6E7] text-xs font-bold mb-4 tracking-wide">
              <Trophy size={14} />
              {streamName} STREAM EXAM
            </div>
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-on-surface tracking-tight mb-4" 
              style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
            >
              {exam.name}
            </h1>
          </div>

          {/* 6 Main Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            
            {/* Card 1: Conducting Body */}
            <div className="bg-surface-container-lowest rounded-2xl p-4 sm:p-6 lg:p-8 border border-outline-variant/20 hover:shadow-card-hover transition-all">
              <div className="flex items-center gap-3 mb-4 lg:mb-6">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-[#3DC6E7]/10 flex items-center justify-center flex-shrink-0">
                  <Users className="text-[#3DC6E7]" size={20} />
                </div>
                <h2 className="text-lg lg:text-xl font-bold text-on-surface">Conducting Body</h2>
              </div>
              <div className="flex items-start gap-3 p-3 lg:p-4 rounded-xl bg-[#3DC6E7]/5">
                <MapPin className="text-[#3DC6E7] flex-shrink-0 mt-1" size={18} />
                <p className="text-sm lg:text-body-md text-on-surface font-medium">{exam.conductingBody}</p>
              </div>
            </div>

            {/* Card 2: Purpose */}
            <div className="bg-surface-container-lowest rounded-2xl p-4 sm:p-6 lg:p-8 border border-outline-variant/20 hover:shadow-card-hover transition-all">
              <div className="flex items-center gap-3 mb-4 lg:mb-6">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Target className="text-[#3DC6E7]" size={20} />
                </div>
                <h2 className="text-lg lg:text-xl font-bold text-on-surface">Purpose</h2>
              </div>
              <div className="flex items-start gap-3 p-3 lg:p-4 rounded-xl bg-secondary/5">
                <Award className="text-[#3DC6E7] flex-shrink-0 mt-1" size={18} />
                <p className="text-sm lg:text-body-md text-on-surface">{exam.purpose}</p>
              </div>
            </div>

            {/* Card 3: Eligibility */}
            <div className="bg-surface-container-lowest rounded-2xl p-4 sm:p-6 lg:p-8 border border-outline-variant/20 hover:shadow-card-hover transition-all">
              <div className="flex items-center gap-3 mb-4 lg:mb-6">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-[#3DC6E7]/10  flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="text-[#3DC6E7]" size={20} />
                </div>
                <h2 className="text-lg lg:text-xl font-bold text-on-surface">Eligibility</h2>
              </div>
              <ul className="space-y-3">
                {splitLines(exam.eligibility).map((line, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#3DC6E7] flex-shrink-0 mt-1" size={16} />
                    <span className="text-sm lg:text-body-md text-on-surface-variant">{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 4: Subjects & Weightage */}
            <div className="bg-surface-container-lowest rounded-2xl p-4 sm:p-6 lg:p-8 border border-outline-variant/20 hover:shadow-card-hover transition-all">
              <div className="flex items-center gap-3 mb-4 lg:mb-6">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-[#3DC6E7]/10 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="text-[#3DC6E7]" size={20} />
                </div>
                <h2 className="text-lg lg:text-xl font-bold text-on-surface">Subjects & Weightage</h2>
              </div>
              <ul className="space-y-3">
                {splitLines(exam.subjectsAndWeightage).map((line, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#3DC6E7] mt-1.5 flex-shrink-0"></div>
                    <span className="text-sm lg:text-body-md text-on-surface-variant">{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 5: Exam Pattern */}
            <div className="bg-surface-container-lowest rounded-2xl p-4 sm:p-6 lg:p-8 border border-outline-variant/20 hover:shadow-card-hover transition-all">
              <div className="flex items-center gap-3 mb-4 lg:mb-6">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-[#3DC6E7]/10 flex items-center justify-center flex-shrink-0">
                  <ClipboardList className="text-[#3DC6E7]" size={20} />
                </div>
                <h2 className="text-lg lg:text-xl font-bold text-on-surface">Exam Pattern</h2>
              </div>
              <ul className="space-y-3">
                {splitLines(exam.attemptAndPattern).map((line, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Clock className="text-[#3DC6E7] flex-shrink-0 mt-1" size={16} />
                    <span className="text-sm lg:text-body-md text-on-surface-variant">{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 6: Preparation Strategy */}
            <div className="bg-surface-container-lowest rounded-2xl p-4 sm:p-6 lg:p-8 border border-outline-variant/20 hover:shadow-card-hover transition-all">
              <div className="flex items-center gap-3 mb-4 lg:mb-6">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-[#3DC6E7]/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="text-[#3DC6E7]" size={20} />
                </div>
                <h2 className="text-lg lg:text-xl font-bold text-on-surface">Preparation Strategy</h2>
              </div>
              <ul className="space-y-3">
                {splitLines(exam.preparation).map((line, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <GraduationCap className="text-[#3DC6E7] flex-shrink-0 mt-1" size={16} />
                    <span className="text-sm lg:text-body-md text-on-surface-variant">{line}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}