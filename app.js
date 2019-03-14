const express = require("express");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 8080;
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

let rawData = fs.readFileSync("data.json");
const data = JSON.parse(rawData);

app.use('/html', express.static('html'));
// Handlebars stuff


//Contexts:
let experienceContext = {
    workExperience : data.workExperience
};
let contactContext = {
    name: data.name,
    title: data.title,
    profilePicture: data.profilePicture
};

let educationContext = {
    education: data.qualifications
}

let progressContext = {
    code: data.codeInfo
}

let linksContext = {
    links: data.relevantLinks
}

let contexts = [experienceContext, contactContext, educationContext, progressContext, linksContext];

// Filenames
let inFiles = [
    'templates/experience-template.hbs',
    'templates/contactInfo-template.hbs',
    'templates/education-template.hbs',
    'templates/progress-template.hbs',
    'templates/links-template.hbs'
]
let outFiles = [
    'html/experience-template.html',
    'html/contactInfo-template.html',
    'html/education-template.html',
    'html/progress-template.html',
    'html/links-template.html'
]

// Loop through the templates and create html
for (let i = 0; i < inFiles.length; i++){
    let inFile = inFiles[i];
    let outFile = outFiles[i];
    let context = contexts[i];
    let source = fs.readFileSync(inFile, 'utf8');
    let template = handlebars.compile(source);
    let compiled = template(context);
    fs.writeFileSync(outFile, compiled);
    //console.log(compiled);
}



app.get("/data", (req, res) => res.send(data));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(process.env.PORT || 8080);
