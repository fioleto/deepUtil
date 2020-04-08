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

const OK1 = deepUtil.check(
    testObject,
    {
        squadName: "string",
        homeTown: "string",
        formed: "number",
        secretBase: "string",
        active: "boolean",
        "members[]": {
            name: "string",
            age: "number",
            secretIdentity: "string",
            powers: "string[]"
        } 
    }
);

const OK2 = deepUtil.check(
    testObject,
    {
        squadName: "string",
        homeTown: "string",
        formed: "number",
        secretBase: "string",
        active: "boolean",
        members$: {
            name: "string",
            age: "number",
            secretIdentity: "string",
            powers: "string[]"
        } 
    },
    /\$$/ // repeat RegExp
);

const NG = deepUtil.check(
    testObject,
    {
        squadName: "number", // Type error.
        homeTown: "string",
        formed: "number",
        secretBase: "string",
        active: "boolean",
        "members[]": {
            name: "string",
            age: "number",
            // secretIdentity: "string", // Not found.
            powers: "string[]"
        } 
    }
);

console.log(
    OK1.error, // false,
    OK2.error, // false
    NG.error  // true
);