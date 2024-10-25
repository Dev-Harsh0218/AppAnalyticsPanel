import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dropIcon from '../assets/dropDown.png';
import DateRangePickrr from './DateRangePickrr';
import calendarIcon from "../assets/calendarNew.png";
import locationIcon from "../assets/locationIcon.png";
import CampaignIcon from "../assets/Campaign1.png";
import versionIcon from "../assets/versionIcon.png";
import solarCalendarIcon from "../assets/solar_calendar-outline.png";
import DropMenuRenderer from './DropMenuRenderer';
import {format,set} from 'date-fns';

//icon imports
import dQuotes from '../assets/packageLogos/Frame912.png'
import abc from '../assets/packageLogos/abc.png';
import chardes from '../assets/packageLogos/chardes.png';
import classMate from '../assets/packageLogos/classmate.png';
import clockMaster from '../assets/packageLogos/clockMaster.png';
import financeCal from '../assets/packageLogos/financeCal.png';
import fitFreak from '../assets/packageLogos/fitfreak.png';
import fontFusion from '../assets/packageLogos/fontfusion.png';
import habitUp from '../assets/packageLogos/habitUP.png';
import medit8 from '../assets/packageLogos/Frame555.png';
import memeMaker from '../assets/packageLogos/meme.png';
import pdfScanner from '../assets/packageLogos/pdfScanner.png';
import quizzarium from '../assets/packageLogos/quizzarium.png';
import speakerCleaner from '../assets/packageLogos/speakerCleaner.png';
import statusDownload from '../assets/packageLogos/statusDownload.png';
import stepTracker from '../assets/packageLogos/stepTracker.png';
import stickMe from '../assets/packageLogos/stickMe.png';
import treakEat from '../assets/packageLogos/trackeat.png';
import wallForAll from '../assets/packageLogos/wallForAll.png';
import watchWise from '../assets/packageLogos/watchwiser.png';
import soundScape from '../assets/packageLogos/soundscape.png';
import package_icon from "../assets/packageLogos/packageIcon30.png";

const package_logo_link = {
    "com.abc.myapplication": abc,
    "com.useitoday.stylishfont": fontFusion,
    "com.as.speakercleaner": speakerCleaner,
    "com.music.focusflow": soundScape,
    "com.useittoday.dailyquotes": dQuotes,
    "com.videodo.statusdownload": statusDownload,
    "com.mind.quizzarium": quizzarium,
    "com.habitapps.habitup": habitUp,
    "com.findmovies.watchwise": watchWise,
    "com.health.trakeat": treakEat,
    "com.pedometer.steptracker": stepTracker,
    "com.fin.emi.disccal": financeCal,
    "com.meditation.medit8": medit8,
    "com.partygames.charades": chardes,
    "com.stickyme.stickers": stickMe,
    "com.study.classmate": classMate,
    "com.healthtrack.fitfreak": fitFreak,
    "com.clock.sandtimer": clockMaster,
    "com.walli.hd.wallpaper": wallForAll,
    "com.creatememes.mememaker": memeMaker,
    "com.createpdf.pdfscanner": pdfScanner
}


const DashOptions = ({ packages, setGlobalDate, setResults }) => {
    const token = localStorage.getItem("token");

    const [date, setDate] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    });

    const defaultFields = {
        package: 'Package',
        startDate: new Date(),
        endDate: new Date(),
        country: 'Country',
        campaign: 'Campaign',
        version: 'Version',
        mediaSource: 'Media Source',
    };

    const [isOpen, setIsOpen] = useState({
        isPackageSelectOpen: false,
        isDateSelectOpen: false,
        isCountrySelectOpen: false,
        isCampaignSelectOpen: false,
        isVersionWiseSelectOpen: false,
        isMediaSourcesSelectOpen: false,
    });

    const [loading, setLoading] = useState(false);

    const handleDateChange = (dates) => {
        setDate({
            ...date,
            startDate: dates.startDate,
            endDate: dates.endDate,
        });
        setGlobalDate(dates);
    };

    const resetFields = () => {
        setFields({ ...defaultFields });
        setDate({
            startDate: defaultFields.startDate,
            endDate: defaultFields.endDate,
            key: defaultFields.key,
        });
    };
    const [fields, setFields] = useState(defaultFields);
    const [pack_icon,setPackIcon] = useState(package_icon);

    const getInstall = async () => {
        // Check if a valid package is selected
        if (fields.package === 'Package') {
            toast.error('Please select a valid Package name.');
            return;
        }

        setIsOpen({
            isPackageSelectOpen: false,
            isDateSelectOpen: false,
            isCountrySelectOpen: false,
            isCampaignSelectOpen: false,
            isVersionWiseSelectOpen: false,
            isMediaSourcesSelectOpen: false,
        });

        try {
            setLoading(true);
            const baseUrl = new URL("https://aatracker.appanalytics.in/statApp/v1/getInstall");
            baseUrl.searchParams.append("package_name", fields.package);
            baseUrl.searchParams.append("from_date", format(date.startDate, 'yyyy-MM-dd'));
            baseUrl.searchParams.append("to_date", format(date.endDate, 'yyyy-MM-dd'));

            const response = await fetch(baseUrl.toString(), {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                const jsonResponse = await response.json();
                setResults(jsonResponse);
            }
        } catch (error) {
            console.error('There was an error fetching data:', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full mx-auto py-2 mt-5 font-kanit tracking-wider">
            <ToastContainer />
            <div className="w-11/12 mx-auto py-5">
                <h1 className="text-4xl font-semibold">Overview</h1>
            </div>

            <div className="w-11/12 mx-auto flex flex-col gap-1 lg:mt-8 lg:flex-row text-[#252525]">
                {/* package selector */}
                <div className={`w-full lg:w-1/4 px-4 py-3 flex justify-between items-center flex-wrap gap-2 lg:mt-0 mt-5 bg-[#F2F2F2] lg:rounded-tl-2xl rounded-none hover:cursor-pointer ${(isOpen.isPackageSelectOpen) ? "shadow-custom" : "shadow-none"} font-semibold relative`}
                    onClick={() => setIsOpen((prev) => ({ ...prev, isPackageSelectOpen: !prev.isPackageSelectOpen }))}>
                    <div className="flex items-center justify-center gap-5">
                        <div className="w-10 h-10 flex items-center justify-center rounded-xl">
                            <img src={pack_icon} className="" alt="" />
                        </div>
                        <h6>{fields.package}</h6>
                    </div>
                    <img src={dropIcon} alt="" />
                    {isOpen.isPackageSelectOpen && (
                       <div className="bg-[#F2F2F2] border absolute top-16 left-0 w-full flex flex-col items-start gap-2 rounded-b-lg z-10 overflow-y-auto max-h-64 no-scrollbar shadow-test capitalize">
                       {packages.map((item) => {
                           const packageNameParts = item.package_name.split('.');
                           const displayName = packageNameParts[packageNameParts.length - 1];
                   
                           return (
                               <div key={item.package_name} className="w-full flex items-center justify-start pl-4 hover:bg-gray-400 border-[#E5E5E5]">
                                   <div className="w-12 h-10 flex items-center justify-center rounded-xl bg-black">
                                       {Object.keys(package_logo_link).map((key) => {
                                           if (item.package_name === key) {
                                               return (
                                                   <img src={package_logo_link[key]} key={key} className="" alt="" />
                                               )
                                           }
                                       })}
                                   </div>
                                   <h1 className="px-4 py-4 w-full text-black sm:text-base text-sm"
                                       onClick={() => {setFields((prev) => ({ ...prev, package: item.package_name }));
                                        setPackIcon(package_logo_link[item.package_name])
                                        }}>
                                       {displayName}
                                   </h1>
                               </div>
                           )
                       })}
                   </div>
                   
                    )}
                </div>

                {/* Date selector */}
                <div className={`w-full lg:w-1/4 px-4 py-3 flex justify-between items-center flex-wrap gap-2 lg:mt-0 mt-5 bg-[#F2F2F2] rounded-none hover:cursor-pointer ${(isOpen.isDateSelectOpen) ? "shadow-custom" : "shadow-none"} font-semibold relative`}>
                    <div className="w-full flex items-center justify-between text-sm"
                        onClick={() => setIsOpen((prev) => ({ ...prev, isDateSelectOpen: !prev.isDateSelectOpen }))}>
                        <div className="flex items-center justify-center gap-5">
                            <div className="w-10 h-10 flex items-center justify-center">
                                <img src={calendarIcon} className="w-5 h-5" alt="" />
                            </div>
                            <h6> {`${format(date.startDate.toDateString(), 'do MMMM yyyy')} - ${format(date.endDate.toDateString(),'do MMMM yyyy')}`}</h6>
                        </div>
                        <div className="d">
                            <img src={dropIcon} alt="" />
                        </div>
                    </div>
                    {isOpen.isDateSelectOpen && <DateRangePickrr onDateChange={handleDateChange} />}
                </div>

                {/* Country Selector */}
                <div className={`w-full lg:w-1/4 px-4 py-3 flex justify-between items-center flex-wrap gap-2 lg:mt-0 mt-5 bg-[#F2F2F2] rounded-none hover:cursor-pointer ${(isOpen.isCountrySelectOpen) ? "shadow-custom" : "shadow-none"} font-semibold relative`}
                    // onClick={() => setIsOpen((prev) => ({ ...prev, isCountrySelectOpen: !prev.isCountrySelectOpen }))}
                    >
                    <div className="flex items-center justify-center gap-5">
                        <div className="w-10 h-10 flex items-center justify-center">
                            <img src={locationIcon} className="w-5 h-5" alt="" />
                        </div>
                        <h6>Country</h6>
                    </div>
                    <img src={dropIcon} alt="" />
                    {isOpen.isCountrySelectOpen && (
                        <div className="bg-[#F2F2F2] border absolute top-16 left-0 w-full flex flex-col items-start gap-2 rounded-b-lg z-10 overflow-y-auto max-h-64 no-scrollbar shadow-test">
                            {AppList.map((item, index) => (
                                <h1 key={index} className="px-4 py-4 w-full text-black sm:text-base text-sm hover:bg-gray-400 border-[#E5E5E5]">
                                    {item}
                                </h1>
                            ))}
                        </div>
                    )}
                </div>

                {/* Campaign Selector */}
                <div className={`w-full lg:w-1/4 px-4 py-3 flex justify-between items-center flex-wrap gap-2 lg:mt-0 mt-5 bg-[#F2F2F2] lg:rounded-tr-2xl rounded-none hover:cursor-pointer ${(isOpen.isCampaignSelectOpen) ? "shadow-custom" : "shadow-none"} font-semibold relative`}>
                    {/* // onClick={() => setIsOpen((prev) => ({ ...prev, isCampaignSelectOpen: !prev.isCampaignSelectOpen }))} */}

                    <div className="flex items-center justify-center gap-5">
                        <div className="w-10 h-10 flex items-center justify-center">
                            <img src={CampaignIcon} className="w-5 h-5" alt="" />
                        </div>
                        <h6>Campaign</h6>
                    </div>
                    <img src={dropIcon} alt="" />
                    {isOpen.isCampaignSelectOpen && <DropMenuRenderer list={AppList} />}
                </div>
            </div>

            <div className="w-11/12 mx-auto flex flex-col gap-1 rounded-2xl mt-1 lg:flex-row font-kanit text-[#252525]">
                {/*version-wise*/}
                <div className={`w-full lg:w-1/4 px-4 py-3 flex justify-between items-center flex-wrap gap-2 lg:mt-0 mt-5 bg-[#F2F2F2] ${isOpen.isVersionWiseSelectOpen ? "rounded-none shadow-custom " : "lg:rounded-bl-2xl shadow-none"} hover:cursor-pointer font-semibold relative`}>
                    {/* // onClick={() => { setIsOpen((prev) => ({ ...prev, isVersionWiseSelectOpen: !prev.isVersionWiseSelectOpen })) }} */}
                    <div className="flex items-center justify-center gap-5">
                        <div className="w-10 h-10 flex items-center justify-center">
                            <img src={versionIcon} className="w-5 h-5" alt="" />
                        </div>
                        <h6>Version Wise</h6>
                    </div>
                    <img src={dropIcon} alt="" />
                    {isOpen.isVersionWiseSelectOpen && <DropMenuRenderer list={AppList} />}
                </div>
                <div className={`ele1 w-full lg:w-1/4 px-4 py-3 flex justify-between items-center flex-wrap gap-2 lg:mt-0 mt-5 bg-[#F2F2F2] rounded-none hover:cursor-pointer ${(isOpen.isMediaSourcesSelectOpen) ? "shadow-custom" : "shadow-none"} font-semibold relative`} >
                    {/* onClick={() => { setIsOpen((prev) => ({ ...prev, isMediaSourcesSelectOpen: !prev.isMediaSourcesSelectOpen })) }} */}
                    <div className="flex items-center justify-center gap-5">
                        <div className="w-10 h-10 flex items-center justify-center">
                            <img src={solarCalendarIcon} className="w-5 h-5" alt="" />
                        </div>
                        <h6>Media Sources</h6>
                    </div>
                    <img src={dropIcon} alt="" />
                    {isOpen.isMediaSourcesSelectOpen && <DropMenuRenderer list={AppList} />}
                </div>
                <button className="lg:w-1/4 lg:mt-0 lg:py-0 py-5 mt-4 border border-[#0E6BA8] font-medium text-[#0E6BA8] text-lg hover:shadow-custom font-kanit"
                    onClick={resetFields}>
                    Reset
                </button>
                <button className={`lg:w-1/4 lg:py-0 py-5 ${loading ? 'bg-gray-400' : 'bg-[#0E6BA8]'} text-white lg:rounded-br-2xl rounded-none font-kanit`}
                    onClick={!loading ? getInstall : null}
                    disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </div>
        </div>
    );
};

export default DashOptions;
