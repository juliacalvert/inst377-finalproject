const fieldOfficeLocations = {
    "phoenix": [33.4484, -112.0740],
    "newyork": [40.7128, -74.0060],
    "losangeles": [34.0522, -118.2437],
    "chicago": [41.8781, -87.6298],
    "washington": [38.9072, -77.0369],
    "miami": [25.7617, -80.1918],
    "dallas": [32.7767, -96.7970],
    "boston": [42.3601, -71.0589],
    "sanfrancisco": [37.7749, -122.4194],
    "atlanta": [33.7490, -84.3880],
    "seattle": [47.6061, -122.3328],
    "indianapolis": [39.7691, -86.1580],
    "tampa": [27.9517, -82.4588],
    "houston": [29.7601, -95.3701],
    "stlouis": [38.6270, -90.1994],
    "philadelphia": [39.9526, -75.1652],
    "neworleans": [29.9509, -90.0758]
};

const stateToOffice = {
    "california": "losangeles",
    "illinois": "chicago",
    "louisiana": "neworleans",
    "arizona": "phoenix",
    "new york": "newyork",
    "florida": "miami",
    "texas": "dallas",
    "georgia": "atlanta",
    "massachusetts": "boston",
    "washington": "seattle",
    "indiana": "indianapolis",
    "missouri": "stlouis",
    "pennsylvania": "philadelphia"
};

function createMap() {
    const map = L.map('map').setView([39.8283, -98.5795], 4);
    const url = "https://api.fbi.gov/wanted/v1/list";

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const criminals = data.items.slice(0, 10);

            criminals.forEach(criminal => {
                let coords = null;

                if (criminal.field_offices && criminal.field_offices.length > 0) {
                    const office = criminal.field_offices[0].toLowerCase();
                    coords = fieldOfficeLocations[office];
                } 

                else if (criminal.details) {
                    const stateMatch = criminal.details.match(/\b(?:California|Illinois|Louisiana|Arizona|New York|Florida|Texas|Georgia|Massachusetts|Washington|Indiana|Missouri|Pennsylvania)\b/gi);
                    
                    if (stateMatch) {
                        console.log("Matched state:", stateMatch[0], "Title:", criminal.title);
                        const state = stateMatch[0].toLowerCase().trim();
                        const office = stateToOffice[state];
                        coords = fieldOfficeLocations[office];
                    }
                }
                console.log(criminal.title, criminal.field_offices, coords);

                if (coords) {
                    L.marker(coords)
                        .addTo(map)
                        .bindPopup(`
                            <strong>${criminal.title}</strong><br>
                            ${criminal.description }<br>
                            <a href="${criminal.url}" target="_blank">More Info</a>
                        `);
                    
                }
            });
        })
}

window.onload = createMap;