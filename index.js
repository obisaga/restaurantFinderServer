import express from "express"
import "dotenv/config"
import cors from "cors"




const app = express()
const port = 8080 || process.env.port

app.get('/', (req, res)=>{
    res.send('hello world')
})

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"],
    credentials: true,
  }))


  // Route to fetch data from external API and pass it on
app.get('/restaurants/:postcode', async (req, res) => {
    try {
      const postcode = req.params.postcode;
      const apiUrl = `https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/${postcode}`;
      
   
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
              
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  


    app.listen(port, () => {
        console.log('Server listening on port 8080')
      })


