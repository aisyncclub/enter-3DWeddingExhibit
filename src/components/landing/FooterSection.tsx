import { Heart } from 'lucide-react';

export function FooterSection() {
  return (
    <footer className="bg-deep border-t border-white/5 py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="text-2xl font-bold text-gradient-gold mb-1">Invitique</div>
          <p className="text-white/30 text-sm">3D 웨딩 갤러리 청첩장 서비스</p>
        </div>

        <div className="flex items-center gap-1.5 text-white/25 text-sm">
          Made with <Heart size={13} className="text-blush" fill="currentColor" /> for couples everywhere
        </div>

        <p className="text-white/20 text-xs">© 2026 Invitique. All rights reserved.</p>
      </div>
    </footer>
  );
}
