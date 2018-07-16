'use strict';

module.exports.post = (event, context, callback) => {

  const postData = JSON.parse(event.body),

    comment = postData.comment,

    // TODO: Take input

    // Branch repository

    // Add the input as a file

    // Open a PR

    // TODO: CORS headers

    returnData = {
      message: 'Message posted.',
      editUrl: 'editURL_Debug'
    };

  callback(
    null,
    {
      statusCode: 200,
      body: JSON.stringify(returnData)
    }
  );

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};
