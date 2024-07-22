import { createTodo } from '../database/databaseHandler.mjs'
import {getUserId} from '../utils.mjs'

export async function handler(event) {
  console.log(event);
  const newTodo = event.body;
  const userId = getUserId(event);
  console.log(userId);

  // TODO: Implement creating a new TODO item
  console.log('Create todo',newTodo);
  const result = await createTodo(newTodo, userId);
  console.log(result);
  if (result) {
    return  {
      isBase64Encoded: false,
      body: JSON.stringify(result),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      statusCode: 200,
    };
  } else {
    return  {
      isBase64Encoded: false,
      body: JSON.stringify(result),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      statusCode: 400,
    }
  }
}

