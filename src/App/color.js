import React from 'react';
import {easing, tween, styler} from 'popmotion';
import {Consumer} from "./context";

class Color extends React.Component {
    state = {
        rendered: false
    };

    componentDidMount() {
        this.buttonStyler = styler(document.getElementById('color'));
        this.setState({
            rendered: true
        })
    }

    onAnimation() {
        tween({
            from: {opacity: 0},
            to: {opacity: 1},
            duration: 1000,
            ease: easing.easeIn,
        }).start({
            update: this.buttonStyler.set
        });
    }

    offAnimation() {
        tween({
            from: {opacity: 1},
            to: {opacity: 0},
            duration: 1000,
            ease: easing.circOut,
        }).start({
            update: this.buttonStyler.set
        });
    }

    render() {
        return(
            <Consumer>
                {({states, actions}) => {
                    if (this.state.rendered && states.powerClicked) {
                        if (states.isOn)
                            this.onAnimation();
                        else
                            this.offAnimation()
                    }
                    return(
                        <div
                            id="color"
                            style={{
                                width: 20,
                                height: 20,
                                padding: 10,
                                borderRadius: 20,
                                zIndex: 200000000,
                                backgroundColor: states.color,
                                position: "absolute",
                                top: 135,
                                left: 35,
                                opacity: 0
                            }}
                        />
                    );
                }}
            </Consumer>
        );
    }
}

export default Color;