(window.webpackJsonptest=window.webpackJsonptest||[]).push([[0],{100:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAACoklEQVRIx2NgGCrgrJ+fyqWQkLJrUVEdIHw5PLwUJEYTy/4zMDBeCQtLvZuefvhVVdWHr729/7/394MxiA0SA8oduRwamgxSSxVLzwcECNyIj9/+saXlN8wyXPhjW9uvm3FxW8+EhvJTZOkJT0++28nJJ78h+ZAQBqm9nZR04oi1NS/ZFgNdv4UUS+GW9/X9vxEXt5EsS4EJKPpdU9N3XAa/a2gAYxAbm5oPzc3fr4SHR5Bs8b309F3YDHzT2vb/4ey5/1+evQjGD2fNAYq1YrX8XlraTpIsPeTpKfq8tPQlhi/a2/8/27rj/6df/1HwU6DYx44ODIuflZa+OOnsLEy0xef8/PyAKRTDoIdA36JbCsMgOYxUDgyJc76+nkRbfDU4uOgrlkT1aNIUnBY/mjgZQz3IDJBZRFt8MTw860t3N8U+BplxISQknfig9vKyA6bKP9ji+OmW7ZhxDBTDFsfvgGac9vS0JtriY5aWnE8KCh5iT9Wt4JT88vR5MH44azbOVA0048F+BwcOklL27ZSUzfgKiHeNjWCMKx+D8J3UVNILkathYcXY4plYDNJ7OSwsj2SLQWXtk8LCB+Ra/Cg//x4wmHnIKjavRkXNwxeU+KLianT0dLIriQs+PtLPSkqekGrx05KSx6e8vCQoqhqvx8bO+kpCDfW1p+f/NUp8i1wnP8rNvUisxQ+ys6+ecXHhp0or5GpkZPqHlpafhCx939Ly41pERDJV2103YmO3EkpQwMbfNqo3+M64u0s+zMu7jsviexkZt074+YnTpLUJalG8qa19j27pq+rq9xdDQiIYaAmAwTnhc2fnX5ilQPYfoFgfzRv0/xsamIBZbDsoi4HwNWDcg8To0puANnuP3U1JOUlRM5bMhr4CCDMMNQAAmNFseO05LyEAAAAASUVORK5CYII="},101:function(e,t,a){e.exports=a.p+"static/media/test.f0f77a87.svg"},110:function(e,t,a){e.exports=a(124)},115:function(e,t,a){},123:function(e,t,a){},124:function(e,t,a){"use strict";a.r(t);var n,o=a(3),r=a.n(o),l=a(95),s=a.n(l),c=(a(115),a(82)),i=a(46),m=a(59),u=a(85),d=a.n(u),g=function(){return r.a.createElement("header",{className:d.a.rootHeader},r.a.createElement("div",{className:d.a.logoBox},"NetMap"),r.a.createElement("nav",{className:d.a.navBox},r.a.createElement(X,null)))},p=a(96),f=a.n(p),E=function(){return r.a.createElement("footer",{className:f.a.rootFooter},"footer")},b=a(97),h=a(98),v=a(107),y=a(99),N=a(61),_=a(109),w=a(18),A=a.n(w),C=a(87),O={getAddressLocation:function(e,t){return fetch("https://nominatim.openstreetmap.org/reverse?format=json&lon="+e+"&lat="+t).then(function(e){return e.json()}).then(function(e){return e.address})},mnoColors:(n={Partner:"rgba(44, 213, 196, 0.7)"},Object(C.a)(n,"012 Mobile","rgba(249, 215, 17, 0.7)"),Object(C.a)(n,"Pelephone","rgba(45, 109, 183, 0.7)"),n)},M=a(104),x=a(83),L=a(108),S=a(105),k=a(19),P=a(88),U=a(76),j=a(92),B=a(89),T=a(56),D=a(73),I=(a(117),a(57)),W=a(55),z=a(106),F=a(100),J=a.n(F),R=4,G=function(e){function t(e){var a;return Object(b.a)(this,t),(a=Object(v.a)(this,Object(y.a)(t).call(this,e))).getPointsData=function(){console.log("LOAD NEW POINTS FROM DB..."),fetch("http://ec2-18-219-102-0.us-east-2.compute.amazonaws.com:3000/signalgps/".concat(""!==a.state.filterTime?"interval?intervalInHours=".concat(a.state.filterTime):"")).then(function(e){return e.json()}).then(function(e){return a.setState({points:e})}).then(function(e){return a.renderPointsOnMap()}).catch(function(){console.log("ERROR FETCH DATA FROM DB!!!"),a.dbTry++,a.dbTry<R&&a.getPointsData()})},a.addSingleMarker=function(e){var t=k.a.transform([+e.Longitude,+e.Latitude],"EPSG:4326","EPSG:3857"),n=new P.a({geometry:new U.a(t)}),o=[new T.a({image:new D.a({radius:5,fill:new I.a({color:"Network"===a.state.paintPointBy?O.mnoColors[e.MNO]?O.mnoColors[e.MNO]:"rgba(255,255,255,1)":e.signal_strengh>-70?"rgba(106, 205, 89, 0.7)":e.signal_strengh<=-110?"rgba(172, 12, 5, 0.7)":e.signal_strengh<=-70&&e.signal_strengh>-85?"rgba(250, 250, 11, 0.7)":e.signal_strengh<=-85&&e.signal_strengh>-100?"rgba(247, 185, 7, 0.7)":e.signal_strengh<=-100&&e.signal_strengh>-110?"rgba(237, 22, 8, 0.7)":void 0})})})];n.setStyle(o);var r=new B.a({source:new j.a({features:[n]})});a.setState(function(e,t){return{pointsLayers:[].concat(Object(i.a)(e.pointsLayers),[r])}}),a.olmap.addLayer(r)},a.renderPointsOnMap=function(){var e=Object(N.a)(a),t=e.addSingleMarker,n=e.state,o=n.points,r=n.mno,l=n.model;o.reduce(function(e,t){return t.MNO!==r&&"All"!==r||t.type!==l&&"All"!==l||isNaN(+t.signal_strengh)||(a=t,e.some(function(e){return e.Latitude===a.Latitude&&e.Longitude===a.Longitude&&e.MNO===a.MNO||Math.abs(a.Longitude-e.Longitude)<1e-5&&e.MNO===a.MNO||Math.abs(a.Latitude-e.Latitude)<1e-5&&e.MNO===a.MNO}))||null===t.signal_strengh?e:[].concat(Object(i.a)(e),[t]);var a},[]).map(function(e){return e.signal_strengh&&t(e)})},a.createMapObj=function(){a.olmap=new M.a({target:"null",loadTilesWhileAnimating:!0,loadTilesWhileInteracting:!0,layers:[new L.a({source:new S.a})],view:new x.a({center:a.state.center,zoom:a.state.zoom})})},a.updateMap=function(){var e=Object(N.a)(a),t=e.olmap,n=e.state,o=n.zoom,r=n.center,l=t.getView().getCenter();t.getView().getZoom()!==o&&t.getView().setZoom(o),l!==r&&t.getView().setCenter(r)},a.updateToCurrentUserLocation=function(){navigator.geolocation&&navigator.geolocation.getCurrentPosition(function(e){console.log("Success to get Current Position!!!!!");var t=k.a.transform([e.coords.longitude,e.coords.latitude],"EPSG:4326","EPSG:3857");O.getAddressLocation(e.coords.longitude,e.coords.latitude).then(function(e){a.setState({currentUserLocation:t,center:t,zoom:16,details:e})});var n=new P.a({geometry:new U.a(t)}),o=[new T.a({image:new z.a({scale:1,rotateWithView:!1,anchor:[.5,1],anchorXUnits:"fraction",anchorYUnits:"fraction",opacity:1,src:J.a}),zIndex:5}),new T.a({image:new D.a({radius:5,fill:new I.a({color:"rgba(255,255,255,1)"}),stroke:new W.a({color:"black"})})})];n.setStyle(o);var r=new B.a({source:new j.a({features:[n]})});a.olmap.addLayer(r),a.getPointsData()},function(e){console.log("Error to get Current Position!!!!!")})},a.handleGoMyLocation=function(){a.setState({center:a.state.currentUserLocation})},a.handleChangeZoom=function(e){a.setState(function(t){return{zoom:"+"===e?t.zoom+1:t.zoom-1}})},a.renderMap=function(){var e=Object(N.a)(a),t=e.handleGoMyLocation,n=e.handleChangeZoom,o=e.state,l=o.currentUserLocation,s=o.paintPointBy;return r.a.createElement("div",{id:"map",className:A.a.mapElement},l&&r.a.createElement("button",{className:A.a.btnGoMyLocation,onClick:t},"My Location"),r.a.createElement("div",{className:A.a.zoomContainer},r.a.createElement("button",{onClick:function(){return n("+")}},"+"),r.a.createElement("button",{onClick:function(){return n("-")}},"-")),"Network"===s?r.a.createElement("div",{className:A.a.signalStrengthInfoContainer},a.state.points&&Object(i.a)(new Set(a.state.points.reduce(function(e,t){return t.MNO?[].concat(Object(i.a)(e),[t.MNO.charAt(0).toUpperCase()+t.MNO.slice(1)]):e},[]))).map(function(e,t){return r.a.createElement("div",{className:A.a.item,key:t},r.a.createElement("span",{className:A.a.colorBox,style:{background:O.mnoColors[e]?O.mnoColors[e]:"rgba(255,255,255,1)"}},e))})):r.a.createElement("div",{className:A.a.signalStrengthInfoContainer},r.a.createElement("div",{className:A.a.item},r.a.createElement("span",{className:"".concat(A.a.colorBox," ").concat(A.a.Excellent,"\n")},"Excellent"),r.a.createElement("label",null,"-70 dbm Up")),r.a.createElement("div",{className:A.a.item},r.a.createElement("span",{className:"".concat(A.a.colorBox," ").concat(A.a.Good,"\n")},"Good"),r.a.createElement("label",null,"-70 dbm to -85 dbm ")),r.a.createElement("div",{className:A.a.item},r.a.createElement("span",{className:"".concat(A.a.colorBox," ").concat(A.a.Fair,"\n")},"Fair"),r.a.createElement("label",null,"-86 dbm to -100 dbm ")),r.a.createElement("div",{className:A.a.item},r.a.createElement("span",{className:"".concat(A.a.colorBox," ").concat(A.a.Poor,"\n")},"Poor"),r.a.createElement("label",null,"-101 dbm to -110 dbm ")),r.a.createElement("div",{className:A.a.item},r.a.createElement("span",{className:"".concat(A.a.colorBox," ").concat(A.a.NoSignal,"\n")},"No Signal"),r.a.createElement("label",null,"-110 dbm Down "))))},a.renderFilters=function(){var e=Object(N.a)(a),t=e.getPointsData,n=e.state,o=n.points,l=n.mno,s=n.model,c=n.paintPointBy,m=n.filterTime,u=function(){a.clearPoints(),a.renderPointsOnMap()};return r.a.createElement("div",{className:A.a.filtersContainer},r.a.createElement("div",{className:A.a.filter},r.a.createElement("div",null,r.a.createElement("label",{className:"".concat(o?"":A.a.disabled)},"Network:"),r.a.createElement("select",{value:l,onChange:function(e){a.setState({mno:e.target.value,model:"All"},u)},disabled:!o},r.a.createElement("option",{value:"All"},"All"),o&&Object(i.a)(new Set(o.reduce(function(e,t){return t.MNO?[].concat(Object(i.a)(e),[t.MNO.charAt(0).toUpperCase()+t.MNO.slice(1)]):e},[]))).map(function(e,t){return r.a.createElement("option",{key:t,value:e},e)})))),r.a.createElement("div",{className:A.a.filter},r.a.createElement("div",null,r.a.createElement("label",{className:"".concat(o?"":A.a.disabled)},"Model:"),r.a.createElement("select",{value:s,onChange:function(e){a.setState({model:e.target.value},u)},disabled:!o},r.a.createElement("option",{value:"All"},"All"),o&&Object(i.a)(new Set(o.reduce(function(e,t){return!t.type||t.MNO!==a.state.mno&&"All"!==a.state.mno?e:[].concat(Object(i.a)(e),[t.type])},[]))).map(function(e,t){return r.a.createElement("option",{key:t,value:e},e)})))),r.a.createElement("div",{className:A.a.filter},r.a.createElement("div",null,r.a.createElement("label",{className:"".concat(o?"":A.a.disabled)},"Color Points By:"),r.a.createElement("select",{value:c,onChange:function(e){a.setState({paintPointBy:e.target.value},u)},disabled:!o},r.a.createElement("option",{value:"Network"},"Network"),r.a.createElement("option",{value:"Signal"},"Signal")))),r.a.createElement("div",{className:A.a.filter},r.a.createElement("div",{style:{display:"flex",alignItems:"center"}},r.a.createElement("label",{className:"".concat(o?"":A.a.disabled)},"Hours:"),r.a.createElement("div",{style:{display:"flex",alignItems:"center"}},r.a.createElement("input",{style:{height:25,marginRight:5},type:"number",value:m,onChange:function(e){a.setState({filterTime:e.target.value})}}),r.a.createElement("button",{className:A.a.getPointsBtn,onClick:function(e){a.clearPoints(),a.setState({points:null}),t()}},"Get New Points!")))))},a.renderSummary=function(){var e=a.state,t=e.pointsLayers,n=e.mno,o=e.points,l=e.currentUserLocation;return r.a.createElement("div",{className:A.a.summaryContainer},l?o?"Showing ".concat(t.length," points - ").concat("All"===n?"All Cellular networks":n+" network","!"):"Loading points from server...":"Trying to find your current location...")},a.clearPoints=function(){a.state.pointsLayers.forEach(function(e){return a.olmap.removeLayer(e)}),a.setState({pointsLayers:[]})},a.state={center:[546e3,6868e3],currentUserLocation:null,zoom:8,details:null,points:null,pointsLayers:[],mno:"All",model:"All",paintPointBy:"Network",filterTime:"24"},a.createMapObj(),a.dbTry=0,a}return Object(_.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.updateToCurrentUserLocation(),this.olmap.setTarget("map"),this.olmap.on("moveend",function(){var t=e.olmap.getView().getCenter(),a=e.olmap.getView().getZoom();e.setState({center:t,zoom:a})})}},{key:"shouldComponentUpdate",value:function(e,t){return!0}},{key:"render",value:function(){var e=this.renderMap,t=this.renderFilters,a=this.renderSummary,n=this.state,l=n.details;n.points;return this.updateMap(),r.a.createElement(o.Fragment,null,a(),t(),e(),l&&r.a.createElement("div",{className:A.a.detailsContainer},r.a.createElement("h2",null,"Details:"),r.a.createElement("div",null,r.a.createElement("div",null,"City: ",this.state.details.city),r.a.createElement("div",null,"Country: ",this.state.details.country))))}}]),t}(o.Component),H=a(78),Y=a.n(H),Z=a(101),V=a.n(Z),Q=function(){return r.a.createElement("div",null,"AboutUs")},q=function(){return r.a.createElement("div",null,"ContactUs")},K=[{path:"/",component:g,exact:!1,label:""},{path:"/",component:function(){return r.a.createElement("div",{className:Y.a.rootHome},r.a.createElement("div",{className:Y.a.titleContainer},r.a.createElement("h1",{className:Y.a.title},"Welcome to NetMap!"),r.a.createElement("img",{src:V.a,className:Y.a.bg})),r.a.createElement(G,null))},exact:!0,label:"Home"},{path:"".concat("/","about-us/"),component:Q,exact:!0,label:"About-Us"},{path:"".concat("/","contact-us/"),component:q,exact:!0,label:"Contact-Us"},{path:"/",component:E,exact:!1,label:""}],X=function(){return r.a.createElement(o.Fragment,null,K.reduce(function(e,t,a){var n=t.path,o=t.label;return 0===a||a===K.length-1?e:[].concat(Object(i.a)(e),[r.a.createElement(c.b,{key:a,to:n},o)])},[]))},$=function(){var e=K.length-1;return r.a.createElement(o.Fragment,null,r.a.createElement(m.a,K[0]),r.a.createElement("main",null,K.reduce(function(t,a,n){return 0===n||n===e?t:[].concat(Object(i.a)(t),[r.a.createElement(m.a,Object.assign({key:n},a))])},[])),r.a.createElement(m.a,K[e]))},ee=(a(123),function(){return r.a.createElement(c.a,{basename:"/"},r.a.createElement($,null))});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(ee,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},18:function(e,t,a){e.exports={mapElement:"styles_mapElement__2NJM2",btnGoMyLocation:"styles_btnGoMyLocation__3TeUN",zoomContainer:"styles_zoomContainer__1yW3U",detailsContainer:"styles_detailsContainer__hhD93",summaryContainer:"styles_summaryContainer__3hhUp",filtersContainer:"styles_filtersContainer__2N8I8",disabled:"styles_disabled__2WaRh",signalStrengthInfoContainer:"styles_signalStrengthInfoContainer__2VtML",item:"styles_item__3G0cS",colorBox:"styles_colorBox__1obWj",Excellent:"styles_Excellent__2qwZ0",Good:"styles_Good__3pH8x",Fair:"styles_Fair__guRi_",Poor:"styles_Poor__29hL_",NoSignal:"styles_NoSignal__24pZU",filter:"styles_filter__2ek1W",getPointsBtn:"styles_getPointsBtn__JWnvj"}},78:function(e,t,a){e.exports={rootHome:"styles_rootHome__2kdMq",titleContainer:"styles_titleContainer__1qWoL",bg:"styles_bg__389UL",markerWrapper:"styles_markerWrapper__25pT7",title:"styles_title__2sz66"}},85:function(e,t,a){e.exports={rootHeader:"styles_rootHeader__3Fez0",logoBox:"styles_logoBox__1f82p",navBox:"styles_navBox__1uTAJ"}},96:function(e,t,a){e.exports={rootFooter:"styles_rootFooter__3eYbk"}}},[[110,1,2]]]);
//# sourceMappingURL=main.50acd660.chunk.js.map