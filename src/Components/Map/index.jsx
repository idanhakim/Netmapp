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
// import signalMark from './markers-images/signal-marker.png';

const NUMBER_OF_TRY = 4;

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            center: [546000, 6868000],
            currentUserLocation: null,
            zoom: 8,
            details: null,
            points: null,
            pointsLayers: [],
            mno: 'All',
            model: 'All',
            paintPointBy: 'Network',
            filterTime: '24'
        };

        this.createMapObj();

        this.dbTry = 0;
    }

    componentDidMount() {
        this.updateToCurrentUserLocatiom();
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

    getPointsData = () => {
        fetch(`http://ec2-18-219-102-0.us-east-2.compute.amazonaws.com:3000/signalgps/${this.state.filterTime !== '' ? `interval?intervalInHours=${this.state.filterTime}` : ''}`)
            .then(res => res.json())
            .then(data => this.setState({points: data}))
            .then(_ => this.renderPointsOnMap())
            .catch((e) => console.log(e))
    };

    addSingleMarker = (obj) => {
        const getPointColor = () =>{
            if (this.state.paintPointBy === 'Network'){
                return config.mnoColors[obj.MNO] ? config.mnoColors[obj.MNO] : 'rgba(255,255,255,1)'
            }else {
                if (obj.signal_strengh > -70){
                    return 'rgba(106, 205, 89, 0.5)';
                }else {
                    if (obj.signal_strengh < -110){
                        return 'rgba(172, 12, 5, 0.5)';
                    }else{
                        if (obj.signal_strengh <= -70 && obj.signal_strengh > -85){
                            return 'rgba(250, 250, 11, 0.5)'
                        }
                        if (obj.signal_strengh <= -85 && obj.signal_strengh > -100){
                            return 'rgba(247, 185, 7, 0.5)'
                        }
                        if (obj.signal_strengh <= -100 && obj.signal_strengh > -110){
                            return 'rgba(237, 22, 8, 0.5)'
                        }
                    }
                }
            }
        }

        var newCoord = proj.transform([+(obj.Longitude), +(obj.Latitude)], 'EPSG:4326', 'EPSG:3857');

        var marker = new Feature({
            geometry: new Point(newCoord),
        });

        var style1 = [
            // new Style({
            //     image: new Icon(({
            //         scale: 0.8,
            //         rotateWithView: false,
            //         anchor: [0.5, 1],
            //         anchorXUnits: 'fraction',
            //         anchorYUnits: 'fraction',
            //         opacity: 1,
            //         src: signalMark
            //     })),
            //     zIndex: 5
            // }),
            new Style({
                image: new Circle({
                    radius: 5,
                    fill: new Fill({
                        color: getPointColor()
                    }),
                    stroke: new Stroke({
                        color: 'black'
                    })
                })
            }),
            // new Style({
            //     text: new Text({
            //         text: obj.signal_strengh,
            //         scale: 1.2,
            //         offsetY: 15,
            //         fill: new Fill({
            //             color: "#fff"
            //         }),
            //         stroke: new Stroke({
            //             color: "0",
            //             width: 3
            //         })
            //     })
            // }),
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
        const successCallBack = (position) =>{
            console.log('Success to get Current Position!!!!!')
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

            this.getPointsData()
        };

        const errorCallBack = (err) =>{
            console.log('Error to get Current Position!!!!!')
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successCallBack, errorCallBack);
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

        const {renderSignalStrengthInfo, handleGoMyLocation, handleChangeZoom, state: {currentUserLocation}} = this;
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

                {renderSignalStrengthInfo()}
            </div>
        );
    }

    renderFilters = () => {
        const {getPointsData, state: {points, mno, model, paintPointBy, filterTime}} = this;

        const callBackChangeFilter = ()=>{
            this.clearPoints()
            this.renderPointsOnMap()
        }

        const handleMnoChange = (e) => {
            this.setState({mno: e.target.value, model: 'All'}, callBackChangeFilter)
        }

        const handleModelChange = (e) => {
            this.setState({model: e.target.value}, callBackChangeFilter)
        }

        const handlePaintPointChange = (e) => {
            this.setState({paintPointBy: e.target.value}, callBackChangeFilter)
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

        const handleTimeChange = (e) => {
            this.setState({filterTime: e.target.value})
        }

        const handleGetPoints = (e) => {
            this.clearPoints()
            this.setState({points: null})
            getPointsData()
        }

        return (
            <div className={styles.filtersContainer}>
                <div className={styles.filter}>
                    <div>
                        <label className={`${!points ? styles.disabled : ''}`}>Network:</label>
                        <select value={mno} onChange={handleMnoChange} disabled={!points}>
                            <option value="All">All</option>
                            {getMnoOptions()}
                        </select>
                    </div>
                </div>
                <div className={styles.filter}>
                    <div>
                        <label className={`${!points ? styles.disabled : ''}`}>Model:</label>
                        <select value={model} onChange={handleModelChange} disabled={!points}>
                            <option value="All">All</option>
                            {getModelsOptions()}
                        </select>
                    </div>
                </div>
                <div className={styles.filter}>
                    <div>
                        <label className={`${!points ? styles.disabled : ''}`}>Color Points By:</label>
                        <select value={paintPointBy} onChange={handlePaintPointChange} disabled={!points}>
                            <option value="Network">Network</option>
                            <option value="Signal">Signal</option>
                        </select>
                    </div>

                </div>

                <div className={styles.filter} >
                    <div style={{display: "flex", alignItems: "center"}}>
                        <label className={`${!points ? styles.disabled : ''}`}>Hours:</label>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <input style={{height: 25, marginRight: 5}} type="number" value={filterTime} onChange={handleTimeChange}/>
                            <button className={styles.getPointsBtn} onClick={handleGetPoints}>Get New Points!</button>
                        </div>

                    </div>

                </div>
            </div>
        );
    }

    renderSummary = () => {
        const {pointsLayers, mno, points, currentUserLocation} = this.state;

        return (
            <div className={styles.summaryContainer}>
                {!currentUserLocation?
                    'Trying to find your current location...'
                    :
                    points ?
                        `Showing ${pointsLayers.length} points - ${mno === 'All' ? 'All Cellular networks' : mno + ' network'}!`
                        :
                        'Loading points from server...'
                }
            </div>
        );
    }

    renderSignalStrengthInfo = ()=>{
        return(
            this.state.paintPointBy === 'Signal' &&
            <div className={styles.signalStrengthInfoContainer}>
                <div className={styles.item}>
                    <span className={`${styles.colorBox} ${styles.Excellent}
`}>Excellent</span>
                    <label>-70 dbm Up</label>
                </div>
                <div className={styles.item}>
                    <span className={`${styles.colorBox} ${styles.Good}
`}>Good</span>
                    <label>-70 dbm to -85 dbm </label>
                </div>
                <div className={styles.item}>
                    <span className={`${styles.colorBox} ${styles.Fair}
`}>Fair</span>
                    <label>-86 dbm to -100 dbm </label>
                </div>
                <div className={styles.item}>
                    <span className={`${styles.colorBox} ${styles.Poor}
`}>Poor</span>
                    <label>-101 dbm to -110 dbm </label>
                </div>
                <div className={styles.item}>
                    <span className={`${styles.colorBox} ${styles.NoSignal}
`}>No Signal</span>
                    <label>-110 dbm Down </label>
                </div>
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
