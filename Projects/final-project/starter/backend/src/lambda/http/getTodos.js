import {getAllTodos} from '../database/databaseHandler.mjs'
import {getUserId} from '../utils.mjs'
export async function handler(event) {
  // TODO: Get all TODO items for a current user
  const userId = getUserId(event);
  console.log('Get todo');
  const result = await getAllTodos(userId);
  const response = {
    isBase64Encoded: false,
    body: JSON.stringify(result),
    headers: {
       'Access-Control-Allow-Origin': '*',
    },
    statusCode: 200,
 };
  return response;
}
