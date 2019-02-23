import React from 'react';
import {easing, tween, styler} from 'popmotion';

import {Consumer} from "./context";

class ColorPalette extends React.Component {
    state = {
        rendered: false,
    };

    paletteColors = (ctx, width) => {
        let gradient = ctx.createLinearGradient(0, 0, width, 0);
        gradient.addColorStop(1 / 9, "rgb(255,   255,   255)");
        gradient.addColorStop(2 / 9, "rgb(255,   0,   0)");
        gradient.addColorStop(3 / 9, "rgb(255,   0, 255)");
        gradient.addColorStop(4 / 9, "rgb(0,     0, 255)");
        gradient.addColorStop(5 / 9, "rgb(0,   255, 255)");
        gradient.addColorStop(6 / 9, "rgb(0,   255,   0)");
        gradient.addColorStop(7 / 9, "rgb(255, 255,   0)");
        gradient.addColorStop(8 / 9, "rgb(255,   0,   0)");
        gradient.addColorStop(1, "rgb(0,   0,   0)");

        return gradient;
    };

    createCanvas = () => {
        this.ctx = this.canvas.getContext('2d');
        this.ctx.beginPath();
        this.ctx.arc(100, 100, 70, 1.5 * Math.PI, 0.5 * Math.PI, true);
        this.ctx.lineWidth = 60;
        this.ctx.strokeStyle = this.paletteColors(this.ctx, 100);
        this.ctx.stroke();
    };

    getClickedPos = obj => {
        let curleft = 0, curtop = 0;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj === obj.offsetParent);
            return {x: curleft, y: curtop};
        }
        return undefined;
    };

    fromRGBToHex = (r, g, b) => {
        if (r > 255 || g > 255 || b > 255)
            throw "Invalid color component";
        return ((r << 16) | (g << 8) | b).toString(16);
    };

    getColor = e => {
        let pos = this.getClickedPos(e.target);
        let x = e.pageX - pos.x;
        let y = e.pageY - pos.y;
        let c = e.target.getContext('2d');
        let p = c.getImageData(x, y, 1, 1).data;
        return this.fromRGBToHex(p[0], p[1], p[2]).slice(-6);
    };

    componentDidMount() {
        this.canvas = document.getElementById('canvas');
        this.canvasStyler = styler(this.canvas);
        this.setState({
            rendered: true
        });
        this.createCanvas();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {isOn} = this.props;
        if (nextProps.isOn !== isOn)
            this.setState({
                on: nextProps.isOn
            });
    }

    onAnimation() {
        tween({
            from: {width: 0, x: 75, y: 75, opacity: 0},
            to: {width: 100, x: 0, y: 0, opacity: 1},
            duration: 1000,
            ease: easing.easeIn,
        }).start(this.canvasStyler.set);
    }

    offAnimation() {
        tween({
            from: {width: 100, x: 0, y: 0, opacity: 1},
            to: {width: 0, x: 75, y: 75, opacity: 0},
            duration: 1000,
            ease: easing.circOut,
        }).start(this.canvasStyler.set);
    }

    render() {
        return (
            <Consumer>
                {({states, actions}) => {
                    if (this.state.rendered && states.powerClicked) {
                        if (states.isOn)
                            this.onAnimation();
                        else
                            this.offAnimation()
                    }
                    return (
                        <canvas
                            onTouchStart={e => {
                                if (!states.isOn)
                                    return false;
                                let color = this.getColor(e);
                                if (color && color != 0) {
                                    states.draw.changeColor('#' + color);
                                    actions.setColor('#' + color);
                                }
                            }}
                            onClick={e => {
                                if (!states.isOn)
                                    return false;
                                let color = this.getColor(e);
                                if (color && color != 0) {
                                    states.draw.changeColor('#' + color);
                                    actions.setColor('#' + color);
                                }
                            }}
                            id="canvas"
                            height={100}
                            width={100}
                            style={{opacity: 0, cursor: 'default'}}
                        />
                    );
                }}
            </Consumer>
        )
            ;
    }
}

export default ColorPalette;