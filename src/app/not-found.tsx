import Link from 'next/link';
import React from 'react';

const NotFoundPage = () => {
    return (
        <div>
            <div className=" h-[100vh] w-[100vw] mx-auto flex flex-col justify-center items-center bg-gradient-to-tr from-[#083f53] to-[#1c9991]">
            <h2 className="text-2xl font-medium text-white">404</h2>
                <h2 className="text-2xl font-medium text-white">Page not Found</h2>
                <button className="py-1 px-4 text-white  rounded-tl-md rounded-br-md bg-[#03AED2] text-lg font-medium "><Link href="/">Home</Link></button>
            </div>
        </div>
    );
};

export default NotFoundPage;