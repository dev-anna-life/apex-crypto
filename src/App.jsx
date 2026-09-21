import React, { useState, useEffect } from 'react'

const INITIAL_ASSETS = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: 'BTC',
    price: 64820.50,
    change: 3.42,
    high: 65400.00,
    low: 63110.00,
    cap: '$1.28T',
    trend: [63100, 63400, 63200, 63800, 64200, 64000, 64500, 64820]
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    icon: 'ETH',
    price: 3480.25,
    change: 4.85,
    high: 3520.00,
    low: 3310.00,
    cap: '$418.5B',
    trend: [3310, 3340, 3360, 3400, 3420, 3460, 3450, 3480]
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    icon: 'SOL',
    price: 152.80,
    change: -1.45,
    high: 158.20,
    low: 149.00,
    cap: '$71.2B',
    trend: [157, 156, 154, 155, 153, 151, 153, 152.8]
  },
  {
    id: 'binancecoin',
    name: 'BNB',
    symbol: 'BNB',
    icon: 'BNB',
    price: 588.40,
    change: 1.15,
    high: 594.00,
    low: 580.20,
    cap: '$87.6B',
    trend: [581, 582, 585, 584, 586, 585, 587, 588.4]
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
  const [priceFlash, setPriceFlash] = useState(null)

  const activeAsset = assets.find(a => a.id === activeId) || assets[0]
  const isPositive = activeAsset.change >= 0

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
          return {
            ...coin,
            price: match.current_price,
            change: match.price_change_percentage_24h ?? coin.change,
            high: match.high_24h ?? coin.high,
            low: match.low_24h ?? coin.low,
            cap: capStr
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

  const minVal = Math.min(...activeAsset.trend)
  const maxVal = Math.max(...activeAsset.trend)
  const range = maxVal - minVal || 1
  const width = 400
  const height = 100
  const step = width / (activeAsset.trend.length - 1)

  const points = activeAsset.trend.map((val, i) => {
    const x = i * step
    const y = height - ((val - minVal) / range) * 80 - 10
    return `${x},${y}`
  })

  const pathD = `M ${points.join(' L ')}`
  const areaD = `${pathD} L ${width},${height} L 0,${height} Z`
  const strokeColor = isPositive ? '#10b981' : '#f43f5e'

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col items-center px-4 py-8 antialiased">
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
              <span>{Math.abs(activeAsset.change).toFixed(2)}%</span>
            </div>
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Real-Time Price</span>
            <div className={`text-4xl font-extrabold tracking-tight tabular-nums transition-colors duration-300 ${
              priceFlash === 'up' ? 'text-emerald-400' : priceFlash === 'down' ? 'text-rose-400' : 'text-white'
            }`}>
              {formatCurrency(activeAsset.price)}
            </div>
          </div>

          <div className="w-full h-28 my-1">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={strokeColor} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={areaD} fill="url(#chartGrad)" />
              <path d={pathD} fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" />
            </svg>
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
            const coinPositive = coin.change >= 0
            const isActive = coin.id === activeId

            return (
              <div
                key={coin.id}
                onClick={() => setActiveId(coin.id)}
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
                    {coinPositive ? '+' : ''}{coin.change.toFixed(2)}%
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
