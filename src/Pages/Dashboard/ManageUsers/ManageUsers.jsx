import { useQuery } from "@tanstack/react-query";
import { FaChessKing } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })


    // make admin 
    const handleMakeAdmin = (userEmail) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You want to make him Admin!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin"
        }).then(async (result) => {
            if (result.isConfirmed) {

                const res = await axiosSecure.patch(`/user/${userEmail}`);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Admin",
                        text: "User has been made Admin",
                        icon: "success"
                    });
                }

            }
        });

    }

    return (
        <div>

            <div className="overflow-x-auto pl-8 pt-5">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL.</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>MAKE_ADMIN</th>
                            <th>MEMBERSHIP</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* single row  */}
                        {
                            users.map((user, index) => <tr key={user._id}>
                                <th>
                                    <label>
                                        {index + 1}
                                    </label>
                                </th>

                                <td>
                                    <div className="font-bold">{user.name}</div>
                                </td>

                                <td>
                                    <div className="font-bold">{user.email}</div>
                                </td>

                                <th>
                                    {(user.role === "admin") ?
                                        <p className=" text-green-600">ADMIN</p>
                                        :
                                        <button onClick={() => handleMakeAdmin(user.email)} className="btn border border-blue-700 hover:bg-slate-300">
                                            <FaChessKing className=" text-blue-700" />
                                        </button>
                                    }
                                </th>

                                <th>
                                    <div className="font-bold">{user.membership}</div>
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default ManageUsers;