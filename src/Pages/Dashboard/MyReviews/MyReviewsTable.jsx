import { FaRegEdit, FaSearch, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import React from "react";

const MyReviewsTable = ({ item, index, refetch }) => {
    const axiosSecure = useAxiosSecure();

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    const [modalIsOpen, setIsOpen] = React.useState(false);

    // const handleEdit = () => {
    // const editItem = {
    //     review:''
    // }

    let subtitle;

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);

    }
    // }

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

            {/* Edit */}
            {/* <td>
                <button onClick={() => handleEdit(item._id)} className="btn btn-ghost">
                    <FaRegEdit className=" text-xl hover:text-green-600" />
                </button>
            </td> */}


            {/* edit by react modal  */}
            <td>
                <div>
                    <button className=" btn" onClick={openModal}>Edit</button>

                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >

                        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>

                        <button className=" btn" onClick={closeModal}>close</button>

                        <form>
                            <input />
                            <button className=" btn">Submit</button>
                        </form>

                    </Modal>
                </div>
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

export default MyReviewsTable;