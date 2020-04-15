import React, { Component } from 'react';
import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';
// import createHistory from "history/createBrowserHistory";
import { createBrowserHistory } from 'history';
import axios from 'axios';

// App components
import SearchForm from './SearchForm';
import MainNav from './MainNav';
import PhotoContainer from './photos/PhotoContainer';
import Error from './Error';

// flickr API key
/** to run app, create a config.js file under the /src/data folder
 *  Paste in code below and your API key into config file:
 *    const apiKey = 'YOUR API KEY';
 *    export default apiKey;
 */
import apiKey from '../data/config';
const APIkey = apiKey;

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      photos: [],
      defaultPhotos: {},
      defaultSets: [ 'Cats', 'Dogs', 'Birds', 'Cars', 'Lizards'],
      loading: true
    };
  } 

  componentDidMount = () => {
    const defaults = this.state.defaultSets;

    this.performSearch('rainbows', false, 0);

    for (let i = 0; i < defaults.length; i++) {
      this.performSearch(defaults[i], true);
    }
  }

  /** fetch from flickr */
  // preLoad loads fetch data into photo state array
  performSearch = (query = 'sunsets', preLoad = false) => {
    const fetchURL = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${APIkey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`;
    axios.get(fetchURL)
      .then(response => {
        if (!preLoad) {
          this.setState({
            photos: response.data.photos.photo,
            loading: false
          });
        } else {
          this.savePhotos(query, response.data.photos.photo);
        }
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  /** savePhotos into default photos array */
  // loads photo data for Main Nav buttons
  savePhotos = (query, data) => {
    this.setState({
      defaultPhotos: {
        ...this.state.defaultPhotos,
        [`${query}`]: data
      }
    });
  }
  
  /** generates photo routes for Main Nav buttons */
  generateDefaultRoutes = () => {
    let routes = [];
    const sets = this.state.defaultSets;
    const photos = this.state.defaultPhotos;
    for (let i = 0; i < sets.length; i++) {
      routes.push(
        <Route 
          key={i}
          exact path={`/${sets[i]}`} 
          render={ (props) => 
            <PhotoContainer 
              {...props}
              key={i+100}
              data={photos[`${sets[i]}`]}
              />} 
        />
      )
    }
    return routes;
  }

  render() {
    const history = createBrowserHistory();

    return (
      <HashRouter forceRefresh={true}>
        <div className="container">
          <SearchForm onSearch={this.performSearch} history={history}/>
          <MainNav defaults={this.state.defaultSets} />
          <Switch>
            <Route exact path='/' render={ (props) => <PhotoContainer {...props} data={this.state.photos}/>} />
            {this.generateDefaultRoutes()}
            {
              (this.state.loading)
              ? <h1>'Loading...'</h1>
              : <Route path='/search/:item' render={ (props) => <PhotoContainer {...props}data={this.state.photos}/>} />
            }
            <Route component={Error}/>
          </Switch>
        </div>
      </HashRouter>
    );
  }
}
