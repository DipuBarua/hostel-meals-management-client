import { FaLeaf, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const UpcomingTable = ({ item, index, refetch }) => {
    const axiosSecure = useAxiosSecure();

    // Delete 
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
                axiosSecure.delete(`/upcoming-meals/${id}`)
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
        })
    };

    // Production 
    const handlePublish = () => {

        const productionInfo = {
            title: item.title,
            image: item.image,
            rating: parseFloat(item.rating),
            price: parseFloat(item.price),
            category: item.category,
            ingredients: item.ingredients,
            description: item.description,
            like: parseInt(item.like),
            review: parseInt(item.review),
            distributor_name: item.distributor_name,
            distributor_email: item.distributor_email,
            time: item.time,
        }

        Swal.fire({
            title: "Are you sure to publish?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Publish it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.post(`/meal`, productionInfo)//can't use {item} as an obj to avoide _id problem in db.
                    .then(res => {
                        if (res.data.insertedId) {
                            refetch();
                            Swal.fire({
                                title: "Published",
                                text: `${item.title} has been published`,
                                icon: "success"
                            });
                        }
                    })
                    .catch(err => console.log(err));
            }
        })
    }

    return (
        <tr >
            <th>
                <label>
                    {index + 1}
                </label>
            </th>

            {/* Image  */}
            <td>
                <div className="avatar py-2">
                    <div className="w-16 hover:w-2/3 ring-2 ring-black rounded-full">
                        <img src={item?.image} />
                    </div>
                </div>
            </td>

            {/* title  */}
            <td>
                <div className="">{item?.title}</div>
            </td>

            {/* Category  */}
            <td>
                <div className="">{item?.category}</div>
            </td>

            {/* likes count */}
            <td>
                <div className="">{item?.like}</div>
            </td>

            {/* DELETE */}
            <td>
                <button onClick={() => handleDelete(item._id)} className="btn btn-ghost">
                    <FaTrash className=" text-xl hover:text-red-600" />
                </button>
            </td>

            {/* Publish */}
            <td>
                <button onClick={() => handlePublish()} className="btn btn-ghost">
                    <FaLeaf className=" text-xl hover:text-green-600" />
                </button>
            </td>

        </tr>
    );
};

export default UpcomingTable;