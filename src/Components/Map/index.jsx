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

import iconMark from './markers-images/icons8-marker-30.png';
import signalMark from './markers-images/signal-marker.png';

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            center: [546000, 6868000],
            zoom: 8,
            details: null,
            points: null,
            pointsLayers: [],
            mno: 'All',
            model: 'All'
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

        var newCoord = proj.transform([+(obj.Longitude), +(obj.Latitude)], 'EPSG:4326', 'EPSG:3857');

        var marker = new Feature({
            geometry: new Point(newCoord),
        });

        var style1 = [
            new Style({
                image: new Icon(({
                    scale: 0.8,
                    rotateWithView: false,
                    anchor: [0.5, 1],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'fraction',
                    opacity: 1,
                    src: signalMark
                })),
                zIndex: 5
            }),
            new Style({
                image: new Circle({
                    radius: 5,
                    fill: new Fill({
                        color: config.mnoColors[obj.MNO] ? config.mnoColors[obj.MNO] : 'rgba(255,255,255,1)'
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

        this.setState((prevState, prevProps) => ({
            pointsLayers: [...prevState.pointsLayers, layer] // save layer point in array
        }));

        this.olmap.addLayer(layer);

    }

    renderPointsOnMap = () => {
        const {addSingleMarker, state: {points, mno, model}} = this;

        const isDuplicatedPoint = (currentPoint, arr) =>{
            return arr.some(item2 => {
               return (item2.Latitude === currentPoint.Latitude &&
                    item2.Longitude === currentPoint.Longitude &&
                    item2.MNO === currentPoint.MNO
                   ) ||
                   (Math.abs((currentPoint.Longitude) - (item2.Longitude)) < 0.00001 && item2.MNO === currentPoint.MNO)  ||
                   (Math.abs((currentPoint.Latitude) - (item2.Latitude)) < 0.00001 && item2.MNO === currentPoint.MNO)
            })
        };

        const filterArr2 = points.reduce((acc, item)=>{
            if ((item.MNO === mno || mno === 'All') &&
                (item.type === model || model === 'All') &&
                (!isNaN(+item.signal_strengh)) &&
                (!isDuplicatedPoint(item, acc))&&
                (item.signal_strengh !== null)
            ){
                return [...acc, item]
            }
            return acc;
        },[]);
        console.log(filterArr2);

        filterArr2.map(item2 => item2.signal_strengh && addSingleMarker(item2))
    };

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
    };

    updateMap = () => {
        const {olmap, state: {zoom, center}} = this;

        const currentCenter = olmap.getView().getCenter();
        const currentZoom = olmap.getView().getZoom();

        currentZoom !== zoom && olmap.getView().setZoom(zoom);
        currentCenter !== center && olmap.getView().setCenter(center);
    };

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
        this.setState({center: this.state.currentUserLocation})
    };

    handleChangeZoom = (type) => {
        this.setState(prevState => ({
            zoom: type === '+' ? prevState.zoom + 1 : prevState.zoom - 1
        }))
    };

    shouldComponentUpdate(nextProps, nextState) {
        // let center = this.olmap.getView().getCenter();
        // let zoom = this.olmap.getView().getZoom();
        // if (center === nextState.center && zoom === nextState.zoom) return false;
        return true;
    }


    renderMap = () => {

        const {handleGoMyLocation, handleChangeZoom, state: {currentUserLocation}} = this;
        return (
            <div id="map" className={styles.mapElement}>
                {currentUserLocation &&
                <button className={styles.btnGoMyLocation} onClick={handleGoMyLocation}>
                    My Location
                </button>
                }
                <div className={styles.zoomContainer}>
                    <button onClick={() => handleChangeZoom('+')}>+</button>
                    <button onClick={() => handleChangeZoom('-')}>-</button>
                </div>
            </div>
        );
    }

    renderFilters = () => {
        const {state: {points, mno, model}} = this;

        const handleMnoChange = (e) => {
            this.setState({mno: e.target.value, model: 'All'}, () => {
                this.clearPoints()
                this.renderPointsOnMap()
            })
        }

        const handleModelChange = (e) => {
            this.setState({model: e.target.value}, () => {
                this.clearPoints()
                this.renderPointsOnMap()
            })
        }

        const getMnoOptions = () => {
            return (
                points && [...new Set(points.reduce((acc, item) => {
                    if (item.MNO) {
                        return [...acc, item.MNO.charAt(0).toUpperCase() + item.MNO.slice(1)]
                    }
                    return acc;
                }, []))].map((item, i) => <option key={i} value={item}>{item}</option>)
            );
        };

        const getModelsOptions = () => {
            return (
                points && [...new Set(points.reduce((acc, item) => {
                    if (item.type && (item.MNO === this.state.mno || this.state.mno === 'All')) {
                        return [...acc, item.type]
                    }
                    return acc;
                }, []))].map((item, i) => <option key={i} value={item}>{item}</option>)
            );
        };

        return (
            <div className={styles.filtersContainer}>
                <div>
                    <label className={`${!points ? styles.disabled : ''}`}>Network:</label>
                    <select value={mno} onChange={handleMnoChange} disabled={!points}>
                        <option value="All">All</option>
                        {getMnoOptions()}
                    </select>
                </div>
                <div>
                    <label className={`${!points ? styles.disabled : ''}`}>Model:</label>
                    <select value={model} onChange={handleModelChange} disabled={!points}>
                        <option value="All">All</option>
                        {getModelsOptions()}
                    </select>
                </div>
            </div>
        );
    }

    renderSummary = () => {
        const {pointsLayers, mno, points} = this.state;

        return (
            <div className={styles.summaryContainer}>
                {points ?
                    `Showing ${pointsLayers.length} points - ${mno === 'All' ? 'All Cellular networks' : mno + ' network'}!`
                    :
                    'Loading points from server...'
                }
            </div>
        );
    }

    clearPoints = () => {
        this.state.pointsLayers.forEach(item => this.olmap.removeLayer(item))
        this.setState({pointsLayers: []})
    };

    render() {
        const {
            renderMap, renderFilters, renderSummary,
            state: {details, points}
        } = this;

        this.updateMap(); // Update map on render?
        return (
            <Fragment>

                {renderSummary()}

                {renderFilters()}

                {renderMap()}

                {details &&
                <div className={styles.detailsContainer}>
                    <h2>Details:</h2>
                    <div>
                        <div>City: {this.state.details.city}</div>
                        <div>Country: {this.state.details.country}</div>
                    </div>
                </div>
                }


            </Fragment>
        );
    }
}

export default Map;
