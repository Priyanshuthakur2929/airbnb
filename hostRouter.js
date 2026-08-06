const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(`<!DOCTYPE html><html><head><title>Host Router</title></head><body><h1>Host Router</h1><p>Try /host/add-Home</p></body></html>`);
});

router.get('/add-Home', (req, res) => {
  res.send(`<!DOCTYPE html><html><head><title>Add Home</title><style>
    body{font-family:Arial,sans-serif;background:linear-gradient(135deg,#f7f9fc,#e8f0fe);margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh;}
    .card{background:white;padding:2rem 2.5rem;border-radius:16px;box-shadow:0 12px 35px rgba(0,0,0,0.12);width:420px;}
    h1{margin-top:0;color:#2c3e50;text-align:center;}
    label{display:block;margin-bottom:0.3rem;font-weight:600;color:#34495e;}
    input,textarea,button{width:100%;padding:0.75rem;border-radius:10px;border:1px solid #cbd5e1;box-sizing:border-box;margin-bottom:0.9rem;font-size:1rem;}
    input:focus,textarea:focus{outline:none;border-color:#4f46e5;box-shadow:0 0 0 2px rgba(79,70,229,0.15);}
    button{background:linear-gradient(135deg,#ff5a5f,#ff7b54);color:white;border:none;cursor:pointer;font-weight:700;}
    button:hover{transform:translateY(-1px);}
  </style></head><body>
    <div class="card">
      <h1>Host Home Details</h1>
      <form action="/host/add-Home" method="POST">
        <label>Home Title</label>
        <input type="text" name="title" placeholder="Beautiful Villa" required>
        <label>Location</label>
        <input type="text" name="location" placeholder="Mumbai" required>
        <label>Price per Night</label>
        <input type="number" name="price" placeholder="5000" required>
        <label>Description</label>
        <textarea name="description" rows="4" placeholder="Describe your home"></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  </body></html>`);
});

router.post('/add-Home', (req, res) => {
  res.send(`<!DOCTYPE html><html><head><title>Host Registration</title><style>
    body{font-family:Arial,sans-serif;background:linear-gradient(135deg,#f7f9fc,#e8f0fe);margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh;}
    .box{background:white;padding:2rem 2.5rem;border-radius:16px;box-shadow:0 12px 35px rgba(0,0,0,0.12);text-align:center;max-width:420px;}
    h1{color:#2c3e50;}
    p{color:#475569;line-height:1.6;}
  </style></head><body><div class="box"><h1>Thanks For Registration</h1><p>Your home details have been submitted successfully.</p></div></body></html>`);
});

router.get('/add-home', (req, res) => {
  res.redirect('/host/add-Home');
});

module.exports = router;
