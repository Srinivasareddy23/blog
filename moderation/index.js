import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 4003;

app.use(express.json());

app.post('/events',async (req,res)=>{
  const {type, data} = req.body;

  if(type === 'CommentCreated'){
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    await axios.post('http://event-bus-srv:4005/events',{
      type : 'CommentModerated',
      data : {
        id : data.id,
        postId : data.postId,
        status,
        content : data.content
      }
    });
  };
  res.send({});
});

app.listen(PORT,()=>{
  console.log(`listening on ${PORT}`);
})