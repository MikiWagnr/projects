import { Link, useParams } from "react-router-dom";
import React, {useState, useEffect} from "react";
import axios from "axios";


const View = () => {
    const [product, setProduct] = useState('')
    const {id} = useParams()
    // const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:8000/api/product/${id}`)
            .then((res) => {
                console.log('views get request: ', res.data)
                setProduct(res.data)
            })
            .catch(err => console.log('views get error: ', err))
    }, [id])

    return(
        <div>
            {
                product ?
                <div>
                    <h2>{product.title}</h2>
                    <h3>{product.price.toFixed(2)}</h3>
                    <p>{product.description}</p>
                </div> :
                <h1>This Product is unavailable!</h1>
            }
            <button className="btn btn-outline-dark"><Link to='/'>Home</Link></button>
        </div>
    )
}

export default View