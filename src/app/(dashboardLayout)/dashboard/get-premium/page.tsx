"use client"
import { useGetPremiumMutation } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { TiTick } from "react-icons/ti";

const GetPremium = () => {

    const user = useAppSelector((state: RootState) => state.auth.user);
  const [getPremium] = useGetPremiumMutation();


  const handleGetPremium = async () => {
    try {
      const res = await getPremium(user?.id).unwrap();
      console.log(res);
      window.location.href = res?.paymentInfo?.payment_url;
    } catch (error) {
      console.log(error);
    }
  };

    return (
        <div className="max-w-sm mx-auto bg-white rounded-lg border border-gray-200 shadow-md p-6 mt-10 md:mt-52">
  <div className="flex justify-between items-center">
    <h2 className="text-2xl font-semibold text-gray-800">Go Premium</h2>
    <div className="bg-yellow-400 text-white text-sm font-medium px-3 py-1 rounded-full">
      $20/mo
    </div>
  </div>
  <p className="text-gray-600 mt-2">
    Unlock exclusive recipes, ad-free browsing, and more perks with our premium membership.
  </p>
  
  <ul className="mt-4 space-y-2">
    <li className="flex items-center space-x-2">
      <TiTick className="text-2xl"></TiTick>
      <span>Access exclusive recipes</span>
    </li>
    <li className="flex items-center space-x-2">
    <TiTick className="text-2xl"></TiTick>
      <span>Ad-free browsing</span>
    </li>
    <li className="flex items-center space-x-2">
    <TiTick className="text-2xl"></TiTick>
      <span>Priority support</span>
    </li>
    
  </ul>

  <button onClick={handleGetPremium} className="w-full mt-6 bg-[#03AED2] text-white py-2 rounded-md text-lg font-medium hover:bg-[#028699] transition">
    Get Premium
  </button>
</div>

    );
};

export default GetPremium;