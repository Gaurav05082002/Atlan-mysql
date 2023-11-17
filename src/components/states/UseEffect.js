
import React, { useEffect , useState } from 'react'

const UseEffect = () => {
    const [count, setcount] = useState(0);
    useEffect(  () => {
              console.log("this is use effect");
              document.title = "chats"+count;
            //   window.alert("use effect worked"); 
    })
  return (
    <div>

        
        <h1> {count}</h1>
        <button onClick={()=>setcount(count+1)}> click me </button>
    </div>
  )
}

export default UseEffect