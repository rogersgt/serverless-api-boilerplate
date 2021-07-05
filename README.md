# my-api

## Config
SSM Parameters
### app
Environment variables consumed by the application code prefixed by `/app/<service-name>`
- `SSM_APP_PATH`

### deployment
Configuration options used by serverless to deploy the application in AWS, prefixed by `/deploy/<service-name>`
- `DOMAIN_NAME`
- `ACM_CERTIFICATE`
- `CORS_ORIGIN` (defaults to `*`)

## environment variables
### all environments
- `SSM_APP_PATH`
- `STAGE`

### local environment variables only
- `AWS_DYNAMODB_ENDPOINT`
