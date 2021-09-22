import { Fragment, useEffect, useState } from "react"
import { add_comment, get_all_comments, get_my_details } from "../../api/base"
import BreadCrumb from "../../components/breadcrumb"
import { showToast } from "../../components/helpers"
import { Input } from "../../components/input"
import Navbar from '../../components/navbar'
import SideBar from "../../components/sidebar"

const Comment = () => {

    const [home, setHome] = useState('/dashboard')
    const [all_comments, setAllComments] = useState([])
    const [comment, setComment] = useState({
        title: '',
        comment: ''
    })

    const getAllComments = async () => {
        try {
            const user = JSON.parse(sessionStorage.getItem('user'))
            const res = await get_all_comments(user.id)
            res.status === 200 && setAllComments(res.data)
            
            if (user.user_role === 'parent') { 
                setHome('/pdashboard')  
                return 
            }

            if (user.user_role === 'student') { 
                setHome('/sdashboard')  
                return 
            }

        } catch (err) {
            showToast('error', err.message)
        }
    }

    const addComment = async e => {
        e.preventDefault()
        try {
            const user = JSON.parse(sessionStorage.getItem('user'))
            const payload = {
                author: user.id,
                comment: comment.comment,
                title: comment.title
            }

            const res = await add_comment(payload)
            let new_comment = res.data
            res.status === 200 && all_comments.push(new_comment)
        } catch (err) {
            showToast('error', err.message)
        }
    }

    useEffect(() => {
        getAllComments()
    }, [])

    return (
        <Fragment>
            <Navbar />
            <div className="container p-5 md:pl-20">
                <BreadCrumb currentPage='Comments' prevPage='Dashboard' prevLink={home} />
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="md:col-span-2 md:border-r md:mr-16 md:pr-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {
                                all_comments.length > 0
                                    ? all_comments.map(comt => (
                                        <div className="p-2 rounded border space-y-2" key={comt.id}>
                                            <p className="font-bold text-gray-500">{comt.title}</p>
                                            <p>{comt.comment}</p>
                                            <div className="flex justify-between">
                                                <p className="italic text-gray-500 font-bold">{comt.author.id}</p>
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
                                        </div>
                                    ))
                                    : <p>No Comments added yet</p>
                            }
                        </div>
                    </div>
                    <div className="order-first md:order-last my-5 md:my-0">
                        <form className="space-y-5" onSubmit={addComment}>
                            <Input
                                type='text'
                                label='Title'
                                required={true}
                                value={comment.title}
                                onChange={e => setComment({ ...comment, title: e.target.value })}
                                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokewinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                </svg>}
                            />

                            <div>
                                <label htmlFor="comment">Comment Content</label>
                                <textarea rows="5" required className="block w-full pl-10 py-4 rounded mt-1 text-sm border text-gray-700 focus:border-blue-400 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-gray form-input" value={comment.comment} onChange={e => setComment({ ...comment, comment: e.target.value })}></textarea>
                            </div>

                            <div className="flex justify-end">
                                <button type='submit' className="block w-auto px-4 py-3 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-400 border border-transparent rounded-lg active:bg-blue-500 hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue">
                                    Add Comment
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Comment