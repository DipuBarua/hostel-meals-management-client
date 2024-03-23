import { FaEye, FaPenSquare, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router-dom";

const AllMealsTable = ({ index, item, refetch }) => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/meal/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "This Meal has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    const handleView = (id) => {
        navigate(`/mealDetails/${id}`)
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
                <div className="font-bold">{item?.review}</div>
            </td>

            {/* distributor name */}
            <td>
                <div className="">{item?.distributor_name}</div>
            </td>

            {/* distributor email */}
            <td>
                <div className="font-bold">{item?.distributor_email}</div>
            </td>

            {/* update */}
            <td>
                <Link to={`/dashboard/updateMeal/${item._id}`} className="btn btn-ghost">
                    <FaPenSquare className=" text-xl text-green-600" />
                </Link>
            </td>

            {/* DELETE */}
            <td>
                <button onClick={() => handleDelete(item._id)} className="btn btn-ghost">
                    <FaTrash className=" text-xl text-red-600" />
                </button>
            </td>

            {/* Meal details view btn */}
            <td>
                <button onClick={() => handleView(item._id)} className="btn border border-amber-700 hover:bg-gray-400">
                    <FaEye className=" text-xl" />
                </button>
            </td>

        </tr>
    );
};

export default AllMealsTable;