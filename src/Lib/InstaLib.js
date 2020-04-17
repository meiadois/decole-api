'use strict';
var axios = require('axios');


var InstaLib = function () {
    //https://www.instagram.com
    var InstagramApi = axios.create({
        baseURL: "https://www.instagram.com",
    });

    this.getUserByNickname = async function (nickname) {
        ///web/search/topsearch/?context=user&count=0&query={{ user_name  }}
        var query = this.convertObjectToQueryString({
            'context': 'user',
            'count': '0',
            'query': nickname
        });

        var data = await InstagramApi.get(`/web/search/topsearch${query}`, {})
            .then((result) => {
                return result.data.users[0].user;
            }).catch((err) => {
                console.log(err);
                return null;
            });
        return data;
    }
    this.getUserProfileByNickname = async function (nickname) {
        ///web/search/topsearch/?context=user&count=0&query={{ user_name  }}
        var query = this.convertObjectToQueryString({
            '__a': '1',
        });

        var data = await InstagramApi.get(`/${nickname}${query}`, {})
            .then((result) => {
                return result.data;
            }).catch((err) => {
                console.log(err);
                return null;
            });
        return data;
    }

    this.convertObjectToQueryString = function (obj) {
        // Clone the object obj and loose the reference
        obj = Object.create(obj);
        var result = '?';
        for (var i in obj) {
            result += i + "=";
            if (obj[i] != undefined) {
                if (Array.isArray(obj[i])) {
                    result += obj[i].join() + "&";
                } else {
                    result += obj[i] + "&";
                }
            }
        }
        if (result[result.length - 1] == '&') {
            result = result.substr(0, result.length - 1);
        }
        if (result == '?')
            result = '';
        return result;
    }
}

module.exports = InstaLib;