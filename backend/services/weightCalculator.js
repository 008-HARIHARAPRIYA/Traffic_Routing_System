/**
 * Calculate dynamic weight for a route
 * travelTime: in seconds
 * aqi: 1 (good) to 5 (very poor)
 * weatherFactor: extra delay factor (0 for normal, 0.1 for rain, etc.)
 */
export const calculateEdgeWeight = (travelTime, aqi, weatherFactor = 0) => {
  // Pollution factor (1 for good, 1.5 for poor)
  const pollutionFactor = 1 + (aqi - 1) * 0.1;

  // Final weight
  const weight = travelTime * (1 + weatherFactor) * pollutionFactor;

  return weight; // in seconds (can convert to minutes if needed)
};
