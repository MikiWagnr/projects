import React,  {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'

const Create = () => {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    //array to store errors from the API
    const [errors, setErrors] = useState([]); 

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const product = {title, price, description}
        console.log('this is my handle submit: ', product)
        axios.post('http://localhost:8000/api/products/new', product)
            .then((res) => {
                console.log('this is my post request ', res)
                navigate('/')
            })
            .catch(err => {
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            }) 
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
            {errors.map((err, index) => <p key={index}>{err}</p>)}
                <div>
                    <label>Product Title</label>
                    <input type="text" onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div>
                    <label>Price</label>
                    <input type="number" onChange={(e) => setPrice(e.target.value)} />
                </div>                
                <div>
                    <label>Description</label>
                    <input type="text" onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div>
                    <button type='submit' className='btn btn-outline-dark'>submit</button> | <button className='btn btn-outline-dark'><Link to='/'>Home</Link></button>
                </div>
            </form>
        </div>
    )
}

export default Create
