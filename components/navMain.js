import Link from 'next/link'

export const NavMain = props => {
    return (
        <Link href={props.path}>
            <div className="flex flex-col items-center text-gray-300 hover:text-blue-300 transition duration-500 ease-in-out cursor-pointer">
                {props.icon}
                <p className="font-bold text-xl">{props.title}</p>
            </div>
        </Link>
    )
}

