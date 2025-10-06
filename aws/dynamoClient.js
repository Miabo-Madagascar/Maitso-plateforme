require('dotenv').config();
const AWS = require('aws-sdk');

const REGION = process.env.AWS_REGION_MAITSO;
const TABLE_NAME = process.env.DYNAMODB_TABLE_MAITSO;

const dynamoDB = new AWS.DynamoDB.DocumentClient({ region: REGION });

async function getAllItems() {
  try {
    const data = await dynamoDB.scan({ TableName: TABLE_NAME }).promise();
    return data.Items;
  } catch (err) {
    console.error('Erreur DynamoDB:', err);
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
