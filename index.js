const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


app.get("/api/suspectInfo", async (req, res) => {
  const { data, error } = await supabase.from("suspectInfo").select();
  if (error) return res.status(500).send(error);
  res.json(data);
});


app.post("/api/suspectInfo", async (req, res) => {
  console.log("Adding suspect:", req.body);
  const { suspect_name, tip, date } = req.body;

  const { data, error } = await supabase
    .from("suspectInfo")
    .insert([{ suspect_name, tip, date }]);

  if (error) return res.status(500).send(error);
  res.json(data);
});

app.listen(port, () => 
  console.log(`Server running on port ${port}`));