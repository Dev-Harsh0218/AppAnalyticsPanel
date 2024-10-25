import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashTop from "../components/DashTop";
import DashOptions from "../components/DashOptions";
import InstallStats from "../components/InstallStats";
import WrapperGrid from "../components/WrapperGrid";

const DashBoardPage = () => {
  const [packageList, setPackageList] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [getInstallResult, setInstallResult] = useState({});

  //hook for checking the auth token
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleDate = (dates) => {
    setDate({
      ...date,
      startDate: dates.startDate,
      endDate: dates.endDate,
    });
  };

  const handleResults = (results) => {
    setInstallResult(results);
  };
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://aatracker.appanalytics.in/statApp/v1/isLogin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          navigate("/login");
        }
      } catch (error) {
        console.error("There was an error fetching data:", error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://aatracker.appanalytics.in/statApp/v1/getPackage",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        setPackageList(jsonResponse.pack);
      } catch (error) {
        console.error("There was an error fetching data:", error.message);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className="max-w-[1950px] mx-auto">
      <DashTop />
      <DashOptions
        packages={packageList}
        setGlobalDate={handleDate}
        setResults={handleResults}
      />
      <InstallStats referrer={getInstallResult.referrer} dateRange={date} />
      <WrapperGrid
        dateData={getInstallResult.date_wise}
        geoData={getInstallResult.geo_wise}
        osData={getInstallResult.os_wise}
        versionData={getInstallResult.version_wise}
        referrerData={getInstallResult.referrer}
        dateRange={date}
      />
    </div>
  );
};

export default DashBoardPage;
