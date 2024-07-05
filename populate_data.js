const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const sequelize = require('./config');
const Airport = require('./models/airport');
const City = require('./models/city');
const Country = require('./models/country');

const readCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

const populateData = async () => {
  try {
    // Read and populate country data
    const countryData = await readCSV(path.resolve(__dirname, 'db_data/country_data.csv'));
    const countries = countryData.map(row => ({
      id: row.id,
      name: row.name,
      alt_name: row.alt_name,
      country_code_two: row.country_code_two,
      country_code_three: row.country_code_three,
      flag_app: row.flag_app,
      mobile_code: row.mobile_code,
      continent_id: row.continent_id,
      country_flag: row.country_flag,
    }));
    await Country.bulkCreate(countries);
    console.log('Country data populated');

    // Read and populate city data
    const cityData = await readCSV(path.resolve(__dirname, 'db_data/city_data.csv'));
    const cities = cityData.map(row => ({
      id: row.id,
      name: row.name,
      alt_name: row.alt_name,
      country_id: row.country_id,
      is_active: row.is_active === 'true', // Convert to boolean
      created_at: row.created_at,
      updated_at: row.updated_at,
      lat: row.lat,
      long: row.long,
    }));
    await City.bulkCreate(cities);
    console.log('City data populated');

    // Read and populate airport data
    const airportData = await readCSV(path.resolve(__dirname, 'db_data/airport_data.csv'));
    const airports = airportData.map(row => ({
      id: row.id,
      icao_code: row.icao_code,
      iata_code: row.iata_code,
      name: row.name,
      type: row.type,
      city_id: row.city_id,
      country_id: row.country_id,
      continent_id: row.continent_id,
      website_url: row.website_url,
      created_at: row.created_at,
      updated_at: row.updated_at,
      latitude_deg: row.latitude_deg,
      longitude_deg: row.longitude_deg,
      elevation_ft: row.elevation_ft,
      wikipedia_link: row.wikipedia_link,
    }));
    await Airport.bulkCreate(airports);
    console.log('Airport data populated');
  } catch (error) {
    console.error('Error populating data:', error);
  }
};

sequelize.sync({ force: true }).then(() => {
  populateData().then(() => {
    console.log('Data created successfully');
    process.exit();
  }).catch((error) => {
    console.error('Error creating data:', error);
    process.exit(1);
  });
}).catch((error) => {
  console.error('Unable to connect to the database:', error);
});
