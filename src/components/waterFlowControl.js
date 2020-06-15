import React from 'react';
import './waterFlowControl.css'; 

class WaterFlowControl extends React.Component {

    render() {
        return (
            <div className='water-flow-control'>
                <div className='water-flow-control-header'>
                    Water Flow Control
                </div>
                <div className='water-flow-control-toggle'>
                        <div className='button r button-1'>
                            <input 
                                type='checkbox' 
                                className='checkbox'
                                checked={this.props.valveStatus}
                                onChange={this.props.handleValveToggle}
                            />
                            <div className='knobs'></div>
                            <div className='layer'></div>
                        </div>
                </div>
            </div>
        ); 
    };
};

export default WaterFlowControl; 
