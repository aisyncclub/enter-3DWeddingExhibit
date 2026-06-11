interface MarqueeTextProps {
  text: string;
  className?: string;
  speed?: 'normal' | 'slow';
  separator?: string;
}

export function MarqueeText({
  text,
  className = '',
  speed = 'normal',
  separator = ' ——— ',
}: MarqueeTextProps) {
  const repeated = Array(8).fill(text + separator).join('');

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <span
        className={`inline-block ${speed === 'slow' ? 'animate-marquee-slow' : 'animate-marquee'}`}
      >
        {repeated}{repeated}
      </span>
    </div>
  );
}
