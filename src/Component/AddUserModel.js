import React, {useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import swal from 'sweetalert';
import { collection, addDoc,getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';
import { AddEmploy } from '../Redux/Action/Action';

const AddUserModel = (props) => {
    const dispatch = useDispatch()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gander, setGander] = useState("");
    const [Skill, setSkill] = useState("");
    const [date, setDate] = useState("");
    const [submit, setSubmit] = useState(false)
    const counter = useSelector((state) => state.Reducer)
    const userCollectionRef = collection(db, 'UserData')


    const AddEmploye = async () => {
        setSubmit(true)
        if (name !== "" && email !== "" && gander !== "" && Skill !== "" && date !== "") {
            await addDoc(userCollectionRef, { Name: name, Email: email, Gender: gander, Skill: Skill, Date: date })
            swal("Success", "Employee Has been save successfully", "success");
            setName("")
            setEmail("")
            setGander("")
            setSkill("")
            setDate("")
            setSubmit(false)
            props.handleClose()
            dispatch(AddEmploy())
        }

    }
    return (
        <>
            <Button variant="primary" onClick={props.handleShow}>
                Add Employer
            </Button>

            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="Text" className='form-control' value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Enter Name' />
                    {submit && name === "" ? <small className='text-danger'>Plase Enter Your Name</small> : null}
                    <br />
                    <input type="Text" className='form-control' value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter Email Id' />
                    {submit && email === "" ? <small className='text-danger'>Plase Enter Your Email</small> : null}
                    <br />
                    <div className='d-flex'>
                        <label for="html">Gander</label>&nbsp;&nbsp;
                        <input type="radio" id="Mail" onChange={(e) => { setGander(e.target.value) }} name="fav_language" value="Mail" checked={gander === "Mail" ? true : false} />
                        <label for="html">Mail</label>&nbsp;&nbsp;
                        <input type="radio" id="Femail" onChange={(e) => { setGander(e.target.value) }} name="fav_language" value="Femail" checked={gander === "Femail" ? true : false} />
                        <label for="html">Femail</label>
                    </div>
                    {submit && gander === "" ? <small className='text-danger'>Plase Select Your gander</small> : null}
                    <br />
                    <input type="Text" className='form-control' value={Skill} onChange={(e) => { setSkill(e.target.value) }} placeholder='Enter Your Skill' />
                    {submit && Skill === "" ? <small className='text-danger'>Plase Enter Your Skill</small> : null}
                    <br />
                    <input type="date" className='form-control' value={date} onChange={(e) => { setDate(e.target.value) }} />
                    {submit && date === "" ? <small className='text-danger'>Plase Enter Your date</small> : null}
                    <br />
                    <button className='btn btn-outline-primary' onClick={() => { AddEmploye() }}>Submit</button>&nbsp;&nbsp;
                    <button className='btn btn-outline-secondary' onClick={props.handleClose}>Close</button>
                </Modal.Body>
            </Modal>

        </>
    )
}

export default AddUserModel
