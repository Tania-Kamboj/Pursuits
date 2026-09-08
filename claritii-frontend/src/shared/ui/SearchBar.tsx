import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router'
import { Search, BookOpen, Award, Trophy, Compass, Loader2, X } from 'lucide-react'

const API_URL = 'http://localhost:5000/api/v1'

export const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any>({ streams: [], degrees: [], diplomas: [], exams: [] })
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  // Debounce: Jab user typing rok de, tabhi API call karo
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length > 1) {
        fetchSearchResults()
      } else {
        setResults({ streams: [], degrees: [], diplomas: [], exams: [] })
        setIsOpen(false)
      }
    }, 300) // 300ms delay

    return () => clearTimeout(timer)
  }, [query])

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const fetchSearchResults = async () => {
    try {
      setIsLoading(true)
      const res = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      if (data.success) {
        setResults(data.data)
        setIsOpen(true)
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelect = (item: any, type: string) => {
  let path = '';
  
  switch(type) {
    case 'stream':
      const streamId = item.name.toLowerCase().replace(/\s/g, '');
      path = `/explore/after-12th/dashboard/${streamId}`;
      break;
    case 'degree':
      // Stream ID ko dynamically use karo
      path = `/explore/after-12th/${item.stream || 'pcm'}/degrees/${item._id}`;
      break;
    case 'diploma':
      path = `/explore/after-12th/${item.stream || 'pcm'}/diplomas/${item._id}`;
      break;
    case 'exam':
      path = `/explore/after-12th/${item.stream}/exams/${item._id}`;
      break;
  }
  
  navigate(path);
  setQuery('');
  setIsOpen(false);
}

  const hasResults = results.streams.length > 0 || results.degrees.length > 0 || results.diplomas.length > 0 || results.exams.length > 0

  return (
    <div className="relative w-full max-w-md" ref={wrapperRef}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length > 1 && setIsOpen(true)}
          placeholder="Search degrees, exams, diplomas..."
          className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-outline-variant/20 bg-surface-container-low text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-[#3DC6E7] transition-all"
        />
        {query && (
          <button 
            onClick={() => { setQuery(''); setIsOpen(false); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Dropdown Suggestions */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl shadow-xl z-50 max-h-[400px] overflow-y-auto">
          {isLoading ? (
            <div className="p-6 text-center">
              <Loader2 className="animate-spin mx-auto text-[#3DC6E7]" size={24} />
            </div>
          ) : !hasResults && query.trim().length > 1 ? (
            <div className="p-6 text-center text-on-surface-variant">
              No results found for "{query}"
            </div>
          ) : (
            <div className="p-2">
              {/* Streams */}
              {results.streams.length > 0 && (
                <div className="mb-2">
                  <p className="px-3 py-1 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Streams</p>
                  {results.streams.map((item: any) => (
                    <button
                      key={item._id}
                      onClick={() => handleSelect(item, 'stream')}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#3DC6E7]/5 transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#3DC6E7]/10 flex items-center justify-center">
                        <Compass className="text-[#3DC6E7]" size={16} />
                      </div>
                      <span className="text-sm font-medium text-on-surface">{item.name}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Degrees */}
              {results.degrees.length > 0 && (
                <div className="mb-2">
                  <p className="px-3 py-1 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Degrees</p>
                  {results.degrees.map((item: any) => (
                    <button
                      key={item._id}
                      onClick={() => handleSelect(item, 'degree')}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#3DC6E7]/5 transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <BookOpen className="text-secondary" size={16} />
                      </div>
                      <span className="text-sm font-medium text-on-surface">{item.name}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Diplomas */}
              {results.diplomas.length > 0 && (
                <div className="mb-2">
                  <p className="px-3 py-1 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Diplomas</p>
                  {results.diplomas.map((item: any) => (
                    <button
                      key={item._id}
                      onClick={() => handleSelect(item, 'diploma')}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#3DC6E7]/5 transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-tertiary/10 flex items-center justify-center">
                        <Award className="text-tertiary" size={16} />
                      </div>
                      <span className="text-sm font-medium text-on-surface">{item.name}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Exams */}
              {results.exams.length > 0 && (
                <div>
                  <p className="px-3 py-1 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Exams</p>
                  {results.exams.map((item: any) => (
                    <button
                      key={item._id}
                      onClick={() => handleSelect(item, 'exam')}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#3DC6E7]/5 transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                        <Trophy className="text-orange-500" size={16} />
                      </div>
                      <span className="text-sm font-medium text-on-surface">{item.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}