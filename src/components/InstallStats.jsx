import React, { useState, useEffect } from 'react';
import format from 'date-fns/format';

const InstallStats = ({ referrer, dateRange }) => {
  const [totalInstalls, setTotalInstalls] = useState(0);
  const [organicInstalls, setOrganicInstalls] = useState(0);
  const [inOrganicInstalls, setInOrganicInstalls] = useState(0);

  useEffect(() => {
    if (referrer) {
      let total = 0;
      let organic = 0;
      let inorganic = 0;

      for (const [source, value] of Object.entries(referrer)) {
        total += value;
        if (source === 'Google Play Store Organic') {
          organic += value;
        } else {
          inorganic += value;
        }
      }

      setTotalInstalls(total);
      setOrganicInstalls(organic);
      setInOrganicInstalls(inorganic);
    }
  }, [referrer]);

  return (
    <div className="w-11/12 mx-auto my-10 bg-[#F2F2F2] py-5 px-4 rounded-2xl">
      <div className="flex flex-col items-center justify-center gap-6 lg:flex-row md:w-7/12 mx-auto py-8">
        <div className="w-full px-2 py-6 bg-[#FFFFFF] border-[#EDEDED] flex flex-col items-center justify-center gap-5 rounded-xl lg:min-w-[300px]">
          <div className="bg-white flex flex-col items-center justify-center">
            <h1 className="text-xl md:text-2xl font-medium font-Segoe">Total Installs</h1>
            <p className="font-semibold text-[#A5A5A5] font-Segoe">{`(${format(dateRange.startDate, "dd MMMM''yy")}  - ${format(dateRange.endDate, "dd MMMM''yy")})`}</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-xl md:text-2xl font-Segoe">{totalInstalls}</h1>
            {/* <div className="flex items-center justify-center gap-1">
              <img src={downArrow} alt="" />
              <p>67%</p>
            </div> */}
          </div>
        </div>
        <div className="w-full px-2 py-6 bg-[#FFFFFF] border-[#EDEDED] flex flex-col items-center justify-center gap-5 rounded-xl lg:min-w-[300px]">
          <div className="bg-white flex flex-col items-center justify-center">
            <h1 className="text-xl md:text-2xl font-medium font-Segoe">Organic Installs</h1>
            <p className="font-semibold text-[#A5A5A5] font-Segoe">{`(${format(dateRange.startDate, "dd MMMM''yy")}  - ${format(dateRange.endDate, "dd MMMM''yy")})`}</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-xl md:text-2xl font-Segoe">{organicInstalls}</h1>
            {/* <div className="flex items-center justify-center gap-1">
              <img src={downArrow} alt="" />
              <p>67%</p>
            </div> */}
          </div>
        </div>
        <div className="w-full px-2 py-6 bg-[#FFFFFF] border-[#EDEDED] flex flex-col items-center justify-center gap-5 rounded-xl lg:min-w-[300px]">
          <div className="bg-white flex flex-col items-center justify-center">
            <h1 className="text-xl md:text-2xl font-medium font-Segoe">Non-organic Installs</h1>
            <p className="font-semibold text-[#A5A5A5] font-Segoe">{`(${format(dateRange.startDate, "dd MMMM''yy")}  - ${format(dateRange.endDate, "dd MMMM''yy")})`}</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-xl md:text-2xl font-Segoe">{inOrganicInstalls}</h1>
            {/* <div className="flex items-center justify-center gap-1">
              <img src={downArrow} alt="" />
              <p>67%</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallStats;
