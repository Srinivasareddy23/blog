import express from 'express';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';

const app = express();
const PORT = 4000;

const posts = {};

app.use(express.json());
app.use(cors());

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts/create', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  try {
    await axios.post('http://event-bus-srv:4005/events', {
      type: 'PostCreated',
      data: {
        id,
        title,
      },
    });
  } catch (error) {
    console.error('Error sending event:', error);
    return res.status(500).json({ message: 'Error sending event' });
  }

  res.status(201).json({ message: 'Post created successfully' });
});

app.post('/events', (req, res) => {
  console.log('Event received:', req.body);
  res.send({ message: 'Event processed successfully' });
});

app.listen(PORT, () => {
  console.log('v55');
  console.log(`Listening on ${PORT}`);
});
