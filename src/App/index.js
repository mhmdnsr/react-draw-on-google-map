import React from 'react';

import Map from './map';
import ControlPanel from './control-panel';
import PowerButton from './power-button';
import ButtonsArea from './buttons-area';
import ColorPalette from './color-palette';
import Color from './color';
import {Consumer} from "./context";

class App extends React.Component {

    render() {
        return (

            <Consumer>
                {
                    ({states, actions}) => {
                        let controlPanel = <div/>;
                        if (states.isMapLoaded)
                            controlPanel =
                                <ControlPanel>
                                    <PowerButton/>
                                    <ButtonsArea/>
                                    <ColorPalette/>
                                    <Color/>
                                </ControlPanel>;
                        return (
                            <React.Fragment>
                                <Map context={{states, actions}}/>
                                {controlPanel}
                            </React.Fragment>
                        );
                    }
                }
            </Consumer>

        );
    }
}

export default App;