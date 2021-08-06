import { Fragment } from "react"

const Table = props => {
    return (
        <Fragment>
            <div className="w-full overflow-hidden border border-gray-300 rounded-lg mb-5">
                <div className="w-full overflow-x-auto">
                    <table className="w-full whitespace-no-wrap">
                        <thead>
                            <tr
                                className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                            >
                                {
                                    props.headings.map((heading, i) => (
                                        <th className="px-4 py-3" key={i}>{heading}</th>
                                    ))
                                }
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody
                            className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
                        >
                            {
                                props.data.length > 0
                                    ? props.data.map((data, index) => (
                                        <tr className="text-gray-700 dark:text-gray-400" key={index}>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center text-sm">
                                                    {/* <!-- Avatar with inset shadow --> */}
                                                    <div>
                                                        {props.role === 'parent' && <p className="font-semibold">{data.firstname}</p>}
                                                        {props.role === 'student' && <p className="font-semibold">{data.firstname}</p>}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {props.role === 'parent' && <p className="font-semibold">{data.lastname}</p>}
                                                {props.role === 'student' && <p className="font-semibold">{data.lastname}</p>}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {props.role === 'parent' && <p>{data.email}</p>}
                                                {props.role === 'student' && <p>{data.clss.title}</p>}
                                            </td>
                                            <td className="px-4 py-3 text-sm">
                                                {props.role === 'parent' && <p>{data.phone}</p>}
                                                {props.role === 'student' && <p>{data.gender}</p>}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center space-x-4 text-sm">
                                                    <button
                                                        className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                                        aria-label="Edit"
                                                    >
                                                        <svg
                                                            className="w-5 h-5 text-blue-400"
                                                            aria-hidden="true"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                                                            ></path>
                                                        </svg>
                                                    </button>
                                                    <button
                                                        className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                                        aria-label="Delete"
                                                    >
                                                        <svg
                                                            className="w-5 h-5 text-red-400"
                                                            aria-hidden="true"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                                clipRule="evenodd"
                                                            ></path>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                    : <tr>
                                        <td>
                                        <p className="p-4 text-gray-400 text-md font-semibold">No Data found</p>
                                        </td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    )
}

export default Table