export const config = {
  'username': "postgres",
  'password': "12345678",
  'database': "postgres",
  'host': "database-1.chjzyzuqbxdd.us-east-1.rds.amazonaws.com",
  'dialect': 'postgres',
  'aws_region': process.env.AWS_REGION,
  'aws_profile': process.env.AWS_PROFILE,
  'aws_media_bucket': process.env.AWS_BUCKET,
  'url': process.env.URL,
  'jwt': {
    'secret': process.env.JWT_SECRET,
  },
};
