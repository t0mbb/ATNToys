var express = require('express')
const async = require('hbs/lib/async')
const {ObjectId} = require('mongodb')
var app = express()

app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))


app.get('/', async (req, res) => {
    let client = await MongoClient.connect(url)
    let dbo = client.db("ATNToys");
    let products = await dbo.collection("products").find().toArray()
    res.render('index',{'products' : products})
})
//duong dan den database
var url = 'mongodb+srv://tomduc1102:soidoi09@cluster0.g0vge.mongodb.net/test'
//import thu vien MongoDB
var MongoClient = require('mongodb').MongoClient;
app.get('/create' ,async(req,res)=>{
    let client = await MongoClient.connect(url)
    let dbo = client.db("ATNToys")
    res.render('create');
})
app.post('/create' , async(req,res)=>{
    let name = req.body.txtName
    let price = req.body.txtPrice
    let picURL = req.body.txtpicURL
    let toy = {
        'name' : name,
        'price' : price,
        'picURL' : picURL
    }
    let client = await MongoClient.connect(url)
    let dbo = client.db("ATNToys")
    await dbo.collection("products").insertOne(toy)
    res.redirect("/")
})
app.get('/delete' , async(req,res)=>{
    let id = req.query.id
    let client = await MongoClient.connect(url);
    let dbo = client.db("ATNToys")
    await dbo.collection("products").deleteOne({_id : ObjectId(id)})
    res.redirect("/");
})



const PORT = process.env.PORT || 8001
app.listen(PORT)
console.log("Server is running!")