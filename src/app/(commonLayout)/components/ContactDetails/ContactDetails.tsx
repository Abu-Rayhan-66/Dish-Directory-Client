/* eslint-disable @next/next/no-img-element */

const ContactDetails = () => {
    return (
      <div className="max-w-7xl mx-auto h-[50vh] mb-16 bg-[#f4f2ee] block">
        <div className="flex flex-col md:flex-row md:gap-4 md:items-center mx-4 h-full">
          <div className="h-full md:flex-1 mb-4 md:mb-0">
            <img
              className="w-full h-full object-cover"
              src="https://i.ibb.co/vQVHLmk/Screenshot-1.png"
              alt="Contact Us"
            />
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-3 uppercase">Phone: 01977733355</h2>
            <h2 className="text-2xl font-semibold mb-3">Email: dish-directory@gmail.com</h2>
            <h2 className="text-2xl font-semibold mb-3">
              Address: Level-3, Jamuna Future Park, Baridhara, Dhaka
            </h2>
          </div>
        </div>
      </div>
    );
  };
  
  export default ContactDetails;