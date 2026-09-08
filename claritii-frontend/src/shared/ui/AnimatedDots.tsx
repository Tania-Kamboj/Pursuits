interface DotConfig {
  top?: string
  bottom?: string
  left?: string
  right?: string
  size?: string
  color?: string
  delay?: string
}

interface AnimatedDotsProps {
  dots?: DotConfig[]
  className?: string
}

// Default dots configuration (agar koi custom dots na do toh ye use honge)
const defaultDots: DotConfig[] = [
   { top: "15%", left: "8%", size: "w-2 h-2", color: "bg-[#3DC6E7]/30", delay: "0s" },
    { top: "25%", right: "15%", size: "w-3 h-3", color: "bg-[#68DCD2]/30", delay: "1s" },
    { bottom: "25%", left: "20%", size: "w-5 h-5", color: "bg-[#93C101]/30", delay: "2s" },
    { top: "60%", right: "10%", size: "w-5 h-5", color: "bg-[#3DC6E7]/40", delay: "0.5s" },
    { bottom: "15%", right: "25%", size: "w-2 h-2", color: "bg-[#68DCD2]/20", delay: "1.5s" },
    { top: "5%", right: "45%", size: "w-3 h-3", color: "bg-[#68DCD2]/30", delay: "1s" },
    { bottom: "75%", left: "30%", size: "w-2 h-2", color: "bg-[#93C101]/30", delay: "2s" },
    { top: "90%", right: "60%", size: "w-5 h-5", color: "bg-[#3DC6E7]/40", delay: "0.5s" },
    { top: "30%", left: "59%", size: "w-2 h-2", color: "bg-[#93C101]/20", delay: "2.5s" },
]

export const AnimatedDots = ({ dots = defaultDots, className = "" }: AnimatedDotsProps) => {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {dots.map((dot, index) => (
        <div
          key={index}
          className={`absolute rounded-full animate-pulse ${dot.size || "w-2 h-2"} ${dot.color || "bg-[#3DC6E7]/30"}`}
          style={{
            top: dot.top,
            bottom: dot.bottom,
            left: dot.left,
            right: dot.right,
            animationDelay: dot.delay || "0s",
            animationDuration: "3s",
          }}
        />
      ))}
    </div>
  )
}