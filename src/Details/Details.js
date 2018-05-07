import React, {Component} from 'react';
import './Details.css';
import { Link } from 'react-router-dom';
import {modelInstance} from '../data/EventModel';
import Sidebar from '../Sidebar/Sidebar';
import WhereWhen from '../WhereWhen/WhereWhen';


class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'INITIAL',
      eventDetails: []
    };
  }

loadData(props) {
  modelInstance.getEventDetails(modelInstance.getId()).then(eventDetail =>
    this.setState({
      status: 'LOADED',
      eventDetails: eventDetail
      })).catch(error =>
        this.setState({
          status: 'ERROR'
        }))

  }

  componentDidMount = (props) => {
    modelInstance.addObserver(this);
    this.loadData(props)
    }

  componentWillUnmount = () => {
    modelInstance.removeObserver(this)
  }

  update() {
    this.setState({
      eventDetails: this.state.eventDetails
    })
  }


  render() {
    switch (this.state.status) {
      case 'INITIAL':

        return(
          <div className='Details'>
          <center>
            <div className="loader"> </div>
          </center>
          </div>
        )
        break;

      case 'LOADED':
      const {eventDetails} = this.state


      localStorage.setItem('ED', JSON.stringify(this.state));
      let eventDetails2 = JSON.parse(localStorage.getItem("ED")).eventDetails;
        return (
          <div>
            <div className ="Details">
              <nav>
                <div className="row">
                  <div className= 'col-lg-3 col-md-3 col-sm-3 col-xs-0'>
                  </div>
                  <div className= 'col-lg-5 col-md-5 col-sm-5 col-xs-12'>
                    <ul className="list-group">
                      <li className="list-group-item"><b></b><h4>{eventDetails2._embedded.events[0].name}</h4></li>
                      <img alt='eventImg' id='eventImg' src={eventDetails2._embedded.events[0].images[0].url}></img>

                      <li className="list-group-item"><b>Venue: </b>{eventDetails2._embedded.events[0]._embedded.venues[0].name}<br/></li>
                      <li className="list-group-item"><b>City: </b>{eventDetails2._embedded.events[0]._embedded.venues[0].city.name}<br/></li>
                      <li className="list-group-item"><b>State: </b>{eventDetails2._embedded.events[0]._embedded.venues[0].state.name}<br/></li>
                      <li className="list-group-item"><b>Time: </b>{eventDetails2._embedded.events[0].dates.start.localTime}<br/></li>
                      <li className="list-group-item"><b>Date: </b>{eventDetails2._embedded.events[0].dates.start.localDate}<br/></li>
                      <li className="list-group-item"><a href={eventDetails2._embedded.events[0].url} target='_blank'><b>Visit website</b></a><br/></li>
                    </ul>

                    <Link to="/wherewhen">
                        <center>
                          <button className="backHome btn btn-success mt-5 btn-l"><i className="fa fa-angle-left"></i> Back to Search</button>
                        </center>
                    </Link>
                  </div>
                  <div className= 'col-lg-3 col-md-3 col-sm-3 col-xs-0'>
              </div>


                </div>
              </nav>
              </div>

          </div>
        )

        break;
      default:
          return (
              <div className='Details'>
                  <div id='details' className='col-sm-8'>
                    <div className='failed'> <b>Failed to load data, please try again</b> </div>
                  </div>
              </div>
            )
       break;
    }


    return (

  <nav className="classnavbar navbar-light">
      <div className="Details">
      </div>
  </nav>
    )
  }
}

export default Details;
