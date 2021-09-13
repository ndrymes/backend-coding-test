//require services
const { database: db } = require("../../config");
class RideRepository {
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
        function (err) {
          if (err) reject(err.message);
          db.all(
            "SELECT * FROM Rides WHERE rideID = ?",
            this.lastID,
            function (err, rows) {
              if (err) reject("Read error: " + err.message);

              resolve(rows);
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
      db.all(`SELECT * FROM Rides WHERE rideID='${id}'`, function (err, rows) {
        if (err) {
          reject("Read error: " + err.message);
        }
        resolve(rows);
      });
    });
  }
}

module.exports = new RideRepository();
