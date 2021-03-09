import React from 'react';

export default class Loading extends React.Component{
    render(){
        return(
            <div className="toolbar__results__loading">
                <div className="toolbar__results__loading__dot toolbar__results__loading__dot--1"></div>
                <div className="toolbar__results__loading__dot toolbar__results__loading__dot--2"></div>
                <div className="toolbar__results__loading__dot toolbar__results__loading__dot--3"></div>
            </div>
        );
    }
}

