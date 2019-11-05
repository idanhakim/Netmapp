const config = {
    getAddressLocation : (longitude, latitude) => {
        return fetch('https://nominatim.openstreetmap.org/reverse?format=json&lon=' + longitude + '&lat=' + latitude)
            .then((res) => {
                return res.json();
            }).then((json) => {
                return json.address;
            });
    },
    mnoColors:{
        Partner: 'rgba(44, 213, 196, 0.5)',
        ['012 Mobile']: 'rgba(249, 215, 17, 0.5)',
        Pelephone: 'rgba(45, 109, 183, 0.5)'
    }
};

export default config;