const DAOA = require('./DaoA');
const DaoB = require('./DaoB');


//CASE A , put the  condition as property of the data model rather than method parameter,
// for differnece condition for the same domain model, have to create each instance for each query condition, this is not good pattern because will create too much unnessary instance.
let daoa = new DAOA("A1");
let a1Data = daoa.getData();
console.log(a1Data);


let daob = new DAOA("A2");
let a2Data = daob.getData();
console.log(a2Data);

let daoc = new DAOA("A3");
let a3Data = daoc.getData();
console.log(a3Data);

//CASE B, use condition as parameter and create only one instance during query
// this will cause original condition value will be changed by the subsequence call,and this pattern will fail if want to execute in concurrency way.
let daoB = new DaoB();

for (var i = 0; i < 10; i++) {
    daoB.getData("A" + i, 10).catch(function (error) {
        console.log(error);
    });
}


// CASE B  WORK in sequencial execution order... however, not efficiency in some concurrency pattern And very error prone
let data;
(async function () {
    for (var i = 0; i < 10; i++) {
        data = await daoB.getData("A" + i, 10).catch(function (error) {
            console.log(error);
        });
        console.log(data);
    }
})();


// CASE B   WORK use new instance for each condition ==> have the same issue with the CASE A
for (var i = 0; i < 10; i++) {
    new DaoB().getData("A" + i, 10).catch(function (error) {
        console.log(error);
    }).then(function (data) {
        console.log(data);
    });
}

