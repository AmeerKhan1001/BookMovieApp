import React from 'react';
import Header from '../../common/header/Header';
import './Details.css';

const Details = (props) => {
    return (<Header {...props} isDetailsPage={true}/>);
}

export default Details;