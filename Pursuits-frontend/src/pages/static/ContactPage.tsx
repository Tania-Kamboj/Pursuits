import { useState } from 'react'
import { Mail, Send, CheckCircle2, ArrowRight, MessageSquare, Clock } from 'lucide-react'
import { Navbar } from '@/shared/ui/Navbar'

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Backend ko real data bhej rahe hain
      const response = await fetch('http://localhost:5000/api/v1/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      })

      const result = await response.json()

      if (result.success) {
        setIsSubmitted(true)
        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' })
        
        // 5 seconds baad wapas form dikha do
        setTimeout(() => setIsSubmitted(false), 5000)
      } else {
        alert('Message send karne me error aaya. Dobara try karein.')
      }
    } catch (error) {
      console.error('Network Error:', error)
      alert('Network error. Please check your connection or try again later.')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-16 pt-28">
        
        {/* 1. Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3DC6E7]/10 text-[#3DC6E7] text-sm font-semibold mb-6">
            <MessageSquare size={16} />
            Get in Touch
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-on-surface mb-6 tracking-tight capitalize"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            We're Here to <span className="text-[#3DC6E7]">Help</span>.
          </h1>
          <p
            className="text-lg text-on-surface-variant leading-relaxed max-w-2xl mx-auto"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Whether you have a question about a career path, found a bug on the site, 
            or just want to say hi. We read every message and try to reply within 24-48 hours.
          </p>
        </div>

        {/* 2. Main Content Grid */}
        <div className="grid md:grid-cols-5 gap-10">
          
          {/* Left Side: Contact Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20">
              <div className="w-12 h-12 rounded-xl bg-[#3DC6E7]/10 flex items-center justify-center mb-4">
                <Mail className="text-[#3DC6E7]" size={24} />
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Email Us
              </h3>
              <p className="text-body-md text-on-surface-variant mb-4">
                For detailed queries, partnerships, or press.
              </p>
              <a 
                href={`mailto:reachlevelzenith@gmail.com?subject=Pursuits Inquiry&body=Hi Pursuits Team,%0D%0A%0D%0AI would like to know about...%0D%0A%0D%0AThanks`}
                className="text-[#3DC6E7] font-medium hover:underline flex items-center gap-1"
              >
                support@Pursuits.com <ArrowRight size={16} />
              </a>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/20">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                <Clock className="text-secondary" size={24} />
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                Response Time
              </h3>
              <p className="text-body-md text-on-surface-variant">
                We are a small team working hard to build Pursuits. We usually get back to you within 1 to 2 working days.
              </p>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="md:col-span-3">
            <div className="bg-surface-container-lowest rounded-3xl p-8 border border-outline-variant/20">
              
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                    <CheckCircle2 className="text-green-600" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-on-surface mb-2" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                    Message Sent!
                  </h3>
                  <p className="text-on-surface-variant max-w-md">
                    Thanks for reaching out. We've received your message and will get back to you at <strong>{formData.email || 'your email'}</strong> soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-on-surface-variant mb-2">Your Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-outline-variant/20 bg-background text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-on-surface-variant mb-2">Your Email</label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-outline-variant/20 bg-background text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-2">What is this about?</label>
                    <select 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant/20 bg-background text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option>General Inquiry</option>
                      <option>Report a Bug</option>
                      <option>Feature Request</option>
                      <option>Partnership / Collaboration</option>
                      <option>Missing Career Information</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-on-surface-variant mb-2">Your Message</label>
                    <textarea 
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-outline-variant/20 bg-background text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-[#3DC6E7] text-white rounded-xl font-semibold hover:bg-[#3DC6E7]-hover transition-colors shadow-lg"
                  >
                    <Send size={18} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}