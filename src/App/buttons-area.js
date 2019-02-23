import React from 'react';
import {faPaintBrush, faDrawPolygon, faMapMarker, faTrashAlt} from "@fortawesome/free-solid-svg-icons";

import ControlButton from './control-button';
import {Consumer} from "./context";

class ButtonsArea extends React.Component {
    state = {
        selected: null,
        buttons: {}
    };

    componentDidMount() {
        let buttons = {
            brush: document.getElementById('brush'),
            polygon: document.getElementById('polygon'),
            marker: document.getElementById('marker'),
        };
        this.setState({
            buttons: buttons
        });
    }

    setSelected = target => {
        this.setState({
            selected: target
        });
    };

    clickHandler = (tool, callback) => {
        let clicked = this.state.buttons[tool];
        if (!clicked)
            return;
        if (this.state.selected !== clicked) {
            this.setSelected(clicked);
            clicked.style.backgroundColor = "#43b70f";
            callback.start();
            for (let t in this.state.buttons) {
                let button = this.state.buttons[t];
                if (button !== clicked)
                    button.style.backgroundColor = "#f00000";
            }
        } else {
            this.setSelected(null);
            clicked.style.backgroundColor = "#f00000";
            callback.stop();
        }
    };

    render() {
        return (
            <Consumer>
                {({states, actions}) => {
                    return (
                        <React.Fragment>
                            <ControlButton
                                onClick={e => {
                                    let callback = {};
                                    callback.start = () => {
                                        states.draw.brush.startDraw();
                                        actions.setTool(states.draw.brush);
                                    };
                                    callback.stop = () => {
                                        states.draw.brush.stopDraw();
                                        actions.setTool(null);
                                    };
                                    this.clickHandler('brush', callback)
                                }}
                                id={'brush'}
                                icon={faPaintBrush}
                                top={15}
                                left={115}
                            />
                            <ControlButton
                                onClick={e => {
                                    let callback = {};
                                    callback.start = () => {
                                        states.draw.polygon.startDraw();
                                        actions.setTool(states.draw.polygon);
                                    };
                                    callback.stop = () => {
                                        states.draw.polygon.stopDraw();
                                        actions.setTool(null);
                                    };
                                    this.clickHandler('polygon', callback)
                                }}
                                id={'polygon'}
                                icon={faDrawPolygon}
                                top={55}
                                left={147}
                            />
                            <ControlButton
                                onClick={e => {
                                    let callback = {};
                                    callback.start = () => {
                                        states.draw.marker.startDraw();
                                        actions.setTool(states.draw.marker);
                                    };
                                    callback.stop = () => {
                                        states.draw.marker.stopDraw();
                                        actions.setTool(null);
                                    };
                                    this.clickHandler('marker', callback)
                                }}
                                id={'marker'}
                                icon={faMapMarker}
                                top={105}
                                left={148}
                            />
                            <ControlButton
                                onClick={() => {
                                    states.draw.clearAllArt();
                                }}
                                id={'clear'}
                                icon={faTrashAlt}
                                top={143}
                                left={113}
                            />
                        </React.Fragment>
                    );
                }}
            </Consumer>
        );
    }
}

export default ButtonsArea;