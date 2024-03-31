import { MdOutlineCancelPresentation } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const RequestsTable = ({ item, index, refetch }) => {
    const axiosSecure = useAxiosSecure();

    const handleCancel = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete request"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/request/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Request has been canceled",
                                icon: "success"
                            });
                        }
                    })
                    .catch(err => console.log(err))
            }
        });
    }

    return (
        <tr >
            <th>
                <label>
                    {index + 1}
                </label>
            </th>

            {/* title  */}
            <td>
                <div className="font-bold">{item?.title}</div>
            </td>

            {/* likes count */}
            <td>
                <div className="">{item?.like}</div>
            </td>

            {/* reviews count */}
            <td>
                <div className="">{item?.review}</div>
            </td>

            {/* status */}
            <td>
                <div className="">{item?.status}</div>
            </td>

            {/* cancel */}
            <td>
                {
                    item.status === "delivered" ? "" :
                        <button onClick={() => handleCancel(item._id)} className="btn btn-ghost"><MdOutlineCancelPresentation className=" text-xl text-red-600" />
                        </button>
                }
            </td>

        </tr>
    );
};

export default RequestsTable;