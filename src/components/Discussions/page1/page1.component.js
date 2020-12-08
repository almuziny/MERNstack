import React from 'react';
import { Breadcrumb, ButtonGroup, Button} from "react-bootstrap";

export default function Page1() {

    return(
        <div className="container">
            <Breadcrumb>
                <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                <Breadcrumb.Item >Communicate</Breadcrumb.Item>
                <Breadcrumb.Item active>Group</Breadcrumb.Item>
            </Breadcrumb>
            <ButtonGroup className="col-xl" aria-label="Basic example">
                <Button variant="secondary" active>Creat Group</Button>
                <Button variant="secondary">Group List</Button>
                <Button variant="secondary">My Group</Button>
            </ButtonGroup>
        </div>
    )
}