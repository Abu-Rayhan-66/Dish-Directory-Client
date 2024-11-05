import React from 'react';
import Banner from './components/Banner';
import RecipeFeed from './components/RecipeFeed/RecipeFeed';
import Footer from './components/Footer/Footer';


const CommonLayoutPage = () => {
    return (
        <div>
            <Banner></Banner>
            <RecipeFeed></RecipeFeed>
            <Footer></Footer>
        </div>
    );
};

export default CommonLayoutPage;