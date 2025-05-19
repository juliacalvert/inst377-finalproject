# Developer Manual


# Installation

# To install the application, you need a supabase account.
# You will need to create a .env file with your supabase url and key so the system will run


# Tests/How to run the Application

# In the terminal you need to do:
# npm install
# npm insteall nodemon
# npm install @supabase/supabase-js
# npm install express
# npm install cors
# npm install dotenv
# Then, npm start will start the server on port 4000 which runs on http://localhost:4000


# API Endpoints

# GET /api/suspectInfo (http://localhost:4000/api/suspectInfo)
# This retrieves all the suspect information from the database and lists them out as a JSON response:
# [
# 	{
#		"id": 1,
#		"created_at": "2025-05-14T17:47:17.166179+00:00",
#		"suspect_name": "James Back",
#		"tip": "seen in Miami",
#		"date": "2025-05-02"
#	},
#	{
#		"id": 2,
#		"created_at": "2025-05-14T17:54:53.777427+00:00",
#		"suspect_name": "Molly Tire",
#		"tip": "driving a black camry in birmingham",
#		"date": "2025-05-01"
#	}
# ]

# POST /api/suspectInfo
# This adds a new record to the database
# The JSON body looks like this:
# {
#  "suspect_name": "Hannah Smith",
#	"tip": "driving a uhaul",
#	"date": "2025-05-03"
# }
# For each new record, add the name, tip (information you have about the suspect), and the date the tip was recorded. When you click send, the preview says null, but when you do the GET again, it will show up.


# Known Bugs/Roadmap for the Future

# There are not really any "known" bugs, but the program should check if the name of the suspect entered is actually in the database and not a random name like I have been testing it with. I plan on adding this in the future as well as more validations to only allow things that are necessary and helpful so it doesn't take up time if the FBI is looking through the information. I'd also like to add more filters like terrorists, kidnappings, murders, and stuff like that to keep it neater and to be able to display more information as it is too much if it's all together. There also wasn't a way to get the "top 10 most wanted" dynamically so I ended up doing the first 10 on thier list. Some of them were the same but I'd like to get the top 10 most wanted which I'd probably have to do some web scraping for that.


# Vercel link
# https://inst377-finalproject-eta.vercel.app/