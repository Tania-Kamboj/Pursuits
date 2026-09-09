import { Heart } from 'lucide-react'
import { useWishlist } from '@/hooks/useWishlist'
import type { WishlistItem } from '@/hooks/useWishlist'

interface WishlistButtonProps {
  id: string
  type: 'degree' | 'diploma' | 'exam' | 'stream' 
  name: string
  stream: string
  path: string
  variant?: 'icon' | 'full' // 'icon' for cards, 'full' for detail pages
}

export const WishlistButton = ({ 
  id, type, name, stream, path, variant = 'icon' 
}: WishlistButtonProps) => {
  const { toggleItem, isSaved } = useWishlist()
  const saved = isSaved(id)

  const itemData: WishlistItem = { id, type, name, stream, path }

  if (variant === 'icon') {
    return (
      <button
        onClick={(e) => {
          e.preventDefault() // Card ke link ko block karega
          e.stopPropagation()
          toggleItem(itemData)
        }}
        className={`p-2 rounded-full border transition-all ${
          saved 
            ? 'bg-[#3DC6E7]/10 border-[#3DC6E7]/20 text-[#3DC6E7]' 
            : 'bg-surface-container-low border-outline-variant/20 text-on-surface-variant hover:text-[#3DC6E7]'
        }`}
        title={saved ? 'Remove from Wishlist' : 'Save to Wishlist'}
      >
        <Heart size={18} fill={saved ? 'currentColor' : 'none'} />
      </button>
    )
  }

  // Full variant for Detail Pages
  return (
    <button
      onClick={() => toggleItem(itemData)}
      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all border-2 ${
        saved
          ? 'bg-[#3DC6E7] text-white border-[#3DC6E7] hover:bg-[#3DC6E7]-hover'
          : 'bg-white text-[#3DC6E7] border-[#3DC6E7]/20 hover:bg-[#3DC6E7]/5'
      }`}
    >
      <Heart size={18} fill={saved ? 'currentColor' : 'none'} />
      {saved ? 'Saved to Wishlist' : 'Save to Wishlist'}
    </button>
  )
}