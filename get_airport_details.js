const express = require('express');
const sequelize = require('./config');
const Airport = require('./models/airport');
const City = require('./models/city');
const Country = require('./models/country');

const app = express();
const port = 3000;

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch(err => {
  console.error('Unable to synchronize the database:', err);
});

// Define your route handler
app.get('/airport/:iata_code', async (req, res) => {
  const iataCode = req.params.iata_code;
  console.log("Requested IATA Code:", iataCode);

  try {
    const airport = await Airport.findOne({
      where: { iata_code: iataCode },
      include: [
        { model: City, include: [Country] },
        { model: Country }
      ]
    });

    if (airport) {
      const response = {
        airport: {
          id: airport.id,
          icao_code: airport.icao_code,
          iata_code: airport.iata_code,
          name: airport.name,
          type: airport.type,
          latitude_deg: airport.latitude_deg,
          longitude_deg: airport.longitude_deg,
          elevation_ft: airport.elevation_ft,
          address: {
            city: airport.City ? {
              id: airport.City.id,
              name: airport.City.name,
              country_id: airport.City.country_id,
              is_active: airport.City.is_active,
              lat: airport.City.lat,
              long: airport.City.long
            } : null,
            country: airport.Country ? {
              id: airport.Country.id,
              name: airport.Country.name,
              country_code_two: airport.Country.country_code_two,
              country_code_three: airport.Country.country_code_three,
              mobile_code: airport.Country.mobile_code,
              continent_id: airport.Country.continent_id
            } : null
          }
        }
      };
      res.json(response);
    } else {
      res.status(404).json({ error: 'Airport not found' });
    }
  } catch (error) {
    console.error('Error retrieving airport:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
