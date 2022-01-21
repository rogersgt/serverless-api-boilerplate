# serverless-api-boilerplate
This is a serverless, express, dynamoose boiler plate implementing [single table design](https://aws.amazon.com/blogs/compute/creating-a-single-table-design-with-amazon-dynamodb/).

## Stages
* `prod`: deployed aws environment
* `dev`: local development

## Env Vars
Copy the `sample.env` to a file called `.env` and fill in the missing values.

## Running locally
```bash
npm install
docker compose up -d # Or use docker-compose for Linux
npm start
```

## Deploying
```bash
npm install
npm run deploy # deploys to an aws environment called "prod"
```

## Authentication
Cognito Authentication is built in to the prod deployment. An example `curl` request with [`jq`](https://stedolan.github.io/jq/) to get a JWT:
*First make sure jq is installed by running: `which jq`. It should output the path to the installation if it is installed already.*

```bash
export COGNITO_USERNAME=<your username>
export COGNITO_PASSWORD=<your password>
export COGNITO_CLIENT_ID=<cognito application client id>
export AWS_REGION=<the region in which you deployed your api>

export JWT_TOKEN=$(curl -X POST https://cognito-idp.$AWS_REGION.amazonaws.com/ \
  -H 'Content-Type: application/x-amz-json-1.1' \
  -H 'X-Amz-Target: AWSCognitoIdentityProviderService.InitiateAuth' \
  --data "{\"AuthParameters\":{\"USERNAME\":\"$COGNITO_USERNAME\",\"PASSWORD\":\"$COGNITO_PASSWORD\"},\"AuthFlow\":\"USER_PASSWORD_AUTH\",\"ClientId\":\"$COGNITO_CLIENT_ID\"}" \
  | jq -r '.AuthenticationResult.AccessToken')

# you can now make an authenticated request against your prod api:
curl -H "Authorization: Bearer $JWT_TOKEN" <your-prod-api-url>
```


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