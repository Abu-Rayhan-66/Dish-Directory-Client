import React from 'react';
import Banner from './components/Banner';
import RecipeFeed from './components/RecipeFeed/RecipeFeed';


const CommonLayoutPage = () => {
    return (
        <div>
            <Banner></Banner>
            <RecipeFeed></RecipeFeed>
        </div>
    );
};

export default CommonLayoutPage;