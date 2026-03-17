import { Routes, Route } from "react-router-dom";
import Quality_admin from "../admin_control/Quality_admin";
import Qc from "../quality/Qc";
import LineDetail from "../quality/LineDetail"
import ProductionDetails from "../quality/ProductDetails"
import DefectTabs from "../quality/Defects"

function Quality_main() {
  return (
    <Routes>
      <Route path="/" element={<Quality_admin />} />
      <Route path="qc" element={<Qc />} />
      <Route path="line/:unit/:line" element={<LineDetail />} />
      <Route path="qc-entry/:unit/:line/first-piece" element={<ProductionDetails />} />
      <Route path="/defects/:unit/:line" element={<DefectTabs />} />
    </Routes>
  );
}

export default Quality_main;