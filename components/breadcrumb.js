import { Fragment } from "react"
import Link from 'next/link'

const BreadCrumb = props => {
    return (
        <Fragment>
            <div className="flex md:mb-10 mt-28">
                <Link href={props.prevLink}>
                <p className="underline text-blue-400 cursor-pointer">{props.prevPage}</p>
                </Link>
                <p className="mx-2 text-gray-500">/</p>
                <p className="text-gray-400">{props.currentPage}</p>
            </div>
        </Fragment>
    )
}

export default BreadCrumb