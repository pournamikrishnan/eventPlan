import React, {Component} from 'react';
import './Overview.css';
import { Link } from 'react-router-dom';
import {modelInstance} from '../data/EventModel';

let i;

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'INITIAL',
      morning: modelInstance.getMorning(),
      afternoon: modelInstance.getAfternoon(),
      evening: modelInstance.getEvening(),
    }

  }
  componentDidMount() {
    modelInstance.addObserver(this)
  }
  componentWillUnmount() {
    modelInstance.removeObserver(this)
  }

  update () {
    this.setState({
      morning: modelInstance.getMorning(),
      afternoon: modelInstance.getAfternoon(),
      evening: modelInstance.getEvening(),
    })

  }

  createNewDay = (e) => {
    localStorage.clear();
  }

  render() {
    const{morning} = this.state;
    const{afternoon} = this.state;
    const{evening} = this.state;

    for (i in morning) {
      console.log(morning[i])
    }

    return (
      <div className = "Overview">
      <div className="container">
        <div className='row' id='overviewHeader'>
          <div className='col-md-10'>
            <h2>Day of events</h2>
          </div>
          <div className='col-md-2 '>
          <Link to="/search">
            <button type="button" onClick={this.createNewDay} className="goBack btn btn-success ">Go Back and Edit</button>
          </Link>
          </div>
        </div>

          <div className='row' id='overviewEvents'>
          <div className='dishImage'>

              </div>

              <div className="col-sm-3" id="totalPrices">
              Total Price: <br/>
              <span id="PriceTxt">{Math.floor(modelInstance.getFullPrice())} SEK</span>
              </div>
          </div>

        <Link to="/printout">
          <button type="button" className="btn btn-success mt-4">Print Full Schedule</button>
        </Link>
</div>

      </div>
    )
  }
}

export default Overview;
