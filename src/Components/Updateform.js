import React, { useEffect, useState } from "react";
import {
    useParams
} from 'react-router-dom'
import axios from "axios";
import useStyles from "./Formstyles";

const getdata = async () => {
    const data = await axios.get(`https://627961304a5ef80e2c08f4a0.mockapi.io/articledata`)
        .then((response) => response)
        .then(res => res.data)
        .catch(err => err)
    return data
}

const Updateform = () => {
    const { id } = useParams()
    // console.log(id)
    const classes = useStyles()

    const [updateData, setUpdateData] = useState([])
    useEffect(() => {
        getdata().then(response => response).then((res) => setUpdateData(res.find((item) => item.id == id))).catch(err => err)
    }, [updateData])

    // Put request
    const handleUpdate = (event) => {
        event.preventDefault()
        const getFormData = new FormData(event.currentTarget)
        const obj = {}
        for (let [key, value] of getFormData.entries()) {
            obj[key] = value
        }
        const newDate = new Date()
        obj["date"] = `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`
        console.log(JSON.stringify(obj))

        axios.put(`https://627961304a5ef80e2c08f4a0.mockapi.io/articledata/${id}`, JSON.stringify(obj))
            .then(() => console.log("put request succeeded")).catch(err => console.log("put request failed, err: ", err))
    }

    const {title, author, content} = updateData
    
    return (
        <>
            <form onSubmit={(event) => handleUpdate(event)} className={`p-2 ${classes.form}`}>
                <h3 className={`text-center p-3 w-50 ${classes.heading} m-auto`}>Update Article</h3>
                <div className="m-3">
                    <label htmlFor="title" className="form-label fw-bold">Title:</label>
                    <input type="text" className={`form-control ${classes.border}`} id="title" name="title" defaultValue={title} placeholder="Title" />
                </div>
                <div className="mx-3 mt-2 mb-3">
                    <label htmlFor="author" className="form-label fw-bold">Author:</label>
                    <input type="text" className={`form-control ${classes.border}`} id="author" name="author" defaultValue={author} />
                </div>
                <div className="mt-2 mx-3">
                    <label htmlFor="content" className="form-label fw-bold">Comments:</label>
                    <textarea className={`form-control ${classes.border}`} cols={100} rows={8} name="content" placeholder="Leave a comment here" id="content" defaultValue={content} ></textarea>
                </div>
                <div className="mx-3">
                    <button type="submit" className={`btn p-1 w-100 ${classes.button}`}>Submit</button>
                </div>
            </form>
        </>
    )
}

export default Updateform


// {/* <div className="m-3">
//                     <label htmlFor="date" className="form-label">Date</label>
//                     <input type="date" className="form-control" id="date" defaultValue={updateData.date} />
//                 </div> */}