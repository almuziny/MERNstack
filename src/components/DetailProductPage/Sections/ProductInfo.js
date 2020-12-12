import React, { useEffect, useState } from 'react'
import { Table, Button } from 'react-bootstrap';

function ProductInfo(props) {

    const [Product, setProduct] = useState({})

    useEffect(() => {
        console.log(props.detail);
        setProduct(props.detail)

    }, [props.detail])

    const addToCarthandler = () => {
        props.addToCart(props.detail._id)
    }

    return (
        <div>
            Product Info

            <br/>
            <br/>
            

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Price: {Product.Price}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="3">Description: {Product.description}</td>
                    </tr>
                </tbody>
            </Table>

            
            <Button 
            variant="primary" 
            size="lg"
            onClick={addToCarthandler}
            >
            add to cart
            </Button>{' '}

        </div>
    )
}

export default ProductInfo
