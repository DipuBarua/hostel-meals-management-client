import { FaDelicious, FaDemocrat, FaServer, FaVoteYea } from "react-icons/fa";

const ServeTable = ({ item, index, refetch }) => {

    const handleServe = () => {

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
                <div className="font-bold">{item?.status}</div>
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