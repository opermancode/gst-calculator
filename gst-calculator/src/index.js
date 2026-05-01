const express = require('express');
const app = express();
app.use(express.json());

app.post('/calculate', (req, res) => {
  const { amount, gstRate } = req.body;
  const gst = (amount * gstRate) / 100;
  const total = amount + gst;
  res.json({ amount, gstRate, gst, total });
});

app.listen(8080, () => console.log('GST Calculator running on port 8080'));
