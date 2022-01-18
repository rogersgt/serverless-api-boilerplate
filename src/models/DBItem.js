import dynamoose from 'dynamoose';

const {
  AWS_DYNAMODB_ENDPOINT,
  AWS_DYNAMODB_TABLE,
  STAGE,
} = process.env;

if (AWS_DYNAMODB_ENDPOINT) {
  dynamoose.aws.ddb.local(AWS_DYNAMODB_ENDPOINT);
}

const schema = new dynamoose.Schema({
  PK: {
    type: String,
    hashKey: true,
  },
  SK: {
    type: String,
    rangeKey: true,
  },
}, {
  saveUnknown: ['*.*', '*.**', '*.***'],
  timestamps: true,
});

export default dynamoose.model(AWS_DYNAMODB_TABLE, schema, {
  create: STAGE.toLowerCase() === 'dev',
});
