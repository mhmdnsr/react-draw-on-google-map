import React from 'react';
import {easing, tween, styler} from 'popmotion';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {Consumer} from "./context";


class ControlButton extends React.Component {
    state = {
        rendered: false
    };

    componentDidMount() {
        this.buttonStyler = styler(document.getElementById(this.props.id));
        this.setState({
            rendered: true
        })
    }

    onAnimation(onComplete) {
        tween({
            from: {x: 0, y: 0, opacity: 0},
            to: {x: this.props.left - 115, y: this.props.top - 15, opacity: 1},
            duration: 1000,
            ease: easing.easeIn,
        }).start({
            complete: () => {
                onComplete()
            },
            update: this.buttonStyler.set
        });
    }

    offAnimation(onComplete) {
        tween({
            from: {x: this.props.left - 115, y: this.props.top - 15, opacity: 1},
            to: {x: 0, y: 0, opacity: 0},
            duration: 1000,
            ease: easing.circOut,
        }).start({
            complete: () => {
                onComplete()
            },
            update: this.buttonStyler.set
        });
    }

    render() {
        const {icon, id, onClick} = this.props;
        return (
            <Consumer>
                {({states, actions}) => {
                    if (this.state.rendered && states.powerClicked) {
                        if (states.isOn)
                            this.onAnimation(() => {
                                actions.powerClicked(false);
                            });
                        else
                            this.offAnimation(() => {
                                actions.powerClicked(false);
                            })
                    }
                    return (
                        <FontAwesomeIcon
                            onClick={e => {
                                if (!states.isOn)
                                    return false;
                                onClick(e);
                            }}
                            opacity={0}
                            icon={icon}
                            id={id}
                            style={{
                                width: 20,
                                height: 20,
                                top: 15,
                                left: 115,
                                borderRadius: 20,
                                padding: 10,
                                color: "#ffffff",
                                backgroundColor: "#f00000",
                                position: "absolute",
                                cursor: states.isOn ? "pointer" : "default",
                            }}
                        />
                    )
                }}
            </Consumer>
        );
    }
}

export default ControlButton;