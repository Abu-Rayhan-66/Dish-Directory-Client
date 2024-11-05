"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import ContactDetails from "../components/ContactDetails/ContactDetails";
import Maps from "../components/Mpas/Maps";
import Footer from "../components/Footer/Footer";



type TMessage = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TMessage>();

  const onSubmit: SubmitHandler<TMessage> = async (data) => {
    const toastId = toast.loading("Message sending...");
    try {
      if (data.name) {
        toast.success("Message send", { id: toastId });
      }
    } catch (err) {
        console.log(err)
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div className=" max-w-6xl mx-auto mt-32 ">
      <ContactDetails></ContactDetails>
      <div className="md:flex md:gap-4 md:items-center mx-4 bg-[#f4f2ee]">
        <div className="flex-1 p-4 bg-[#1c9991]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="mb-2 text-lg  ">Name</h2>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="    Name"
              className="py-1 w-full  rounded-md border-[2px] focus:border-[#1b918b] focus:outline-none  border-[#03AED2]"
            />
            <div className="">
              {errors.name && <span>Name is required</span>}
            </div>
            <h2 className="mb-1 text-lg  ">Email</h2>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="    Email"
              className="py-1 w-full rounded-md border-[2px] focus:border-[#1b918b] focus:outline-none  border-[#03AED2]"
            />
            <div className="">
              {errors.email && <span>Email is required</span>}
            </div>
            <h2 className="mb-1 text-lg  ">Subject</h2>
            <input
              {...register("subject", { required: true })}
              type="text"
              placeholder="    Subject"
              className="py-1 w-full  rounded-md border-[2px] focus:border-[#1b918b] focus:outline-none  border-[#03AED2]"
            />
            <div className="">
              {errors.subject && <span>Subject is required</span>}
            </div>
            <h2 className="mb-1 text-lg  ">Message</h2>
            <textarea
              {...register("message", { required: true })}
              rows={4}
              cols={50}
              placeholder="    Message"
              className="resize-none py-1 w-full  rounded-md border-[2px] focus:border-[#1b918b] focus:outline-none  border-[#03AED2]"
            />
            <div className="">
              {errors.message && <span>Message is required</span>}
            </div>
            <button
              type="submit"
              className="py-1 px-4 mt-16  text-white rounded-tl-md rounded-br-md bg-[#03AED2] text-lg font-medium"
            >
              Send
            </button>
          </form>
        </div>
        <div className="flex-1">
          <Maps></Maps>
        </div>
      </div>
      <div className="mt-10">
      <Footer></Footer>
      </div>
    </div>
  );
};

export default ContactUs;