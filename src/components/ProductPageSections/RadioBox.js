import React, { useState } from 'react'
import { Accordion, Card, Button, Form } from 'react-bootstrap';
import { Price } from './datas'

function CheckBox(props) {

    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {

        setChecked(value)
        props.handleFilters(value)
        //update this checked information into Parent Component 
        console.log(Checked);

    }
    
    return (
        <div>
            <Accordion >
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Price
                        </Accordion.Toggle>
                    </Card.Header>
                    < Accordion.Collapse eventKey="0">
                    <Form.Group>

                        {Price.map((value, index) => (
                            <Form.Check
                            type="radio"
                            label={value.name}
                            name="radiobox"
                            onChange={() => handleToggle(value._id)}
                          />
                        ))}
                    </Form.Group>
                    </Accordion.Collapse>
                </Card>            
            </Accordion>
        </div>
    )
}

export default CheckBox
