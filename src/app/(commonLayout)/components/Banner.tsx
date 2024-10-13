import Link from "next/link";


const Banner = () => {
  return (
    <div className=" md:flex md:flex-row-reverse md:justify-around  items-center gap-10 min-h-screen bg-[radial-gradient(ellipse_at_top,#0f7f7d_0%,_#104658_50%)]">
        
        <div className="">
             <img src="https://i.ibb.co.com/0hmz8wp/4-reasons-adults-team-sports-header-image.jpg" className="  md:h-[70vh] h-[55vh] w-full md:w-[40vw] shadow-2xl outline outline-2"  alt="" />
             
        </div>
        <div className="">
            <h2 className="text-[#03AED2] text-5xl font-medium uppercase mb-6 ">Welcome to SportUp</h2>
            <p className="text-white text-xl font-semibold ">SportUp is a <span className="text-[#03AED2] ">sport facility booking Platform</span> where people can rent <br />
             different kind of playing ground for a better and healthy life.</p>
            <button className="mt-6  py-1 px-4 rounded-tl-md rounded-br-md bg-[#03AED2] text-xl font-medium text-white "><Link href={"/facility"} >Get Started</Link></button>
        </div>
       
    </div>
  );
};

export default Banner;