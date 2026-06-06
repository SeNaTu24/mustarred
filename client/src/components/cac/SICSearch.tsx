import { useState, useRef, useEffect } from 'react';
import { SIC_CODES } from '@/data/sic-codes';
import { ChevronDown, Search, X } from 'lucide-react';

interface SICSearchProps {
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

export function SICSearch({ value, onChange, error }: SICSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = SIC_CODES.find(s => s.value === value);

  const filtered = query.trim()
    ? SIC_CODES.filter(s => s.label.toLowerCase().includes(query.toLowerCase())).slice(0, 50)
    : SIC_CODES.slice(0, 50);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const baseInput = 'w-full px-4 py-3 border-2 rounded-xl text-sm text-gray-900 transition-all duration-200 outline-none focus:ring-2 focus:ring-[#a49fe7]/40 bg-white cursor-pointer';
  const borderClass = error ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-[#a49fe7]/60 focus:border-[#4b4ba3]';

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`${baseInput} ${borderClass} flex items-center justify-between gap-2 text-left`}
      >
        <span className={selected ? 'text-gray-900' : 'text-gray-400'}>
          {selected ? selected.label : 'Search or select a SIC code...'}
        </span>
        <div className="flex items-center gap-1 flex-shrink-0">
          {value && (
            <span
              onClick={(e) => { e.stopPropagation(); onChange(''); setQuery(''); }}
              className="p-0.5 rounded hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </span>
          )}
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
          {/* Search input */}
          <div className="px-3 py-2 border-b border-gray-100 flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Type to search (e.g. technology, legal, retail...)"
              className="flex-1 text-sm outline-none text-gray-900 placeholder:text-gray-400"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Results */}
          <div className="max-h-60 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="px-4 py-3 text-sm text-gray-400">No results found for "{query}"</p>
            ) : (
              <>
                {filtered.map(sic => (
                  <button
                    key={sic.value}
                    type="button"
                    onClick={() => { onChange(sic.value); setOpen(false); setQuery(''); }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#4b4ba3]/5 transition-colors ${
                      value === sic.value ? 'bg-[#4b4ba3]/10 text-[#4b4ba3] font-semibold' : 'text-gray-700'
                    }`}
                  >
                    <span className="font-mono text-xs text-gray-400 mr-2">{sic.value}</span>
                    {sic.label.split(' — ')[1]}
                  </button>
                ))}
                {!query && (
                  <p className="px-4 py-2 text-xs text-gray-400 text-center border-t border-gray-50">
                    Showing 50 of {SIC_CODES.length} — type to search all
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
