const AWS = require("aws-sdk");

const TABLE_NAME = process.env.USERS_TABLE;
// const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
const dynamoDbClientParams = {};
if (process.env.IS_OFFLINE) {
  dynamoDbClientParams.region = "localhost";
  dynamoDbClientParams.endpoint = "http://localhost:8000";
}
const dynamoDbClient = new AWS.DynamoDB.DocumentClient(dynamoDbClientParams);

const read = (key) => {
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

const create = (item) => {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      ...item,
    },
  };
  try {
    await dynamoDbClient.put(params).promise();
    res.json({ userId, name });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not create user" });
  }
};

module.exports = {
  create,
  read,
};
