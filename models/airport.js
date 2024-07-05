const { DataTypes } = require('sequelize');
const sequelize = require('../config');
const City = require('./city');
const Country = require('./country');

const Airport = sequelize.define('Airport', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  icao_code: DataTypes.STRING,
  iata_code: DataTypes.STRING,
  name: DataTypes.STRING,
  type: DataTypes.STRING,
  city_id: DataTypes.INTEGER,
  country_id: DataTypes.INTEGER,
  continent_id: DataTypes.INTEGER,
  website_url: DataTypes.STRING,
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
  latitude_deg: DataTypes.FLOAT,
  longitude_deg: DataTypes.FLOAT,
  elevation_ft: DataTypes.INTEGER,
  wikipedia_link: DataTypes.STRING,
});

Airport.belongsTo(City, { foreignKey: 'city_id', constraints: false }); // Disable constraint check
Airport.belongsTo(Country, { foreignKey: 'country_id', constraints: false }); // Disable constraint check

module.exports = Airport;
