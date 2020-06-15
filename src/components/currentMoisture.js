import React from 'react'
import './currentMoisture.css';

class CurrentMoisture extends React.PureComponent {
    
    onButtonClick = () => {
        this.props.getMoisture();
    }

    render() {
        return (
          <div className='current-moisture'>
            <div className='moisture-readout'>
                Current Moisture
            </div>
            <div className='moisture-button' onClick={this.onButtonClick}>
                { this.props.currMoisture }
            </div>
        <span className='current-moisture-timeStamp'>{ `last read: ${this.props.lastRead}` }</span>
          </div>
        );
    }
}

export default CurrentMoisture; 