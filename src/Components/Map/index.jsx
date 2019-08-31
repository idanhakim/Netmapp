import React, {Component} from "react";
import styles from "./styles.module.scss";
import OlMap from "ol/map";
import OlView from "ol/view";
import OlLayerTile from "ol/layer/tile";
import OlSourceOSM from "ol/source/osm";
import proj from "ol/proj";


class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            center: [546000, 6868000],
            zoom: 8
        };



        this.olmap = new OlMap({
            target: null,
            layers: [
                new OlLayerTile({
                    source: new OlSourceOSM()
                })
            ],
            view: new OlView({
                center: this.state.center,
                zoom: this.state.zoom
            })
        });
    }

    updateMap() {
        this.olmap.getView().setCenter(this.state.center);
        this.olmap.getView().setZoom(this.state.zoom);
    }

    componentDidMount() {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log('---- Success to find your current location!!! ----')
                var newCoord = proj.transform([position.coords.longitude,position.coords.latitude], 'EPSG:4326', 'EPSG:3857');
                this.setState({
                        center: newCoord,
                        zoom: 14
                    }
                );
            });
        }
        this.olmap.setTarget("map");

        // Listen to map changes
        this.olmap.on("moveend", () => {
            let center = this.olmap.getView().getCenter();
            let zoom = this.olmap.getView().getZoom();
            this.setState({center, zoom});
        });

        // this.olmap.on('click', function(e) {
        //     // alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
        //     console.log(e)
        // });
    }

    shouldComponentUpdate(nextProps, nextState) {
        let center = this.olmap.getView().getCenter();
        let zoom = this.olmap.getView().getZoom();
        if (center === nextState.center && zoom === nextState.zoom) return false;
        return true;
    }

    userAction() {
        this.setState({center: [546000, 6868000], zoom: 10});
    }

    render() {
        this.updateMap(); // Update map on render?
        return (
            <div id="map" className={styles.rootMap}>
                <button onClick={e => this.userAction()}>Go To Point</button>
            </div>
        );
    }
}

export default Map;
