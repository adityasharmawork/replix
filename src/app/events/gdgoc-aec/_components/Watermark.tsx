"use client";

interface WatermarkProps {
  text: string;
}

export default function Watermark({ text }: WatermarkProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 9999,
        pointerEvents: 'none', // Allows clicks to pass through
        display: 'flex',
        flexWrap: 'wrap',
      }}
    >
      {/* Create a grid of watermark text */}
      {Array.from({ length: 100 }).map((_, i) => (
        <div
          key={i}
          style={{
            flex: '0 0 250px', // Adjust width of each tile
            height: '150px',     // Adjust height of each tile
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotate(-30deg)',
            opacity: 0.08, // Keep it subtle
            color: '#ffffff',
            fontSize: '14px',
            whiteSpace: 'nowrap',
          }}
        >
          {text}
        </div>
      ))}
    </div>
  );
}