import React, { useEffect, useState, useRef } from 'react';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Sort,
  Inject,
  Resize,
  Filter,
  Group,
  Reorder,
  Search,
  VirtualScroll,
} from '@syncfusion/ej2-react-grids';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1JGaF5cXGpCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdlWX1cdHRUQ2ddUkV3XUpWYEs=');

interface PrnData {
  jobno_joint: string | null;
  prnclr: string | null;
  prnfile1: string | null;
  prnfile2: string | null;
  jobno_print_emb: string | null;
  img_fpath: string | null;
  hex: string | null;
  print_img_pen: string | null;
  image_tb: string | null;
  con_fimg_grclr: string | null;
  con_jobno_print: string | null;
  jobno_print_new_rgb: string | null;
  con_jobno_prndes: string | null;
  con_jobno_top_clr_line: string | null;
  con_jobno_top_clr_siz_line: string | null;
  con_inout_outsup: string | null;
  print_screen_1: string | null;
  print_screen_2: string | null;
  print_screen_3: string | null;
  top_bottom: string | null;
  clrcomb: string | null;
  screen_number: string | null;
  print_type: string | null;
  print_description: string | null;
  individual_part_print_emb: string | null;
  print_colours: string | null;
  print_emb_ground_colour: string | null;
  inside_outside_print_emb: string | null;
  print_emb_outside_supplier: string | null;
  print_colour_1: string | null;
  print_colour_2: string | null;
  print_colour_3: string | null;
  print_colour_4: string | null;
  print_colour_5: string | null;
  print_colour_6: string | null;
  print_colour_7: string | null;
  print_colour_8: string | null;
  print_size_details: string | null;
  print_emb_ground_colour_rgb: string | null;
  img_print: string | null;
  img_print_mmt: string | null;
  con_jobno_top_clr_siz: string | null;
  con_jobno_top_clr: string | null;
  rgb: string | null;
  print_colour_rgb_1: string | null;
  print_colour_rgb_2: string | null;
  print_colour_rgb_3: string | null;
  print_colour_rgb_4: string | null;
  print_colour_rgb_5: string | null;
  print_colour_rgb_6: string | null;
  print_colour_rgb_7: string | null;
  print_colour_rgb_8: string | null;
}

const PrnReportGrid: React.FC = () => {
  const [dataSource, setDataSource] = useState<PrnData[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [showingCount, setShowingCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [searchKey, setSearchKey] = useState<string>('');

  const gridRef = useRef<GridComponent>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://app.herofashion.com/PrintRgb/');
        const textData = await response.text();
        const fixedJson = textData.replace(/:\s*NaN\b/g, ': null');
        const data: PrnData[] = JSON.parse(fixedJson);

        setDataSource(data);
        setTotalCount(data.length);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const highlightText = (text: any) => {
    if (!searchKey || text === undefined || text === null || text === "") return text;
    const stringText = String(text).trim();
    const escapedKey = searchKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = stringText.split(new RegExp(`(${escapedKey})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) =>
          part.toLowerCase() === searchKey.toLowerCase() ?
            <span key={i} className="custom-highlight">{part}</span> : part
        )}
      </span>
    );
  };

  const updateCounts = () => {
    if (gridRef.current) {
      const records = gridRef.current.getCurrentViewRecords();
      setShowingCount(records ? records.length : 0);
    }
  };

  // --- Dynamic Image Template ---
  // This helper function allows the same template to work for different image fields
  const createImageTemplate = (field: keyof PrnData) => (props: PrnData) => {
    const url = props[field];
    return (
      <div style={{ textAlign: 'center', padding: '5px' }}>
        {url ? (
          <img 
            src={String(url)} 
            alt="Print" 
            style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '4px', border: '1px solid #ddd', backgroundColor: '#fff' }} 
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
        ) : <div style={{fontSize: '10px', color: '#ccc'}}>No Image</div>}
      </div>
    );
  };

  const jobSummaryTemplate = (p: PrnData) => (
    <div style={{ fontSize: '11px', lineHeight: '1.4' }}>
      <b style={{color: '#d32f2f'}}>Joint:</b> {highlightText(p.jobno_joint)}<br />
      <b>PRN/EMB:</b> {highlightText(p.jobno_print_emb)}<br />
      <b>Type:</b> {highlightText(p.print_type)}<br />
      <b>Pos:</b> {highlightText(p.top_bottom)}
    </div>
  );

  const colorListTemplate = (p: PrnData) => {
    const colors = [p.print_colour_1, p.print_colour_2, p.print_colour_3, p.print_colour_4, p.print_colour_5, p.print_colour_6, p.print_colour_7, p.print_colour_8].filter(c => c && c.trim() !== "");
    return (
      <div style={{ fontSize: '10px', display: 'flex', flexDirection: 'column' }}>
        {colors.map((clr, idx) => (
          <div key={idx}>{idx + 1}. {highlightText(clr)}</div>
        ))}
      </div>
    );
  };

  const conDetailsTemplate = (p: PrnData) => (
    <div style={{ fontSize: '10px', whiteSpace: 'pre-line', color: '#555', lineHeight: '1.3' }}>
      {highlightText(p.con_jobno_print)}
      {p.con_jobno_top_clr_siz && `\n${highlightText(p.con_jobno_top_clr_siz)}`}
    </div>
  );

  return (
    /* MAIN WRAPPER: Use Flex to show Sidebar and Grid side-by-side */
    <div style={{ display: 'flex', height: '100vh', width: '100%', overflow: 'hidden' }}>
      
      {/* 1. SIDEBAR: Increased width to 300px as requested */}
    

      {/* 2. MAIN CONTENT AREA */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        minWidth: 0, // Critical: Allows the grid to shrink/fit correctly
        backgroundColor: '#fff' 
      }}>
        
        {/* Header Bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '10px 20px', backgroundColor: '#fff', borderBottom: '1px solid #dee2e6'
        }}>
          <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#d32f2f' }}>
            {showingCount} / {totalCount}
          </div>
          <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#333' }}>
            PRINT & EMBROIDERY (PRN) PRODUCTION REPORT
          </div>
          <div style={{ width: '250px' }}>
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => gridRef.current?.search(e.target.value)}
              style={{ width: '100%', padding: '6px 15px', borderRadius: '20px', border: '1px solid #ccc', outline: 'none' }}
            />
          </div>
        </div>

        {/* Grid Container */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <style>{`
            .custom-highlight { background-color: #fff9c4 !important; color: #d32f2f !important; font-weight: bold; }
            .e-rowcell { vertical-align: top !important; font-size: 11px !important; padding: 10px !important; }
            .e-headercell { background-color: #f8f9fa !important; font-weight: bold !important; }
            .e-grid { border: none !important; }
          `}</style>

          {loading ? (
            <div style={{ padding: '50px', textAlign: 'center' }}>Loading PRN Data...</div>
          ) : (
            <GridComponent
              ref={gridRef}
              dataSource={dataSource}
              dataBound={updateCounts}
              height="100%"
              enableVirtualization={true}
              rowHeight={130}
              allowSorting={true}
              allowFiltering={true}
              allowResizing={true}
              filterSettings={{ type: 'Excel' }}
              gridLines="Both"
            >
              <ColumnsDirective>
                {/* Image columns using specific templates for each field */}
                <ColumnDirective field="jobno_joint" headerText="JOB INFO" width="150" template={jobSummaryTemplate} />
                <ColumnDirective field="prnfile1" headerText="PRN 1" width="100" textAlign="Center" template={createImageTemplate('prnfile1')} />
                <ColumnDirective field="prnfile2" headerText="PRN 2" width="100" textAlign="Center" template={createImageTemplate('prnfile2')} />
                <ColumnDirective field="img_fpath" headerText="AOP" width="100" textAlign="Center" template={createImageTemplate('img_fpath')} />
                
                {/* <ColumnDirective field="jobno_joint" headerText="JOB INFO" width="150" template={jobSummaryTemplate} /> */}
                <ColumnDirective field="print_description" headerText="DESCRIPTION" width="140" />
                <ColumnDirective field="print_colours" headerText="CLR" width="70" textAlign="Center" />
                <ColumnDirective headerText="COLOUR LIST (1-8)" width="180" template={colorListTemplate} />
                <ColumnDirective field="screen_number" headerText="SCR #" width="80" textAlign="Center" />
                <ColumnDirective field="print_screen_1" headerText="S1" width="80" />
                <ColumnDirective field="print_screen_2" headerText="S2" width="80" />
                <ColumnDirective headerText="CONSOLIDATED" width="170" template={conDetailsTemplate} />
                <ColumnDirective field="prnclr" headerText="PRN CLR" width="110" />
                <ColumnDirective field="print_emb_ground_colour" headerText="GRND CLR" width="110" />
                <ColumnDirective field="individual_part_print_emb" headerText="INDV PART" width="110" />
                <ColumnDirective field="print_emb_outside_supplier" headerText="SUPPLIER" width="120" />
                <ColumnDirective field="inside_outside_print_emb" headerText="IN/OUT" width="90" />
                <ColumnDirective field="print_size_details" headerText="SIZE DTLS" width="120" />
              </ColumnsDirective>
              <Inject services={[Sort, Filter, Group, Reorder, Search, VirtualScroll, Resize]} />
            </GridComponent>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrnReportGrid;