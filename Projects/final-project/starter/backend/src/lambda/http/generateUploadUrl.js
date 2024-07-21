import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getUserId } from '../utils.mjs'
import {udpateTodoUrl} from '../database/databaseHandler.mjs'
export async function handler(event) {
  try {
    console.log("Start generate");
    const todoId = event.pathParameters.todoId
    const s3Client = new S3Client({ region: "us-east-1" });
    const userId = getUserId(event);
    const command = new PutObjectCommand({
      Bucket: 'toandm9',
      Key: `${todoId}.png`
    });

    const presigned = await getSignedUrl(s3Client, command, {
      expiresIn: 60 * 60,
    });
    console.log("Presigned", presigned);
    if(presigned){
      try{
        const url = new URL(presigned);
        console.log("Host s3:", url);
        await udpateTodoUrl(userId,todoId,url.origin+url.pathname);
      }catch(err){
        console.error(err);
      }
      
    }
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    return  {
      isBase64Encoded: false,
      body: JSON.stringify({ "uploadUrl": presigned }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      statusCode: 200,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }

}

