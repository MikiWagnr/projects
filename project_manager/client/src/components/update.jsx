import { useParams, useNavigate, Link } from "react-router-dom";
import React, {useState, useEffect} from "react";
import axios from 'axios'


const Update = () => {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

        //array to store errors from the API
        const [errors, setErrors] = useState([]); 


    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/product/${id}`)
            .then((res) => {
                console.log('update get request: ', res.data)
                const product = res.data
                setTitle(product.title)
                setPrice(product.price)
                setDescription(product.description)
            })
            .catch(err => console.log('update get error: ', err))
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault()
        const productObj = {title,price,description}
        axios.put(`http://localhost:8000/api/product/${id}`, productObj)
            .then( res => {
                console.log(res)
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
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
            </div>
            <div>
                <label>Price</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>                
            <div>
                <label>Description</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <div>
                <button type='submit' className='btn btn-outline-dark'>submit</button> | <button className='btn btn-outline-dark'><Link to='/'>Home</Link></button>
            </div>
        </form>
    </div>
    )
}

export default Update