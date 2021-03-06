#!/usr/bin/env node

const deepUtil = require("../deepUtil.js");
const util = require("util");

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
let testObject = {
    squadName: "Super hero squad",
    homeTown: "Metro City",
    formed: 2016,
    secretBase: "Super tower",
    active: true,
    members: [
        {
            name: "Molecule Man",
            age: 29,
            secretIdentity: "Dan Jukes",
            powers: [
                "Radiation resistance",
                "Turning tiny",
                "Radiation blast"
            ]
        },
        {
            name: "Madame Uppercut",
            age: 39,
            secretIdentity: "Jane Wilson",
            powers: [
                "Million tonne punch",
                "Damage resistance",
                "Superhuman reflexes"
            ]
        },
        {
            name: "Eternal Flame",
            age: 1000000,
            secretIdentity: "Unknown",
            powers: [
                "Immortality",
                "Heat Immunity",
                "Inferno",
                "Teleportation",
                "Interdimensional travel"
            ]
        }
    ]
};

try{
    const mergedTestObject1 = deepUtil.merge(
        testObject,
        {
            squadName: 'overwrite',
            homeTown: {
                country: "US",
                states: "California"
            }
        },
        {
            homeTown: {
                country: "US",
                states: "Massachusetts",
                city: "Boston"
            }
        },
        {
            homeTown: {
                country: "US",
                states: "Massachusetts",
                city: "Cambridge"
            }
        }
    ); // TypeError
}catch(err){
    console.log(err);
}

delete testObject.homeTown;
const mergedTestObject2 = deepUtil.merge(
    testObject,
    {
        squadName: 'overwrite',
        homeTown: {
            country: "US",
            states: "California"
        }
    },
    {
        homeTown: {
            country: "US",
            states: "Massachusetts",
            city: "Boston"
        }
    },
    {
        homeTown: {
            country: "US",
            states: "Massachusetts",
            city: "Cambridge"
        }
    }
);

console.log(
    util.inspect(mergedTestObject2,false,null)
);
