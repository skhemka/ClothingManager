// include my model for this application
var mongoModel = require("../models/mongoModel.js")

// Define the routes for this controller
exports.init = function(app) {
  app.get('/', index); // essentially the app welcome page
  app.get('/all', all); 
  app.get('/dirty', dirty); 
  app.get('/addClothes', addClothes)
  // The collection parameter maps directly to the mongoDB collection
  app.put('/:collection', doCreate); // CRUD Create
  app.get('/:collection', doRetrieve); // CRUD Retrieve
  app.post('/:collection', doUpdate); // CRUD Update
  app.delete('/:collection', doDelete); // CRUD Delete
}

// No path:  display instructions for use
index = function(req, res) {
  res.render('index',{});
};

all = function(req, res) {
  res.render('all',{});
};

dirty = function(req, res) {
  res.render('dirty',{});
};

addClothes = function(req,res) {
  res.render('addClothes',{});
}


/********** CRUD Create *******************************************************
 * Take the object defined in the request body and do the Create
 * operation in mongoModel.  (Note: The mongoModel method was called "insert"
 * when we discussed this in class but I changed it to "create" to be
 * consistent with CRUD operations.)
 */ 
doCreate = function(req, res){
  /*
   * A series of console.log messages are produced in order to demonstrate
   * the order in which the code is executed.  Given that asynchronous 
   * operations are involved, the order will *not* be sequential as implied
   * by the preceding numbers.  These numbers are only shorthand to quickly
   * identify the individual messages.
   */
  console.log("1. Starting doCreate in dbRoutes");
  /*
   * First check if req.body has something to create.
   * Object.keys(req.body).length is a quick way to count the number of
   * properties in the req.body object.
   */
  if (Object.keys(req.body).length == 0) {
    res.render('message', {title: 'Mongo Demo', obj: "No create message body found"});
    return;
  }
  /*
   * Call the model Create with:
   *  - The collection to do the Create into
   *  - The object to add to the model, received as the body of the request
   *  - An anonymous callback function to be called by the model once the
   *    create has been successful.  The insertion of the object into the 
   *    database is asynchronous, so the model will not be able to "return"
   *    (as in a function return) confirmation that the create was successful.
   *    Consequently, so that this controller can be alerted with the create
   *    is successful, a callback function is provided for the model to 
   *    call in the future whenever the create has completed.
   */
  mongoModel.create ( req.params.collection, 
	                    req.body,
		                  function(result) {
		                    // result equal to true means create was successful
  		                  var success = (result ? "Create successful" : "Create unsuccessful");
	  	                  res.redirect('');
     		                console.log("2. Done with callback in dbRoutes create");
		                  });
  console.log("3. Done with doCreate in dbRoutes");
}

/********** CRUD Retrieve (or Read) *******************************************
 * Take the object defined in the query string and do the Retrieve
 * operation in mongoModel.  (Note: The mongoModel method was called "find"
 * when we discussed this in class but I changed it to "retrieve" to be
 * consistent with CRUD operations.)
 */ 

doRetrieve = function(req, res){
  /*
   * Call the model Retrieve with:
   *  - The collection to Retrieve from
   *  - The object to lookup in the model, from the request query string
   *  - As discussed above, an anonymous callback function to be called by the
   *    model once the retrieve has been successful.
   * modelData is an array of objects returned as a result of the Retrieve
   */
  mongoModel.retrieve(
    req.params.collection, 
    req.query,
		function(modelData) {
		  if (modelData.length) {
        res.render('index_table',{obj: modelData});
      } else {
        var message = "No clothes found. Add clothes or wash dirty clothes!";
        res.render('message', {obj: message});
      }
		});
}

/********** CRUD Update *******************************************************
 * Take the MongoDB update object defined in the request body and do the
 * update.  (I understand this is bad form for it assumes that the client
 * has knowledge of the structure of the database behind the model.  I did
 * this to keep the example very general for any collection of any documents.
 * You should not do this in your project for you know exactly what collection
 * you are using and the content of the documents you are storing to them.)
 */ 
doUpdate = function(req, res){
  // if there is no filter to select documents to update, select all documents
  //var filter = req.body.name ? JSON.parse(req.body.name) : {};
  console.log("name");
  console.log(req.body.name);
  var filter = {};
  if(req.body.name) 
    filter = {'name': req.body.name};


  console.log(filter);
  
  // if there no update operation defined, render an error page.
  if (!req.body.status) {
    res.render('message', {title: 'Mongo Demo', obj: "No update operation defined"});
    return;
  }
  var update = {"$set":{"status":req.body.status}}
  console.log("update");
  //var update = JSON.parse(req.body.update);
  console.log(update);
  /*
   * Call the model Update with:
   *  - The collection to update
   *  - The filter to select what documents to update
   *  - The update operation
   *    E.g. the request body string:
   *      find={"name":"pear"}&update={"$set":{"leaves":"green"}}
   *      becomes filter={"name":"pear"}
   *      and update={"$set":{"leaves":"green"}}
   *  - As discussed above, an anonymous callback function to be called by the
   *    model once the update has been successful.
   */
  mongoModel.update(  req.params.collection, filter, update,
		                  function(status) {
              				  res.render('message',{title: 'Mongo Demo', obj: status});
		                  });
  
  console.log("done with update");
}

/********** CRUD Delete *******************************************************
 * The delete route handler defined by deriving from the fucntions given above 
 * and the API at 
 * http://mongodb.github.io/node-mongodb-native/2.0/api/Collection.html#remove
 */
doDelete = function(req, res){
  console.log("starting delete");
  // if there is no filter to select documents to update, select all documents
  var filter = req.body.selector ? JSON.parse(req.body.selector) : {};
  console.log(filter);
  /*
   * Call the model Delete with:
   *  - The collection to update
   *  - The filter to select which documents to delete
   *    E.g. the request body string:
   *      selector={"name":"pear"}
   *      becomes filter={"name":"pear"}
   *  - As discussed above, an anonymous callback function to be called by the
   *    model once the delete has been successful.
   */
  console.log("query");
  console.log(req.body);
  mongoModel.delete(  req.params.collection, req.body,
		                  function(status) {
              				  res.render('message',{title: 'Mongo Demo', obj: status});
		                  });
  console.log("Delete done"); 
}

/*
 * How to test:
 *  - Create a test web page
 *  - Use REST Console for Chrome
 *    (If you use this option, be sure to set the Body Content Headers Content-Type to:
 *    application/x-www-form-urlencoded . Else body-parser won't work correctly.)
 *  - Use CURL (see tests below)
 *    curl comes standard on linux and MacOS.  For windows, download it from:
 *    http://curl.haxx.se/download.html
 *
 * Tests via CURL for Create and Update (Retrieve can be done from browser)

# >>>>>>>>>> test CREATE success by adding 3 fruits
curl -i -X PUT -d "name=apricot&price=2" http://localhost:50000/fruit
curl -i -X PUT -d "name=banana&price=3" http://localhost:50000/fruit
curl -i -X PUT -d "name=cantaloupe&price=4" http://localhost:50000/fruit
# >>>>>>>>>> test CREATE missing what to put
curl -i -X PUT  http://localhost:50000/fruit
# >>>>>>>>>> test UPDATE success - modify
curl -i -X POST -d 'find={"name":"banana"}&update={"$set":{"color":"yellow"}}' http://localhost:50000/fruit
# >>>>>>>>>> test UPDATE success - insert
curl -i -X POST -d 'find={"name":"plum"}&update={"$set":{"color":"purple"}}' http://localhost:50000/fruit
# >>>>>>>>>> test UPDATE missing filter, so apply to all
curl -i -X POST -d 'update={"$set":{"edible":"true"}}' http://localhost:50000/fruit
# >>>>>>>>>> test UPDATE missing update operation
curl -i -X POST -d 'find={"name":"pear"}' http://localhost:50000/fruit

 */
