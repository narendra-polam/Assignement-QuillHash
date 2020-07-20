const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const fs = require('fs');
const config = require('../config');
const {_filter, _every, _includes} = require('lodash');

import * as AWS from 'aws-sdk/global';

module.exports = {
    login: async function (req, res) {
        try {
            let body = req.body;
            var authenticationData = {
                Username: body.userName,
                Password: body.password
            };
            var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
                authenticationData
            );
            var poolData = {
                UserPoolId: body.poolId,
                ClientId: body.clientId
            };
            var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
            var userData = {
                Username: body.userName,
                Pool: userPool,
            };
            var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (result) {
                    var accessToken = result.getAccessToken().getJwtToken();
                    AWS.config.region = body.region;

                    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                        IdentityPoolId: body.poolId,
                        Logins: {
                            // Change the key below according to the specific region your user pool is in.
                            [`cognito-idp.${body.region}.amazonaws.com/${body.poolId}`]: result
                                .getIdToken()
                                .getJwtToken(),
                        },
                    });

                    //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
                    AWS.config.credentials.refresh(err => {
                        if (err) {
                            res.send(err.message || JSON.stringify(err))
                        } else {
                            res.send('Successfully logged!');
                        }
                    });
                },

                onFailure: function (err) {
                    res.send(err.message || JSON.stringify(err))
                },
            });
        } catch (err) {
            res.send(err.message || JSON.stringify(err))
        }
    },

    fetchAllListLogs: async function (req, res) {
        try {
            res.send(JSON.parse(fs.readFileSync(config.log_path)));
        } catch (err) {
            res.send('error ', err)
        }
    },

    fetchListByFilter: async function (req, res) {
        try {
            let data = JSON.parse(fs.readFileSync(config.log_path));

            let result = _filter(data, function (o) {
                return _every(req.body, function (v, k) {
                    return _includes(o[k], v);
                });
            });

            res.send(result);
        } catch (err) {
            res.send('error ')
        }
    }

}