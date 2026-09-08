import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Globe2, Smartphone, Loader2 } from 'lucide-react'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { authService } from '@/services/authService'

export const RegisterPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await authService.register(formData.name, formData.email, formData.password)
      // Success! Login page par bhej do
      navigate('/login', { state: { message: 'Account created successfully! Please log in.' } })
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-[420px] bg-surface-container-lowest rounded-[24px] shadow-card p-8 md:p-10 border border-outline-variant/20">
        {/* Header */}
        <div className="text-center mb-8 space-y-2">
          <h1 className="text-[#3DC6E7] text-[32px] font-bold" style={{ fontFamily: 'Plus Jakarta Sans' }}>
            Join Claritii
          </h1>
          <p className="text-on-surface-variant text-sm">
            Welcome to Claritii 💜 <br />
            A clearer road to your future starts here.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-5 text-sm" onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            name="name"
            type="text"
            icon="user"
            placeholder="Jane Doe"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            icon="email"
            placeholder="jane@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="Password"
            name="password"
            type="password"
            icon="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button variant="primary" size="md" className="w-full mt-2" disabled={loading}>
            {loading ? <Loader2 className="animate-spin mx-auto" size={20} /> : 'Create Account'}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-outline-variant/30" />
          <span className="text-label-md text-outline-variant">or</span>
          <div className="flex-1 h-px bg-outline-variant/30" />
        </div>

        {/* Social Register Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="secondary" className="flex items-center justify-center gap-2" type="button">
            <Globe2 size={20} /> Google
          </Button>
          <Button variant="secondary" className="flex items-center justify-center gap-2" type="button">
            <Smartphone size={20} /> Apple
          </Button>
        </div>

        {/* Footer Link */}
        <p className="text-center text-sm text-on-surface-variant mt-8">
          Already have an account?{' '}
          <Link to="/login" className="text-[#3DC6E7] font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}