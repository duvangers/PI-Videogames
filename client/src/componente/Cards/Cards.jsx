import React, {useState,  useEffect } from "react";


import Card from "../Card/Card";

export default function Cards({items}) {
  const [message , setmessage]= useState('Loading...')


 useEffect(()=>{
   setTimeout(()=>{
     if (items.length === 0 ) {
       setmessage('Not found')

     }
   }, 5000)
 },[items])


  return (
    <div>
      {
        items.length > 0 ? (
        items.map((c) => {
          return <Card
            name={c.name}
            key={c.id}
            genre= {c.genres[0]?c.genres[0].name:'Unknown'}
            background_image={c.background_image}
            id={c.id}
            rating= {c.rating}
            />;
        })
      ) : (
        <div>{message}</div>
      )}
    </div>
  );
}