import React from 'react';
import Result from './Result';
import Loading from './Loading';
import Error from './Error';

export default class Results extends React.Component{

    renderResult(result,i){
        return (
            <Result handleClick={this.props.handleClick} result={result} key={i}/>
        )
    }

    render(){
        let results ;
        results = this.props.results.map((r,i)=>{
            return this.renderResult(r,i);
        })

        return(
            <div className="toolbar__results" >
                {!!this.props.results.length && results}
                {this.props.loading && <Loading/>}
                {this.props.error && <Error error={this.props.error}/>}
            </div> 
        );
    }
}

