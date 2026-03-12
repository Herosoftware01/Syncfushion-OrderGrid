import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Settings, MapPin, TrendingUp, TrendingDown } from 'lucide-react';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Tooltip } from 'react-tooltip'; // Tooltip Import

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const businessLocations = [
  { name: "USA", code: "USA", coordinates: [-100, 40] },
  { name: "India", code: "IND", coordinates: [78.96, 20.59] },
  { name: "Germany", code: "DEU", coordinates: [10.45, 51.16] },
  { name: "Brazil", code: "BRA", coordinates: [-51.92, -14.23] },
];

const Dashboard = () => {
  const [content, setContent] = useState(""); // Tooltip content state

  return (
    <div className="h-screen w-full bg-[#f8fafc] p-4 md:p-6 font-sans text-slate-700 flex flex-col overflow-hidden">
      
      {/* Header */}
      <header className="flex justify-between items-center mb-4 shrink-0">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <nav className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
            App &gt; Main &gt; <span className="text-slate-800">Dashboard</span>
          </nav>
          <h1 className="text-2xl font-light text-slate-800 tracking-tight">Global Reach</h1>
        </motion.div>
        <button className="p-2 bg-[#1e3a8a] text-white rounded-full"><Settings size={18} /></button>
      </header>

      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0 mb-4">
        {/* MAP CARD */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-12 lg:col-span-8 bg-white rounded-3xl shadow-sm border border-slate-100 p-6 flex flex-col overflow-hidden">
          <div className="shrink-0 mb-2">
            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Geo-Locations</p>
            <h2 className="text-2xl font-bold flex items-center text-slate-800">1,656,843 <MapPin size={20} className="ml-2 text-blue-600" /></h2>
          </div>
          
          <div className="flex-1 w-full bg-blue-50/20 rounded-2xl relative overflow-hidden">
            {/* Tooltip Component */}
            <Tooltip id="my-tooltip" style={{ backgroundColor: "#1e3a8a", color: "#fff", borderRadius: "8px", fontSize: "12px", fontWeight: "bold" }} />
            
            <ComposableMap projectionConfig={{ scale: 140 }} style={{ width: "100%", height: "100%" }}>
              <Geographies geography={geoUrl}>
  {({ geographies }) =>
    geographies.map((geo) => {
      const isBusiness = businessLocations.find(
        (c) => c.code === geo.id || c.code === geo.properties.ISO_A3
      );
      
      return (
        <Geography
          key={geo.rsmKey}
          geography={geo}
          // Border (Outline) Settings
          stroke="#FFFFFF" // White Color Outline
          strokeWidth={0.8} // Border thickness
          data-tooltip-id="my-tooltip"
          data-tooltip-content={geo.properties.name}
          style={{
            default: {
              // Business country-na Dark Blue, illana Light Gray
              fill: isBusiness ? "#1e3a8a" : "#cbd5e1", 
              outline: "none",
              transition: "all 250ms"
            },
            hover: {
              fill: "#3b82f6", // Hover pannumbodhu matum light blue
              outline: "none",
              cursor: "pointer"
            },
            pressed: {
              fill: "#1d4ed8",
              outline: "none"
            }
          }}
        />
      );
    })
  }
</Geographies>
              {/* Markers remain same */}
              {businessLocations.map(({ name, coordinates }) => (
                <Marker key={name} coordinates={coordinates}>
                   <circle r={2.5} fill="#1e3a8a" stroke="#fff" strokeWidth={1} />
                </Marker>
              ))}
            </ComposableMap>
          </div>
        </motion.div>

        {/* STATS SIDEBAR */}
        <div className="col-span-12 lg:col-span-4 bg-white rounded-3xl shadow-sm border border-slate-100 p-6 flex flex-col overflow-hidden">
          <h3 className="text-lg font-bold text-slate-800 mb-6 shrink-0">Statistics</h3>
          <div className="flex-1 space-y-8 flex flex-col justify-center">
            <ProgressBar label="Foreign Visits" percent={75} color="bg-[#1e3a8a]" />
            <ProgressBar label="Conversion" percent={84} color="bg-orange-500" />
            <ProgressBar label="System Load" percent={92} color="bg-emerald-500" />
          </div>
        </div>
      </div>

      {/* BOTTOM CARDS */}
      <div className="h-[140px] grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
        <StatCard title="Growth" val="76.38%" trend="+17%" isUp={true} accent="bg-emerald-500" />
        <StatCard title="Traffic" val="17.5M" trend="-8%" isUp={false} accent="bg-orange-500" />
        <StatCard title="Market" val="104.8" trend="+12k" isUp={true} accent="bg-blue-800" />
      </div>
    </div>
  );
};

// Reusable Components
const ProgressBar = ({ label, percent, color }) => (
  <div>
    <div className="flex justify-between text-[11px] font-bold mb-1">
      <span className="text-slate-500">{label}</span>
      <span>{percent}%</span>
    </div>
    <div className="h-1.5 w-full bg-slate-100 rounded-full">
      <motion.div initial={{ width: 0 }} whileInView={{ width: `${percent}%` }} transition={{ duration: 1 }} className={`h-full ${color} rounded-full`} />
    </div>
  </div>
);

const StatCard = ({ title, val, trend, isUp, accent }) => (
  <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-4 flex flex-col justify-between">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
    <p className="text-xl font-bold text-slate-800">{val}</p>
    <div className={`text-[10px] font-bold flex items-center ${isUp ? 'text-emerald-500' : 'text-orange-500'}`}>
      {trend} FROM LAST MONTH
    </div>
  </div>
);

export default Dashboard;