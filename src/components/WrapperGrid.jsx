import React from 'react';
import { useState } from 'react';
import GeoWiseTableMapComponent from './GeoWiseTableMapComponent';
import DateWiseTableGraphComponent from './DateWiseTableGraphComponent';
import OsWiseTableGraphComponent from './OsWiseTableGraphComponent';
import VersionWiseTableGraphComponent from './VersionWiseTableGraphComponent';
import ReferrerTableGraphComponent from './ReferrerTableGraphComponent';

const WrapperGrid = ({ dateData, dateRange, geoData, osData, versionData,referrerData }) => {
  const [layoutChange, setLayoutChange] = useState(true);
  
  const handleShowTable=(showTable)=>{
    setLayoutChange(showTable);
  }

  return (
    <div className="w-11/12 mx-auto my-10">
      <div className="w-full grid lg:grid-cols-2 gap-10">
        <div className={`${(layoutChange)?"lg:col-span-2":"lg:col-span-1"} `}>
          <DateWiseTableGraphComponent dateWiseData={dateData} dates={dateRange} setLayoutChange={handleShowTable}/>
        </div>
        <div className="">
          <GeoWiseTableMapComponent  geoWiseData={geoData} dates={dateRange} />
        </div>
        <div className="">
          <OsWiseTableGraphComponent osWiseData={osData} dates={dateRange} />
        </div>
        <div className="">
          <VersionWiseTableGraphComponent versionWiseData={versionData} dates={dateRange} />
        </div>
        <div className="">
          <ReferrerTableGraphComponent referrerWiseData={referrerData} dates={dateRange}/>
        </div>
      </div>
    </div>
  );
};

export default WrapperGrid;
