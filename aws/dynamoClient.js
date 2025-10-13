require('dotenv').config();
const AWS = require('aws-sdk');

const REGION = process.env.AWS_REGION_MAITSO;
const TABLE_NAME = process.env.DYNAMODB_TABLE_MAITSO;

const dynamoDB = new AWS.DynamoDB.DocumentClient({ region: REGION });

async function getAllItems() {
  try {
    const data = await dynamoDB.scan({ TableName: TABLE_NAME }).promise();

    // Nettoyer chaque item
    const cleanedItems = data.Items.map(item => {
      const { device_id, timestamp, payload } = item;
      // enlever device_id et timestamp dans payload
      const { device_id: _d, timestamp: _t, ...cleanedPayload } = payload;

      return {
        device_id,
        timestamp,
        payload: cleanedPayload,
      };
    });

    return cleanedItems;
  } catch (err) {
    console.error('Erreur DynamoDB:', err);
    return [];
  }
}

async function getAllItemsLocal() {
  try {
    const data = require('./data.json');

    // Nettoyer chaque item
    const cleanedItems = data.map(item => {
      const { device_id, timestamp, payload } = item;
      // enlever device_id et timestamp dans payload
      const { device_id: _d, timestamp: _t, ...cleanedPayload } = payload;

      return {
        device_id,
        timestamp,
        payload: cleanedPayload,
      };
    });

    return cleanedItems;
  } catch (err) {
    console.error('Erreur lecture fichier data.json:', err);
    return [];
  }
}

async function putItem(item) {
  try {
    await dynamoDB.put({ TableName: TABLE_NAME, Item: item }).promise();
    return true;
  } catch (err) {
    console.error('Erreur DynamoDB:', err);
    return false;
  }
}

module.exports = { getAllItems, putItem };
