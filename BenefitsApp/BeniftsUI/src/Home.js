import React, { Component } from 'react';

export class Home extends Component {
    

    render() {
        return (
            <>
                <h3 className="d-flex justify-content-center m-3">
                    Welcome to the employees benefits site!</h3>
                <p className="text-muted">Head over to the Benefits page
                    to get a quick rundown on benefits pricing or see the
                    Employees page to add employees and their dependents
                    for an overview of their costs.</p>
            </>
        )
    }
}