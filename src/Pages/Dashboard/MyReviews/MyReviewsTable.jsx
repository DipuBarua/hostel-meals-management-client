import { FaRegEdit, FaSearch, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Modal from 'react-modal';
import React from "react";
import { MdOutlineCancelPresentation } from "react-icons/md";

const MyReviewsTable = ({ item, index, refetch }) => {
    const axiosSecure = useAxiosSecure();

    // react Modal 
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: "50%",
            height: "50%",
            background: '#d6d8fd',
        },
    };
    const [modalIsOpen, setIsOpen] = React.useState(false);
    let subtitle;


    // function openModal() {setIsOpen(true)}
    const openModal = () => {
        setIsOpen(true);
    }

    function afterOpenModal() {
        subtitle.style.color = '#3b34fd';
    }

    function closeModal() {
        setIsOpen(false);
    }


    const handleEdit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedReview = {
            editItem: form.review.value,
        }

        await axiosSecure.patch(`/review/${item._id}`, updatedReview)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "This review has been edited",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setIsOpen(false);
                    refetch();
                }
            })
            .catch(err => console.log(err))

    }



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


            {/* Edit by react modal  */}
            <td>
                <div>
                    <button className="btn btn-ghost" onClick={openModal}>
                        <FaRegEdit className=" text-xl hover:text-green-600" />
                    </button>

                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                        className=""
                    >
                        <div className=" flex justify-between text-xl font-semibold">
                            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Edit Review</h2>

                            <button className=" text-xl font-semibold" onClick={closeModal}>
                                <MdOutlineCancelPresentation />
                            </button>
                        </div>

                        <form onSubmit={handleEdit}>
                            <div className="form-control my-4">
                                <textarea
                                    type="text"
                                    name="review"
                                    defaultValue={item?.review}
                                    placeholder="Edit your review"
                                    className="input rounded-none"
                                    required />
                            </div>

                            <div className=" form-control my-4">
                                <button className="btn btn-ghost btn-outline rounded-none"> Edit </button>
                            </div>
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