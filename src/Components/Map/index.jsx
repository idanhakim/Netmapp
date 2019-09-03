import React, {Component, Fragment} from "react";
import styles from "./styles.module.scss";
import OlMap from "ol/map";
import OlView from "ol/view";
import OlLayerTile from "ol/layer/tile";
import OlSourceOSM from "ol/source/osm";
import proj from "ol/proj";
import Feature from "ol/feature";
import Point from "ol/geom/point";
import VectorSource from "ol/source/vector";
import VectorLayer from "ol/layer/vector";
import Style from "ol/style/style";

import Circle from "ol/style/circle";
import Fill from "ol/style/fill";
import Stroke from "ol/style/stroke";
import Icon from "ol/style/icon";

import iconMark from './icons8-marker-30.png';

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            center: [546000, 6868000],
            zoom: 8
        };

        this.olmap = new OlMap({
            target: 'null',
            loadTilesWhileAnimating: true,
            loadTilesWhileInteracting: true,
            layers: [
                new OlLayerTile({
                    source: new OlSourceOSM()
                })
            ],
            view: new OlView({
                center: this.state.center,
                zoom: this.state.zoom,
            })
        });
    }

    updateMap() {
        this.olmap.getView().setCenter(this.state.center);
        this.olmap.getView().setZoom(this.state.zoom);
    }

    componentDidMount() {
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

        this.updateToCurrentUserLocatiom();
    }

    updateToCurrentUserLocatiom() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                // alert('Success to find your current location!!!')
                var newCoord = proj.transform([position.coords.longitude, position.coords.latitude], 'EPSG:4326', 'EPSG:3857');
                this.setState({
                        currentUserLocation: newCoord,
                        center: newCoord,
                        zoom: 16
                    }
                );

                // Add marker on map - current position!

                var marker = new Feature({
                    geometry: new Point(newCoord),
                });

                var style1 = [
                    new Style({
                        image: new Icon(({
                            scale: 1,
                            rotateWithView: false,
                            anchor: [0.5, 1],
                            anchorXUnits: 'fraction',
                            anchorYUnits: 'fraction',
                            opacity: 1,
                            src: iconMark
                        })),
                        zIndex: 5
                    }),
                    new Style({
                        image: new Circle({
                            radius: 5,
                            fill: new Fill({
                                color: 'rgba(255,255,255,1)'
                            }),
                            stroke: new Stroke({
                                color: 'black'
                            })
                        })
                    })
                ];

                marker.setStyle(style1)

                var layer = new VectorLayer({
                    source: new VectorSource({
                        features: [marker]
                    })
                });

                this.olmap.addLayer(layer);

            });
        }
    }

    handleGoMyLocation = () => {
        this.setState({
            center: this.state.currentUserLocation
        })
    };

    handleChangeZoom = (type) => {
        this.setState(prevState => ({
            zoom: type === '+' ? prevState.zoom + 1 : prevState.zoom - 1
        }))
    };

    shouldComponentUpdate(nextProps, nextState) {
        let center = this.olmap.getView().getCenter();
        let zoom = this.olmap.getView().getZoom();
        if (center === nextState.center && zoom === nextState.zoom) return false;
        return true;
    }

    render() {
        this.updateMap(); // Update map on render?
        return (
            <Fragment>
                <div id="map" className={styles.mapElement}>
                    {this.state.currentUserLocation &&
                    <button className={styles.btnGoMyLocation} onClick={this.handleGoMyLocation}>
                        My Location
                    </button>
                    }
                    <div className={styles.zoomContainer}>
                        <button onClick={() => this.handleChangeZoom('+')}>+</button>
                        <button onClick={() => this.handleChangeZoom('-')}>-</button>
                    </div>
                </div>
            </Fragment>

        );
    }
}

export default Map;
