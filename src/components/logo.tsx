interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

const sizes = {
  sm: { icon: 28, text: 'text-base', gap: 'gap-2' },
  md: { icon: 36, text: 'text-xl', gap: 'gap-2.5' },
  lg: { icon: 52, text: 'text-3xl', gap: 'gap-3' },
}

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const s = sizes[size]
  const w = s.icon
  const h = Math.round(w * 0.82)

  // Bars: [x, baseHeight, delay] — воспроизводим форму логотипа
  const bars = [
    { x: 2,  h: 0.45, delay: '0s',    color: 'url(#gPink)' },
    { x: 7,  h: 0.78, delay: '0.15s', color: 'url(#gPink)' },
    { x: 12, h: 0.95, delay: '0.3s',  color: 'url(#gMix)'  },
    { x: 17, h: 0.72, delay: '0.45s', color: 'url(#gMix)'  },
    { x: 22, h: 0.88, delay: '0.6s',  color: 'url(#gBlue)' },
    { x: 27, h: 0.55, delay: '0.75s', color: 'url(#gBlue)' },
    { x: 32, h: 0.35, delay: '0.9s',  color: 'url(#gBlue)' },
  ]

  const bw = 3.5
  const br = 1.8

  return (
    <div className={`flex items-center ${s.gap}`}>
      {/* Icon */}
      <svg
        width={w}
        height={h}
        viewBox="0 0 36 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="gPink" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f72bff" />
            <stop offset="100%" stopColor="#c026d3" />
          </linearGradient>
          <linearGradient id="gMix" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c026d3" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
          <linearGradient id="gBlue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>

        {bars.map((bar, i) => {
          const barH = bar.h * 28
          const y = (28 - barH) / 2 + 1
          return (
            <rect
              key={i}
              x={bar.x}
              y={y}
              width={bw}
              height={barH}
              rx={br}
              fill={bar.color}
            >
              <animate
                attributeName="height"
                values={`${barH};${barH * 0.4};${barH * 1.15};${barH * 0.6};${barH}`}
                dur="1.8s"
                begin={bar.delay}
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
              />
              <animate
                attributeName="y"
                values={`${y};${y + barH * 0.3};${y - barH * 0.075};${y + barH * 0.2};${y}`}
                dur="1.8s"
                begin={bar.delay}
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
              />
            </rect>
          )
        })}
      </svg>

      {/* Text */}
      {showText && (
        <span className={`font-orbitron font-bold ${s.text} bg-gradient-to-r from-fuchsia-500 via-purple-400 to-sky-400 bg-clip-text text-transparent`}>
          РифмоСинтез
        </span>
      )}
    </div>
  )
}
