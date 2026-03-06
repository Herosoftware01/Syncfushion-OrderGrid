import {  Routes, Route, } from 'react-router-dom';
import HeroFashionGrid13 from "../order/ord_order.tsx"

import '../../../../node_modules/@syncfusion/ej2-base/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-calendars/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
import '../../../../node_modules/@syncfusion/ej2-popups/styles/material.css';

import '../../../../node_modules/@syncfusion/ej2-react-grids/styles/material.css';
// @import '@syncfusion/ej2-grids/styles/material.css';

// import '../css/style.css'

function Home() {
  return (
    <Routes>
        <Route path="" element={<HeroFashionGrid13 />} />
        <Route path="god/" element={<h1>Good</h1> } />

    </Routes>
  );
}

export default Home;