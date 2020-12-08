import React, { useEffect, useState, useContext } from 'react'
import Axios from 'axios'
import UserContext from "../../context/UserContext"
import { Row, Col } from 'react-bootstrap';
import ProductImage from './Sections/ProductImage';
import ProductInfo from './Sections/ProductInfo';
//import { addToCart } from '../../../_actions/user_actions';
//import { useDispatch } from 'react-redux';

function DetailProductPage(props) {
   // const dispatch = useDispatch();
    const productId = props.match.params.productId
    const [Product, setProduct] = useState([])
    const { userData } = useContext(UserContext);

    useEffect(() => {
        
        Axios.get(`http://localhost:5000/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                setProduct(response.data[0])
            })
            

    }, [])

    const addToCartHandler = (productId) => {
        /* const request = */ Axios.get(`http://localhost:5000/account/addToCart?productId=${productId}`,
        {
          headers: { "x-auth-token": userData.token },
        })
        .then(response => response.data);

    }

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
                    <ProductInfo 
                        addToCart={addToCartHandler}
                        detail={Product} 
                    />
                </Col>
            </Row>

        </div>
    )
}

export default DetailProductPage
