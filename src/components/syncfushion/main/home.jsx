import {  Routes, Route, } from 'react-router-dom';
import React, { Suspense, lazy } from "react";

const HeroFashionGrid13 = lazy(() => import("../order/ord_order.tsx"));
const HrReportGrid = lazy(() => import("../order/ord1 ok.tsx"));
const TallyBalanceReport = lazy(() => import("../order/tally.tsx"));
const OrdPagination = lazy(() => import("../order/ord_pagination.tsx"));
const PrnReportGrid = lazy(() => import("../order/print.tsx"));
const CardGrid = lazy(() => import("../order/Card.jsx"));
const SyncApp = lazy(() => import("../order/SyncGrid.tsx"));
const Card1 = lazy(() => import("../card/Card.jsx"));
const Card2 = lazy(() => import("../card/Card2.jsx"));


import '../../../../node_modules/@syncfusion/ej2-base/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-calendars/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-popups/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-react-grids/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-grids/styles/material.css';


function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<CardGrid />} />
        <Route path="/order" element={<HeroFashionGrid13 />} />
        <Route path="/god" element={<h1>Good</h1>} />
        <Route path="/HrReportGrid" element={<HrReportGrid />} />
        <Route path="/OrdPagination" element={<OrdPagination />} />
        <Route path="/TallyBalanceReport" element={<TallyBalanceReport />} />
        <Route path="/PrnReportGrid" element={<PrnReportGrid />} />
        <Route path="/card1" element={<Card1 />} />
        <Route path="/card2" element={<Card2 />} />
        <Route path="/sync" element={<SyncApp />} />
      </Routes>
    </Suspense>
  );
}

export default Home;