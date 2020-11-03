import React, { useState } from 'react'
import { Accordion, Card, Button, Form } from 'react-bootstrap';

const Categorie = [
    { 
        "_id": 1, 
        "name": "Art" 
    },
    { 
        "_id": 2, 
        "name": "History" 
    },
    { 
        "_id": 3, 
        "name": "Novel" 
    },
    { 
        "_id": 4, 
        "name": "For Kid" 
    },
    { 
        "_id": 5, 
        "name": "Sciences" 
    }
]



function CheckBox(props) {

    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {

        const currentIndex = Checked.indexOf(value);
        const newChecked = [...Checked];

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
            newChecked.splice(currentIndex, 1)
        }

        setChecked(newChecked)
        props.handleFilters(newChecked)
        //update this checked information into Parent Component 

    }
    


    return (
        <div>
            <Accordion >
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Categories
                        </Accordion.Toggle>
                    </Card.Header>
                    < Accordion.Collapse eventKey="0">
                    <React.Fragment >
                        {Categorie.map((value, index) => (
                            <Form.Check onChange={() => handleToggle(value._id)}  label={value.name} />
                        ))}
                    </React.Fragment>
                    </Accordion.Collapse>
                </Card>            
            </Accordion>
        </div>
    )
}

export default CheckBox
