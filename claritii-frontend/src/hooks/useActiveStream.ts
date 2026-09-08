import { useState, useEffect } from 'react'
import { useParams } from 'react-router'

export const useActiveStream = () => {
  const { streamId } = useParams()
  const [stream, setStream] = useState<string>('pcm') // Default fallback

  useEffect(() => {
    // 1. Agar URL me streamId hai, toh usko save karo aur use karo
    if (streamId) {
      const cleanStream = streamId.toLowerCase()
      localStorage.setItem('activeStream', cleanStream)
      setStream(cleanStream)
    } 
    // 2. Agar URL me streamId undefined hai (jaise breadcrumb click karne par), 
    // toh localStorage se purana saved stream utha lo
    else {
      const savedStream = localStorage.getItem('activeStream')
      if (savedStream) {
        setStream(savedStream)
      }
    }
  }, [streamId])

  return stream
}