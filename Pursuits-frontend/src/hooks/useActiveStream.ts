import { useState, useEffect } from 'react'
import { useParams } from 'react-router'

export const useActiveStream = () => {
  const { streamId } = useParams()
  const [stream, setStream] = useState<string>('pcm') // Default fallback

  useEffect(() => {
    if (streamId) {
      const cleanStream = streamId.toLowerCase()
      localStorage.setItem('activeStream', cleanStream)
      setStream(cleanStream)
    } else {
      const savedStream = localStorage.getItem('activeStream')
      if (savedStream) {
        setStream(savedStream)
      }
    }
  }, [streamId])

  return stream
}