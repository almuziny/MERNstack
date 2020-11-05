import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Row, Col } from 'react-bootstrap';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
//import { addToCart } from '../../../_actions/user_actions';
//import { useDispatch } from 'react-redux';

function DetailProductPage(props) {
   // const dispatch = useDispatch();
    const productId = props.match.params.productId
    const [Product, setProduct] = useState([])

    useEffect(() => {
        
        Axios.get(`http://localhost:5000/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                setProduct(response.data[0])
            })

    }, [])


    return (
        <div className="container" >

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Product.title}</h1>
            </div>

            <br/>
            <br/>

            <Row>
                <Col>
                    <ProductImage detail={Product} />
                </Col>
                <Col>
                    <ProductInfo detail={Product} />
                </Col>
            </Row>

        </div>
    )
}

export default DetailProductPage
