// Use ES Module syntax
import axios from 'axios';

// Replace with your OpenRouteService API key
const ORS_API_KEY = 'ORS_KEY';

// Function to get coordinates for a place using ORS Geocoding API
async function getCoordinates(place) {
    try {
        const response = await axios.get('https://api.openrouteservice.org/geocode/search', {
            params: { api_key: ORS_API_KEY, text: place, size: 1 }
        });
        const coords = response.data.features[0].geometry.coordinates;
        return coords; // [lng, lat]
    } catch (error) {
        console.error('Error fetching coordinates:', error.response?.data || error.message);
    }
}

// Function to get route between two coordinates
async function getRoute(start, end) {
    try {
        const response = await axios.post(
            'https://api.openrouteservice.org/v2/directions/driving-car/geojson',
            {
                coordinates: [start, end] // [[lng, lat], [lng, lat]]
            },
            {
                headers: {
                    Authorization: ORS_API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );
        return [response.data]; // wrap in array for consistency
    } catch (error) {
        console.error('Error fetching route:', error.response?.data || error.message);
        return [];
    }
}

// Haversine distance (km)
function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// Chunk route if distance > maxDistanceKm
function chunkRoute(coords, maxDistanceKm = 150) {
    const chunks = [];
    let currentChunk = [];
    let accumulatedDistance = 0;

    for (let i = 0; i < coords.length - 1; i++) {
        const [lng1, lat1] = coords[i];
        const [lng2, lat2] = coords[i + 1];
        const distance = haversineDistance(lat1, lng1, lat2, lng2);
        accumulatedDistance += distance;
        currentChunk.push(coords[i]);

        if (accumulatedDistance >= maxDistanceKm) {
            currentChunk.push(coords[i + 1]);
            chunks.push([...currentChunk]);
            currentChunk = [coords[i + 1]];
            accumulatedDistance = 0;
        }
    }

    if (currentChunk.length > 1) chunks.push(currentChunk);
    return chunks;
}

// Main function
async function main() {
    const source = 'Chennai';
    const destination = 'Madurai';

    const startCoords = await getCoordinates(source);
    const endCoords = await getCoordinates(destination);

    if (!startCoords || !endCoords) return console.error('Coordinates not found');

    const routes = await getRoute(startCoords, endCoords);

    if (!routes || routes.length === 0) return console.error('No routes found');

    for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        const coords = route.geometry.coordinates;
        const chunks = chunkRoute(coords, 150); // split routes >150km

        let totalDistance = 0;
        let totalDuration = 0;

        for (const chunk of chunks) {
            // Each chunk has start and end points
            const chunkRouteData = await getRoute(chunk[0], chunk[chunk.length - 1]);
            if (!chunkRouteData || chunkRouteData.length === 0) continue;

            const chunkDistance = chunkRouteData[0].properties.summary.distance / 1000;
            const chunkDuration = chunkRouteData[0].properties.summary.duration / 60;

            totalDistance += chunkDistance;
            totalDuration += chunkDuration;
        }

        console.log(`Route ${i + 1}: Distance = ${totalDistance.toFixed(2)} km, Duration = ${totalDuration.toFixed(2)} min`);
        console.log('-------------------------');
    }
}

main();
