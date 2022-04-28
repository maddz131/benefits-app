import React, { Component } from 'react';
import { variables } from './Variables';
import { Card, ListGroup } from 'react-bootstrap'

export class Benefits extends Component {
    constructor(props) {
        super(props);
        this.state = {
            benefits: ''
        }
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList = () => {
        fetch(variables.API_URL + 'benefits')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({ benefits: data })
            });
    }
    render() {
        const {
            benefits
        } = this.state;
        return (
            <>
                <Card className="text-center">
                    <Card.Body>
                        <Card.Title>Benefits Information</Card.Title>
                    </Card.Body>
                    <ListGroup variant="flush">
                        <ListGroup.Item><div className="fw-bold">Employee Cost Per Year:</div>${benefits.employeeBenefitsYearlyCost}</ListGroup.Item>
                        <ListGroup.Item><div className="fw-bold">Dependents Cost Per Year:</div>${benefits.dependentBenefitsYearlyCost}</ListGroup.Item>
                        <ListGroup.Item><div className="fw-bold">Employee Yearly Salary:</div>${benefits.salary}</ListGroup.Item>
                    </ListGroup>
                </Card>
            </>
        )
    }
}