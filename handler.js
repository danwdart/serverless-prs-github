'use strict';

const {
    GIT_REPOSITORY,
    GIT_REPOSITORY_DIR,
    GITHUB_ACCESS_TOKEN,
    BRANCH_PREFIX,
    BASE_BRANCH,
    FILE_SUFFIX,
    COMMIT_MESSAGE_PREFIX,
    GIT_BASE
  } = process.env,

  GIT_REMOTE = `origin`,
  RANDOM_NAME = (Math.random() * 1e16).toString(36),
  BRANCH_NAME = `${BRANCH_PREFIX}_${RANDOM_NAME}`,
  FILE_NAME = `${RANDOM_NAME}${FILE_SUFFIX}`,
  FILEPATH_NAME = `${GIT_REPOSITORY_DIR}/${FILE_NAME}`,
  octokit = require('@octokit/rest')(),
  fse = require('fs-extra'),
  simpleGit = require('simple-git')(__dirname+'/' + GIT_REPOSITORY_DIR),
  clone = () => simpleGit.clone(GIT_REPOSITORY, GIT_REPOSITORY_DIR),
  branch = () => simpleGit.checkoutBranch(BRANCH_NAME, BASE_BRANCH),
  createFile = comment => fse.writeFile(FILEPATH_NAME, comment),
  add = () => simpleGit.add([FILE_NAME]),
  commit = commitMessage => simpleGit.commit(commitMessage, [FILE_NAME]),
  push = () => simpleGit.push(GIT_REMOTE, BRANCH_NAME),
  pr = commitMessage => octokit.pullRequests.create(
    {
      title: commitMessage,
      owner: GITHUB_OWNER,
      repo: GIT_REPOSITORY,
      head: BRANCH_NAME,
      base: GIT_BASE
    }
  ),
  post = async event => {
    const {comment, title} = JSON.parse(event.body),
      commitMessage = `${COMMIT_MESSAGE_PREFIX}: ${title}`;
    await clone();
    await branch();
    await createFile(comment);
    await add();
    await commit(commitMessage);
    await push();
    await pr(commitMessage);
    return {status: `OK`}
  },

octokit.authenticate({
  type: 'token',
  token: GITHUB_ACCESS_TOKEN
});

module.exports.post = (event, context, callback) =>
  post(event)
    .then(
      result =>
        // Use this code if you don't use the http event with the LAMBDA-PROXY integration
        // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
        callback(
          null,
          {
            statusCode: 200,
            body: JSON.stringify(
              {
                message: 'Message posted.',
                editUrl: 'editURL_Debug'
              }
            )
          }
        )
    ).catch(console.log);
