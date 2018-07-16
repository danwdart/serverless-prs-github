# Serverless Pull Requests for GitHub

1. Takes an input on an HTTPS endpoint with wildcard CORS
1. Branches a repository
1. Adds the input as a file
1. Opens a PR


## Configuring / deploying

1. Edit serverless.yml and update your configs - update provider etc.
1. Run `serverless deploy`.