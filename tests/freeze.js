#!/usr/bin/env node

const deepUtil = require("../deepUtil.js");

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
const testObject = {
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

let freezedTestObject = deepUtil.freeze(testObject);

try{
    freezedTestObject.squadName = 'hoge';
}catch(err){
    console.error(err);
}

try{
    freezedTestObject.members.push('hoge');
}catch(err){
    console.error(err);
}

console.log(
    JSON.stringify(freezedTestObject) === JSON.stringify(testObject)
); // true
