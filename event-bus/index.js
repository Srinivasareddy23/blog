import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 4005;

const events = [];

app.use(express.json());

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post("http://posts-clusterip-srv:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://comments-srv:4001/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://query-srv:4002/events", event).catch((err) => {
    console.log(err.message);
  });
  axios.post("http://moderation-srv:4003/events", event).catch((err) => {
    console.log(err.message);
  });
  res.send({ status: "OK" });
});

app.get('/events',(req,res)=>{
  res.send(events);
})

app.listen(PORT, () => {
  console.log("Listening on 4005");
});