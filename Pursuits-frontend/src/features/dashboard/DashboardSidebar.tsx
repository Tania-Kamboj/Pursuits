import { Link, useNavigate, useParams } from 'react-router'
import { useActiveStream } from '@/hooks/useActiveStream' 
import { 
  GraduationCap, 
  Trophy, 
  Scroll, 
  BookOpen, 
  HelpCircle, 
  LogOut,
  Headphones,
} from 'lucide-react'
import { useState, useEffect } from 'react'

type ActiveTab = 'streams' | 'exams' | 'diploma' | 'graduation' | 'settings'

interface DashboardSidebarProps {
  activeTab: ActiveTab
  streamName?: string
}

export const DashboardSidebar = ({ activeTab, streamName = useActiveStream().toUpperCase() }: DashboardSidebarProps) => {
  const navigate = useNavigate()
  const [user, setUser] = useState<any>(null)


  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    navigate('/login')
  }

  const navItems = [
    { 
      name: streamName, 
      icon: GraduationCap, 
      id: 'streams' as ActiveTab,
      path: `/explore/after-10th/${streamName.toLowerCase()}`
    },
    { 
      name: 'National Exams', 
      icon: Trophy, 
      id: 'exams' as ActiveTab,
      path: `/explore/after-12th/${streamName.toLowerCase()}/exams`
    },
    { 
      name: 'Diploma', 
      icon: Scroll, 
      id: 'diploma' as ActiveTab,
      path: `/explore/after-12th/${streamName.toLowerCase()}/diplomas`
    },
    { 
      name: 'Graduation', 
      icon: BookOpen, 
      id: 'graduation' as ActiveTab,
      path: `/explore/after-12th/degree-categories/${streamName.toLowerCase()}` 
  
    }
  ]

  return (
    <aside className="w-64 flex-shrink-0 sticky top-[90px] h-[calc(90vh-90px)] self-start">
      <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/10 h-full flex flex-col justify-between">
        <div>
          {/* User Profile */}
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-10 h-10 rounded-full bg-[#32aac5] flex items-center justify-center text-white font-bold text-sm">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'FL'}
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-[#3DC6E7] leading-tight">
                {user?.name || 'Future Leader'}
              </h3>
              <p className="text-[12px] text-on-surface-variant">
                12th Grade - {streamName}
              </p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = item.id === activeTab
              return (
                <Link
                  to={item.path}
                  key={item.name}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#32aac5] text-white shadow-md'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  <item.icon size={20} strokeWidth={2} />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="mt-6 pt-6 border-t border-outline-variant/20 space-y-3">
          <button className="w-full bg-[#32aac5] text-white py-3 rounded-full font-semibold text-[15px] hover:bg-[#39C6E4]-hover transition-colors shadow-md flex items-center justify-center gap-2">
            <Headphones size={18} />
            Get Counseling
          </button>

          <div className="space-y-1">
            <Link
              to="#"
              className="flex items-center gap-3 px-4 py-2 text-[14px] text-on-surface-variant hover:text-on-surface transition-colors rounded-lg hover:bg-surface-container-high"
            >
              <HelpCircle size={18} />
              Help
            </Link>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2 text-[14px] text-red-300 hover:text-red-600 transition-colors rounded-lg hover:bg-red-50 w-full text-left"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}