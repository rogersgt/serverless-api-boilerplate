# serverless-api-boilerplate
This is a serverless, express, dynamoose boiler plate implementing [single table design](https://aws.amazon.com/blogs/compute/creating-a-single-table-design-with-amazon-dynamodb/).

## Stages
* `prod`: deployed aws environment
* `dev`: local development

## Env Vars
Copy the `sample.env` to a file called `.env` and fill in the missing values.

## App Secrets
The IAM policy defined in `serverless.yml` provides access to retrieve ssm parameters under a prefix pattern like `/app/$STAGE/$APP_NAME`. `APP_NAME` is set in the `.env` file.
```JavaScript
import { SSM } from 'aws-sdk';
const ssm = new SSM();
// ...
async function getParameters() {
  const { Parameters: parameters, NextToken } = await ssm.getParametersByPath({
    Path: process.env.APP_NAME,
    WithDecryption: true,
  }).promise();

  return parameters;
}
```