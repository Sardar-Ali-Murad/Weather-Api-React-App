import React from 'react'
import "./index.css"
import {FiSearch} from "react-icons/fi"
import {AiOutlineLink} from "react-icons/ai"
import {WiHumidity} from "react-icons/wi"
import {FaLocationArrow} from "react-icons/fa"
import {GiWindSlap} from "react-icons/gi"
import {BsFillSunriseFill} from "react-icons/bs"
import {WiSunset} from "react-icons/wi"
import moment from "moment"
import {AiOutlineArrowUp} from "react-icons/ai"
import {AiOutlineArrowDown} from "react-icons/ai"

import {DateTime} from "luxon"

const Home = () => {
    let [loading,setLoading]=React.useState(true)
    let arr=["London","Sydney","Tokyo","Paris","Bahawalpur"]
    let [data,setData]=React.useState({})
    let [city,setCity]=React.useState("Bahawalpur")
    let [cond,setCond]=React.useState(false)
    let [temp,setTemp]=React.useState("metric")
    let [symbol,setSymbol]=React.useState("C")

    let [hourlyData,setHourlyData]=React.useState([])
    let [dailyData,setDailyData]=React.useState([])
    React.useEffect(()=>{
       if(temp==="metric"){
        setSymbol("C")
       }
       else{
        setSymbol("F")
       }
    },[temp])
    let start=async ()=>{
        setLoading(true)
        let request=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=725ffa020e964348752f5b1678a9fccd&units=${temp}`)
        let final=await request.json()
        setData(final)
        setLoading(false)
      }

    let hourly=async ()=>{
        setLoading(true)
        let request=await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=725ffa020e964348752f5b1678a9fccd&units=${temp}`)
        let final=await request.json()
        setHourlyData(final.list)
        setLoading(false)
      }

      

    React.useEffect(()=>{
     start()
     hourly()
    },[cond,temp])

    function handleSubmit(e){
        e.preventDefault()
        start()
    }

    function MainCities(city){
       setCity(city)
       setCond((pre)=>!pre)
    }

    // For the time Time is in the millisec now put new Date(timestamps) you get the date
    // But in most of the pai our get the time respect to 1970 so multiply with 1000 and do new Date(ts**1000) you get the time
    // Now yoyu have the time do date.toTimeString() you get the time h:m:s but with the toDateString() you get the date
    // Now the ubove time is in the GMT Strandards So we always use the toLocaleString so get the exact date and the time 
    // And precisely with the toLocaleDateString()  get the exact date like new Date(ts).toLocaleDateString()
    // And with the new Date(ts).toLocaleTimeString() get the exact time in h:m:s
    // Alaways check to * ts with the 1000 and see if it works do this if the time is with respect to 1970

    if(loading){
        return <h1>Loading...</h1>
    }
    let Rise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();

    let Set = new Date(data.sys.sunset * 1000).toLocaleTimeString();


    let LocalDate=new Date (data.dt*1000).toLocaleDateString()
    let LocalTime=new Date (data.dt*1000).toLocaleTimeString()
   
    
    console.log(DateTime.fromSeconds(1669888563).setZone(18000).toFormat("hh:mm a"))


  return (
    <div className='main'>
        {/* Header */}
        <div className='Header div-center-80'>
        {
            arr.map((all)=><h3 style={{cursor:'pointer'}} onClick={()=>MainCities(all)}>{all}</h3>)
        }
        </div>
        {/* Header */}

        {/* Search */}
             <div className='div-center-70 search-main'>

                <div className='search-part-1'>
                  <form onSubmit={handleSubmit}>
                      <input className='dark' placeholder='London' value={city} onChange={(e)=>setCity(e.target.value)}/>
                  </form>
                  <FiSearch style={{cursor:"pointer"}}/>
                  <FaLocationArrow style={{cursor:'pointer'}}/>
                </div>

                <div className='search-part-2'>
                    <h5><span  className='cel' onClick={()=>setTemp("metric")}>C</span> || <span className='feh' onClick={()=>setTemp("imperial")}>F</span></h5>
                </div>

             </div>
        {/* Search */}
        {/* Info */}

        {/* Dates */}
         <p className='text-center' style={{margin:"40px 0px"}}>{LocalDate} | Local Time {LocalTime}</p>
        {/* Dates */}



        <div className='info-main'>
           <h4 className='text-center'>{data?.name}, {data?.sys?.country}</h4>
           <p className='text-center'>{data?.weather[0]?.description}</p>
        </div>


        {/* Info */}

        {/* Detailed Info */}
          <div className='div-center-60 more-detail'>

            <div className='image'>
              <img
                  src={`http://openweathermap.org/img/wn/${
                     data.weather[0]?.icon
                  }@4x.png`}
                />
            </div>
            
            {/* <h1 className='main-temp'>{cel?(data?.main?.temp-273).toFixed(1):((data?.main?.temp-273)*9/5+32).toFixed(1)}<span className='cel'>C</span></h1>
             */}

            <h1 className='main-temp'>{(data?.main?.temp).toFixed(1)}<span className='cel'>{symbol}</span></h1>
            

            <div style={{display:"flex",flexDirection:"column",color:"white"}}>
                {/* <div style={{color:"white"}}>
                  <AiOutlineLink/> <span  className='light'>Felt Like</span>  <span className='light'>{cel?(data?.main?.temp-273).toFixed(1):((data?.main?.feels_like-273)*9/5+32).toFixed(1)}<span className='cel'>C</span></span>
                </div> */}


                <div style={{color:"white"}}>
                  <AiOutlineLink/> <span  className='light'>Felt Like</span>  <span className='light'>{data?.main?.feels_like}<span className='cel'>{symbol}</span></span>
                </div>


                <div>
                   <WiHumidity/> <span  className='light'>Humidity</span>  <span className='light'>{(data?.main?.humidity).toFixed(1)}<span>%</span></span>
                </div>
                <div>
                  <GiWindSlap/> <span  className='light'>Wind</span>  <span className='light'>{(data?.wind?.speed*3.6).toFixed(1)}<span className='cel'>km/h</span></span>
                </div>
            </div>

          </div>
        {/* Detailed Info */}
         
         {/* Extra Info */}
        <div className='extra-info div-center-50' style={{marginTop:"50px"}}>
          <p><BsFillSunriseFill/> Rise  {Rise} </p> |
          <p><WiSunset/> Set  {Set} </p> |
          <p><AiOutlineArrowUp/>  High  {data?.main?.temp_max} <span className='cel'>{symbol}</span></p> |
          <p><AiOutlineArrowDown/>  Low  {data?.main?.temp_min} <span className='cel'>{symbol}</span></p> 
        </div>
         {/* Extra Info */}


         {/* Hourly Forecast */}
          <div className='hourly-main div-center-60' style={{color:"white"}}>
            <h2>Hourly Forecast</h2>
            <div className='hour-line'></div>
            <div style={{display:"flex"}}>

             {
               hourlyData.slice(0,4).map((all)=>{
                 return <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                    <p className='dark'>{new Date(all?.dt*1000).toLocaleTimeString()}</p>
                    <img src={`http://openweathermap.org/img/wn/${
                    all.weather[0].icon
                  }@4x.png`}/>
                  <p className='dark'>{all?.main?.temp}<span className='cel'>{symbol}</span></p>
                  </div>
                })
              }
          </div>
              </div>
         {/* Hourly Forecast */}
    </div>
  )
}

export default Home
