import { udpateTodo } from '../database/databaseHandler.mjs'
import {getUserId} from '../utils.mjs'
export async function handler(event) {
  const todoId = event.pathParameters.todoId;
  const updatedTodoData = JSON.parse(event.body);
  const userId = getUserId(event);
  console.log('Update todo');
  const result = await udpateTodo(updatedTodoData,userId, todoId);
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
