/* eslint-disable @next/next/no-img-element */
"use client";
import {
  useAllAdminQuery,
  useDeleteAdminMutation,
} from "@/redux/features/user/userApi";
import Link from "next/link";
import { toast } from "sonner";

export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  image: string;
  bio: string;
  premiumMembership: boolean;
  followers: string[];
  following: string[];
  isBlocked: boolean;
  transactionId: string;
};

const AllUser = () => {
  const { data, isLoading, error } = useAllAdminQuery(undefined);
  const [deleteAdmin] = useDeleteAdminMutation();

  const handleDeleteAdmin = (userId: string) => {
    const toastId = toast.loading("Deleting Admin...");
    try {
      deleteAdmin(userId);
      toast.success("Admin Deleted", { id: toastId });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>No user found</div>;
  }

  if (!data || !data.data || data.data.length === 0) {
    return <div>No facilities found</div>;
  }

  return (
    <div className=" ml-4 md:ml-72 -z-10">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Image</th>
              <th>Name</th>
              <th>Update</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((item: TUser, index: number) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div></div>
                  </div>
                </td>
                <td>{item.name}</td>

                <td>
                  <Link
                    href={`/dashboard/get-all-admin/${item._id}`}
                    className={` py-1 px-4 text-white rounded-tl-md rounded-br-md bg-[#03AED2] text-lg font-medium`}
                  >
                    Update
                  </Link>
                </td>
                <th>
                  <button
                    onClick={() => handleDeleteAdmin(item._id)}
                    className="py-1 px-4 text-white rounded-tl-md rounded-br-md bg-[#03AED2] text-lg font-medium"
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;
