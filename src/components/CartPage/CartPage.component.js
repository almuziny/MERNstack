import React, {useEffect, useState} from "react";
import { Table, Button } from "react-bootstrap";
import Axios from "axios";
import ProductImage from '../DetailProductPage/Sections/ProductImage'

let data = undefined
let cartItems = []
let cartquantity = []
let cartTotal = 0

function CartPage() {
    const [Product, setProduct] = useState([]);
    const [cartPrice, setcartPrice] = useState() ;

    useEffect(() => {
        Axios.get("http://localhost:5000/account/getUser", {
            headers: { "x-auth-token": localStorage.getItem("auth-token") }
        }).then(response => {
            data = response.data;
            response.data.cart.forEach(element => {
                cartItems.push(element.id);
                cartquantity.push(element.quantity);
            });

            Axios.get(`http://localhost:5000/product/products_by_id?id=${cartItems}&type=array`)
            .then(response => {
                setProduct(response.data)
                
                response.data.map((item, index) => {
                    cartTotal = item.Price * cartquantity[index] + cartTotal  
                })
                setcartPrice(cartTotal);
            })
        })
    },[])

    function ProductImage(image){
        return(
        <img style={{ width: '150px', maxHeight: '150px' }}
            src={`http://localhost:5000/${image}`} alt="productImage" />
        )
    }

    function removeFromCart(item){
        Axios.get(`http://localhost:5000/account/removeFromCart?_id=${item._id}`, {
            headers: { "x-auth-token": localStorage.getItem("auth-token") }
        })
    }
  
    return(
        <div className="container">

            <br/>
            <br/>

            <h1>My Cart</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Remove From Cart</th>
                    </tr>
                </thead>
                <tbody>
                    {Product.map((item, index)=> (
                        <tr>
                            <th> {ProductImage(item.images)} </th>
                            <th>{item.title} </th>
                            <th>${item.Price}</th>
                            <th>{cartquantity[index]} </th>
                            <th>${item.Price * cartquantity[index]}</th>
                            <th>
                                <Button 
                                    variant="primary" 
                                    size="lg"
                                    onClick={ () => (removeFromCart(item))}
                                >
                                    remove
                                </Button>{' '}
                            </th>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <h2> Total Cart Price: ${cartPrice}</h2>

        </div>
    )

}

export default CartPage