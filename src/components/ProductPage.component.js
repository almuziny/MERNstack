import React, { useState, useEffect} from "react";
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ImageSlider from '../components/utils/ImageSlider';
import CheckBox from './ProductPageSections/CheckBox';
import RadioBox from './ProductPageSections/RadioBox';
import SearchFeature from './ProductPageSections/SearchFeature';
import { Price } from './ProductPageSections/datas';


export default function ProductPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(6)
    const [SearchTerms, setSearchTerms] = useState("")
    const [Filters, setFilters] = useState({
        Categorie: [],
        Price: []
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
                <a href={`/product/${product._id}`}>
                    <ImageSlider images={product.images} />
                
                    <div className="card-body">
                        <h5 className="card-title"> {product.title} </h5>
                        <h5 className="card-text"> Price: {product.Price} SR </h5>
                    </div>
                </a>
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
            loadMore: true,
            filters: Filters,
            searchTerm: SearchTerms
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
        console.log(variables);
        getProducts(variables)
        setSkip(0)

    }

    const updateSearchTerms = (newSearchTerm) => {
        console.log(newSearchTerm);
        const variables = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }
        
        setSkip(0)
        setSearchTerms(newSearchTerm)

        getProducts(variables)
    }

    const handlePrice = (value) => {
        const data = Price;
        let array = [];

        for (let key in data) {

            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }
        console.log('array', array)
        return array
    }

    const handleFilters = (filters, info) => {

        const newFilters = { ...Filters }
        newFilters[info] = filters

        if (info === "Price") {
            let priceValues = handlePrice(filters)
            newFilters[info] = priceValues
        }

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    return (
        <div className="container">
            <div style={{ textAlign: 'center' }}>
                <h2>  products list   </h2>
            </div>

            <Row>
                <Col>
                    <CheckBox
                        handleFilters={filters => handleFilters(filters, "Categorie")}
                    />
                </Col>
                <Col>
                    <RadioBox
                        handleFilters={filters => handleFilters(filters, "Price")}
                    />
                </Col>
            </Row>

            <SearchFeature
                 refreshFunction={updateSearchTerms}
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