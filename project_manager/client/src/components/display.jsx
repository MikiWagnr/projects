import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

import axios from 'axios'

const Display = () => {
    const [productList, setProductList] = useState([])
    const [loaded, setLoaded] = useState(false)

    useEffect(()=> {
        axios.get('http://localhost:8000/api/products')
            .then((res) => {
                console.log('this is my get response: ', res.data)
                setProductList(res.data)
            })
            .catch((err) => {console.log('this is my catch error: ', err)})
    }, [loaded])

    const handleDelete = (e, id) =>{
        axios.delete(`http://localhost:8000/api/product/${id}`)
        .then((res) =>{
            console.log('deleting this product: ', res)
            setLoaded(!loaded)
            
            })
            .catch(err => console.log('delete catch: ', err))
    }

    return(
        <div>
            <button className='btn btn-primary'><Link to={'/create'} className='link' >Add a Product</Link></button>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Product Title</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productList.map((product, i) => {
                            return(
                                <tr key={i}>
                                    <td>{product.title}</td>
                                    <td>{product.price.toFixed(2)}</td>
                                    <td>{product.description}</td>
                                    <td> <button className='btn btn-warning'><Link to={`/view/${product._id}`} className='link'>View</Link></button> | 
                                    <button className='btn btn-outline-dark'><Link to={`/update/${product._id}`}>Edit</Link></button> | 
                                    <button className='btn btn-danger' onClick={(e) => {handleDelete(e, product._id)}}>Delete</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Display