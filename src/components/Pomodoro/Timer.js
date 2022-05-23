import React, { Component } from 'react';
import './Timer.css';

export default class Timer extends Component {
    constructor(){
        super();

        //initialState
        this.state = {
            alert:{
                type:'',
                message:'',
            }, 
            play: true,
            time: 0
        };

        this.times ={
            defaultTime: 1500, //25 min
            shortBreak: 300, // 5 min
            longBreak: 900, // 15 min
        }

        this.playIcon = 'fa-pause';
        this.active = '';
    }


    componentDidMount(){

        //establece tiempo por defecto cuando el componente sea montado
        this.setDefaultTime()
    }

    setDefaultTime() {
        this.setState({
            time: this.times.defaultTime
        })
    }

    //buttons
    setTimeForWork = () => {
        this.setState({
            alert: {
                type: 'work',
                message: 'Working!'    
            },
        })
        
        this.active = 'active';
        this.setTime(this.times.defaultTime);

        if(!this.state.play)
            this.pauseTime();

    }
    setTimeForShortBreak = () => {
        this.setState({
            alert: {
                type: 'shortBreak',
                message: 'Short Break!'    
            }
        })
        
        this.active = 'active';
        this.setTime(this.times.shortBreak);
        if(!this.state.play)
            this.pauseTime();
    }
    setTimeForLongBreak = () => {
        this.setState({
            alert: {
                type: 'longBreak',
                message: 'Long Break!'    
            }
        })

        this.active = 'active';
        this.setTime(this.times.longBreak);
        if(!this.state.play)
            this.pauseTime();
    }

    setTime = (newTime) => {
        this.restartInterval();
        this.setState({
            time: newTime,
        })
    }


    pauseTime = () => {
        this.setState({ play: !this.state.play });

        this.playIcon = (!this.state.play) ? 'fa-pause' : 'fa-play';
        console.log('Pausa');
    }

    restartState = () => {
        this.setState(
            {
                alert:{
                    type:'',
                    message:'',
                }, 
                play: true,
                time: this.times.defaultTime
            }
        ) 

        this.active = '';

        clearInterval(this.interval);
    }

    restartInterval = () => {
        clearInterval(this.interval);

        this.interval = setInterval(this.countDown, 1000);
    }

    countDown = () => {
        if(this.state.time === 0)
        {
            this.setState({
                alert: {
                    type: 'Beep',
                    message: 'Beeeeeeeeeep'
                }
            });
        }
        else if(this.state.play) this.setState({ time: this.state.time - 1 });
        else this.setState({ time: this.state.time });
        console.log(this.state.play)
    }

    displayTimer(seconds){
        let m = Math.floor((seconds / 60) % 60);
        m = ( m < 10 ) ? '0' + m : m;

        let s = seconds % 60;
        s = ( s < 10 ) ? '0' + s : s;
        
        return `${m} : ${s}`;
    }

  render() {
      const {alert:{message, type}, time} =this.state;
    return (
      <div className = "Pomodoro">
          <div className='pomodoroText'>
            <h1>Pomodoro</h1>

          </div>
          <div className = {`alert ${type}`}>
                {message}
          </div>

          <div className = {`timer ${type}`}>
                {this.displayTimer(time)}
          </div>

          <div className = "types">
              <button 
                className = "start"
                onClick= {this.setTimeForWork}
              > 
                    Start Working
              </button>
              <button 
                className = "short"
                onClick= {this.setTimeForShortBreak}
                > 
                Short Break
              </button>
              <button 
                className = "long"
                onClick= {this.setTimeForLongBreak}
                > 
                Long Break
              </button>
          </div>
          <div className={`controls ${this.active}`}>
                <button 
                className = {`play fa ${this.playIcon}`}
                onClick= { this.pauseTime }
                /> 
                <button 
                className = "fa fa-stop"
                onClick= {this.restartState}
                /> 
               
          </div>
      </div>
    )
  }
}
