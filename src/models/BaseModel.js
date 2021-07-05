import dynamoose from 'dynamoose';

const {
  AWS_DYNAMODB_ENDPOINT,
  AWS_DYNAMODB_TABLE,
  STAGE,
} = process.env;

if (AWS_DYNAMODB_ENDPOINT) {
  dynamoose.aws.ddb.local(AWS_DYNAMODB_ENDPOINT);
}

export default dynamoose.model(AWS_DYNAMODB_TABLE, {
  PK: String,
  SK: String,
}, {
  create: STAGE.toLowerCase() === 'local',
});
