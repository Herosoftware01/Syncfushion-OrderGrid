import React, { useState, useEffect } from "react";
import { api } from "../../../auth/auth"; // உங்கள் API instance
import { useParams } from "react-router-dom";

export default function DefectTabs() {
    const { unit, line } = useParams();

  const [activeTab, setActiveTab] = useState("minor"); // Current tab
  const [qcdatas, setQcdatas] = useState([]);          // API data
  const [loading, setLoading] = useState(true);        // Loading state
  const [counts, setCounts] = useState({});

  // Fetch QC data on mount
  useEffect(() => {
    const fetch_qcdata = async () => {
      try {
        const res = await api.get("qcapp/qcadmin_mistakes/");
        setQcdatas(res.data);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch_qcdata();
  }, []);

  // Filter data based on active tab
  const getFilteredData = () => {
    return qcdatas.filter((item) => {
      if (activeTab === "minor") return item.category === "Minor Defects";
      if (activeTab === "major") return item.category === "Major Defects";
      if (activeTab === "critical") return item.category === "Critical Defects";
      return false;
    });
  };

  const handleIncrement = (id) => {
  setCounts((prev) => ({
    ...prev,
    [id]: (prev[id] || 0) + 1,
  }));
};

const handleDecrement = (id) => {
  setCounts((prev) => ({
    ...prev,
    [id]: Math.max((prev[id] || 0) - 1, 0),
  }));
};

  // Render content inside tab
  const renderContent = () => {
    if (loading) return <p className="text-gray-500">Loading...</p>;

    const filtered = getFilteredData();

    if (filtered.length === 0)
      return <p className="text-gray-400">No defects found</p>;

    return (
      <div className="grid gap-4 sm:grid-cols-2 ">
        {filtered.map((item) => (
          <div
  key={item.id}
  className="flex items-center justify-between gap-4 p-3 border-2 border-gray-200 rounded-xl hover:shadow-sm transition-shadow duration-200"
>
  {/* Image + Name */}
  <div className="flex items-center gap-4">
    <img
      src={`https://hfapi.herofashion.com${item.image}`}
      alt={item.name}
      className="w-12 h-12 rounded-lg object-cover"
    />
    <div>
      <p className="font-semibold text-gray-800">{item.name}</p>
      <p className="text-sm text-gray-500">{item.category}</p>
    </div>
  </div>

  {/* Counter */}
  <div className="flex items-center gap-2">
    <button
      onClick={() => handleDecrement(item.id)}
      className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
    >
      -
    </button>
    <span className="w-6 text-center">{counts[item.id] || 0}</span>
    <button
      onClick={() => handleIncrement(item.id)}
      className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
    >
      +
    </button>
  </div>
</div>
        ))}
      </div>
    );
  };

  // Tab labels
  const tabs = [
    { id: "minor", label: "Minor Defects" },
    { id: "major", label: "Major Defects" },
    { id: "critical", label: "Critical Defects" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 mt-14 sm:mt-14 md:mt-12 lg:mt-2" >

        <div className="">
          <div>
            <h1 className="text-[20px] font-bold text-[#0F172A]">Defect Tracking</h1>
            <p className="text-slate-400 font-medium text-lg">Record quality issues found</p>
            <p className="text-blue-600 text-md font-extrabold">Unit - {unit} / Line - {line}</p>
          </div>
        </div>
        

        <div className="flex gap-4 p-4 bg-gray-100 mb-2 rounded-xl">
            <div>
                <label htmlFor="Bundle No" className="text-gray-500 font-semibold">No of Garment Inspected:</label>
                <input
                type="text"
                //   value={bundleNo}
                placeholder="Garment Inspected"
                className="w-full h-[60px] px-5 rounded-2xl border border-slate-200 bg-white"
                />
            </div>


            <div>
                <label htmlFor="Bundle No" className="text-gray-500 font-semibold">Mistake Found :</label>
                <input
                type="text"
                //   value={bundleNo}
                placeholder="Mistake Found"
                className="w-full h-[60px] px-5 rounded-2xl border border-slate-200 bg-white"
                />
            </div>

            <div>
                <label htmlFor="Bundle No" className="text-gray-500 font-semibold">Mistake %</label>
                <input
                type="text"
                //   value={bundleNo}
                placeholder="100 %"
                className="w-full h-[60px] px-5 rounded-2xl border border-slate-200 bg-white"
                />
            </div>

        </div>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row bg-gray-100 rounded-xl p-2 gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all duration-300 capitalize
              ${
                activeTab === tab.id
                  ? tab.id === "minor"
                    ? "bg-green-500 text-white shadow-md"
                    : tab.id === "major"
                    ? "bg-yellow-500 text-white shadow-md"
                    : "bg-red-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
          >
            {tab.label} ({qcdatas.filter(item => item.category.toLowerCase().includes(tab.id)).length})
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="mt-4 p-4 bg-white rounded-xl shadow-md transition-all duration-300">
        {renderContent()}
      </div>
    </div>
  );
}