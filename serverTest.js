const AWS = require('aws-sdk');

// Lecture des variables d'environnement
const REGION = process.env.AWS_REGION_MAITSO;
const TABLE_NAME = process.env.DYNAMODB_TABLE_MAITSO;

// Configuration du client DynamoDB
const dynamoDB = new AWS.DynamoDB.DocumentClient({ region: REGION });

// Exemple : récupérer tous les items de la table
const getAllSensors = async () => {
  const params = {
    TableName: TABLE_NAME
  };
  try {
    const data = await dynamoDB.scan(params).promise();
    return data.Items;
  } catch (err) {
    console.error("Erreur DynamoDB:", err);
    return [];
  }
};
