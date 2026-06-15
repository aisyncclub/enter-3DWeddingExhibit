import type { ReactNode } from 'react';

export const SHADOW_PRIMARY =
  '0 1px 2px 0 rgba(5,26,36,0.1), 0 4px 4px 0 rgba(5,26,36,0.09), 0 9px 6px 0 rgba(5,26,36,0.05), 0 17px 7px 0 rgba(5,26,36,0.01), 0 26px 7px 0 rgba(5,26,36,0), inset 0 2px 8px 0 rgba(255,255,255,0.5)';
export const SHADOW_SECONDARY =
  '0 0 0 0.5px rgba(0,0,0,0.05), 0 4px 30px rgba(0,0,0,0.08)';
export const SHADOW_CARD = '0 4px 16px rgba(0,0,0,0.08)';

type Variant = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  className?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  target?: string;
}

export function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  leading,
  trailing,
  target,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap';

  const styles: Record<Variant, React.CSSProperties> = {
    primary: { background: '#051A24', color: '#F6FCFF', boxShadow: SHADOW_PRIMARY },
    secondary: { background: '#fff', color: '#051A24', boxShadow: SHADOW_SECONDARY },
    tertiary: { background: '#fff', color: '#051A24', boxShadow: `${SHADOW_SECONDARY}, ${SHADOW_CARD}` },
  };

  const content = (
    <>
      {leading}
      {children}
      {trailing}
    </>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}
         className={`${base} ${className}`} style={styles[variant]}>
        {content}
      </a>
    );
  }
  return (
    <button onClick={onClick} className={`${base} ${className}`} style={styles[variant]}>
      {content}
    </button>
  );
}
