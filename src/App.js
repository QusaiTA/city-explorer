import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';

class App extends React.Component{
  constructor(props){

    super(props);
    this.state = {
      SelectCity : '',
      lon : '',
      lat : '',
      showMap: false,
      errorMsg : 'This city it not exsist',
      displayErr : false,
      weatherData:[],
      movieData:[],
      

      
    }
  }

  submittedLocation = async(event) => {

    event.preventDefault();
    let city = event.target.Location.value;
    let Url = `https://eu1.locationiq.com/v1/search.php?key=pk.a10de6b9367d6edc81178a904969c1de&q=${city}&format=json`;
   
    try{
      let local = await axios.get(Url);
      const locationIqData = local.data[0];
      const cityName = locationIqData.display_name.split(',')[0];
      let response = await axios.get(`http://localhost:3030/weather?searchQuery=${cityName}&lat=${locationIqData.lat}&lon=${locationIqData.lon}`)
      console.log(cityName);
      console.log(response);


      this.setState ({
       SelectCity : locationIqData.display_name,
       lon : local.data[0].lon,
       lat : local.data[0].lat,
       showMap : true,
       weatherData: response.data,
      

      })
      

    } catch {
      this.setState({
        showMap : false,
        displayErr:true
      })


    }
    try{
      // let local = await axios.get(Url);
      // const locationIqData = local.data[0];
      // const cityName = locationIqData.display_name.split(',')[0];
   
       
    let moveis = await axios.get(`http://localhost:3030/movies?searchQuery=${city}`);
    console.log(moveis);
      this.setState ({
      
       movieData : moveis.data
      })
      } catch {
      this.setState({
        showMap : false,
        displayErr:true
      })


    }
  }


  render(){


  return (
    
   <>
  
   <h1> City Explorer </h1>
   <Form id = "form" onSubmit ={this.submittedLocation}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Location</Form.Label>
    <Form.Control  className = "control" name ='Location' type="text" placeholder="Enter Location" />
    </Form.Group>

   
  <Button variant="primary" type="submit">
    Explore
  </Button>

  
</Form>
      <p className = "name">{this.state.SelectCity}</p>
      <p className = "name">lat : {this.state.lat}</p>
      <p className = "name">lon : {this.state.lon}</p>

      { 
        this.state.showMap &&
        <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.a10de6b9367d6edc81178a904969c1de&center=${this.state.lat},${this.state.lon}`} alt='map' />
      }

       { 
       this.state.displayErr && 
       
       <p className = "name">Error : {this.state.errorMsg }</p>
       
       }

       {/* <p>
        {console.log(this.state.weatherData)}             
        </p> */}
       {
         this.state.weatherData &&
        this.state.weatherData.map(element => {
         return (

           <div>
              <p id = "date" className = "name">{element.valid_date}</p>
              <p id = "dis" className = "name">{element.description}</p>
              {/* <p id = "dis" className = "name">Low :{element.min_temp}</p>
              <p id = "dis" className = "name">High: {element.max_temp}</p> */}
              
              
              
           </div>

         )


        })
      }
      {
         this.state.movieData &&
         this.state.movieData.map(element => {
          return (
 
            <div>
               <p id = "date" className = "name"> popularity :{element.popularity}</p>
               <p id = "dis" className = "name"> release date :{element.release_date}</p>
               
               {/* <p id = "dis" className = "name">Low :{element.min_temp}</p>
               <p id = "dis" className = "name">High: {element.max_temp}</p> */}
               <p id = "date" className = "name"> title :{element.title}</p>
               {/* <p id = "dis" className = "name"> {element.poster_path}</p> */}
               <img src = {element.poster_path} alt="img"/>
               <p id = "date" className = "name"> vote average:{element.vote_average}</p>
               <p id = "dis" className = "name"> vote count:{element.vote_count}</p>
               
               
               
            </div>
 
          )
 
 
         })
       


      }

       
</>
);
 }}

export default App;
