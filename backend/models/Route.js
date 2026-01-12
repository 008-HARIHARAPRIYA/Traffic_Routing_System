import mongoose from "mongoose";

const routeSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    travelMode: {
      type: String,
      enum: ["car", "bike", "walk", "public"],
      default: "car",
    },
    timeConstraint: {
      type: Number, // e.g., maximum minutes user can spend
      default: 0,
    },
    pollutionPreference: {
        type: String,
  enum: ["low", "medium", "high"],
  default: "low",  // ✅ changed default from medium to low
},

    optimizedRoute: {
      type: String, // later we’ll store the optimized path result here
      default: "",
    },
  },
  { timestamps: true }
);

const Route = mongoose.model("Route", routeSchema);

export default Route;
