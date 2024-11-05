
const Maps = () => {
    return (
        <div className=" ">
        <h2 className="text-center mb-3 text-lg">Office Location</h2>
        <div className="w-full">
            <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29199.778834604098!2d90.43375586589947!3d23.819582092169853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c62fce7d991f%3A0xacfaf1ac8e944c05!2sBasundhara%20Residential%20Area%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1726836007468!5m2!1sen!2sbd"
                width="100%"
                height="450" 
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
            ></iframe>
        </div>
    </div>
    );
};

export default Maps;