import { MdOutlineCancelPresentation } from "react-icons/md";

const RequestsTable = ({ item, index, refetch }) => {

    const handleCancel = () => {

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

            {/* status */}
            <td>
                <div className="font-bold">{item?.status}</div>
            </td>

            {/* cancel */}
            <td>
                <button onClick={() => handleCancel(item._id)} className="btn btn-ghost">
                    <MdOutlineCancelPresentation className=" text-xl text-red-600" />
                </button>
            </td>

        </tr>
    );
};

export default RequestsTable;