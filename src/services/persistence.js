const AWS = require("aws-sdk");

const TABLE_NAME = process.env.USERS_TABLE;
// const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
const dynamoDbClientParams = {};
if (process.env.IS_OFFLINE) {
  dynamoDbClientParams.region = "localhost";
  dynamoDbClientParams.endpoint = "http://localhost:8000";
}
const dynamoDbClient = new AWS.DynamoDB.DocumentClient(dynamoDbClientParams);

const read = async (key) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      userId: key,
    },
  };

  try {
    const { Item } = await dynamoDbClient.get(params).promise();
    if (Item) {
      return Item;
    } else {
      null;
    }
  } catch (error) {
    throw error;
  }
};

const create = async (item) => {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      ...item,
    },
  };
  try {
    return await dynamoDbClient.put(params).promise();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  read,
};
