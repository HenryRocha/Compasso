const mongoose = require("mongoose");

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", function () {
    console.log("Could not connect to the database");
});

db.once("open", function () {
    console.log("Successfully connected to the database");
});


const projectSchema = new mongoose.Schema({
    interactions: [String],
    _companyId: mongoose.ObjectId,
    projectsName: String,
    contact: String,
});

const userSchema = new mongoose.Schema({
    company: mongoose.ObjectId,
    name: String,
    email: String,
    hash: String,
    salt: String
});

const dbCompany = mongoose.model("projects", projectSchema);
const dbUsers = mongoose.model("users", userSchema);

async function getUser(userID) {
    return new Promise(function (resolve, reject) {
        dbUsers.findById(userID).then((resp) => {
            if (resp != null) {
                resolve({ "found": true, "message": "Usuário encontrado!" })
            } else {
                resolve({ "found": false, "message": "Usuário não encontrado!" })
            }
        }).catch((err) => {
            console.log(err)
        })
    })
}

async function addProject(projectInfo) {
    return new Promise(function (resolve, reject) { //TODO: Verify if user exist
        dbCompany.findOne({ _companyId: projectInfo._companyId }).then((resp) => {
            if (resp === undefined) {
                dbCompany.create(projectInfo).then((resp) => {
                    resolve({
                        "status:": "success",
                        "data": { "projectInfo": projectInfo, inserted: resp }
                    })
                })
            } else {
                resolve({
                    "status": "error",
                    "data": "Já existe um projeto com este nome"
                });
            }
        }).catch((err) => {
            console.log(err)
        })
    })
}

