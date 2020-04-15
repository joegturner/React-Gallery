import React from 'react';

const Photo = ({ id, farm, server, secret }) => {

    return (
        <li>
            <img src={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`} alt="" />
        </li>
    )
}

export default Photo;