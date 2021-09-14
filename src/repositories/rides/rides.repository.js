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
      db.run(
        "INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)",
        values,
        function (err, data) {
          console.log("mine", err);
          console.log({ data });
          if (err) reject(err.message);
          db.all(
            "SELECT * FROM Rides WHERE rideID = ?",
            this.lastID,
            function (err, rows) {
              if (err) reject("Read error: " + err.message);
              resolve(rows[0]);
            }
          );
        }
      );
    });
  }

  //fetch all new ride details
  async getAllRides() {
    return new Promise(function (resolve, reject) {
      db.all("SELECT * FROM Rides", function (err, rows) {
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
          console.log(err);
          reject("Read error: " + err.message);
        }
        resolve(rows[0]);
      });
    });
  }
}

module.exports = new RideRepository();
