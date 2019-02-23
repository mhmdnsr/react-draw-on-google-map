import React from 'react';
import MapDraw from "draw-on-google-maps";

class Map extends React.Component {

    getGoogleLib = () => {
        if (!window.google) {
            let s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = `https://maps.google.com/maps/api/js?key=AIzaSyAV0kZUNpPO_1wyb8fWdIPiHdv626C2P3k&libraries=drawing`;
            let x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
            s.addEventListener('load', e => {
                this.onScriptLoad()
            })
        } else {
            this.onScriptLoad()
        }
    };

    getMap = () => {
        return new window.google.maps.Map(
            this.map_element,
            {
                center: {lat: 30.143283200000003, lng: 31.324569599999997},
                zoom: 7,
                disableDoubleClickZoom: false,
                fullscreenControl: false,
                mapTypeControl: false,
                panControl: false,
                rotateControl: false,
                scaleControl: false,
                streetViewControl: false,
                zoomControl: false,
            });
    };

    onScriptLoad = () => {
        const map = this.getMap();
        let draw = new MapDraw(map);
        window.google.maps.event.addListenerOnce(map, 'idle', () => {
            this.actions.mapLoaded();
            this.actions.setMapDraw(draw);
            this.props.context.states.draw.marker.changeIcon('colorful');
            this.props.context.states.draw.polygon.changeOpacity(0.5);
        });
    };

    componentDidMount() {
        this.actions = this.props.context.actions;
        this.map_element = this.refs.map;
        this.getGoogleLib();
    }

    render() {
        return (
            <div style={{
                width: window.innerWidth,
                height: window.innerHeight,
                overflow: 'hidden'
            }} id='map' ref="map"/>
        );
    }
}

export default Map;