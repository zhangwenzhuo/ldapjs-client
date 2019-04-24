const DAOA = require('./DaoA');
const DaoB = require('./DaoB');


//CASE A , put the  condition as property of the data model rather than method parameter,
// for differnece condition for the same domain model, have to create each instance for each query condition, this is not good pattern because will create too much instance.
let daoa = new DAOA("A1");
let a1Data = daoa.getData();


let daob = new DAOA("A2");
let a2Data = daob.getData();


let daoc = new DAOA("A3");
let a3Data = daoc.getData();


//CASE B, use condition as parameter and create only one instance during query
// this will cause original condition value will be changed by the subsequence call,and this pattern will fail if want to execute in concurrency way.
let daoB = new DaoB();

for (var i = 0; i < 10; i++) {
    daoB.getData("A" + i, 10).catch(function (error) {
        console.log(error);
    });
}


// CASE B  ONLY WORK in sequencial execution order...
let data;
(async function () {
    for (var i = 0; i < 10; i++) {
        data = await daoB.getData("A" + i, 10).catch(function (error) {
            console.log(error);
        });
        console.log(data);
    }
})();
