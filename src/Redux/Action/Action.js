import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

const userCollectionRef = collection(db, 'user')

export const AddEmploy = (data) => async dispatch => {
    const a = []
    const data = await getDocs(userCollectionRef);
    data.docs.map((doc) => (a.push({ ...doc.data(), id: doc.id })))
    dispatch({
        type: 'ADD_EMPLOY',
        payload: a
    })
}

export const editEmploy = (data) => dispatch => {
    dispatch({
        type: 'EDIT_EMPLOY',
        payload: data
    })
}

export const SearchEmployAction = (data) => dispatch => {
    dispatch({
        type: 'ADD_EMPLOY',
        payload: data
    })
}