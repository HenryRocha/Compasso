const mongoose = require("mongoose");


mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", function () {
    console.log("Could not connect to the database");
});

db.once("open", function () {
    console.log("Successfully connected to the database");
});


const schema = new mongoose.Schema({
    interactions: [String],
    _companyId: mongoose.ObjectId,
    projectsName: String,
    contact: String,
});

const db = mongoose.model("projects", schema);



async function addProject(projectInfo) {

    return new Promise(function (resolve, reject) {

        
        
        db.findOne({ _companyId: projectInfo._companyId }).then((resp) => {
            if (resp === undefined) {

                db.create(projectInfo).then((resp) => {
                    resolve({"status:": "success",
                    "data": {"projectInfo": projectInfo, inserted:resp}})
                    
                })



                
            } else {
                resolve({"status": "error",
                "data": "Já existe um projeto com este nome"});
            }
        }).catch((err) => {
            console.log(err)

        })

    })
}

