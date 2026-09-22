import React, { useState, useEffect, useRef } from 'react'

const TIMEFRAMES = ['1H', '24H', '7D', '1M', '1Y']

const INITIAL_ASSETS = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: 'BTC',
    price: 64820.50,
    high: 65400.00,
    low: 63110.00,
    cap: '$1.28T',
    timeframes: {
      '1H': {
        change: 0.38,
        data: [
          { time: '10:00 AM', price: 64620 },
          { time: '10:10 AM', price: 64680 },
          { time: '10:20 AM', price: 64710 },
          { time: '10:30 AM', price: 64690 },
          { time: '10:40 AM', price: 64750 },
          { time: '10:50 AM', price: 64790 },
          { time: '11:00 AM', price: 64820 }
        ]
      },
      '24H': {
        change: 3.42,
        data: [
          { time: '12:00 AM', price: 63100 },
          { time: '04:00 AM', price: 63400 },
          { time: '08:00 AM', price: 63200 },
          { time: '12:00 PM', price: 63800 },
          { time: '04:00 PM', price: 64200 },
          { time: '08:00 PM', price: 64500 },
          { time: '11:00 PM', price: 64820 }
        ]
      },
      '7D': {
        change: 6.85,
        data: [
          { time: 'Mon', price: 60800 },
          { time: 'Tue', price: 61400 },
          { time: 'Wed', price: 62200 },
          { time: 'Thu', price: 61900 },
          { time: 'Fri', price: 63400 },
          { time: 'Sat', price: 64100 },
          { time: 'Sun', price: 64820 }
        ]
      },
      '1M': {
        change: -2.10,
        data: [
          { time: 'Week 1', price: 66200 },
          { time: 'Week 2', price: 65100 },
          { time: 'Week 3', price: 63800 },
          { time: 'Week 4', price: 64820 }
        ]
      },
      '1Y': {
        change: 114.20,
        data: [
          { time: 'Q1', price: 31200 },
          { time: 'Q2', price: 42500 },
          { time: 'Q3', price: 56800 },
          { time: 'Q4', price: 64820 }
        ]
      }
    }
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    icon: 'ETH',
    price: 3480.25,
    high: 3520.00,
    low: 3310.00,
    cap: '$418.5B',
    timeframes: {
      '1H': {
        change: 0.22,
        data: [
          { time: '10:00 AM', price: 3465 },
          { time: '10:15 AM', price: 3470 },
          { time: '10:30 AM', price: 3468 },
          { time: '10:45 AM', price: 3475 },
          { time: '11:00 AM', price: 3480 }
        ]
      },
      '24H': {
        change: 4.85,
        data: [
          { time: '12:00 AM', price: 3310 },
          { time: '04:00 AM', price: 3340 },
          { time: '08:00 AM', price: 3380 },
          { time: '12:00 PM', price: 3420 },
          { time: '04:00 PM', price: 3450 },
          { time: '08:00 PM', price: 3480 }
        ]
      },
      '7D': {
        change: 9.15,
        data: [
          { time: 'Mon', price: 3180 },
          { time: 'Tue', price: 3240 },
          { time: 'Wed', price: 3310 },
          { time: 'Thu', price: 3290 },
          { time: 'Fri', price: 3410 },
          { time: 'Sat', price: 3450 },
          { time: 'Sun', price: 3480 }
        ]
      },
      '1M': {
        change: 5.40,
        data: [
          { time: 'Week 1', price: 3290 },
          { time: 'Week 2', price: 3340 },
          { time: 'Week 3', price: 3410 },
          { time: 'Week 4', price: 3480 }
        ]
      },
      '1Y': {
        change: 82.30,
        data: [
          { time: 'Q1', price: 1890 },
          { time: 'Q2', price: 2420 },
          { time: 'Q3', price: 3100 },
          { time: 'Q4', price: 3480 }
        ]
      }
    }
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    icon: 'SOL',
    price: 152.80,
    high: 158.20,
    low: 149.00,
    cap: '$71.2B',
    timeframes: {
      '1H': {
        change: -0.15,
        data: [
          { time: '10:00 AM', price: 153.2 },
          { time: '10:20 AM', price: 153.0 },
          { time: '10:40 AM', price: 152.6 },
          { time: '11:00 AM', price: 152.8 }
        ]
      },
      '24H': {
        change: -1.45,
        data: [
          { time: '12:00 AM', price: 156.0 },
          { time: '04:00 AM', price: 154.5 },
          { time: '08:00 AM', price: 155.0 },
          { time: '12:00 PM', price: 153.0 },
          { time: '04:00 PM', price: 151.8 },
          { time: '08:00 PM', price: 152.8 }
        ]
      },
      '7D': {
        change: 4.20,
        data: [
          { time: 'Mon', price: 146.0 },
          { time: 'Tue', price: 148.5 },
          { time: 'Wed', price: 150.0 },
          { time: 'Thu', price: 149.2 },
          { time: 'Fri', price: 154.0 },
          { time: 'Sat', price: 155.1 },
          { time: 'Sun', price: 152.8 }
        ]
      },
      '1M': {
        change: 18.60,
        data: [
          { time: 'Week 1', price: 128.0 },
          { time: 'Week 2', price: 139.0 },
          { time: 'Week 3', price: 146.5 },
          { time: 'Week 4', price: 152.8 }
        ]
      },
      '1Y': {
        change: 410.50,
        data: [
          { time: 'Q1', price: 24.0 },
          { time: 'Q2', price: 65.0 },
          { time: 'Q3', price: 110.0 },
          { time: 'Q4', price: 152.8 }
        ]
      }
    }
  },
  {
    id: 'binancecoin',
    name: 'BNB',
    symbol: 'BNB',
    icon: 'BNB',
    price: 588.40,
    high: 594.00,
    low: 580.20,
    cap: '$87.6B',
    timeframes: {
      '1H': {
        change: 0.10,
        data: [
          { time: '10:00 AM', price: 587.8 },
          { time: '10:30 AM', price: 588.1 },
          { time: '11:00 AM', price: 588.4 }
        ]
      },
      '24H': {
        change: 1.15,
        data: [
          { time: '12:00 AM', price: 581.0 },
          { time: '04:00 AM', price: 583.5 },
          { time: '08:00 AM', price: 585.0 },
          { time: '12:00 PM', price: 584.2 },
          { time: '04:00 PM', price: 586.8 },
          { time: '08:00 PM', price: 588.4 }
        ]
      },
      '7D': {
        change: 2.80,
        data: [
          { time: 'Mon', price: 572.0 },
          { time: 'Tue', price: 576.0 },
          { time: 'Wed', price: 580.0 },
          { time: 'Thu', price: 579.5 },
          { time: 'Fri', price: 584.0 },
          { time: 'Sat', price: 586.5 },
          { time: 'Sun', price: 588.4 }
        ]
      },
      '1M': {
        change: 7.30,
        data: [
          { time: 'Week 1', price: 548.0 },
          { time: 'Week 2', price: 562.0 },
          { time: 'Week 3', price: 575.0 },
          { time: 'Week 4', price: 588.4 }
        ]
      },
      '1Y': {
        change: 145.00,
        data: [
          { time: 'Q1', price: 235.0 },
          { time: 'Q2', price: 340.0 },
          { time: 'Q3', price: 480.0 },
          { time: 'Q4', price: 588.4 }
        ]
      }
    }
  }
]

function formatCurrency(num) {
  return '$' + Number(num).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

export default function App() {
  const [assets, setAssets] = useState(INITIAL_ASSETS)
  const [activeId, setActiveId] = useState('bitcoin')
  const [activeTimeframe, setActiveTimeframe] = useState('24H')
  const [scrubIndex, setScrubIndex] = useState(null)
  const [priceFlash, setPriceFlash] = useState(null)
  const svgRef = useRef(null)

  const activeAsset = assets.find(a => a.id === activeId) || assets[0]
  const currentTfData = activeAsset.timeframes[activeTimeframe] || activeAsset.timeframes['24H']
  const currentPoints = currentTfData.data
  const isPositive = currentTfData.change >= 0

  useEffect(() => {
    async function loadPrices() {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana,binancecoin&price_change_percentage=24h')
        if (!res.ok) return
        const data = await res.json()

        setAssets(prev => prev.map(coin => {
          const match = data.find(d => d.id === coin.id)
          if (!match) return coin
          let capStr = coin.cap
          if (match.market_cap > 1e12) capStr = `$${(match.market_cap / 1e12).toFixed(2)}T`
          else if (match.market_cap > 1e9) capStr = `$${(match.market_cap / 1e9).toFixed(1)}B`

          const updated24H = {
            ...coin.timeframes['24H'],
            change: match.price_change_percentage_24h ?? coin.timeframes['24H'].change
          }

          return {
            ...coin,
            price: match.current_price,
            high: match.high_24h ?? coin.high,
            low: match.low_24h ?? coin.low,
            cap: capStr,
            timeframes: {
              ...coin.timeframes,
              '24H': updated24H
            }
          }
        }))
      } catch (e) {}
    }

    loadPrices()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setAssets(prev => prev.map(coin => {
        if (coin.id !== activeId) return coin
        const delta = (Math.random() - 0.49) * (coin.price * 0.0004)
        const newPrice = Math.max(0.1, coin.price + delta)
        setPriceFlash(delta >= 0 ? 'up' : 'down')
        setTimeout(() => setPriceFlash(null), 350)
        return { ...coin, price: newPrice }
      }))
    }, 3000)

    return () => clearInterval(timer)
  }, [activeId])

  const prices = currentPoints.map(p => p.price)
  const minVal = Math.min(...prices)
  const maxVal = Math.max(...prices)
  const range = maxVal - minVal || 1
  const svgWidth = 400
  const svgHeight = 110
  const step = svgWidth / (currentPoints.length - 1)

  const mappedPoints = currentPoints.map((pt, i) => {
    const x = i * step
    const y = svgHeight - ((pt.price - minVal) / range) * 85 - 12
    return { x, y, price: pt.price, time: pt.time }
  })

  const pathD = `M ${mappedPoints.map(p => `${p.x},${p.y}`).join(' L ')}`
  const areaD = `${pathD} L ${svgWidth},${svgHeight} L 0,${svgHeight} Z`
  const strokeColor = isPositive ? '#10b981' : '#f43f5e'

  const activeHoverPoint = scrubIndex !== null ? mappedPoints[scrubIndex] : null
  const displayPrice = activeHoverPoint ? activeHoverPoint.price : activeAsset.price

  function handleScrub(clientX) {
    if (!svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    const offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const ratio = offsetX / rect.width
    const rawIndex = Math.round(ratio * (currentPoints.length - 1))
    const clampedIndex = Math.max(0, Math.min(rawIndex, currentPoints.length - 1))
    setScrubIndex(clampedIndex)
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col items-center px-4 py-8 antialiased selection:bg-sky-500/30">
      <div className="w-full max-w-lg flex flex-col gap-5">
        <header className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center font-black text-sm text-[#07090e] shadow-lg shadow-sky-500/20">
              A
            </div>
            <span className="text-lg font-bold tracking-tight text-white">Apex Markets</span>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-full text-xs font-semibold text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Live Feed</span>
          </div>
        </header>

        <section className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col gap-4">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-sm font-bold tracking-wider text-slate-200">
                {activeAsset.icon}
              </div>
              <div>
                <h1 className="text-base font-bold text-white leading-tight">{activeAsset.name}</h1>
                <p className="text-xs font-medium text-slate-400">{activeAsset.symbol} / USD</p>
              </div>
            </div>
            <div className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1 transition-colors ${
              isPositive 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/25' 
                : 'bg-rose-500/10 text-rose-400 border-rose-500/25'
            }`}>
              <span>{isPositive ? '+' : '-'}</span>
              <span>{Math.abs(currentTfData.change).toFixed(2)}%</span>
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {activeHoverPoint ? `Point in Time (${activeHoverPoint.time})` : 'Real-Time Price'}
              </span>
              <div className={`text-4xl font-extrabold tracking-tight tabular-nums transition-colors duration-200 ${
                activeHoverPoint 
                  ? 'text-sky-400'
                  : priceFlash === 'up' ? 'text-emerald-400' : priceFlash === 'down' ? 'text-rose-400' : 'text-white'
              }`}>
                {formatCurrency(displayPrice)}
              </div>
            </div>

            <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-white/5">
              {TIMEFRAMES.map(tf => (
                <button
                  key={tf}
                  onClick={() => {
                    setActiveTimeframe(tf)
                    setScrubIndex(null)
                  }}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                    activeTimeframe === tf
                      ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          <div 
            className="w-full h-32 my-1 relative cursor-crosshair select-none touch-none"
            onMouseMove={e => handleScrub(e.clientX)}
            onMouseLeave={() => setScrubIndex(null)}
            onTouchMove={e => {
              if (e.touches[0]) handleScrub(e.touches[0].clientX)
            }}
            onTouchEnd={() => setScrubIndex(null)}
          >
            <svg 
              ref={svgRef}
              className="w-full h-full overflow-visible" 
              viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={strokeColor} stopOpacity="0.32" />
                  <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={areaD} fill="url(#chartGrad)" />
              <path d={pathD} fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />

              {activeHoverPoint && (
                <g>
                  <line 
                    x1={activeHoverPoint.x} 
                    y1="0" 
                    x2={activeHoverPoint.x} 
                    y2={svgHeight} 
                    stroke="#38bdf8" 
                    strokeWidth="1.5" 
                    strokeDasharray="3 3" 
                  />
                  <circle 
                    cx={activeHoverPoint.x} 
                    cy={activeHoverPoint.y} 
                    r="5.5" 
                    fill="#38bdf8" 
                    stroke="#07090e" 
                    strokeWidth="2.5" 
                  />
                </g>
              )}
            </svg>

            {activeHoverPoint && (
              <div 
                className="absolute -top-3 -translate-x-1/2 pointer-events-none bg-slate-950/95 border border-sky-500/40 text-sky-400 text-[11px] font-bold px-2 py-0.5 rounded-md shadow-xl whitespace-nowrap"
                style={{ 
                  left: `${(activeHoverPoint.x / svgWidth) * 100}%` 
                }}
              >
                {activeHoverPoint.time}: {formatCurrency(activeHoverPoint.price)}
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3.5 border-t border-white/5">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider">24h High</span>
              <span className="text-xs font-bold text-slate-200 tabular-nums">{formatCurrency(activeAsset.high)}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider">24h Low</span>
              <span className="text-xs font-bold text-slate-200 tabular-nums">{formatCurrency(activeAsset.low)}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider">Market Cap</span>
              <span className="text-xs font-bold text-slate-200">{activeAsset.cap}</span>
            </div>
          </div>
        </section>

        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
          Trending Assets
        </div>

        <div className="flex flex-col gap-2">
          {assets.map(coin => {
            const coin24H = coin.timeframes['24H']
            const coinPositive = coin24H.change >= 0
            const isActive = coin.id === activeId

            return (
              <div
                key={coin.id}
                onClick={() => {
                  setActiveId(coin.id)
                  setScrubIndex(null)
                }}
                className={`p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                  isActive 
                    ? 'bg-slate-800/90 border-sky-500/40 shadow-lg shadow-sky-500/5' 
                    : 'bg-slate-900/60 border-white/5 hover:border-white/15 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-xs font-bold text-slate-200">
                    {coin.icon}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{coin.name}</div>
                    <div className="text-[11px] font-semibold text-slate-400">{coin.symbol}</div>
                  </div>
                </div>
                <div className="text-right flex flex-col gap-0.5">
                  <div className="text-sm font-bold text-white tabular-nums">{formatCurrency(coin.price)}</div>
                  <div className={`text-xs font-bold ${coinPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {coinPositive ? '+' : ''}{coin24H.change.toFixed(2)}%
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
