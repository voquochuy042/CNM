require('dotenv').config()
const express = require('express')
const AWS = require('aws-sdk')
const multer = require('multer')
const app = express()

const port = 3000

const upload = multer({
    limits: { fileSize: 2000000 },
    fileFilter: (req, file, cb) => {
        const fileTypes = /png|jpg|jpeg$/
        if (fileTypes.test(file.originalname) && fileTypes.test(file.mimetype))
            return cb(null, true)
        return cb(null, false)
    }
})

const options = {
    region: process.env.region,
    accessKeyId: process.env.access_key_id,
    secretAccessKey: process.env.secret_access_key,

}
const s3 = new AWS.S3(options)

const dynamodb = new AWS.DynamoDB.DocumentClient(options)
const s3name = process.env.s3
const dynamodbName = process.env.table

app.use(express.static('./templates'))
app.set('view engine', 'ejs')
app.set('views', './templates')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', async(req, res) => {
    try {
        const result = await dynamodb.scan({
            TableName: dynamodbName,

        }).promise()
        console.log(result.Items);
        res.render('index', { products: result.Items })
    } catch (error) {
        console.log(error);
    }
})

app.post('/add', upload.single('image'), (req, res) => {
    const { magiay, tengiay, gia } = req.body
    const file = req.file
    if (!file) return res.status(401).send('Please upload a file')
    const filename = `${magiay}_${new Date().getTime()}.${file.originalname.split('.').at(-1)}`
    if (!Number.isInteger(+gia)) return res.status(401).send('price must be a number')

    s3.upload({
            Bucket: s3name,
            Key: filename,
            Body: file.buffer,
            ContentType: 'image/jpg'
        },
        (error, data) => {
            if (error) {
                console.error(error);

                return res.status(500).send('Error');
            }
            dynamodb.put({
                    TableName: dynamodbName,
                    Item: {
                        magiay,
                        tengiay,
                        gia: +gia,
                        hinhanh: data.Location
                    }
                },
                (error, data) => {
                    if (error) {
                        console.log(error)
                        return res.status(500).send('Error')
                    }
                    res.redirect('/')
                }
            )
        })
})

app.post('/delete', upload.none(), async(req, res) => {
    console.log(req.body)
    const { ids } = req.body
    const result = await Promise.all(
        (Array.isArray(ids) ? ids : [ids]).map((id) =>
            dynamodb.delete({
                TableName: dynamodbName,
                Key: { magiay: id }
            }).promise())
    )
    console.log(result);
    const length = result.length
    for (let index = 0; index < length; index++) {
        const item = result[index]
        if (Object.keys(item).length) {
            console.log(item);
            return res.status(500).send('errr')
        }
    }
    res.redirect('/')
})

app.listen(3000, () => {
    console.log(123);
})