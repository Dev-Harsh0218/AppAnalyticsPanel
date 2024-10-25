import React from 'react'

const DropMenuRenderer = ({list}) => {
    return (
        <div className="bg-[#F2F2F2] border absolute top-16 left-0 w-full flex flex-col items-start gap-2 rounded-b-lg z-10 overflow-y-auto max-h-64 no-scrollbar shadow-test">
            {list.packages.map((item, index) => ( 
                <h1 key={index} className="px-4 py-4 w-full text-black sm:text-base text-sm hover:bg-gray-400 border-[#E5E5E5]">
                    {item.package_name}
                </h1>
            ))}
        </div>
    )
}

export default DropMenuRenderer