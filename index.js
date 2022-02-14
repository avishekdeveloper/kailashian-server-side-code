// const express = require('express');
// const { MongoClient } = require('mongodb');
// const ObjectId = require('mongodb').ObjectId;
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 5000;

// // middleware
// app.use(cors());
// app.use(express.json());

// // kailash.basic


// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kq3to.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// async function run() {
//     try {
//         await client.connect();
//         const database = client.db("kailash");
//         const basicCollection = database.collection("basic");
//         const usersCollection = database.collection("users");


//         app.post('/users', async (req, res) => {
//             const user = req.body;
//             const result = await usersCollection.insertOne(user);
//             console.log(result);
//             res.json(result);
//         });
//         app.get('/user', async (req, res) => {
            
//             const cursor = usersCollection.find({});
//             const users = await cursor.toArray();
//             console.log(result);
//             res.send(users);
//         });
//         app.get('/basic', async (req, res) => {

//             const cursor = basicCollection.find({});
//             const basic = await cursor.toArray();
//             res.send(basic);
//         })

//         app.get('/users/:email', async (req, res) => {
//             const email = req.params.email;
//             const query = { email: email };
//             const user = await usersCollection.findOne(query);
//             let isAdmin = false;
//             if (user?.role === 'admin') {
//                 isAdmin = true;
//             }
//             res.json({ admin: isAdmin });
//         })

//         app.put('/users/admin', async (req, res) => {
//             const user = req.body;
//             const filter = { email: user.email, password: user.password };
//             const updateDoc = { $set: { role: 'admin' } };
//             const result = await usersCollection.updateOne(filter, updateDoc);
//             res.json(result);
//         })



//         // GETTING BIKES DATA
//         app.get('/basic', async (req, res) => {
//             const cursor = basicCollection.find({});
//             const basic = await cursor.toArray();
//             res.send(basic);
//         })
//         // GETTING SINGLE bike DATA


//         ///////////////////////////////////////
//     }
//     finally {
//         // await client.close();
//     }
// }
// run().catch(console.dir);

// app.get('/', (req, res) => {
//     res.send('Hurray! Server is on');
// })

// app.listen(port, () => {
//     console.log(`listening at ${port}`)
// })

const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// kailash.basic


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kq3to.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
    try {
        await client.connect();
        const database = client.db("kailash");
        const basicCollection = database.collection("basic");
        const usersCollection = database.collection("users");
        const whatsCollection = database.collection("what_is_k");
        


        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            console.log(result);
            res.json(result);
        });
        // app.get('/users', async (req, res) => {
        //     const user = req.body;
        //     const cursor = usersCollection.find({});
        //     const users = await cursor.toArray();
            
        //     res.send(users);
        // });

        app.get('/users/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const user = await usersCollection.findOne(query);
            let isAdmin = false;
            if (user?.role === 'admin') {
                isAdmin = true;
            }
            res.json({ admin: isAdmin });
        })

        app.put('/users/admin', async (req, res) => {
            const user = req.body;
            const filter = { email: user.email, password: user.password };
            const updateDoc = { $set: { role: 'admin' } };
            const result = await usersCollection.updateOne(filter, updateDoc);
            res.json(result);
        })



        // GETTING BIKES DATA
        app.get('/whats', async (req, res) => {
            const cursor = whatsCollection.find({});
            const whats = await cursor.toArray();
            res.send(whats);
        })
        // GETTING SINGLE bike DATA


        ///////////////////////////////////////
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hurray! Server is on');
})

app.listen(port, () => {
    console.log(`listening at ${port}`)
})