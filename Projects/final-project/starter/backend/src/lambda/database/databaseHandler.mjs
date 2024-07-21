import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import { v4 as uuidv4 } from 'uuid';
const dynamoDbDocument = DynamoDBDocument.from(new DynamoDB())

export async function getAllTodos(userId) {
  console.log(userId);
  const result = await dynamoDbDocument.query({ // Call parameters
    TableName: "Todos-dev",
    KeyConditionExpression: "#userId = :userId",
    ExpressionAttributeNames: {
      "#userId": "userId",
    },
    ExpressionAttributeValues: {
      ":userId": userId
    },
    Limit: 20
  })
  return result;
}

export async function queryTodoByField(fieldName, fieldValue) {
  try {
    console.log("Value input", fieldValue);
    const paramQuery = {
      TableName: 'Todos-dev',
      Key: {
        todoId: fieldValue
      }
    };
    const result = await dynamoDbDocument.get(paramQuery);
    return result.Item;
  } catch (err) {
    console.error("Query faild", err);
    throw err;
  }

}

export async function createTodo(newTodo, userId) {
  try {
    console.log("input data: ", newTodo);
    console.log("typeof : ", typeof newTodo);
    const todoEntity = {...JSON.parse(newTodo), ...{todoId: uuidv4(), userId: userId, done: false, createdAt: new Date().toUTCString, attachmentUrl: "" }};
    console.log("TOdo entity:",todoEntity);
    const params = {
      TableName: 'Todos-dev',
      Item: todoEntity 
    };
    console.log("Params to create", params);
    await dynamoDbDocument.put(params);
    console.log('Item inserted successfully');
    return {result:true, item: todoEntity};
  } catch (err) {
    console.error(err);
    return  {result:false};;
  }
}

export async function udpateTodo(inputData, userId, todoId) {

  try {
    console.log(inputData);
    const result = await dynamoDbDocument.get({ // Call parameters
      TableName: "Todos-dev",
      Key: {
        todoId: todoId,
        userId: userId
      },
    });
    console.log(result);
    if (result) {
      console.log("Start update");
      const params = {
        TableName: 'Todos-dev',
        Key: {
          "todoId": todoId,
          "userId": userId
        },
        UpdateExpression: 'set #name = :name, #done = :done, #dueDate = :dueDate',
        ExpressionAttributeValues: {
          ':name': inputData?.name,
          ':done': inputData?.done,
          ':dueDate': inputData?.dueDate,
        },
        ExpressionAttributeNames: {
          "#name": "name",
          "#done": "done",
          "#dueDate": "dueDate",
        }
      };
      await dynamoDbDocument.update(params);
      console.log('Item udpate successfully');
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error("Update faild", err);
    return false;
  }
}


export async function udpateTodoUrl(userId, todoId, url) {

  try {
    const result = await dynamoDbDocument.get({ // Call parameters
      TableName: "Todos-dev",
      Key: {
        todoId: todoId,
        userId: userId
      },
    });
    console.log("Result generate data:", result);
    if (result) {
      const params = {
        TableName: 'Todos-dev',
        Key: {
          "todoId": todoId,
          "userId": userId
        },
        UpdateExpression: 'set #attachmentUrl =:attachmentUrl',
        ExpressionAttributeValues: {
          ':attachmentUrl': url,
        },
        ExpressionAttributeNames: {
          "#attachmentUrl": "attachmentUrl",
        }
      };

      console.log("params generate data:", result);
      await dynamoDbDocument.update(params);
      console.log('Update url successfully');
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error("Update faild", err);
    return false;
  }
}


export async function deleteTodo(id, userId) {
  const result = await dynamoDbDocument.get({ // Call parameters
    TableName: "Todos-dev",
    Key: {
      todoId: id,
      userId: userId
    },
  });
  console.log(result);
  if (result) {
    try {
      const params = {
        TableName: "Todos-dev",
        Key: {
          todoId: id,
          userId: userId
        }
      }
      await dynamoDbDocument.delete(params);
      console.log('Delete successfully');
      return true;
    } catch (err) {
      return false;
    }
  } else {
    return false;
  }
}

