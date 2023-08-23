global.foodData = require('./db')(function call(err, data, CatData) {
  // console.log(data)
  if(err) console.log(err);
  global.foodData = data;
  global.foodCategory = CatData;
})

const express = require('express')
const cors =require ("cors")
const app = express()
const port = 5000
app.use(cors({
  //origin:"http://localhost:3000"
 origin:"https://recepieappes.netlify.app"
}));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://recepieappes.netlify.app");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', require('./Routes/Auth'));

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
