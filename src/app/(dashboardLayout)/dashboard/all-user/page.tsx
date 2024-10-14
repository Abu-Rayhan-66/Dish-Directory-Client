"use client"
import { useAllUserQuery, useBlockUserMutation, useDeleteUserMutation, useUnblockUserMutation } from '@/redux/features/user/userApi';
import { toast } from 'sonner';


export type TUser = {
    _id:string;
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

    const { data, isLoading, error } = useAllUserQuery(undefined);
    const [block] = useBlockUserMutation()
    const [unblock] = useUnblockUserMutation()
    const [deleteUser] = useDeleteUserMutation()



    const handleBlock = (userId:string) =>{
       const toastId = toast.loading("Blocking user...")
        try{
            block(userId)
            toast.success("user Blocked", {id:toastId})
        }catch(error){
            console.log(error)
           toast.error("Something went wrong", {id:toastId})
        } 
    }


    const handleUnblock = (userId:string) =>{
        const toastId = toast.loading("Unblocking user...")
        try{

            unblock(userId)
            toast.success("User Unblocked", {id:toastId})
        }catch(error){
            console.log(error)
           toast.error("Something went wrong", {id:toastId})
        }
    }


    const handleDeleteUser = (userId:string) =>{
        const toastId = toast.loading("Deleting user...")
        try{
            deleteUser(userId)
            toast.success("User Deleted", {id:toastId})
        }catch(error){
            console.log(error)
           toast.error("Something went wrong", {id:toastId})
        }
    }

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
        <div className=' ml-4 md:ml-72 -z-10'>
            <div className="overflow-x-auto">
  <table className="table">
    <thead>
      <tr>
        <th>
         Serial
        </th>
        <th>Image</th>
        <th>Name</th>
        <th>Is Blocked</th>
        <th>Block</th>
        <th>Unblock</th>
        <th>delete</th>
      </tr>
    </thead>
    <tbody>
    {
            data?.data.map((item:TUser, index:number) =>(
                <tr key={item._id}>
                <th>
                  {index+1}
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                    </div>
                  </div>
                </td>
                <td>
                 {item.name}
                </td>
                <td>
                 {item.isBlocked === true ?<p className='text-red-500'>BLOCKED</p> : <p className='text-green-500'>NOT BLOCKED</p>}
                </td>
                <td>
                <button onClick={()=>handleBlock(item._id)} disabled={item.isBlocked === true} className={`${item.isBlocked === true ? "opacity-60":""} py-1 px-4 text-white rounded-tl-md rounded-br-md bg-[#03AED2] text-lg font-medium`}>Block</button>
                </td>
                <td>
                <button onClick={()=>handleUnblock(item._id)} disabled={item.isBlocked === false} className={`${item.isBlocked === false ? "opacity-60":""} py-1 px-4 text-white rounded-tl-md rounded-br-md bg-[#03AED2] text-lg font-medium`}>Unblock</button>
                </td>
                <th>
                  <button onClick={()=>handleDeleteUser(item._id)} className="py-1 px-4 text-white rounded-tl-md rounded-br-md bg-[#03AED2] text-lg font-medium">Delete</button>
                </th>
              </tr>
            ))
           }
     

    </tbody>
  </table>
</div>
           
        </div>
    );
};

export default AllUser;