import axios from "axios";

export const getPossibleRoutes = async (source, destination) => {
  try {
    const apiKey ="GOOGLE_API_KEY";

    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/directions/json",
      {
        params: {
          origin: source,
          destination: destination,
          alternatives: true, // multiple possible routes
          key: apiKey,
        },
      }
    );

    const routes = response.data.routes.map((r, index) => ({
      routeNumber: index + 1,
      summary: r.summary,
      distance: r.legs[0].distance.text,
      duration: r.legs[0].duration.text,
      startAddress: r.legs[0].start_address,
      endAddress: r.legs[0].end_address,
      polyline: r.overview_polyline.points, // encoded path
    }));

    return routes;
  } catch (error) {
    console.error("❌ Error fetching routes:", error.message);
    throw new Error("Failed to fetch routes from Google Maps API");
  }
};
