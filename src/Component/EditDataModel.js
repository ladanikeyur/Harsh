import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { updateDoc, doc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';
import Edit from '../Assets/Edit.png'
import { AddEmploy } from '../Redux/Action/Action';
import { useDispatch } from 'react-redux';

const EditModel = (props) => {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gander, setGander] = useState("");
    const [Skill, setSkill] = useState("");
    const [date, setDate] = useState("");
    const [submit, setSubmit] = useState(false)
    const userCollectionRef = collection(db, 'UserData')
    const EditData = (id, UserData) => {
        const { Name, Email, Gender, Skill, Date } = UserData
        setShow(true)
        setName(Name)
        setEmail(Email)
        setGander(Gender)
        setSkill(Skill)
        setDate(Date)
    }
    
    const EditDataSuccess = () => {
        setSubmit(true)
        setShow(false)
        const { Name, Email, Gender, Skill, Date } = props.userData
        const userDoc = doc(db, 'UserData', props.Userid)
        const newFild = {
            Name: name,
            Email: email,
            Gender: gander,
            Skill: Skill,
            Date: date
        }
        if (Name !== name || Email !== email || Gender !== gander || Skill !== Skill || Date !== date) {
            if (name !== "" && email !== "" && gander !== "" && Skill !== "" && date !== "") {
                updateDoc(userDoc, newFild)
                dispatch(AddEmploy())
                setSubmit(false)
            }
        }

    }

    return (
        <>
            <button className='btn' onClick={() => { EditData(props.Userid, props.userData) }}><img src={Edit} height={15} width={15} /></button>

            <Modal show={show} onHide={() => { setShow(false) }}>
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
                    <button className='btn btn-outline-primary' onClick={() => { EditDataSuccess() }}>Edit</button>&nbsp;&nbsp;

                    <button className='btn btn-outline-secondary' onClick={() => { setShow(false) }}>Close</button>
                </Modal.Body>
            </Modal>

        </>
    )
}

export default EditModel