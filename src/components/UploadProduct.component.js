import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { Form } from 'react-bootstrap';
import { Typography, Button, Input } from 'antd';
import FileUpload from './utils/FileUpload';
import Axios from 'axios';


const Categories = [
    { key: 1, value: "Art" },
    { key: 2, value: "History" },
    { key: 3, value: "Novel" },
    { key: 4, value: "For Kid" },
    { key: 5, value: "Sciences" }
]


export default function UploadProduct(props) {

    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0)
    const [CategoriesValue, setCategoriesValue] = useState(1)
    
    const history = useHistory();
    

    const [Images, setImages] = useState([])

    useEffect(() => {
        let check = localStorage.getItem("auth-token")
            
        if (!check) {
            alert("you have to log in")
            history.push("/log-in")
        } 

    }, [])

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (!TitleValue || !DescriptionValue || !PriceValue || !Images) {
            return alert('fill all the fields first!')
        }


        const variables = {
            title: TitleValue,
            description: DescriptionValue,
            Price: PriceValue,
            images: Images,
            Categorie: CategoriesValue
        }

        Axios.post('http://localhost:5000/product/uploadProduct', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Product Successfully Uploaded')
                    history.push("/");
                } else {
                    alert('Failed to upload Product')
                }
            })
    }


    return (
        <div className="box">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                Upload Product
            </div>


            <Form onSubmit={onSubmit} >

                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />

                <br/>
                <br/>
                <Form.Group controlId="formBasicText">
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Book's Titel"    
                        onChange={(e) => setTitleValue(e.target.value)}
                        value={TitleValue}    
                    />
                </Form.Group>

                <Form.Group controlId="formBasicTextarea">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea" 
                            type="text" 
                            placeholder="Enter Book's Description"    
                            onChange={(e) => setDescriptionValue(e.target.value)}
                            value={DescriptionValue}    
                        />
                        <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>


                <Form.Group controlId="formBasicPrice">
                        <Form.Label>price</Form.Label>
                        <Form.Control 
                            type="number" 
                            placeholder="Enter Book's Price"    
                            onChange={(e) => setPriceValue(e.target.value)}
                            value={PriceValue}    
                        />
                        <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <br />
                <br />

                <Form.Group>
                    <Form.Label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">
                        Categorie
                    </Form.Label>
                    <Form.Control
                        as="select"
                        className="my-1 mr-sm-2"
                        id="inlineFormCustomSelectPref"
                        custom
                        onChange={(e) => setCategoriesValue(e.target.value)} value={CategoriesValue}
                    >
                       {Categories.map(item => (
                            <option key={item.key} value={item.key}>{item.value} </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <br/>
                <br/>

                <Button
                    onClick={onSubmit}
                >
                    Submit
                </Button>

            </Form>

        </div>
    )
}
