import React, { forwardRef } from 'react'
import { cn } from '@/shared/lib/cn'
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: 'user' | 'email' | 'password' | 'none'
  showPasswordToggle?: boolean
}

const iconMap = {
  user: User,
  email: Mail,
  password: Lock,
  none: null
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon = 'none', showPasswordToggle, type = 'text', ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const IconComponent = iconMap[icon]

    const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-label-md text-on-surface font-semibold block">
            {label}
          </label>
        )}
        
        <div className="relative">
          {IconComponent && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-outline-variant">
              <IconComponent size={20} />
            </div>
          )}

          <input
            ref={ref}
            type={inputType}
            className={cn(
              'w-full px-4 py-3 bg-surface-container-lowest border-1 border-gray-300 rounded-md',
              'text-body-md text-on-surface font-sans',
              'placeholder:text-outline-variant/60',
              'transition-all duration-200',
              'focus:outline-none focus:border-[#3DC6E7] focus:bg-white',
              error && 'border-error focus:border-error',
              icon !== 'none' && 'pl-11',
              showPasswordToggle && 'pr-11',
              className
            )}
            {...props}
          />

          {showPasswordToggle && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-outline-variant hover:text-on-surface transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>

        {error && (
          <p className="text-sm text-error font-medium">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'