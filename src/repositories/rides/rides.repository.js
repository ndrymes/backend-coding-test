//require services
const { connectDatabase } = require("../../config");
const db = connectDatabase();

const buildSchemas = require("../../model/rides");

class RideRepository {
  constructor() {
    db.serialize(() => {
      // build schema
      buildSchemas(db);
    });
  }
  // Create new ride details
  async insertRides({
    start_lat,
    start_long,
    end_lat,
    end_long,
    rider_name,
    driver_name,
    driver_vehicle,
  }) {
    return new Promise(function (resolve, reject) {
      var values = [
        start_lat,
        start_long,
        end_lat,
        end_long,
        rider_name,
        driver_name,
        driver_vehicle,
      ];
      const query =
        "INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)";
      db.run(query, values, function (err) {
        if (err) reject(err.message);
        const subquery = "SELECT * FROM Rides WHERE rideID = ?";
        db.all(subquery, this.lastID, function (err, rows) {
          if (err) reject("Read error: " + err.message);
          resolve(rows[0]);
        });
      });
    });
  }

  //fetch all new ride details
  async getAllRides({ skip, limit }) {
    return new Promise(function (resolve, reject) {
      const query =
        "SELECT * FROM Rides WHERE rideID NOT IN ( SELECT rideID FROM Rides ORDER BY rideID ASC LIMIT ?) ORDER BY rideID ASC LIMIT ?";
      db.all(query, [skip, limit], function (err, rows) {
        if (err) {
          reject("Read error: " + err.message);
        }
        resolve(rows);
      });
    });
  }

  // Fetch a single ride detail
  async getRide({ id }) {
    return new Promise(function (resolve, reject) {
      //use paramitarized query to prevent Sql injection
      const query = "SELECT * FROM Rides WHERE rideID = ?";
      db.all(query, [id], function (err, rows) {
        if (err) {
          reject("Read error: " + err.message);
        }
        resolve(rows[0]);
      });
    });
  }
}

module.exports = new RideRepository();
