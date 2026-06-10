import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export function LandingNav() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-deep/90 backdrop-blur-md border-b border-white/6' : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-xl font-bold text-gradient-gold cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Invitique
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: '기능', id: 'features' },
            { label: '테마', id: 'themes' },
            { label: '가격', id: 'pricing' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-white/50 hover:text-white text-sm transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/demo')}
            className="hidden md:flex items-center gap-1.5 bg-gold text-deep font-semibold px-4 py-2 rounded-full text-sm shadow-gold hover:shadow-float transition-all hover:scale-[1.03]"
          >
            데모 체험
          </button>
          <button
            className="md:hidden text-white/70 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-deep/95 backdrop-blur-md border-t border-white/6 px-6 pb-4">
          {[
            { label: '기능', id: 'features' },
            { label: '테마', id: 'themes' },
            { label: '가격', id: 'pricing' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="block w-full text-left text-white/60 hover:text-white py-3 text-sm border-b border-white/5 last:border-0 transition-colors"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => navigate('/demo')}
            className="mt-4 w-full bg-gold text-deep font-semibold py-3 rounded-xl text-sm"
          >
            데모 체험하기
          </button>
        </div>
      )}
    </nav>
  );
}
