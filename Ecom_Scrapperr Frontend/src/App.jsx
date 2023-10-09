import { useState } from 'react'
import './App.css'

function App() {

  const [item, setItem] = useState("hi");

  const clickHandler = async(e) => {
    const response = await fetch('http://localhost:3000/', {
      method: "POST", 
      body: JSON.stringify({ item }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.text();
    console.log(data);
    
  }
  

  return (
    <>
      <div className='Search'>
        <h1>Amazon Web Scrapper</h1>
        <input type='text' name='item' value={item} onChange ={(e) => setItem(e.target.value)}/>
        <button onClick={clickHandler}/>
      </div>
      <tbody className='Table'>
        `item:  {item}`
        <table>
          <tr className='tableRow'>
          <th className='tableRow'>Name</th>
            <th className='tableRow'>Price</th>
            <th className='tableRow'>Delivered By</th>
            <th className='tableRow'>Stars</th>
          </tr>
        </table>
      </tbody>
    </>
  )
}

export default App
