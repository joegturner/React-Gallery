import React, { Component } from 'react';

import Photo from './Photo';
import NotFound from '../NotFound';

class PhotoContainer extends Component {

    
    getPhotos = () => {
        const { data } = this.props;
        let photos;

        if (data && data.length > 0 ) {
            photos = data.map(photo => 
                <Photo 
                    key={photo.id}
                    id={photo.id}
                    secret={photo.secret}
                    server={photo.server}
                    farm={photo.farm}
                />
            );
        } else {
            return (
                <NotFound />
            )
        }
        return photos;
    }
    
    getText = () =>{
        const { match } = this.props;
        let infoText = '';

        if (match.params.item) {
            infoText = `${match.params.item} Results`;
        } else {
            infoText = `${match.url.replace('/', '')} Results`;
        }
        return infoText; 
    }

    render() {
        const { loading } = this.props;

        return (
            <div className="photo-container">
                <h2>{this.getText()}</h2>
                {
                    (loading)
                    ? <h2>Loading...</h2>
                    : <ul>{this.getPhotos()}</ul>
                }
            </div>
        )
    }
}

export default PhotoContainer;