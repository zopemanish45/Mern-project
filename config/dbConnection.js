const mongoose = require('mongoose');

function dbConnect(){
    try{
        mongoose.connect(process.env.DB_URL)
        .then(()=>{
            console.log('Great conneacted with DB')
        })

    }catch(error){
        console.log('failed to connect',error)
    }
}

module.exports = {dbConnect}