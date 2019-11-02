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
        Partner: '#2cd5c4',
        ['012 Mobile']: '#f9d711',
        Pelephone: '#2d6db7'
    }
};

export default config;