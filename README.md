# serverless-api-boilerplate
This is a serverless, express, dynamoose boiler plate implementing [single table design](https://aws.amazon.com/blogs/compute/creating-a-single-table-design-with-amazon-dynamodb/).

## Env Vars
Copy the `sample.env` to a file called `.env` and fill in the missing values.

## App Secrets
SSM Parameters
### app
Application secrets consumed by via SSM, prefixed by `/app/<stage>/<app-name>`
- 
