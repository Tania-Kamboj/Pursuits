import { Link } from 'react-router'
import { Heart, BookOpen, Award, Trophy, ArrowRight, Trash2, Compass } from 'lucide-react'
import { Navbar } from '@/shared/ui/Navbar'
import { useWishlist } from '@/hooks/useWishlist'

export const WishlistPage = () => {
  const { items, toggleItem } = useWishlist()

  const degrees = items.filter((i) => i.type === 'degree')
  const diplomas = items.filter((i) => i.type === 'diploma')
  const exams = items.filter((i) => i.type === 'exam')
  const streams = items.filter((i) => i.type === 'stream')

  // ✅ Helper function ko RETURN se PEHLE define karo
  const renderSection = (title: string, icon: React.ReactNode, data: typeof items) => {
    if (data.length === 0) return null
    return (
      <div className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#3DC6E7]/10 flex items-center justify-center">
            {icon}
          </div>
          <h2 className="text-2xl font-bold text-on-surface" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            {title} ({data.length})
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20 flex items-center justify-between gap-4 hover:shadow-card-hover transition-all"
            >
              <div className="flex-1">
                <p className="text-xs font-semibold text-[#3DC6E7] uppercase tracking-wide mb-1">
                  {item.stream.toUpperCase()} STREAM
                </p>
                <h3 className="text-lg font-bold text-on-surface mb-1">
                  {item.name}
                </h3>
                <Link
                  to={item.path}
                  className="text-sm text-on-surface-variant hover:text-[#3DC6E7] transition-colors inline-flex items-center gap-1"
                >
                  View Details <ArrowRight size={14} />
                </Link>
              </div>
              <button
                onClick={() => toggleItem(item)}
                className="p-2 rounded-full border border-outline-variant/20 text-red-500 hover:bg-red-50 transition-colors"
                title="Remove"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-16 pt-28">
        {/* 1. Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3DC6E7]/10 text-[#3DC6E7] text-sm font-semibold mb-6">
            <Heart size={16} />
            Your Personal Space
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-on-surface mb-6 tracking-tight capitalize"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Your Saved <span className="text-[#3DC6E7]">Options</span>
          </h1>
          <p
            className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-3xl mx-auto"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            You haven't made a final decision yet, and that's okay. This is your 
            personal space to keep track of your aligned interests that 
            caught your eye. Compare them whenever you are ready.💜
          </p>
        </div>

        {/* Empty State */}
        {items.length === 0 && (
          <div className="text-center bg-surface-container-lowest rounded-3xl p-12 border border-outline-variant/20">
            <Heart size={48} className="mx-auto text-outline-variant mb-4" />
            <h3 className="text-2xl font-bold text-on-surface mb-2">No saved options yet</h3>
            <p className="text-on-surface-variant mb-6">
              Start exploring and click the heart icon to save options here.
            </p>
            <Link
              to="/explore/after-12th"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#3DC6E7] text-white rounded-xl font-semibold hover:bg-[#3DC6E7]-hover transition-colors"
            >
              Start Exploring
              <ArrowRight size={18} />
            </Link>
          </div>
        )}

        {/* ✅ Ab renderSection ko call karo */}
        {renderSection("Saved Streams", <Compass className="text-[#3DC6E7]" size={20} />, streams)}
        {renderSection("Saved Degrees", <BookOpen className="text-[#3DC6E7]" size={20} />, degrees)}
        {renderSection("Saved Diplomas", <Award className="text-secondary" size={20} />, diplomas)}
        {renderSection("Saved Exams", <Trophy className="text-tertiary" size={20} />, exams)}

      </main>
    </div>
  )
}