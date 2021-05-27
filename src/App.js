
import React,{useEffect, useState} from "react";
import './App.css';

function App() {
  const [data,setData]=useState([]);
  const [input,setInput]=useState('');
  const [output,setOutput]=useState([]);
  const getCovidData = async ()=>{
    const res=await fetch('https://api.covid19india.org/data.json');
    const actualData=await res.json();
    //console.log(actualData);
    setData(actualData.statewise);
  }
  useEffect(()=>{
    getCovidData();
  },[]);
  useEffect(()=>{
    setOutput([])
    data.filter(val=>
      {
        if(val.state.toLowerCase().includes(input.toLowerCase()))
        {
          setOutput(output=>[...output,val])
        }
      })

  },[input]);
  
  return (
    <div className="main-div">
      
      <div className="child-div">
     <h1 className="heading">COVID-19 in India: State-wise Analysis</h1>
     <div className="input-div">
     <input  onChange={e=>setInput(e.target.value)} className="input-field" type="search" placeholder="search state..."></input>
     <i class="fa fa-search add-btn" aria-hidden="true" style={{marginLeft:'-74.5%'}}></i>
     </div>
    </div>
    <div className="table">
     <table className="table table-striped table-dark hoverTable">
       <thead>
         <tr>
           <th>STATE</th>
           <th>CONFIRMED</th>
           <th>RECOVERED</th>
           <th>DEATH</th>
           <th>ACTIVE</th>
           <th>UPDATED</th>
         </tr>
       </thead>
       <tbody>
         {
           output.map((currele,ind)=>{
           
             return(
                       <tr key={ind} >
                          <td>{currele.state}</td>
                          <td>{currele.confirmed}</td>
                          <td>{currele.recovered}</td>
                          <td>{currele.deaths}</td>
                          <td>{currele.active}</td>
                          <td>{currele.lastupdatedtime}</td>
                       </tr>
                   );
           }
           )
           
          }
       
       </tbody>
     </table>
    </div>
    </div>
  );
}

export default App;
