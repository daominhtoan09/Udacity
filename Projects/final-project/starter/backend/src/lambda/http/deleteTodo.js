
import { deleteTodo } from '../database/databaseHandler.mjs'
import {getUserId} from '../utils.mjs'
export async function handler(event) {
  console.log("Delete todo: ", event);
  const todoId = event.pathParameters.todoId;
  const userId = getUserId(event);
  // TODO: Remove a TODO item by id
  const result = await deleteTodo(todoId, userId);
  if (result) {
    return  {
      isBase64Encoded: false,
      body: JSON.stringify({ "result": true }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      statusCode: 200,
    };
  } else {
    return  {
      isBase64Encoded: false,
      body: JSON.stringify({ "result": false }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      statusCode: 400,
    }
  }
}

