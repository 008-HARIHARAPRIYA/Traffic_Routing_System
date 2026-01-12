import axios from 'axios';

// Replace with your actual keys
const ORS_API_KEY = 'ORS_KEY';
const GRAPH_HOPPER_KEY = 'GRAPHHOPPER_KEY';

// Source and destination (lat,lon)
const source = '13.067439,80.237617';      // Chennai
const destination = '13.0827,79.837617';   // Within 150 km for ORS

// Step 1: Get multiple routes from ORS
async function fetchORSRoutes(start, end) {
  try {
    const url = 'https://api.openrouteservice.org/v2/directions/driving-car/geojson';

    const body = {
      coordinates: [
        start.split(',').reverse().map(Number),  // [lon, lat]
        end.split(',').reverse().map(Number)
      ],
      alternative_routes: {
        target_count: 3,
        share_factor: 0.6
      }
    };

    const response = await axios.post(url, body, {
      headers: {
        Authorization: ORS_API_KEY,
        'Content-Type': 'application/json'
      }
    });

    if (!response.data || !response.data.features) {
      console.error('No routes returned by ORS');
      return [];
    }

    return response.data.features.map((feature, index) => {
      const coords = feature.geometry.coordinates;
      return {
        routeNumber: index + 1,
        start: coords[0].reverse().join(','), // lat,lon
        end: coords[coords.length - 1].reverse().join(',') // lat,lon
      };
    });
  } catch (error) {
    console.error('ORS error:', error.response?.data || error.message);
    return [];
  }
}

// Step 2: Use GraphHopper to calculate distance/time
async function getGraphhopperRoute(from, to) {
  try {
    const params = new URLSearchParams();
    params.append('point', from);
    params.append('point', to);
    params.append('vehicle', 'car');
    params.append('locale', 'en');
    params.append('points_encoded', 'false');
    params.append('instructions', 'true');
    params.append('calc_points', 'true');
    params.append('key', GRAPH_HOPPER_KEY);

    const response = await axios.get('https://graphhopper.com/api/1/route', { params });
    const path = response.data.paths[0];

    return {
      distanceKm: (path.distance / 1000).toFixed(2),
      timeMin: (path.time / 60000).toFixed(2)
    };
  } catch (error) {
    console.error('GraphHopper error:', error.response?.data || error.message);
    return null;
  }
}

// Main function
async function main() {
  const orsRoutes = await fetchORSRoutes(source, destination);

  if (orsRoutes.length === 0) {
    console.log('No ORS routes to evaluate.');
    return;
  }

  for (const route of orsRoutes) {
    const result = await getGraphhopperRoute(route.start, route.end);
    if (result) {
      console.log(`\n🛣️ Route ${route.routeNumber}:`);
      console.log(`Start: ${route.start}`);
      console.log(`End: ${route.end}`);
      console.log(`Distance: ${result.distanceKm} km`);
      console.log(`Estimated Time: ${result.timeMin} minutes`);
    }
  }
}

main();