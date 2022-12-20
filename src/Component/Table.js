import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AddEmploy, SearchEmployAction } from '../Redux/Action/Action'
import AddUserModel from './AddUserModel'
import Delete from '../Assets/Delete.jpg'
import Add from '../Assets/Add.png'
import swal from 'sweetalert';
import { db } from '../firebase-config'
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore'
import EditModel from './EditDataModel'

const Table = () => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [employData, setEmployData] = useState([]);
    const counter = useSelector((state) => state.Reducer)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [startData, setStartData] = useState(0)
    const [endData, setEndData] = useState(10)
    const [page, setPage] = useState([])
    const [button, setButton] = useState(1)
    const [Row, setRow] = useState(10)
    const count = Math.ceil(counter.employ.length / Row)
    const [search, setSearch] = useState([])
    const [index, setIndex] = useState(null)
    const onSearch = (e) => {
        setSearch(e.target.value)

        if (search.length > 1) {
            let filtered_users = counter.employ.filter(function (user) {
                user =
                    user.Name +
                    user.Email +
                    user.Gender;
                return user.indexOf(search) > -1;
            });
            dispatch(SearchEmployAction(filtered_users))
        }
        else {
            dispatch(AddEmploy())
        }
    }


    useEffect(() => {
        const totalPage = []
        for (let index = 1; index <= count; index++) {
            totalPage.push(index * Row)
        }
        if (count === totalPage.length) {
            setPage(totalPage)
        }
    }, [count, counter.employ, Row])

    useEffect(async () => {
        dispatch(AddEmploy())
    }, [])

    useEffect(() => {
        const CurrentData = []
        const SData = startData === 0 ? 0 : endData - Row
        for (let index = SData < 10 ? 0 : SData; index < endData; index++) {
            const element = counter.employ[index];
            CurrentData.push(element)
        }
        setEmployData(CurrentData)
        // PageChange(Row)
    }, [startData, endData, setEmployData, counter.employ, Row])

    const EmployeeDelete = async (i, id) => {
        const userDocs = doc(db, 'UserData', id)
        await deleteDoc(userDocs)
        const b = [...counter.employ]
        b.splice(i, 1);
        swal({
            title: "Delete Confirm",
            text: "Are you Sure you Want to delete ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    dispatch(AddEmploy(b))
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                }
            });
    }

    const PageChange = (val) => {
        setStartData(val-Row)
        setEndData(val)
    }

    const onNextPage = () => {
        setStartData(startData + Row);
        setEndData(endData + Row)
    }

    const onPrivious = () => {
        setStartData(startData - Row);
        setEndData(endData - Row)
    }

    return (
        <>
            <div className='Add_employ mt-5'>
                <input onChange={(e) => { onSearch(e) }} className="form-control Input" type="text" placeholder='Search...' />
                <AddUserModel show={show} handleShow={() => { handleShow() }} handleClose={() => { handleClose() }} />
            </div>
            <div className='table-responsive'>
                <table class="table table-bordered table-striped table-hover mt-5">
                    <thead>
                        <tr className='table_header'>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employData.map((val, i) => {
                                return (
                                    val !== undefined ? <><tr key={i}>
                                        <td>{val.Name}</td>
                                        <td>{val.Email}</td>
                                        <td>{val.Gender}</td>
                                        <td>
                                            <EditModel Userid={val.id} userData={val} />
                                            <button onClick={() => { EmployeeDelete(i, val.id) }} className='btn'><img src={Delete} height={15} width={15} /></button>
                                            <button className='btn' onClick={() => { setIndex(i) }}><img src={Add} height={20} width={20} /></button>
                                        </td>
                                    </tr>
                                        <div id="demo" class={i === index ? "collapse show" : "collapse"}>
                                            <p><b>Skill:</b>{val.Skill}</p>
                                            <span><b>Date:</b>{val.Date}</span>
                                        </div>
                                    </> : null
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <select value={Row} onChange={(e) => { setRow(parseInt(e.target.value)); setEndData(parseInt(e.target.value)) }} className="form-control" >
                <option value={counter.employ.length}>Select All</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
            </select>
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item" onClick={endData > Row ? () => { onPrivious() } : () => { }}><a class="page-link" href="#">Previous</a></li>
                    {
                        page.map((val, i) => {
                            return (
                                <li onClick={() => { setButton(button + 1) }} class={val === endData ? "page-item active" : "page-item"}><a class="page-link" href="#" onClick={(e) => { PageChange(val) }} key={i}>{i}</a></li>

                            )
                        })
                    }
                    <li class="page-item" onClick={counter.employ.length > endData ? () => { onNextPage() } : () => { }}><a class="page-link" href="#">Next</a></li>
                </ul>
            </nav>
        </>
    )
}


export default Table
