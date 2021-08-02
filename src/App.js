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
      displayErr : false
      
    }
  }

  submittedLocation = async(event) => {

    event.preventDefault();
    let cityName = event.target.Location.value;
    let key = `pk.a10de6b9367d6edc81178a904969c1de`;
    let Url = `https://eu1.locationiq.com/v1/search.php?key=${key}&q=${cityName}&format=json`;
   
    try{

      let local = await axios.get(Url);
      this.setState ({
        SelectCity : local.data[0].display_name,
       lon : local.data[0].lon,
       lat : local.data[0].lat,
       showMap : true
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
</>
);
 }}

export default App;
