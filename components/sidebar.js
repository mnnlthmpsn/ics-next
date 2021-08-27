import Link from "next/link"

const SideBar = props => {
    return <div className="bg-gray-50 fixed top-0 left-0 border-r w-1/12 h-screen md:flex flex-col pt-24 items-center justify-evenly hidden">
        {/* Students */}
        <Link href='/students'>
            <button className={`flex flex-col items-center ${props.menu === 'students' ? 'text-blue-400' : 'text-gray-400'}`}>
                <svg className="h-8 w-8"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <p className="font-bold text-sm">Students</p>
            </button>
        </Link>

        {/* parents */}
        <Link href='/parents'>
        <button className={`flex flex-col items-center ${props.menu === 'parents' ? 'text-blue-400' : 'text-gray-400'}`}>
            <svg className="h-8 w-8"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="font-bold text-sm">Parents</p>
        </button>
        </Link>

        {/* Assignment */}
        <button className={`flex flex-col items-center ${props.menu === 'assignments' ? 'text-blue-400' : 'text-gray-400'}`}>
            <svg className="h-8 w-8"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            <p className="font-bold text-sm">Assignments</p>
        </button>
    </div>
}

export default SideBar