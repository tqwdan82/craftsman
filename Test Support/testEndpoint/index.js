const express = require('express')
const app = express()
var cors = require('cors')
const port = 3001

const data = [
     {
       name: "Page A",
       uv: 4000,
       pv: 2400,
       amt: 2400,
     },
     {
       name: "Page B",
       uv: 3000,
       pv: 1398,
       amt: 2210,
     },
     {
       name: "Page C",
       uv: 2000,
       pv: 9800,
       amt: 2290,
     },
     {
       name: "Page D",
       uv: 2780,
       pv: 3908,
       amt: 2000,
     },
     {
       name: "Page E",
       uv: 1890,
       pv: 4800,
       amt: 2181,
     },
     {
       name: "Page F",
       uv: 2390,
       pv: 3800,
       amt: 2500,
     },
     {
       name: "Page G",
       uv: 3490,
       pv: 4300,
       amt: 2100,
     },
   ];

const data2 = [
  {"first":"Mark", "last":"Otto", "handle":"@mdo"},
  {"first":"Jacob", "last":"Thornton", "handle":"@fat"},
  {"first":"Mark", "last":"Otto", "parent":"LLP"}
];

const data3 = [
  {"first":"Mark", "last":"Otto", "gender":"male"},
  {"first":"Jacob", "last":"Thornton", "gender":"male"},
  {"first":"Wendy", "last":"Thomas", "gender":"female"},
  {"first":"Lucy", "last":"Kruegar", "gender":"female"},        
  {"first":"Peter", "last":"Jackson", "gender":"male"},
  {"first":"Michael", "last":"Jaegar", "gender":"male"},   
  {"first":"Janice", "last":"Compton", "gender":"female"},
  {"first":"John", "last":"Doe", "gender":"unknown"}       
];

app.use(cors());
   
// respond with "hello world" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send(data)
})

app.get('/data2', (req, res) => {
  res.send(data2)
})

app.get('/data3', (req, res) => {
  res.send(data3)
})

app.listen(port, () => {
     console.log(`Example app listening on port ${port}`)
   })