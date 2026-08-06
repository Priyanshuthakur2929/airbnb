const express = require('express');

const router = express.Router();

router.get('/register', (req, res) => {
  res.send(`<!DOCTYPE html><html><head><title>User Registration</title><style>
    body{font-family:Arial,sans-serif;background:linear-gradient(135deg,#eef7ff,#fdf2f8);margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh;}
    .card{background:white;padding:2rem 2.5rem;border-radius:16px;box-shadow:0 12px 35px rgba(0,0,0,0.12);width:420px;}
    h1{margin-top:0;color:#2c3e50;text-align:center;}
    label{display:block;margin-bottom:0.3rem;font-weight:600;color:#34495e;}
    input,button{width:100%;padding:0.75rem;border-radius:10px;border:1px solid #cbd5e1;box-sizing:border-box;margin-bottom:0.9rem;font-size:1rem;}
    input:focus{outline:none;border-color:#7c3aed;box-shadow:0 0 0 2px rgba(124,58,237,0.15);}
    button{background:linear-gradient(135deg,#7c3aed,#3b82f6);color:white;border:none;cursor:pointer;font-weight:700;}
    button:hover{transform:translateY(-1px);}
  </style></head><body>
    <div class="card">
      <h1>User Registration</h1>
      <form action="/user/register" method="POST">
        <label>Name</label>
        <input type="text" name="name" placeholder="Enter your name" required>
        <label>Email</label>
        <input type="email" name="email" placeholder="Enter your email" required>
        <label>Phone</label>
        <input type="text" name="phone" placeholder="Enter your phone" required>
        <button type="submit">Register</button>
      </form>
    </div>
  </body></html>`);
});

router.post('/register', (req, res) => {
  res.send(`<!DOCTYPE html><html><head><title>Registration Complete</title><style>
    body{font-family:Arial,sans-serif;background:linear-gradient(135deg,#eef7ff,#fdf2f8);margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh;}
    .box{background:white;padding:2rem 2.5rem;border-radius:16px;box-shadow:0 12px 35px rgba(0,0,0,0.12);text-align:center;max-width:420px;}
    h1{color:#2c3e50;}
    p{color:#475569;line-height:1.6;}
  </style></head><body><div class="box"><h1>Thanks For Registration</h1><p>Your registration has been completed successfully.</p></div></body></html>`);
});

router.get('/profile', (req, res) => {
  res.send(`<!DOCTYPE html><html><head><title>User Profile</title></head><body><h1>User Profile Page</h1></body></html>`);
});

router.get('/settings', (req, res) => {
  res.send(`<!DOCTYPE html><html><head><title>User Settings</title></head><body><h1>User Settings Page</h1></body></html>`);
});

module.exports = router;
