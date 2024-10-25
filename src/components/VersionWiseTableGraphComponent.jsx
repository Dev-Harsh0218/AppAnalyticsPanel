import React, { useState } from 'react'
import sideArrow from "../assets/sideArrow.png";
import GenericTable from './GenericTable';
import GenericGraph from './GenericGraph';
import format from 'date-fns/format';
const VersionWiseTableGraphComponent = ({versionWiseData,dates}) => {
    const [showTable, setShowTable] = useState(false);
    const [tablefields,setTableFields]=useState({
      field1:"Version",
      field2:"Total Installs"
    })
    const containerRef = React.useRef(null);
    return<div className="w-full bg-[#F2F2F2] mx-auto rounded-2xl overflow-x-auto">
        <div className="w-full rounded-t-2xl flex flex-col justify-start px-4 py-4 whitespace-normal hover:cursor-pointer" 
        onClick={()=>{setShowTable(prev =>!prev)}}>
          <div className="px-4 py-5 flex flex-col gap-1">
              <div className="flex items-center justify-start gap-2">
                  <div className={`w-5 h-5 flex items-center justify-center ${(showTable)?"block":"hidden"}`}><img src={sideArrow} alt="" /></div>
                  <div className="text-4xl font-semibold">Version Wise Installs</div>
              </div>
              <div className="flex justify-between items-center">
                  <p className='font-semibold text-[#A5A5A5]'>{`(${format(dates.startDate, "dd MMMM''yy")}  - ${format(dates.endDate, "dd MMMM''yy")})`}</p>
              </div>
          </div>
        </div>
        {/* <GenericTable/> */}
        <div className={`flex items-center justify-center overflow-y-auto ${(showTable)?"max-h-[500px]":"h-fit"} no-scrollbar`} ref={containerRef}>
          {(showTable)?<GenericTable tableData={versionWiseData} tablehead={tablefields}/>:<GenericGraph graphData={versionWiseData}/>}
        </div>
  </div>
}

export default VersionWiseTableGraphComponent