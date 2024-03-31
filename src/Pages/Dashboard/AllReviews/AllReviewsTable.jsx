import { FaSearch, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllReviewsTable = ({ item, index, refetch }) => {
    const axiosSecure = useAxiosSecure();

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.delete(`/review/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Review has been deleted.",
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
                <div className="font-bold">{item.meal_review?.title}</div>
            </td>

            {/* likes count */}
            <td>
                <div className="">{item?.email}</div>
            </td>

            {/* reviews count */}
            <td>
                <div className="font-bold">{item?.review}</div>
            </td>

            {/* Delete */}
            <td>
                <button onClick={() => handleDelete(item._id)} className="btn btn-ghost">
                    <FaTrashAlt className=" text-xl hover:text-red-600" />
                </button>
            </td>

            {/* View Details */}
            <td>
                <Link to={`/mealDetails/${item.meal_id}`} className="btn btn-ghost">
                    <FaSearch className=" text-xl hover:text-blue-600" />
                </Link>
            </td>

        </tr>
    );
};

export default AllReviewsTable;