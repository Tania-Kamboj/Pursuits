import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router'
import { AnimatedDots } from "@/shared/ui/AnimatedDots";

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
import { DashboardSidebar } from '@/features/dashboard/DashboardSidebar'
import { useActiveStream } from '@/hooks/useActiveStream'
import { Navbar } from '@/shared/ui/Navbar' 

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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3DC6E7]"></div>
      </div>
    )
  }

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-xl text-on-surface-variant mb-4">Exam not found.</p>
          <button 
            onClick={() => navigate(`/explore/after-12th/${streamId}/exams`)}
            className="px-6 py-3 bg-[#3DC6E7] text-white rounded-xl font-semibold hover:bg-[#3DC6E7]-hover"
          >
            Back to Exams
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AnimatedDots />
      <Navbar />
      <div className="flex flex-1 w-full max-w-[1400px] mx-auto px-8 py-10 gap-10">
        
        {/* Sidebar */}
        <DashboardSidebar activeTab="exams" streamName={streamName} />

        {/* Main Content */}
        <main className="flex-1 min-w-0 pb-20">
          
          {/* Breadcrumb & Back Button */}
          <div className="sticky top-[90px] z-40 bg-background/90 backdrop-blur-md py-4 -mx-8 px-8 mb-8 border-b border-outline-variant/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-body-md text-on-surface-variant">
                <Link to="/" className="hover:text-[#3DC6E7] transition-colors">Home</Link>
                <ChevronRight size={16} className="text-outline-variant" />
                <Link to="/explore/after-12th" className="hover:text-[#3DC6E7] transition-colors">After 12th</Link>
                <ChevronRight size={16} className="text-outline-variant" />
                <Link to={`/explore/after-12th/dashboard/${streamId}`} className="hover:text-[#3DC6E7] transition-colors">{streamName}</Link>
                <ChevronRight size={16} className="text-outline-variant" />
                <Link to={`/explore/after-12th/${streamId}/exams`} className="hover:text-[#3DC6E7] transition-colors">National Exams</Link>
                <ChevronRight size={16} className="text-outline-variant" />
                <span className="text-[#3DC6E7] font-semibold truncate max-w-[300px]">{exam.name}</span>
              </div>

              <button 
                onClick={() => navigate(`/explore/after-12th/${streamId}/exams`)}
                className="flex items-center gap-2 text-[#3DC6E7] hover:text-[#3DC6E7]-hover font-medium transition-colors whitespace-nowrap"
              >
                <ArrowLeft size={18} />
                Back to Exams
              </button>
            </div>
          </div>

          {/* Header Section */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3DC6E7]/10 text-[#3DC6E7] text-xs font-bold mb-4 tracking-wide">
              <Trophy size={14} />
              {streamName} STREAM EXAM
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-on-surface tracking-tight mb-4" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              {exam.name}
            </h1>
          </div>

          {/* 6 Main Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: Conducting Body */}
            <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/20 hover:shadow-card-hover transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#3DC6E7]/10 flex items-center justify-center">
                  <Users className="text-[#3DC6E7]" size={24} />
                </div>
                <h2 className="text-xl font-bold text-on-surface">Conducting Body</h2>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#3DC6E7]/5">
                <MapPin className="text-[#3DC6E7] flex-shrink-0 mt-1" size={20} />
                <p className="text-body-md text-on-surface font-medium">{exam.conductingBody}</p>
              </div>
            </div>

            {/* Card 2: Purpose */}
            <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/20 hover:shadow-card-hover transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Target className="text-[#3DC6E7]" size={24} />
                </div>
                <h2 className="text-xl font-bold text-on-surface">Purpose</h2>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/5">
                <Award className="text-[#3DC6E7] flex-shrink-0 mt-1" size={20} />
                <p className="text-body-md text-on-surface">{exam.purpose}</p>
              </div>
            </div>

            {/* Card 3: Eligibility */}
            <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/20 hover:shadow-card-hover transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center">
                  <CheckCircle2 className="text-[#3DC6E7]" size={24} />
                </div>
                <h2 className="text-xl font-bold text-on-surface">Eligibility Criteria</h2>
              </div>
              <ul className="space-y-3">
                {splitLines(exam.eligibility).map((line, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#3DC6E7] flex-shrink-0 mt-1" size={18} />
                    <span className="text-body-md text-on-surface-variant">{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 4: Subjects & Weightage */}
            <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/20 hover:shadow-card-hover transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#3DC6E7]/10 flex items-center justify-center">
                  <BookOpen className="text-[#3DC6E7]" size={24} />
                </div>
                <h2 className="text-xl font-bold text-on-surface">Subjects & Weightage</h2>
              </div>
              <ul className="space-y-3">
                {splitLines(exam.subjectsAndWeightage).map((line, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#3DC6E7] mt-2 flex-shrink-0"></div>
                    <span className="text-body-md text-on-surface-variant">{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 5: Exam Pattern */}
            <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/20 hover:shadow-card-hover transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#3DC6E7]/10 flex items-center justify-center">
                  <ClipboardList className="text-[#3DC6E7]" size={24} />
                </div>
                <h2 className="text-xl font-bold text-on-surface">Exam Pattern</h2>
              </div>
              <ul className="space-y-3">
                {splitLines(exam.attemptAndPattern).map((line, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Clock className="text-[#3DC6E7] flex-shrink-0 mt-1" size={18} />
                    <span className="text-body-md text-on-surface-variant">{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 6: Preparation Strategy */}
            <div className="bg-surface-container-lowest rounded-2xl p-8 border border-outline-variant/20 hover:shadow-card-hover transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#3DC6E7]/10 flex items-center justify-center">
                  <TrendingUp className="text-[#3DC6E7]" size={24} />
                </div>
                <h2 className="text-xl font-bold text-on-surface">Preparation Strategy</h2>
              </div>
              <ul className="space-y-3">
                {splitLines(exam.preparation).map((line, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <GraduationCap className="text-[#3DC6E7] flex-shrink-0 mt-1" size={18} />
                    <span className="text-body-md text-on-surface-variant">{line}</span>
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