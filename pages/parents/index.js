import { Fragment, useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from 'next/link'
import { showToast } from '../../components/helpers'

import BreadCrumb from "../../components/breadcrumb"
import Navbar from "../../components/navbar"
import Table from "../../components/table"
import { get_all_parents } from "../../api/guardian"
import SideBar from "../../components/sidebar"


const Parent = () => {

    const router = useRouter()
    const [allParents, setAllParents] = useState([])

    useEffect(() => {
        // if jwt isn't found
        const jwt = sessionStorage.getItem('auth')
        !jwt && router.replace('/')

        getAllParents()
    }, [])

    const getAllParents = async () => {
        try {
            const res = await get_all_parents()
            console.log(res.data)
            setAllParents(res.data)
        } catch (err) {
            showToast('error', err.message)
        }
    }

    const HEADINGS = ['Firstname', 'Lastname', 'Email', 'Phone']

    return (
        <Fragment>
            <Navbar />
            <SideBar menu='parents' />
            <div className="container">
                <div className="flex justify-between">
                    <BreadCrumb currentPage='Parents' prevPage='Dashboard' prevLink='/dashboard' />
                </div>
                <Table data={allParents} headings={HEADINGS} role='parent' />
            </div>
        </Fragment>
    )
}

export default Parent