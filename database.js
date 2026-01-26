const {MongoClient} = require('mongodb')

const URI = "mongodb+srv://sg491919_db_user:bjFvoW7INyf7S6gJ@cluster0.j9w2izz.mongodb.net/?appName=Cluster0"
const client = new MongoClient(URI);


const dbName = "namaste-node-js"

async function main(){
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection("User")


    // addition of data
    const data = {
        firstName: "Akshay Saini",
        lastName: "Saini",
        city:"Dehradun"
    }

    // await collection.insertMany([data]);
    const findResult = await collection.find({firstName:"Akshay Saini"}).count();
    console.log("FindResult", findResult)

    return "done"
}

main().then(() => {
    console.log("hello world")
})
.catch((error) => console.log("error", error))
.finally(() => client.close())
