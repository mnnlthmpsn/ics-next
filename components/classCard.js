import Link from "next/link"
import Image from 'next/image'
import classImage from '../public/assets/img/class.jpg'

const ClassCard = props => {
    return (
        <Link href={`/classes/${props.id}`}>
            <div className="h-52 w-52 rounded border border-gray transition duration-500 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer">
                <Image className="rounded-t" src={classImage} loading='lazy'/>
                <div className="ml-2 mt-2">
                    <p className="text-gray-600 font-bold">{props.clss}</p>
                    <p className="text-gray-400 font-bold text-sm">{props.teacher}</p>
                </div>
            </div>
        </Link>
    )
}

export default ClassCard