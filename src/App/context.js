import React from 'react';

const Context = React.createContext();

export class Provider extends React.Component{
    state = {
        isOn: false,
        isMapLoaded: false,
        powerClicked: false,
        draw: null,
        color: '#ffffff',
        tool: null
    };

    toggleOnOff = () => {
        this.setState(prev => {
            return ({
                isOn: !prev.isOn
            });
        })
    };

    powerClicked = state => {
        this.setState({
            powerClicked: state
        });
    };

    mapLoaded = () => {
        this.setState({
            isMapLoaded: true
        })
    };

    setMapDraw = draw => {
        this.setState({
            draw: draw
        })
    };

    setColor = color => {
        this.setState({
            color: color
        });
    };

    setTool = tool => {
      this.setState({
          tool: tool
      })
    };

    render() {
        return(
            <Context.Provider value={{
                states: {
                    isOn: this.state.isOn,
                    isMapLoaded: this.state.isMapLoaded,
                    powerClicked: this.state.powerClicked,
                    draw: this.state.draw,
                    color: this.state.color,
                    tool: this.state.tool
                },
                actions: {
                    toggleOnOff: this.toggleOnOff,
                    powerClicked: this.powerClicked,
                    mapLoaded: this.mapLoaded,
                    setMapDraw: this.setMapDraw,
                    setColor: this.setColor,
                    setTool: this.setTool
                }
            }}>
                {this.props.children}
            </Context.Provider>
        );
    }
}

export const Consumer = Context.Consumer;