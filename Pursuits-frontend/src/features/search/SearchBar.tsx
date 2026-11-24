import { useState, useEffect, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router';
import {
  Search,
  X,
  Loader2,
  Compass,
  BookOpen,
  Award,
  Trophy,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface SearchResult {
  _id: string;
  name: string;
  type: 'stream' | 'degree' | 'diploma' | 'exam';
  streamSlug?: string;
  streamName?: string;
  categoryId?: string;
  categoryName?: string;
  duration?: string;
  interests?: string[];
  careers?: string[];
  slug?: string;
}

interface SearchData {
  streams: SearchResult[];
  degrees: SearchResult[];
  diplomas: SearchResult[];
  exams: SearchResult[];
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchData>({
    streams: [],
    degrees: [],
    diplomas: [],
    exams: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Flatten results for keyboard navigation
  const flatResults = [
    ...results.streams,
    ...results.degrees,
    ...results.diplomas,
    ...results.exams
  ];

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length > 1) {
        fetchSearchResults();
      } else {
        setResults({ streams: [], degrees: [], diplomas: [], exams: [] });
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcuts (Cmd+K or Ctrl+K to focus)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const fetchSearchResults = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (data.success) {
        setResults(data.data);
        setIsOpen(true);
        setSelectedIndex(-1);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToResult = useCallback((item: SearchResult) => {
    let path = '';

    switch (item.type) {
      case 'stream':
        path = `/explore/after-12th/dashboard/${item.slug || 'pcm'}`;
        break;
      case 'degree':
        if (item.categoryId) {
          path = `/explore/after-12th/${item.streamSlug}/degrees/category/${item.categoryId}/details/${item._id}`;
        } else {
          path = `/explore/after-12th/degrees/${item._id}`;
        }
        break;
      case 'diploma':
        path = `/explore/after-12th/${item.streamSlug}/diplomas`;
        break;
      case 'exam':
        path = `/explore/after-12th/${item.streamSlug}/exams`;
        break;
    }

    navigate(path);
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.blur();
  }, [navigate]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || flatResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < flatResults.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : flatResults.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && flatResults[selectedIndex]) {
          navigateToResult(flatResults[selectedIndex]);
        }
        break;
    }
  };

  // Highlight search term in text
  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-[#3DC6E7]/20 text-[#3DC6E7] font-semibold rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const hasResults =
    results.streams.length > 0 ||
    results.degrees.length > 0 ||
    results.diplomas.length > 0 ||
    results.exams.length > 0;

  const totalCount = flatResults.length;

  return (
    <div className="relative w-full max-w-2xl" ref={wrapperRef}>
      {/* Search Input */}
      <div className="relative group">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-[#3DC6E7] transition-colors"
          size={20}
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (query.trim().length > 1 && hasResults) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search degrees, exams, streams, careers..."
          className="w-full pl-12 pr-24 py-3 rounded-2xl border-2 border-outline-variant/20 bg-surface-container-lowest/80 backdrop-blur-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-[#3DC6E7]/30 focus:border-[#3DC6E7] transition-all text-[15px]"
        />

        {/* Right side: Loading indicator or keyboard shortcut */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {isLoading ? (
            <Loader2 className="animate-spin text-[#3DC6E7]" size={20} />
          ) : query ? (
            <button
              onClick={() => {
                setQuery('');
                setResults({ streams: [], degrees: [], diplomas: [], exams: [] });
                setIsOpen(false);
                inputRef.current?.focus();
              }}
              className="p-1 rounded-lg hover:bg-surface-container-high transition-colors"
            >
              <X className="text-on-surface-variant hover:text-on-surface" size={18} />
            </button>
          ) : (
            <kbd className="hidden md:inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-surface-container-high border border-outline-variant/20 text-xs text-on-surface-variant font-medium">
              <span className="text-[10px]">⌘</span>K
            </kbd>
          )}
        </div>
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl shadow-2xl z-[100] max-h-[500px] overflow-y-auto backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
          {isLoading ? (
            <div className="p-8 text-center">
              <Loader2 className="animate-spin mx-auto text-[#3DC6E7] mb-3" size={28} />
              <p className="text-sm text-on-surface-variant">Searching across all data...</p>
            </div>
          ) : !hasResults && query.trim().length > 1 ? (
            <div className="p-8 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-surface-container-high flex items-center justify-center">
                <Search className="text-on-surface-variant" size={24} />
              </div>
              <p className="text-lg font-semibold text-on-surface mb-2">No results found</p>
              <p className="text-sm text-on-surface-variant">
                Try searching for "Computer Science", "JEE", "PCM" or any career field
              </p>
            </div>
          ) : query.trim().length <= 1 ? (
            <div className="p-8 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#3DC6E7]/10 flex items-center justify-center">
                <Sparkles className="text-[#3DC6E7]" size={24} />
              </div>
              <p className="text-lg font-semibold text-on-surface mb-2">Start typing to search</p>
              <p className="text-sm text-on-surface-variant">
                Search across streams, degrees, diplomas, and entrance exams
              </p>
            </div>
          ) : (
            <div className="p-2">
              {/* Results count header */}
              <div className="px-4 py-2 mb-2 border-b border-outline-variant/10">
                <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  {totalCount} result{totalCount !== 1 ? 's' : ''} found
                </p>
              </div>

              {/* Streams */}
              {results.streams.length > 0 && (
                <ResultGroup
                  label="Streams"
                  items={results.streams}
                  icon={Compass}
                  iconColor="#3DC6E7"
                  query={query}
                  startIndex={0}
                  selectedIndex={selectedIndex}
                  onSelect={navigateToResult}
                  highlightText={highlightText}
                />
              )}

              {/* Degrees */}
              {results.degrees.length > 0 && (
                <ResultGroup
                  label="Degrees"
                  items={results.degrees}
                  icon={BookOpen}
                  iconColor="#5DD4EF"
                  query={query}
                  startIndex={results.streams.length}
                  selectedIndex={selectedIndex}
                  onSelect={navigateToResult}
                  highlightText={highlightText}
                />
              )}

              {/* Diplomas */}
              {results.diplomas.length > 0 && (
                <ResultGroup
                  label="Diplomas"
                  items={results.diplomas}
                  icon={Award}
                  iconColor="#F59E0B"
                  query={query}
                  startIndex={results.streams.length + results.degrees.length}
                  selectedIndex={selectedIndex}
                  onSelect={navigateToResult}
                  highlightText={highlightText}
                />
              )}

              {/* Exams */}
              {results.exams.length > 0 && (
                <ResultGroup
                  label="Entrance Exams"
                  items={results.exams}
                  icon={Trophy}
                  iconColor="#EF4444"
                  query={query}
                  startIndex={results.streams.length + results.degrees.length + results.diplomas.length}
                  selectedIndex={selectedIndex}
                  onSelect={navigateToResult}
                  highlightText={highlightText}
                />
              )}

              {/* Footer hint */}
              <div className="px-4 py-2 mt-2 border-t border-outline-variant/10 flex items-center justify-between text-xs text-on-surface-variant">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-surface-container-high border border-outline-variant/20 font-mono">↑</kbd>
                    <kbd className="px-1.5 py-0.5 rounded bg-surface-container-high border border-outline-variant/20 font-mono">↓</kbd>
                    navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-surface-container-high border border-outline-variant/20 font-mono">↵</kbd>
                    select
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-surface-container-high border border-outline-variant/20 font-mono">Esc</kbd>
                    close
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ResultGroup component
interface ResultGroupProps {
  label: string;
  items: SearchResult[];
  icon: any;
  iconColor: string;
  query: string;
  startIndex: number;
  selectedIndex: number;
  onSelect: (item: SearchResult) => void;
  highlightText: (text: string, highlight: string) => ReactNode;
}

const ResultGroup = ({
  label,
  items,
  icon: Icon,
  iconColor,
  query,
  startIndex,
  selectedIndex,
  onSelect,
  highlightText
}: ResultGroupProps) => {
  return (
    <div className="mb-3">
      <p className="px-3 py-1.5 text-xs font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-2">
        <Icon size={14} style={{ color: iconColor }} />
        {label}
      </p>
      {items.map((item, idx) => {
        const globalIndex = startIndex + idx;
        const isSelected = globalIndex === selectedIndex;

        return (
          <button
            key={item._id}
            onClick={() => onSelect(item)}
            onMouseEnter={() => {/* Optional: hover select */}}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-left group ${
              isSelected
                ? 'bg-[#3DC6E7]/10 border border-[#3DC6E7]/30'
                : 'hover:bg-surface-container-high border border-transparent'
            }`}
          >
            {/* Icon */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
              style={{ backgroundColor: `${iconColor}15` }}
            >
              <Icon style={{ color: iconColor }} size={18} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-[15px] font-semibold text-on-surface truncate mb-0.5">
                {highlightText(item.name, query)}
              </p>

              {/* Subtitle based on type */}
              {item.type === 'degree' && item.interests && item.interests.length > 0 && (
                <p className="text-xs text-on-surface-variant truncate">
                  {item.interests.slice(0, 2).join(' • ')}
                  {item.duration && ` • ${item.duration}`}
                </p>
              )}
              {item.type === 'diploma' && item.duration && (
                <p className="text-xs text-on-surface-variant">
                  {item.streamName} • {item.duration}
                </p>
              )}
              {item.type === 'exam' && item.streamName && (
                <p className="text-xs text-on-surface-variant">
                  {item.streamName} Stream
                </p>
              )}
              {item.type === 'stream' && (
                <p className="text-xs text-on-surface-variant">
                  Explore career paths
                </p>
              )}
            </div>

            {/* Arrow */}
            <ArrowRight
              className={`flex-shrink-0 transition-all ${
                isSelected
                  ? 'text-[#3DC6E7] translate-x-0 opacity-100'
                  : 'text-on-surface-variant -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
              }`}
              size={18}
            />
          </button>
        );
      })}
    </div>
  );
};