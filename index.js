const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// PORT (Render / Railway compatible)
const port = process.env.PORT || 4000;

// Travelpayouts affiliate link (marker ID added)
const TRAVELPAYOUTS_LINK =
  "https://tp.media/r?marker=696216&u=https://www.ixigo.com/trains";

app.use(bodyParser.json());

app.post("/webhook", (req, res) => {
  const response = {
    fulfillmentMessages: [
      {
        payload: {
          telegram: {
            text:
              "🚆 Trains available!\n\n👇 Tap below to book your ticket securely",
            reply_markup: {
              inline_keyboard: [
                [
                  {
                    text: "🎟️ Book Ticket",
                    url: TRAVELPAYOUTS_LINK
                  }
                ]
              ]
            }
          }
        }
      }
    ]
  };

  res.json(response);
});

// Start server
app.listen(port, () => {
  console.log(`RailMate webhook running on port ${port}`);
});
