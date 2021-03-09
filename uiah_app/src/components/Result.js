import React from 'react';

export default class Result extends React.Component{

    render(){
        return(
            <div className="toolbar__results__single" onClick={()=>this.props.handleClick(this.props.result.title)} tabIndex="0">
                <div className="toolbar__results__single__title">{this.props.result.title}</div>
                <div className="toolbar__results__single__subtitle">{!!this.props.result.rating && `${this.props.result.rating} Rating,`} {this.props.result.year}</div>
            </div>
        );
    }
}

