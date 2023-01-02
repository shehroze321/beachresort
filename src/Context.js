import React, { useEffect, useState } from 'react'
import { createContext } from 'react';
import items from "./data";

 
const RoomContext = createContext();
const RoomProvider = ({children}) => {
const [state, setState] = useState(
  
    {
    rooms:[],
    sortedRooms: [],   
    featuredRooms:[],
    loading:true , 
    type : "all",
    capacity :1,
    price :0,
    minPrice:0,
    maxPrice:0,
    minSize:0,
    maxSize :0,
    breakfast:false,
    pets:false,
    }
  
)
  useEffect(()=> {
    let rooms = formatData(items)
    let featuredRooms = rooms.filter(room=>room.featured===true);
    // here we defined prices in search rooms
    let maxPrice = Math.max(...rooms.map (item=> item.price));
    let maxSize = Math.max(...rooms.map (item=> item.size));
    console.log("UseEffect...........");
    setState({
      type : "all",
    capacity :1,
    price :0,
      rooms,
      featuredRooms,
      sortedRooms:rooms,
      loading:false,
      price:maxPrice,
      maxPrice,
      maxSize,
      minPrice:0,
      minSize:0,
      breakfast:false,
    pets:false
    })

    // console.log(rooms)
  },[]);
     const formatData = (items) => {
    let tempItems = items.map(item =>{
      let id = item.sys.id
      let images = item.fields.images.map( image=> 
        image.fields.file.url);
        let room = {...item.fields,images,id };
        return room;
    });
    return tempItems;
     }
    const  getRoom = ({slug}) => {
      let tempRooms = [...state.rooms];
      console.log(tempRooms, "//////////");
      console.log(slug, "//////////");
      const room =tempRooms.find(room=>room.slug===slug);
     return room;

     };

 const handleChange=(event)=>{
      const target = event.target;
      const value = target.type==="checkbox" ?  target.checked : target.value;
      const name= target.name;
      console.log(name,value ,"//////////////////////");

      // setState({
      //   [name]:value
      // })

      setState(state => ({...state, maxPrice:500 }));
      console.log("handle chnge",state);
      filterRooms()

  //  console.log(`this is type: ${type} this is name:${name} this is value: ${value}`);
};
const filterRooms=  () => {
console.log("state",state);
  let {
    rooms,type,capacity,price,minSize,maxSize,breakfast,pets
  }= state;
// all the rooms
  let tempRooms=[...rooms];
  // transform value
  console.log("capacity from filter rooms",capacity);
  capacity = parseInt(capacity);
  price = parseInt(price);
  console.log("capacity from filter rooms",capacity);
  //  filter by type
  if (type !=='all'){
    tempRooms =tempRooms.filter((room)=> room.type ===type)
  }
  //  filter by capacity
  if (capacity !==1){
    tempRooms= tempRooms.filter((room )=> room.capacity >= capacity);
  }
  // filter by price
  if (price !==1) {
    tempRooms= tempRooms.filter((room)=> room.price <=price);
  }
  // filter by size
  tempRooms=tempRooms.filter((room) =>room.size>=minSize&&room.size<=maxSize);
  // filter by breakfast
  if (breakfast){
    tempRooms=tempRooms.filter( (room) =>  room.breakfast===true)
  }
//  filter by pets
if (pets){
  tempRooms=tempRooms.filter( (room) =>  room.pets===true)
}
  setState({
    sortedRooms:tempRooms
  })
};

      // get Data

  return (
<RoomContext.Provider value={{...state,
getRoom: getRoom, handleChange: handleChange} }>
{children}
    </RoomContext.Provider>
  )
}

// consumer component
const RoomConsumer= RoomContext.Consumer;


// function component 
export function withRoomConsumer(Component){
  return function consumerWrapper(props) {
    return(
      <RoomConsumer>
        {(value) => <Component {...props}   context= {value}/> 
        }
      </RoomConsumer>
    )
  }
}


export default RoomProvider ;
export {RoomContext, RoomConsumer}
