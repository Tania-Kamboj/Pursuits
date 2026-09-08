import { useState, useEffect } from 'react'

export interface WishlistItem {
  id: string
  type: 'degree' | 'diploma' | 'exam' | 'stream' 
  name: string
  stream: string
  path: string // Detail page ka URL
}

export const useWishlist = () => {
  const [items, setItems] = useState<WishlistItem[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('claritii_wishlist')
    if (stored) setItems(JSON.parse(stored))
  }, [])

  const toggleItem = (item: WishlistItem) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === item.id)
      const newItems = exists 
        ? prev.filter((i) => i.id !== item.id) 
        : [...prev, item]
      
      localStorage.setItem('claritii_wishlist', JSON.stringify(newItems))
      return newItems
    })
  }

  const isSaved = (id: string) => items.some((i) => i.id === id)

  return { items, toggleItem, isSaved }
}