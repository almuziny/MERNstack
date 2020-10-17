import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from './utils/FileUpload';
import Axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;


export default function UploadProduct(props) {

    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [PriceValue, setPriceValue] = useState(0)

    const [Images, setImages] = useState([])

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
            price: PriceValue,
            images: Images
        }

        Axios.post('http://localhost:5000/product/uploadProduct', variables)
            .then(response => {
                alert(response)
                if (response.data.success) {
                    alert('Product Successfully Uploaded')

                } else {
                    alert('Failed to upload Product')
                }
            })


    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> Upload Travel Product</Title>
            </div>


            <form onSubmit={onSubmit} >

                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={(e) => setTitleValue(e.target.value)}
                    value={TitleValue}
                />
                <br />
                <br />
                <label>Description</label>
                <TextArea
                    onChange={(e) => setDescriptionValue(e.target.value)}
                    value={DescriptionValue}
                />
                <br />
                <br />
                <label>Price($)</label>
                <Input
                    onChange={(e) => setPriceValue(e.target.value)}
                    value={PriceValue}
                    type="number"
                />
                <br /><br />

                <Button
                    onClick={onSubmit}
                >
                    Submit
                </Button>

            </form>

        </div>
    )
}
