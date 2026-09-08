import { Link } from 'react-router'

export const Footer = () => (
  <footer className="bg-cool-platinum mt-auto">
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="space-y-4">
        <Link to="/" className="text-[24px] text-[#3DC6E7]">Claritii</Link>
        <p className="text-on-surface-variant max-w-xs text-sm">
          Helping students make better decisions about their education and career, aligned with their interests with Claritii.
        </p>
      </div>
      
      <div>
        <h3 className="mb-4 tracking-wider">LINKS</h3>
        <ul className="space-y-3 text-sm">
          {['Privacy Policy', 'Terms of Service'].map(link => (
            <li key={link}><Link to="#" className="text-on-surface-variant hover:text-[#3DC6E7]">{link}</Link></li>
          ))}
        </ul>
      </div>

      <div>
  <h3 className="text-label text-text-main mb-4 tracking-wider">COMPANY</h3>
  <ul className="space-y-3 text-sm">
    {[
      { name: 'Contact Us', path: '/contact' },
      { name: 'Careers', path: '/explore' } // Careers page abhi nahi bani, isliye '#' rakha hai
    ].map(link => (
      <li key={link.name}>
        <Link to={link.path} className="text-on-surface-variant hover:text-[#3DC6E7] transition-colors">
          {link.name}
        </Link>
      </li>
    ))}
  </ul>
</div>
    </div>
    <div className="py-6 text-center text-label text-text-muted text-xs">
      © {new Date().getFullYear()} Claritii. All rights reserved. Tania 💙
    </div>
  </footer>
)