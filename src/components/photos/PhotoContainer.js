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

        console.log(this.props.match);
        if (match.params.item) {
            infoText = `"${match.params.item}" Results`;
        } else {
            infoText = `"${match.url.replace('/', '')}" Results`;
            console.log(infoText);
        }
        return infoText; 
    }

    render() {
        return (
            <div className="photo-container">
                <h2>{this.getText()}</h2>
                <ul>
                {this.getPhotos()}  
                </ul>
            </div>
        )
    }
}

export default PhotoContainer;

// id: "49770995068"
// owner: "157766219@N03"
// secret: "b319362a9d"
// server: "65535"
// farm: 66
// title: "Ocaso en Punta Entinas-Sabinar"
// ispublic: 1
// isfriend: 0
// isfamily: 0