import React from 'react';
import {styler, transform, listen, schedule, pointer, everyFrame, value} from 'popmotion';

class ControlPanel extends React.Component{

    componentDidMount() {
        let ball = this.refs.ball;
        let ballXY = value({x: 0, y: 0}, styler(ball).set);
        let smoothXY = transform.transformMap({
            x: transform.smooth(200),
            y: transform.smooth(200)
        });
        listen(ball, 'mousedown touchstart').start(() =>
            schedule(everyFrame(), pointer(ballXY.get()))
                .pipe(smoothXY)
                .start(ballXY)
        );

        listen(document, 'mouseup touchend')
            .start(() => {
                ballXY.stop();
            });
    }

    render() {
        return (
            <div
                ref= "ball"
                style={{
                    width: 200,
                    height: 200,
                    borderRadius: 100,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundColor: "rgba(200, 200, 200, 1)",
                }}>
                <div
                    style={{
                        position: "relative",
                    }}
                >
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default ControlPanel;