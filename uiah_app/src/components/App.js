import React from 'react';
import Results from '../components/Results';
import { ReactComponent as MovieIcon } from '../icons/movie.svg';
import { ReactComponent as SearchIcon } from '../icons/search.svg';
let debounce = require('lodash.debounce');

// ADD VALID KEY FOR API
let key = '<<add_your_key>>'

export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            focus: false,
            input: '',
            results: [],
            loading: false,
            error: null
        }
    }

    getMovies = input => {
        this.setState({loading:true});
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${input}`)
        .then(r => {
            if(r.statusText === "OK"){
                return r.json();
            } else {
                return false;
            }
        })
        .then(r => {
            let results = [];
            let error = null;
            if(r){
                results = r.results.slice(0,7).map(x=>{
                    let movie = {};
                    movie.title = x.title;
                    movie.rating = x.vote_average;
                    if(x.release_date && x.release_date.match(/\d{4}/)){
                        movie.year = x.release_date.match(/\d{4}/)[0];
                    } else {
                        movie.year = 'year unknown';
                    }
                    return movie;
                });

                if(!results.length){
                    error = 'No Movies Found, please try another search phrase';
                }
               
            } else {
                error = 'Error from the Server (make sure to add a valid api KEY)';
            }

            this.setState({
                results,
                loading:false,
                error
            });
        })
    }
    
    handleClick = e =>{
        this.setState({
            input:e,
            results:[],
            loading:false,
            focus:false,
            error: null
        })
    }

    handleFocus = e =>{
        this.setState({focus:true})
    }

    handleBlur = e =>{
        if (!e.relatedTarget) {
            this.setState({focus:false})
        }
    }

    handleChange = event => {
        event.persist();
        this.setState({input: event.target.value,results:[],error:null});
        if (!this.debouncedFn) {
            this.debouncedFn = debounce(() => {
                if(this.state.input.length>3){
                    this.getMovies(this.state.input);
                }
            }, 500);
        }    
        this.debouncedFn();
        
    }

    render(){
        return(
            <form className="toolbar">
                <MovieIcon className ="toolbar__logo"/>
                <div className = {this.state.focus ? 'toolbar__input focus' : 'toolbar__input'} onFocus={this.handleFocus} onBlur={this.handleBlur}>
                    <input 
                        className="toolbar__input__text" 
                        type="text" 
                        value={this.state.input} 
                        onChange={this.handleChange}
                    />
                    <div className="toolbar__input__subtext">Enter a movie name</div>
                    <MovieIcon className ="toolbar__input__icon"/>
                    { 
                        (this.state.results.length || this.state.loading || this.state.error) &&
                            <Results 
                                handleClick={this.handleClick} 
                                error={this.state.error} 
                                results={this.state.results} 
                                loading={this.state.loading}
                            /> 
                    }
                </div>
                <SearchIcon className="toolbar__button"/>
            </form>
        );
    }
}

