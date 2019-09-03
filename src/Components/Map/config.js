const config = {
    getAddressLocation : (longitude, latitude) => {
        return fetch('https://nominatim.openstreetmap.org/reverse?format=json&lon=' + longitude + '&lat=' + latitude)
            .then((res) => {
                return res.json();
            }).then((json) => {
                return json.address;
            });
    }
}

export default config;