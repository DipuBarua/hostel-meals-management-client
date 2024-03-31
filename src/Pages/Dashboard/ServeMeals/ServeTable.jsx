import { FaVoteYea } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ServeTable = ({ item, index, refetch }) => {
    const axiosSecure = useAxiosSecure();

    const handleServe = async (id) => {
        await axiosSecure.patch(`/request/${id}`)
            .then(res => {
                console.log(res.data);
                refetch();
                if (res.data.modifiedCount == 0) {
                    Swal.fire({
                        position: "center",
                        icon: "warning",
                        title: "Meal has already served",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <tr>
            <th>
                <label>
                    {index + 1}
                </label>
            </th>

            {/* title  */}
            <td>
                <div className="font-bold">{item?.title}</div>
            </td>

            {/* Requester_Email */}
            <td>
                <div className="">{item?.email}</div>
            </td>

            {/* Requester_Name */}
            <td>
                <div className="">{item?.name}</div>
            </td>

            {/* status */}
            <td>
                {
                    item?.status === "delivered" ?
                        <div className="font-bold bg-green-500 rounded-sm text-white text-center w-2/3">{item?.status}</div>
                        :
                        <div className="font-bold text-center bg-gray-400 rounded-sm w-2/3">{item?.status}</div>
                }
            </td>

            {/* serve */}
            <td>
                <button onClick={() => handleServe(item._id)} className="btn btn-ghost hover:bg-green-200 border-2 border-b-gray-500">
                    <FaVoteYea className=" text-xl hover:text-green-600" />
                </button>
            </td>

        </tr>
    );
};

export default ServeTable;