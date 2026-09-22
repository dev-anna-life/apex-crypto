import React, { useState, useEffect, useRef } from 'react'

const TIMEFRAMES = ['1H', '24H', '7D', '1M', '1Y']
const CATEGORIES = ['All', 'Layer 1', 'DeFi', 'Memes']

const INITIAL_ASSETS = [
  {
    id: 'bitcoin',
    rank: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: 'BTC',
    category: 'Layer 1',
    price: 64820.50,
    high: 65400.00,
    low: 63110.00,
    vol24h: '$34.8B',
    cap: '$1.28T',
    change7d: 6.85,
    sparkline7d: [60800, 61400, 62200, 61900, 63400, 64100, 64820],
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
    rank: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    icon: 'ETH',
    category: 'Layer 1',
    price: 3480.25,
    high: 3520.00,
    low: 3310.00,
    vol24h: '$18.2B',
    cap: '$418.5B',
    change7d: 9.15,
    sparkline7d: [3180, 3240, 3310, 3290, 3410, 3450, 3480],
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
    rank: 3,
    name: 'Solana',
    symbol: 'SOL',
    icon: 'SOL',
    category: 'Layer 1',
    price: 152.80,
    high: 158.20,
    low: 149.00,
    vol24h: '$5.4B',
    cap: '$71.2B',
    change7d: 4.20,
    sparkline7d: [146, 148.5, 150, 149.2, 154, 155.1, 152.8],
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
    rank: 4,
    name: 'BNB',
    symbol: 'BNB',
    icon: 'BNB',
    category: 'Layer 1',
    price: 588.40,
    high: 594.00,
    low: 580.20,
    vol24h: '$1.8B',
    cap: '$87.6B',
    change7d: 2.80,
    sparkline7d: [572, 576, 580, 579.5, 584, 586.5, 588.4],
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
  },
  {
    id: 'ripple',
    rank: 5,
    name: 'XRP',
    symbol: 'XRP',
    icon: 'XRP',
    category: 'Layer 1',
    price: 0.584,
    high: 0.602,
    low: 0.571,
    vol24h: '$2.1B',
    cap: '$32.9B',
    change7d: -1.80,
    sparkline7d: [0.59, 0.60, 0.58, 0.57, 0.59, 0.58, 0.584],
    timeframes: {
      '1H': { change: -0.05, data: [{ time: '10:00 AM', price: 0.585 }, { time: '11:00 AM', price: 0.584 }] },
      '24H': { change: 2.10, data: [{ time: '12:00 AM', price: 0.572 }, { time: '11:00 PM', price: 0.584 }] },
      '7D': { change: -1.80, data: [{ time: 'Mon', price: 0.595 }, { time: 'Sun', price: 0.584 }] },
      '1M': { change: 12.40, data: [{ time: 'W1', price: 0.520 }, { time: 'W4', price: 0.584 }] },
      '1Y': { change: 18.50, data: [{ time: 'Q1', price: 0.490 }, { time: 'Q4', price: 0.584 }] }
    }
  },
  {
    id: 'cardano',
    rank: 6,
    name: 'Cardano',
    symbol: 'ADA',
    icon: 'ADA',
    category: 'Layer 1',
    price: 0.358,
    high: 0.369,
    low: 0.349,
    vol24h: '$410M',
    cap: '$12.8B',
    change7d: 3.40,
    sparkline7d: [0.34, 0.35, 0.345, 0.36, 0.355, 0.358],
    timeframes: {
      '1H': { change: 0.12, data: [{ time: '10:00 AM', price: 0.357 }, { time: '11:00 AM', price: 0.358 }] },
      '24H': { change: 1.85, data: [{ time: '12:00 AM', price: 0.351 }, { time: '11:00 PM', price: 0.358 }] },
      '7D': { change: 3.40, data: [{ time: 'Mon', price: 0.346 }, { time: 'Sun', price: 0.358 }] },
      '1M': { change: 8.90, data: [{ time: 'W1', price: 0.329 }, { time: 'W4', price: 0.358 }] },
      '1Y': { change: 42.10, data: [{ time: 'Q1', price: 0.252 }, { time: 'Q4', price: 0.358 }] }
    }
  },
  {
    id: 'dogecoin',
    rank: 7,
    name: 'Dogecoin',
    symbol: 'DOGE',
    icon: 'DOGE',
    category: 'Memes',
    price: 0.108,
    high: 0.114,
    low: 0.103,
    vol24h: '$840M',
    cap: '$15.8B',
    change7d: 8.20,
    sparkline7d: [0.099, 0.102, 0.101, 0.106, 0.105, 0.108],
    timeframes: {
      '1H': { change: -0.25, data: [{ time: '10:00 AM', price: 0.109 }, { time: '11:00 AM', price: 0.108 }] },
      '24H': { change: 4.80, data: [{ time: '12:00 AM', price: 0.103 }, { time: '11:00 PM', price: 0.108 }] },
      '7D': { change: 8.20, data: [{ time: 'Mon', price: 0.100 }, { time: 'Sun', price: 0.108 }] },
      '1M': { change: 14.50, data: [{ time: 'W1', price: 0.094 }, { time: 'W4', price: 0.108 }] },
      '1Y': { change: 80.20, data: [{ time: 'Q1', price: 0.060 }, { time: 'Q4', price: 0.108 }] }
    }
  },
  {
    id: 'avalanche-2',
    rank: 8,
    name: 'Avalanche',
    symbol: 'AVAX',
    icon: 'AVAX',
    category: 'Layer 1',
    price: 28.40,
    high: 29.80,
    low: 27.10,
    vol24h: '$610M',
    cap: '$11.4B',
    change7d: 12.40,
    sparkline7d: [25.2, 26.0, 25.8, 27.4, 27.9, 28.4],
    timeframes: {
      '1H': { change: 0.40, data: [{ time: '10:00 AM', price: 28.28 }, { time: '11:00 AM', price: 28.40 }] },
      '24H': { change: 5.60, data: [{ time: '12:00 AM', price: 26.90 }, { time: '11:00 PM', price: 28.40 }] },
      '7D': { change: 12.40, data: [{ time: 'Mon', price: 25.26 }, { time: 'Sun', price: 28.40 }] },
      '1M': { change: 24.10, data: [{ time: 'W1', price: 22.90 }, { time: 'W4', price: 28.40 }] },
      '1Y': { change: 215.00, data: [{ time: 'Q1', price: 9.00 }, { time: 'Q4', price: 28.40 }] }
    }
  },
  {
    id: 'uniswap',
    rank: 9,
    name: 'Uniswap',
    symbol: 'UNI',
    icon: 'UNI',
    category: 'DeFi',
    price: 7.85,
    high: 8.10,
    low: 7.62,
    vol24h: '$280M',
    cap: '$4.7B',
    change7d: -3.10,
    sparkline7d: [8.1, 8.2, 7.9, 7.7, 7.9, 7.85],
    timeframes: {
      '1H': { change: 0.08, data: [{ time: '10:00 AM', price: 7.84 }, { time: '11:00 AM', price: 7.85 }] },
      '24H': { change: 1.40, data: [{ time: '12:00 AM', price: 7.74 }, { time: '11:00 PM', price: 7.85 }] },
      '7D': { change: -3.10, data: [{ time: 'Mon', price: 8.10 }, { time: 'Sun', price: 7.85 }] },
      '1M': { change: 9.80, data: [{ time: 'W1', price: 7.15 }, { time: 'W4', price: 7.85 }] },
      '1Y': { change: 92.50, data: [{ time: 'Q1', price: 4.10 }, { time: 'Q4', price: 7.85 }] }
    }
  },
  {
    id: 'chainlink',
    rank: 10,
    name: 'Chainlink',
    symbol: 'LINK',
    icon: 'LINK',
    category: 'DeFi',
    price: 11.45,
    high: 11.90,
    low: 11.15,
    vol24h: '$320M',
    cap: '$7.1B',
    change7d: 5.60,
    sparkline7d: [10.8, 11.0, 10.9, 11.2, 11.3, 11.45],
    timeframes: {
      '1H': { change: 0.15, data: [{ time: '10:00 AM', price: 11.43 }, { time: '11:00 AM', price: 11.45 }] },
      '24H': { change: 2.70, data: [{ time: '12:00 AM', price: 11.15 }, { time: '11:00 PM', price: 11.45 }] },
      '7D': { change: 5.60, data: [{ time: 'Mon', price: 10.84 }, { time: 'Sun', price: 11.45 }] },
      '1M': { change: 6.40, data: [{ time: 'W1', price: 10.76 }, { time: 'W4', price: 11.45 }] },
      '1Y': { change: 58.20, data: [{ time: 'Q1', price: 7.20 }, { time: 'Q4', price: 11.45 }] }
    }
  }
]

function formatCurrency(num) {
  if (num === undefined || num === null) return '$0.00'
  const isMicro = num < 1 && num > 0
  return '$' + Number(num).toLocaleString('en-US', {
    minimumFractionDigits: isMicro ? 3 : 2,
    maximumFractionDigits: isMicro ? 4 : 2
  })
}

function MiniSparkline({ points, isPositive }) {
  if (!points || points.length < 2) return null
  const min = Math.min(...points)
  const max = Math.max(...points)
  const range = max - min || 1
  const w = 110
  const h = 32
  const step = w / (points.length - 1)

  const coords = points.map((val, i) => {
    const x = i * step
    const y = h - ((val - min) / range) * 24 - 4
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })

  const path = `M ${coords.join(' L ')}`
  const color = isPositive ? '#10b981' : '#f43f5e'

  return (
    <svg className="w-28 h-8 overflow-visible" viewBox={`0 0 ${w} ${h}`}>
      <path d={path} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export default function App() {
  const [assets, setAssets] = useState(INITIAL_ASSETS)
  const [activeId, setActiveId] = useState('bitcoin')
  const [activeTimeframe, setActiveTimeframe] = useState('24H')
  const [scrubIndex, setScrubIndex] = useState(null)
  const [priceFlash, setPriceFlash] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const svgRef = useRef(null)
  const touchTimerRef = useRef(null)

  const activeAsset = assets.find(a => a.id === activeId) || assets[0]
  const currentTfData = activeAsset.timeframes[activeTimeframe] || activeAsset.timeframes['24H']
  const currentPoints = currentTfData.data
  const isPositive = currentTfData.change >= 0

  const themeColor = isPositive ? '#10b981' : '#f43f5e'
  const themeText = isPositive ? 'text-emerald-400' : 'text-rose-400'
  const themeBg = isPositive ? 'bg-emerald-500/10' : 'bg-rose-500/10'
  const themeBorder = isPositive ? 'border-emerald-500/25' : 'border-rose-500/25'

  useEffect(() => {
    async function loadPrices() {
      try {
        const coinIds = INITIAL_ASSETS.map(a => a.id).join(',')
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&price_change_percentage=24h,7d`)
        if (!res.ok) return
        const data = await res.json()

        setAssets(prev => prev.map(coin => {
          const match = data.find(d => d.id === coin.id)
          if (!match) return coin

          let capStr = coin.cap
          if (match.market_cap > 1e12) capStr = `$${(match.market_cap / 1e12).toFixed(2)}T`
          else if (match.market_cap > 1e9) capStr = `$${(match.market_cap / 1e9).toFixed(1)}B`
          else if (match.market_cap > 1e6) capStr = `$${(match.market_cap / 1e6).toFixed(1)}M`

          let volStr = coin.vol24h
          if (match.total_volume > 1e9) volStr = `$${(match.total_volume / 1e9).toFixed(1)}B`
          else if (match.total_volume > 1e6) volStr = `$${(match.total_volume / 1e6).toFixed(1)}M`

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
            vol24h: volStr,
            change7d: match.price_change_percentage_7d_in_currency ?? coin.change7d,
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
        const newPrice = Math.max(0.0001, coin.price + delta)
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

  const activeHoverPoint = scrubIndex !== null ? mappedPoints[scrubIndex] : null
  const displayPrice = activeHoverPoint ? activeHoverPoint.price : activeAsset.price

  function handleScrub(clientX) {
    if (touchTimerRef.current) clearTimeout(touchTimerRef.current)
    if (!svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    const offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const ratio = offsetX / rect.width
    const rawIndex = Math.round(ratio * (currentPoints.length - 1))
    const clampedIndex = Math.max(0, Math.min(rawIndex, currentPoints.length - 1))
    setScrubIndex(clampedIndex)
  }

  function handleTouchEnd() {
    if (touchTimerRef.current) clearTimeout(touchTimerRef.current)
    touchTimerRef.current = setTimeout(() => {
      setScrubIndex(null)
    }, 2000)
  }

  const filteredAssets = assets.filter(coin => {
    const matchesSearch = 
      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = 
      selectedCategory === 'All' || coin.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col items-center px-4 sm:px-8 py-8 antialiased selection:bg-slate-800">
      <div className="w-full max-w-5xl flex flex-col gap-8">
        <header className="flex items-center justify-between px-1 pb-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center font-black text-sm text-[#07090e] shadow-lg shadow-sky-500/20">
              A
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white">Apex Markets</span>
              <p className="text-xs text-slate-400">Institutional-Grade Live Terminal</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-4 text-xs font-semibold text-slate-400 mr-4">
              <span>Market Cap: <strong className="text-slate-200">$2.38T</strong></span>
              <span>24h Vol: <strong className="text-slate-200">$78.4B</strong></span>
              <span>BTC Dominance: <strong className="text-slate-200">54.2%</strong></span>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 px-3 py-1 rounded-full text-xs font-semibold text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Live Feed</span>
            </div>
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
                <p className="text-xs font-medium text-slate-400">{activeAsset.symbol} / USD • Rank #{activeAsset.rank}</p>
              </div>
            </div>
            <div className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1 transition-colors ${themeBg} ${themeText} ${themeBorder}`}>
              <span>{isPositive ? '▲' : '▼'}</span>
              <span>{isPositive ? '+' : '-'}{Math.abs(currentTfData.change).toFixed(2)}%</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {activeHoverPoint ? `Price at ${activeHoverPoint.time}` : 'Live Market Price'}
              </span>
              <div className={`text-4xl font-extrabold tracking-tight tabular-nums transition-colors duration-200 ${
                activeHoverPoint 
                  ? themeText
                  : priceFlash === 'up' ? 'text-emerald-400' : priceFlash === 'down' ? 'text-rose-400' : 'text-white'
              }`}>
                {formatCurrency(displayPrice)}
              </div>
            </div>

            <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-white/5 self-start sm:self-auto">
              {TIMEFRAMES.map(tf => {
                const isTfActive = activeTimeframe === tf
                return (
                  <button
                    key={tf}
                    onClick={() => {
                      setActiveTimeframe(tf)
                      setScrubIndex(null)
                    }}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                      isTfActive
                        ? `${themeBg} ${themeText} ${themeBorder} border shadow-sm`
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tf}
                  </button>
                )
              })}
            </div>
          </div>

          <div 
            className="w-full h-36 my-1 relative cursor-crosshair select-none touch-none"
            onMouseMove={e => handleScrub(e.clientX)}
            onMouseLeave={() => setScrubIndex(null)}
            onTouchMove={e => {
              if (e.touches[0]) handleScrub(e.touches[0].clientX)
            }}
            onTouchEnd={handleTouchEnd}
          >
            <svg 
              ref={svgRef}
              className="w-full h-full overflow-visible" 
              viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={themeColor} stopOpacity="0.32" />
                  <stop offset="100%" stopColor={themeColor} stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={areaD} fill="url(#chartGrad)" />
              <path d={pathD} fill="none" stroke={themeColor} strokeWidth="2.5" strokeLinecap="round" />

              {activeHoverPoint && (
                <g>
                  <line 
                    x1={activeHoverPoint.x} 
                    y1="0" 
                    x2={activeHoverPoint.x} 
                    y2={svgHeight} 
                    stroke={themeColor} 
                    strokeWidth="1.5" 
                    strokeDasharray="3 3" 
                    opacity="0.85"
                  />
                  <circle 
                    cx={activeHoverPoint.x} 
                    cy={activeHoverPoint.y} 
                    r="5.5" 
                    fill={themeColor} 
                    stroke="#07090e" 
                    strokeWidth="2.5" 
                  />
                </g>
              )}
            </svg>

            {activeHoverPoint && (
              <div 
                className={`absolute -top-3 -translate-x-1/2 pointer-events-none bg-slate-950/95 border ${themeBorder} ${themeText} text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-xl whitespace-nowrap`}
                style={{ 
                  left: `${(activeHoverPoint.x / svgWidth) * 100}%` 
                }}
              >
                {activeHoverPoint.time}: {formatCurrency(activeHoverPoint.price)}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/5">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider">24h High</span>
              <span className="text-xs font-bold text-slate-200 tabular-nums">{formatCurrency(activeAsset.high)}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider">24h Low</span>
              <span className="text-xs font-bold text-slate-200 tabular-nums">{formatCurrency(activeAsset.low)}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider">24h Volume</span>
              <span className="text-xs font-bold text-slate-200">{activeAsset.vol24h}</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10.5px] font-semibold text-slate-400 uppercase tracking-wider">Market Cap</span>
              <span className="text-xs font-bold text-slate-200">{activeAsset.cap}</span>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-tight">Crypto Market Directory</h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white/5 text-slate-400">
                {filteredAssets.length} Assets
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-white/5">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                      selectedCategory === cat
                        ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search coin or symbol..."
                  className="bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 w-44 sm:w-56"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-white/10 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-950/40">
                    <th className="py-3.5 pl-6 pr-2">#</th>
                    <th className="py-3.5 px-4">Asset</th>
                    <th className="py-3.5 px-4 text-right">Price</th>
                    <th className="py-3.5 px-4 text-right">24h %</th>
                    <th className="py-3.5 px-4 text-right hidden sm:table-cell">7d %</th>
                    <th className="py-3.5 px-4 text-right hidden md:table-cell">24h Volume</th>
                    <th className="py-3.5 px-4 text-right hidden lg:table-cell">Market Cap</th>
                    <th className="py-3.5 px-4 text-center hidden sm:table-cell">Last 7 Days</th>
                    <th className="py-3.5 pr-6 pl-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs font-medium">
                  {filteredAssets.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="py-12 text-center text-slate-500 font-semibold">
                        No assets found matching "{searchQuery}"
                      </td>
                    </tr>
                  ) : (
                    filteredAssets.map(coin => {
                      const coin24H = coin.timeframes['24H']
                      const isCoin24HPos = coin24H.change >= 0
                      const isCoin7DPos = coin.change7d >= 0
                      const isSelected = coin.id === activeId

                      return (
                        <tr
                          key={coin.id}
                          onClick={() => {
                            setActiveId(coin.id)
                            setScrubIndex(null)
                          }}
                          className={`cursor-pointer transition-colors duration-150 ${
                            isSelected 
                              ? 'bg-slate-800/80' 
                              : 'hover:bg-slate-800/40'
                          }`}
                        >
                          <td className="py-4 pl-6 pr-2 text-slate-400 font-bold">
                            {coin.rank}
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-slate-200">
                                {coin.icon}
                              </div>
                              <div>
                                <div className="font-bold text-white text-sm">{coin.name}</div>
                                <div className="text-[11px] font-semibold text-slate-400 uppercase">{coin.symbol}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-right font-bold text-white tabular-nums">
                            {formatCurrency(coin.price)}
                          </td>
                          <td className="py-4 px-4 text-right tabular-nums">
                            <span className={`inline-flex items-center gap-0.5 font-bold ${isCoin24HPos ? 'text-emerald-400' : 'text-rose-400'}`}>
                              <span>{isCoin24HPos ? '▲' : '▼'}</span>
                              <span>{isCoin24HPos ? '+' : '-'}{Math.abs(coin24H.change).toFixed(2)}%</span>
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right tabular-nums hidden sm:table-cell">
                            <span className={`font-bold ${isCoin7DPos ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {isCoin7DPos ? '+' : ''}{coin.change7d.toFixed(2)}%
                            </span>
                          </td>
                          <td className="py-4 px-4 text-right text-slate-300 font-semibold hidden md:table-cell">
                            {coin.vol24h}
                          </td>
                          <td className="py-4 px-4 text-right text-slate-300 font-semibold hidden lg:table-cell">
                            {coin.cap}
                          </td>
                          <td className="py-4 px-4 text-center hidden sm:table-cell">
                            <div className="flex justify-center">
                              <MiniSparkline points={coin.sparkline7d} isPositive={isCoin7DPos} />
                            </div>
                          </td>
                          <td className="py-4 pr-6 pl-4 text-right">
                            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border transition-all ${
                              isSelected
                                ? 'bg-sky-500/20 text-sky-400 border-sky-500/30'
                                : 'bg-white/5 text-slate-400 border-white/5 hover:text-white hover:border-white/20'
                            }`}>
                              {isSelected ? 'Active' : 'Trade'}
                            </span>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
