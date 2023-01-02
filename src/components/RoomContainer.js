
import React from 'react'
import RoomList from './RoomList'
import RoomFilter from './RoomFilter'
import Loading from './Loading'
import {withRoomConsumer } from "../Context";


const RoomContainer = ({context})=> {
      const {loading, sortedRooms, rooms}= context;
      if(loading ) {
                return <Loading/>
              }
              return (
                 <>
                  <RoomFilter rooms={rooms}/>
                  <RoomList rooms= {sortedRooms}/>
                  </>
              )
}
export default withRoomConsumer(RoomContainer);

















// import React from 'react'
// import RoomList from './RoomList'
// import RoomFilter from './RoomFilter'
// import Loading from './Loading'
// import {RoomContext } from "../Context";


// const RoomContainer = () => {

// return (
//   <RoomContext.Consumer>
//     {(value )=> {
//       const {loading, sortedRooms, rooms}= value;
//       if(loading ) {
//         return <Loading/>
//       }
//       return (
//          <div>
//           Hello from room RoomContainer
//           <RoomFilter rooms={rooms}/>
//           <RoomList rooms= {sortedRooms}/>
//          </div>
//       )
//     }}
//   </RoomContext.Consumer>
// );
  
// }

// export default RoomContainer
