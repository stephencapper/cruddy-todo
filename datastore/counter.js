const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    // Example of error first callback
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};

const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    // Example of error first callback
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////
// Should use readCounter and writeCounter instead
// 'counterFile' be stored with path.join

// Will need to create a file


exports.getNextUniqueId = (callback) => {
  readCounter((err, currentCount) => {
    // console.log(currentCount, 'currentCount:');
    if (!currentCount) {
      currentCount = 0;
    } else {
      currentCount++;
    }
    writeCounter(currentCount, (err, updatedCounter) => {
      // console.log(updatedCounter, 'updated Counter');
      callback(null, updatedCounter);
    });
  });
};

// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
