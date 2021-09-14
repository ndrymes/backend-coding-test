const MockResponsePayload = {
  rideID: 1,
  startLat: 90,
  startLong: 90,
  endLat: 90,
  endLong: 90,
  riderName: "wolex",
  driverName: "wede",
  driverVehicle: "heree",
  created: "2021-09-13 12:19:32",
};

const ride1 = {
  start_lat: "90",
  start_long: "90",
  end_lat: "90",
  end_long: "90",
  rider_name: "wolex",
  driver_name: "wede",
  driver_vehicle: "heree",
};

const ride2 = {
  start_lat: "90",
  start_long: "90",
  end_lat: "90",
  end_long: "90",
  rider_name: "wolex",
  driver_name: "wede",
  driver_vehicle: "heree",
};
// We need to keep the values constant, making a clone will be the only way to modify the values here
Object.freeze(MockResponsePayload);
Object.freeze(ride1);

const rides = [ride1, ride2];
module.exports = {
  MockResponsePayload,
  rides,
};
