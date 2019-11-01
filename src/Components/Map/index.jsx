import React, {Component, Fragment} from "react";
import styles from "./styles.module.scss";
import config from "./config";

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
import Text from "ol/style/text";
import Fill from "ol/style/fill";
import Stroke from "ol/style/stroke";
import Icon from "ol/style/icon";

// import GeoJson from "ol/format/geojson";
import iconMark from './icons8-marker-30.png';

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            center: [546000, 6868000],
            zoom: 8,
            details: null,
            points: null,
            mno: 'All'
        };

        this.createMapObj();
    }

    componentDidMount() {
        this.getPointsData()
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

    getPointsData = () => {

        fetch('http://ec2-18-219-102-0.us-east-2.compute.amazonaws.com:3000/signalgps')
            .then(res => res.json())
            .then(data => this.setState({points: data}))
            .then(_ => this.renderPointsOnMap())
            .catch((e) => console.log(e))
    };

    addSingleMarker = (obj) => {
        // Latitude: "32.014417"
        // Longitude: "34.773997"
        // MNO: "Partner"
        // signal_strengh: "-93"
        // time: "28.10.2019"
        // type: "iphone 10"

        console.log(obj);
        var newCoord = proj.transform([+(obj.Longitude), +(obj.Latitude)], 'EPSG:4326', 'EPSG:3857');

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
            }),
            new Style({
                text: new Text({
                    text: obj.signal_strengh,
                    scale: 1.2,
                    offsetY: 15,
                    fill: new Fill({
                        color: "#fff"
                    }),
                    stroke: new Stroke({
                        color: "0",
                        width: 3
                    })
                })
            }),
        ];

        marker.setStyle(style1)

        var layer = new VectorLayer({
            source: new VectorSource({
                features: [marker]
            })
        });

        this.olmap.addLayer(layer);
    }

    renderPointsOnMap = () => {

        this.state.points.filter(item => item.MNO === this.state.mno || this.state.mno === 'All').map(item2 => item2.signal_strengh && this.addSingleMarker(item2))
    }

    createMapObj = () => {
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

        // this.vectorLayer = new VectorLayer({
        //     source: new VectorSource({
        //         url: 'https://openlayers.org/en/v4.2.0/examples/data/geojson/countries.geojson',
        //         format: new GeoJson()
        //     })
        // });
    }

    updateMap = () => {
        this.olmap.getView().setCenter(this.state.center);
        this.olmap.getView().setZoom(this.state.zoom);
    }

    updateToCurrentUserLocatiom = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                var newCoord = proj.transform([position.coords.longitude, position.coords.latitude], 'EPSG:4326', 'EPSG:3857');


                config.getAddressLocation(position.coords.longitude, position.coords.latitude)
                    .then((details) => {
                        this.setState({
                                currentUserLocation: newCoord,
                                center: newCoord,
                                zoom: 16,
                                details
                            }
                        );
                    })

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

    handleMnoChange = (e)=>{
        this.setState({mno: e.target.value}, ()=>{
            // var features = this.vectorLayer.getSource().getFeatures();
            // features.forEach((feature) => {
            //     this.vectorLayer.getSource().removeFeature(feature);
            // });

            this.renderPointsOnMap()
        })

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

                {this.state.details &&
                <div className={styles.detailsContainer}>
                    <h2>Details:</h2>
                    <div>
                        <div>City: {this.state.details.city}</div>
                        <div>Country: {this.state.details.country}</div>
                    </div>
                </div>
                }

                {this.state.points ?
                    <p>YES POINTS!</p>
                    :
                    <p>No POINTS!</p>
                }

                {this.state.points &&
                <select value={this.state.mno} onChange={this.handleMnoChange}>
                    <option value="All">All</option>
                    <option value="Partner">Partner</option>
                    <option value="Pelephone">Pelephone</option>
                    <option value="012 Mobile">012 Mobile</option>
                </select>
                }

            </Fragment>
        );
    }
}

export default Map;
