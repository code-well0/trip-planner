import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const FLIGHTAPI_KEY = process.env.FLIGHTAPI_KEY;
const FLIGHTAPI_BASE_URL = 'https://api.flightapi.io/roundtrip';

// FlightAPI's roundtrip endpoint takes airport IATA codes and has no city
// lookup endpoint of its own, so we map the cities this app supports to
// their nearest major airport.
const IATA_CODES = {
  delhi: 'DEL', mumbai: 'BOM', bangalore: 'BLR', chennai: 'MAA', kolkata: 'CCU',
  hyderabad: 'HYD', pune: 'PNQ',
  agra: 'AGR', jaipur: 'JAI', goa: 'GOI', varanasi: 'VNS', darjeeling: 'IXB',
  jaisalmer: 'JSA', udaipur: 'UDR', rishikesh: 'DED', khajuraho: 'HJR',
  munnar: 'COK', amritsar: 'ATQ', hampi: 'HBX',
  paris: 'CDG', kyoto: 'KIX', 'new york city': 'JFK', london: 'LHR',
  dubai: 'DXB', rome: 'FCO', bangkok: 'BKK', bali: 'DPS', santorini: 'JTR',
  istanbul: 'IST', sydney: 'SYD', cairo: 'CAI',
};

const resolveIATACode = (cityName) => {
  const code = IATA_CODES[cityName.trim().toLowerCase()];
  if (!code) throw new Error(`No known airport code for "${cityName}"`);
  return code;
};

const getFutureDate = (daysAhead) => {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split('T')[0];
};

export const getLivePriceEstimate = async ({ destinationCity, originCity = 'Delhi', travelers = 2 }) => {
  if (!destinationCity) throw new Error('destinationCity is required');
  if (!FLIGHTAPI_KEY) throw new Error('FlightAPI credentials not configured (set FLIGHTAPI_KEY)');

  const originCode = resolveIATACode(originCity);
  const destCode = resolveIATACode(destinationCity);

  const departureDate = getFutureDate(30);
  const returnDate = getFutureDate(37);

  const url = `${FLIGHTAPI_BASE_URL}/${FLIGHTAPI_KEY}/${originCode}/${destCode}/${departureDate}/${returnDate}/${travelers}/0/0/Economy/INR`;

  const res = await axios.get(url);
  const itineraries = res.data?.itineraries || [];
  if (itineraries.length === 0) {
    throw new Error(`No live flight offers found for ${originCity} -> ${destinationCity}`);
  }

  const cheapest = itineraries.reduce((min, it) => {
    const price = it.cheapest_price?.amount;
    if (price == null) return min;
    return (min == null || price < min.cheapest_price.amount) ? it : min;
  }, null);

  if (!cheapest) throw new Error('No priced itineraries returned');

  const totalFlightPrice = Math.round(cheapest.cheapest_price.amount);

  return {
    destination: destinationCity,
    origin: originCity,
    originCode,
    destinationCode: destCode,
    travelers,
    currency: 'INR',
    totalFlightPrice,
    pricePerPerson: Math.round(totalFlightPrice / travelers),
    departureDate,
    returnDate,
    source: 'flightapi-live',
    fetchedAt: new Date().toISOString(),
  };
};
