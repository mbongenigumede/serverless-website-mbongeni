const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = "Messages";

exports.handler = async (event) => {
  try {
    // GET /messages
    if (event.httpMethod === "GET") {
      const data = await dynamoDB.scan({ TableName: TABLE_NAME }).promise();
      return response(200, data.Items);
    }

    // POST /messages
    if (event.httpMethod === "POST") {
      const body = JSON.parse(event.body);

      const item = {
        id: Date.now().toString(),
        text: body.text,
      };

      await dynamoDB.put({
        TableName: TABLE_NAME,
        Item: item,
      }).promise();

      return response(201, item);
    }

    return response(400, { message: "Invalid request" });

  } catch (err) {
    console.error(err);
    return response(500, { error: "Server error" });
  }
};

function response(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",   // IMPORTANT for frontend
    },
    body: JSON.stringify(body),
  };
}
