import axios from 'axios';

const GRAPH_HOPPER_KEY = 'GRAPHHOPPER_KEY';

const source = '13.0827,80.2707';      // Chennai
const destination = '9.9252,78.1198';  // Madurai

async function getGraphhopperRoute(from, to) {
  try {
    console.log(`Source: ${from} Destination: ${to}`);

    const params = new URLSearchParams();
    params.append('point', from);
    params.append('point', to);
    params.append('vehicle', 'car');
    params.append('locale', 'en');
    params.append('points_encoded', 'false');
    params.append('instructions', 'true');
    params.append('calc_points', 'true');
    params.append('key', GRAPH_HOPPER_KEY);

    const response = await axios.get('https://graphhopper.com/api/1/route', {
      params,
    });

    const path = response.data.paths[0];

    const distanceKm = (path.distance / 1000).toFixed(2);
    const timeMin = (path.time / 60000).toFixed(2);
    console.log(`\n🛣️ Route:`);
    console.log(`Distance: ${distanceKm} km`);
    console.log(`Estimated Time: ${timeMin} minutes`);
    console.log('Instructions:');
    path.instructions.forEach((step, i) => {
      console.log(`  ${i + 1}. ${step.text} (${(step.distance / 1000).toFixed(2)} km)`);
    });
  } catch (error) {
    console.error('GraphHopper error:', error.response?.data || error.message);
  }
}

getGraphhopperRoute(source, destination);