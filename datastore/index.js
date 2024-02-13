const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////
// Don't forget Error first Callbacks!
// USE ONLY ASYNC FUNCTIONS

// Each new todo entry must be saved in its own file.
// Use the unique id generated by getNextUniqueId to create a file path inside the dataDir.
// Each time a POST request is made to the collection route, save a file with the todo item in this folder.
//Only save the todo text in the file, the id of the todo item is encoded into its filename --
// DO NOT STORE AN OBJECT.

// fs.opendir('./data', callback((err, dir) => {
//  dir.
// })
//
// writeFile('./data/${value}', text, (err)=> {})



exports.create = (text, callback) => {
  // increments counter
  counter.getNextUniqueId((err, value) => {
    // writes new file with new ID
    fs.writeFile(path.join(exports.dataDir, value + '.txt'), text, (err)=> {
      if(err) {
        callback(err);
      } else {
        // returns an object that the client likes
        callback(null, {'id': value, 'text': text});
      }
    })
  });
};

//  fs.opendir(path, callback(err, dir) => {
//  var response = [];

//  for (dirent of dir) {
//    var currentId = dirent.name.slice(0,5)
//    var entry = { id : currentId, text : currentId }
//    response.push(entry)
// }

//  DO SOMETHING WITH response.
// }

// Want to create an array that has the object we're expecting to have

exports.readAll = (callback) => {
  fs.readdir(exports.dataDir, (err, files) => {
    var readAllArray = [];
    if (err) {
      console.log('my bad');
      callback(err);
    } else {
      for (var fileName of files) {
        var currID = fileName.slice(0,5);
        readAllArray.push({'id' : currID, 'text' : currID});
      }
      callback(null, readAllArray);
    }
  })
};

//path = path.join(exports.dataDir, id + 'txt')
// readFile (path, callback(err, fileData) => {
    //if error
      //callback(new Error(`No item with id: ${id}`))
    //otherwise
      //callback(null, { 'id' = id, 'text' = fileData});
//})

exports.readOne = (id, callback) => {
  var idPath = path.join(exports.dataDir, id + '.txt');
  fs.readFile(idPath, (err, fileData) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      callback(null, { 'id': id, 'text': String(fileData)});
    }
  });

  // var text = items[id];
  // if (!text) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback(null, { id, text });
  // }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
