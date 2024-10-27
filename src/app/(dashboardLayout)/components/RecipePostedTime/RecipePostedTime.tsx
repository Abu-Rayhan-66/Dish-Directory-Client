import React, { useEffect, useState } from 'react';
import moment from 'moment';

const RecipePostedTime = ({ postTime }:{postTime:string}) => {
  const [timeAgo, setTimeAgo] = useState(moment(postTime).fromNow());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeAgo(moment(postTime).fromNow());
    }, 60000); 

    return () => clearInterval(intervalId);
  }, [postTime]);

  return <p>{timeAgo}</p>;
};

export default RecipePostedTime;
