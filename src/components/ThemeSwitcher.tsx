import { Church, Leaf, Moon } from 'lucide-react';
import type { ThemeKey } from './gallery/backgrounds';

const THEMES: { key: ThemeKey; label: string; icon: React.ReactNode; color: string }[] = [
  { key: 'chapel', label: '채플', icon: <Church size={16} />, color: 'hsl(43 74% 58%)' },
  { key: 'garden', label: '정원', icon: <Leaf size={16} />, color: 'hsl(140 40% 45%)' },
  { key: 'night', label: '밤하늘', icon: <Moon size={16} />, color: 'hsl(228 50% 65%)' },
];

interface ThemeSwitcherProps {
  current: ThemeKey;
  onChange: (theme: ThemeKey) => void;
}

export function ThemeSwitcher({ current, onChange }: ThemeSwitcherProps) {
  return (
    <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md rounded-full px-3 py-2 border border-white/10">
      {THEMES.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
            current === t.key
              ? 'text-deep shadow-gold'
              : 'text-white/60 hover:text-white/90'
          }`}
          style={current === t.key ? { background: t.color } : {}}
        >
          {t.icon}
          {t.label}
        </button>
      ))}
    </div>
  );
}
