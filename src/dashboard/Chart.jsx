import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Settings, MapPin, TrendingUp, TrendingDown, Globe } from 'lucide-react';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

// World Map JSON
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// --- CONFIGURATION: Add your business countries here ---
const businessLocations = [
  { name: "USA", code: "USA", coordinates: [-100, 40], growth: "+12%" },
  { name: "India", code: "IND", coordinates: [78.96, 20.59], growth: "+25%" },
  { name: "Germany", code: "DEU", coordinates: [10.45, 51.16], growth: "+8%" },
  { name: "Brazil", code: "BRA", coordinates: [-51.92, -14.23], growth: "+15%" },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 font-sans text-slate-700">
      {/* Header */}
      <header className="mb-8 flex justify-between items-center">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <nav className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mb-1 font-bold">
            YOU ARE HERE &gt; App &gt; Main &gt; <span className="text-slate-800">Dashboard</span>
          </nav>
          <h1 className="text-3xl font-light text-slate-800">Dashboard <span className="text-sm text-slate-400 ml-2 font-normal">The Lucky One</span></h1>
        </motion.div>
        
        <motion.button 
          whileHover={{ rotate: 90 }}
          className="p-3 bg-[#1e3a8a] text-white rounded-full shadow-xl shadow-blue-900/20"
        >
          <Settings size={20} />
        </motion.button>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-12 gap-6"
      >
        {/* LARGE MAP CARD */}
        <motion.div variants={itemVariants} className="col-span-12 lg:col-span-8 bg-white rounded-3xl shadow-sm border border-slate-100 p-8 relative min-h-[500px]">
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Business Geo-Locations</p>
              <h2 className="text-3xl font-bold flex items-center text-slate-800">
                1 656 843 <MapPin size={22} className="ml-3 text-blue-600" />
              </h2>
            </div>
          </div>
          
          {/* Interactive World Map */}
          <div className="w-full h-full min-h-[350px]">
            <ComposableMap projectionConfig={{ scale: 140 }}>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const isBusiness = businessLocations.find(c => c.code === geo.id || c.code === geo.properties.ISO_A3);
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={isBusiness ? "#1e3a8a" : "#e2e8f0"}
                        stroke="#ffffff"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: { fill: "#3b82f6", outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
              {businessLocations.map(({ name, coordinates }) => (
                <Marker key={name} coordinates={coordinates}>
                  <motion.circle
                    initial={{ r: 0, opacity: 0 }}
                    animate={{ r: [4, 8, 4], opacity: [0.5, 0.2, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    fill="#3b82f6"
                  />
                  <circle r={3} fill="#1e3a8a" stroke="#fff" strokeWidth={1} />
                </Marker>
              ))}
            </ComposableMap>
          </div>
        </motion.div>

        {/* SIDE STATS CARD */}
        <motion.div variants={itemVariants} className="col-span-12 lg:col-span-4 bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
          <h3 className="text-xl font-semibold mb-8 text-slate-800">Map Statistics</h3>
          <div className="space-y-8">
            <ProgressBar label="Foreign Visits" sub="Global Traffic" percent={75} color="bg-[#1e3a8a]" />
            <ProgressBar label="Local Visits" sub="Direct Conversion" percent={84} color="bg-orange-500" />
            <ProgressBar label="Network Load" sub="System Stability" percent={92} color="bg-emerald-500" />
          </div>

          <div className="mt-12 pt-8 border-t border-slate-50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-bold text-slate-600">Map Distribution</span>
              <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-md">LIVE ACTIVE</span>
            </div>
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search marked countries..." 
                className="w-full bg-slate-50 border-none rounded-xl py-3 pl-5 pr-12 text-sm focus:ring-2 focus:ring-blue-100 transition-all"
              />
              <Search size={18} className="absolute right-4 top-3 text-slate-300 group-focus-within:text-blue-500" />
            </div>
          </div>
        </motion.div>

        {/* BOTTOM THREE FEATURE CARDS */}
        <StatCard 
          title="Userbase Growth" 
          stats={[{l: "Overall", v: "76.38%"}, {l: "Monthly", v: "10.38%"}, {l: "24h", v: "3.38%"}]}
          trend="+ 17% higher than last month"
          isUp={true}
          accent="bg-emerald-500"
          variants={itemVariants}
        />

        <StatCard 
          title="Traffic Values" 
          stats={[{l: "Total", v: "17M+"}, {l: "Monthly", v: "55.1k"}, {l: "24h", v: "9.6k"}]}
          trend="- 8% lower than last month"
          isUp={false}
          accent="bg-orange-500"
          variants={itemVariants}
        />

        <StatCard 
          title="Market Reach" 
          stats={[{l: "Global", v: "104.8%"}, {l: "Index", v: "14.2"}, {l: "Pop.", v: "7.2B"}]}
          trend="+ 8,734 new users today"
          isUp={true}
          accent="bg-blue-800"
          variants={itemVariants}
        />
      </motion.div>
    </div>
  );
};

// --- Sub-Components with Animations ---

const ProgressBar = ({ label, sub, percent, color }) => (
  <div className="group">
    <div className="flex justify-between items-end mb-1">
      <div>
        <h4 className="text-sm font-bold text-slate-700">{label}</h4>
        <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">{sub}</p>
      </div>
      <span className="text-sm font-bold text-slate-800">{percent}%</span>
    </div>
    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        whileInView={{ width: `${percent}%` }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className={`h-full ${color} rounded-full`}
      />
    </div>
  </div>
);

const StatCard = ({ title, stats, trend, isUp, accent, variants }) => (
  <motion.div 
    variants={variants}
    whileHover={{ y: -5 }}
    className="col-span-12 md:col-span-4 bg-white rounded-3xl shadow-sm border border-slate-100 p-8 transition-all hover:shadow-xl hover:shadow-slate-200/50"
  >
    <h4 className="text-[11px] font-black text-slate-400 mb-8 uppercase tracking-[0.2em]">{title}</h4>
    <div className="grid grid-cols-3 gap-4 mb-8">
      {stats.map((s, i) => (
        <div key={i}>
          <p className="text-[9px] text-slate-400 uppercase font-bold mb-1">{s.l}</p>
          <p className="text-sm font-bold text-slate-800">{s.v}</p>
        </div>
      ))}
    </div>
    <div className="h-1 w-full bg-slate-50 rounded-full mb-6">
      <div className={`h-full ${accent} w-2/3 rounded-full opacity-40`} />
    </div>
    <div className={`flex items-center text-[11px] font-bold tracking-tight ${isUp ? 'text-emerald-500' : 'text-blue-900'}`}>
      {isUp ? <TrendingUp size={16} className="mr-2" /> : <TrendingDown size={16} className="mr-2" />}
      {trend.toUpperCase()}
    </div>
  </motion.div>
);

export default Dashboard;