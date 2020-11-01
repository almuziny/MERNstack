import React, { useState, useEffect} from "react";
import axios from 'axios';
import ImageSlider from '../components/utils/ImageSlider';


export default function ProductPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(6)
    const [PostSize, setPostSize] = useState()

    useEffect(() => {

        const variables = {
            skip: Skip,
            limit: Limit,
        }
       getProducts(variables)
    }, []);

    
    const renderCards = Products.map((product, index) => {

        return <div className="col-4">
            <div className="card " >
                <ImageSlider images={product.images} />
                <div className="card-body">
                    <h5 className="card-title"> {product.title} </h5>
                    <h5 className="card-text"> price: {product.price} SR </h5>
                </div>

           </div>
        </div>
    })

    const getProducts = (variables) => {

        axios.post('http://localhost:5000/product/getProduct', variables)
        .then(Response => {
            if(Response.data.success){
                console.log(Products)
                setProducts([ ...Products, ...Response.data.product])
            
            } else {
                alert('fild to fitch data')
            }
        })
    }

    const onLoadMore = () => {
        let skip = Skip + Limit;
        
        const variables = {
            skip: skip,
            limit: Limit,
        }
        getProducts(variables)
        setSkip(skip)
    }

    return (
        <div className="container">
            <div style={{ textAlign: 'center' }}>
                <h2>  products list   </h2>
            </div>

            <br/>

            <div className='row'>

                   {renderCards}
            </div>

            <br/>
            <br/>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={onLoadMore}>Load More</button>
            </div>

        </div>
    )
}