/* eslint-disable @next/next/no-img-element */
import Link from "next/link";


const Banner = () => {
  return (
    <div className=" md:flex md:flex-row-reverse md:justify-around  items-center gap-10 min-h-screen bg-[radial-gradient(ellipse_at_top,#0f7f7d_0%,_#104658_50%)]">
        
        <div className="">
             <img src="https://i.ibb.co.com/QpmTZbg/Delicious-Mississippi-Mud-Potatoes-Recipe-4.webp" className="  md:h-[70vh] h-[55vh] w-full md:w-[40vw] shadow-2xl outline outline-2"  alt="" />
             
        </div>
        <div className="">
            <h2 className="text-[#03AED2] text-5xl font-medium uppercase mb-6 ">Welcome to Dish Directory</h2>
            <p className="text-white text-xl font-semibold ">Dish Directory is a <span className="text-[#03AED2] ">online recipe sharing Platform</span> where pe0ple can find different kinds of recipe <br />
             and they can learn how to cook the recipe. user can also share their favorite recipe to others</p>
            <button className="mt-6  py-1 px-4 rounded-tl-md rounded-br-md bg-[#03AED2] text-xl font-medium text-white "><Link href={"/dashboard/get-premium"} >Get Premium</Link></button>
        </div>
       
    </div>
  );
};

export default Banner;