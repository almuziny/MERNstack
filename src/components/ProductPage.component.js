import React, { useState, useEffect} from "react";
import axios from 'axios';
import ImageSlider from '../components/utils/ImageSlider';
import CheckBox from './ProductPageSections/CheckBox';


export default function ProductPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(6)
    const [PostSize, setPostSize] = useState()
    const [Filters, setFilters] = useState({
        Categorie: [],
        price: []
    })

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
                  if (variables.loadMore) {
                        setProducts([...Products, ...Response.data.product])
                    } else {
                        setProducts(Response.data.product)
                    }
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
            loadMore: true
        }
        getProducts(variables)
        setSkip(skip)
    }

    const showFilteredResults = (filters) => {

        const variables = {
            skip: 0,
            limit: Limit,
            filters: filters

        }
        getProducts(variables)
        setSkip(0)

    }

    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }

        newFilters[category] = filters

        if (category === "price") {

        }

        console.log(newFilters)

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    return (
        <div className="container">
            <div style={{ textAlign: 'center' }}>
                <h2>  products list   </h2>
            </div>

            <CheckBox
                handleFilters={filters => handleFilters(filters, "Categorie")}
            />

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