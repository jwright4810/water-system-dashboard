import React from 'react';
import Header from './components/header';
import CurrentMoisture from './components/currentMoisture'; 
import WaterFlowControl from './components/waterFlowControl';
import './App.css';

class App extends React.Component {

  state = {
    currMoisture: 'Fetching...',
    lastRead: '',
    valveStatus: true
  }

  componentDidMount() {
    this.getMoisture(); 
    this.getValveStatus();
  }

  tranformDate = ( timeStamp ) => {

  }

  getMoisture = () => {
    fetch('http://water-system-service.zapto.org/api/v1/moisturePercent')
    .then(res => res.json())
    .then((data) => {
      const { moisturePercent, timeStamp } = data;
      this.setState({ 
        currMoisture: `${moisturePercent}%`,
        lastRead: timeStamp 
      })

    })
    .catch(console.log)
  }

  getValveStatus = () => {
    fetch('http://water-system-service.zapto.org/api/v1/valveStatus')
      .then(res => res.json())
      .then( data => {
        const { valveStatus } = data

        if ( valveStatus === 'on' ) {
          this.setState({ valveStatus: false });
        } else {
          this.setState({valveStatus: true });
        }
      })
      .catch(console.log)
  }

  handleValveToggle = () => {
    this.setState( currState => ({valveStatus: !currState.valveStatus}))

    const reqOpts = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: this.state.valveStatus ? 'on' : 'off' })
    }

    fetch('http://water-system-service.zapto.org/api/v1/valveController', reqOpts)
      .then( res => res.json())
      .then( data => {
        const { valveStatus } = data

        if ( valveStatus === 'on' ) {
          this.setState({ valveStatus: false });
        } else {
          this.setState({valveStatus: true });
        }
      })
}

  render() {
    return (
      <div className="App">
        <Header />
        <CurrentMoisture 
          currMoisture={ this.state.currMoisture }
          lastRead={ this.state.lastRead }
          getMoisture={ this.getMoisture }
        />
        <WaterFlowControl 
          valveStatus={this.state.valveStatus}
          handleValveToggle={this.handleValveToggle}
        />
      </div>
    );
  };
}

export default App;
