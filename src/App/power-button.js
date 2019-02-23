import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPowerOff} from "@fortawesome/free-solid-svg-icons";

import {Consumer} from "./context";

class PowerButton extends React.Component {
    render() {
        return (
            <Consumer>
                {({states, actions}) => {
                    return (
                        <FontAwesomeIcon
                            icon={faPowerOff}
                            onClick={() => {
                                actions.toggleOnOff();
                                actions.powerClicked(true);
                                if (states.draw) {
                                    if (!states.isOn) {
                                        states.draw.holdMap();
                                        if(states.tool !== null)
                                            states.tool.startDraw();
                                    } else {
                                        states.draw.releaseMap();
                                        if(states.tool !== null)
                                            states.tool.stopDraw();
                                    }
                                }
                            }}
                            style={{
                                width: 30,
                                height: 30,
                                padding: 10,
                                borderRadius: 25,
                                color: "#ffffff",
                                zIndex: 200000000,
                                backgroundColor: states.isOn ? "#228B22" : "#B22222",
                                position: "absolute",
                                cursor: "pointer",
                                top: 75,
                                left: 75
                            }}
                        />
                    );
                }}
            </Consumer>
        );
    }
}

export default PowerButton;