# peek-a-card

## Install It
Navigate to the client folder.
```
npm install
```

## Run It
1. Open command prompt and start mongodb by typing '`mongod`' (make sure the PATH variable is set to bin folder of the installed mongodb).
2. In bash terminal, navigate to the folder 'peek-a-card' and type '`npm start`' to start the application using nodemon.
3. Use 'Robo 3T' as GUI for mongodb to visualize how documents are created under '`peekACard`' database connection as different requests are made using the API.

**API Usage:**

###CATEGORIES:

1. POST request to `/category/save`,
Request Body:

    {
    	"categoryName" : "Opposites",
    	"categoryDesc" : "contrary meaning"
    	}
    }

DB entry:

    {
         "_id" : ObjectId("5ac2db7452c0c52dd042a986"),
        "lastModifiedDate" : ISODate("2018-04-03T01:40:04.998Z"),
        "categoryName" : "Opposites",
        "categoryDesc" : "contrary meaning",
        "__v" : 0
    } 

2. To view all available categories,
GET request to `/category/`,
Response:

    [
         {
            "_id": "5ac2dc2f52c0c52dd042a989",
            "categoryName": "Computer Science",
            "categoryDesc": "All things computers"
        },
        {
            "_id": "5ac2db7452c0c52dd042a986",
            "categoryName": "IELTS",
            "categoryDesc": "For Canada PR"
        }
    ]

3. To modify a category,
PUT request to `/category/:categoryName`,

Request Body: (/category/Family)

    {
    	"categoryDesc" : "Loved ones"
    }

Response:

    {
        "message": "Entry successfully updated!",
        "category": {
            "_id": "5b0dd42ee6dce43ff811d72c",
            "categoryName": "Family",
            "categoryDesc": "Loved ones"
        }
    }

4. To delete a category,
DELETE request to `/category/delete/:categoryName`

URI: (/category/delete/IELTS4)

Response:

    {
        "message": "Entry successfully deleted!",
        "category": {
            "_id": "5b087d4b5384532568432aed",
            "categoryName": "IELTS4",
            "categoryDesc": "For Canada PR"
        }
    }

###DECKS: (under development)

1. POST request to `/decks/save/:newDeckName`,
Header: "category" : "Opposites"
Request Body:

    {
        "deckDesc" : "Few basic ones",
    	"cards" : {
    		"Happy" : "Sad",
    		"Big" : "Small",
    		"Thin" : "Thick"
    	}
    }

DB entry: 

    {
        "deckName": "English",
        "deckDesc" : "Few basic ones",
        "category": ObjectId("5ac2db7452c0c52dd042a986")
        "cards": {
    		"Happy" : "Sad",
    		"Big" : "Small",
    		"Thin" : "Thick"
        }
    } 


2. To view all available decks,
GET request to `/decks/`,
Response Body:

    [
    {
        "_id": "5b0defef40be003e74beefce",
        "deckDesc": "Few basic ones",
        "cards": {
            "Happy": "Sad",
            "Big": "Small",
            "Thin": "Thick"
        },
        "deckName": "Opp0",
        "category": "5ac2db7452c0c52dd042a986"
    },
    {
        "_id": "5b0dfc9357b220160c6396cb",
        "deckDesc": "Few basic ones",
        "cards": {
            "Happy": "Sad",
            "Big": "Small",
            "Thin": "Thick"
        },
        "deckName": "Opposite",
        "category": "5b0dfc1772cad70ea8acbe4f"
    }
]

3. To view the cards of  particular deck, - THROWS ERROR, TO BE FIXED 
GET request to `/decks/:deckName`

4. To retrieve all decks by category,
GET request to `/decks/:category`

5. To modify a deck,
PUT request to `/decks/:deckName`,

6. To delete a deck,
DELETE request to `/decks/:deckName`

**Note**
Comments cannot be added to a JSON file.
Hence just making a note here.
From package.json

     "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "nodemon server.js"
      }

After installing nodemon using "`npm install --save-dev nodemon`", adding "`nodemon server.js`" as a "`start`" script would start nodemon though it is not installed globally on the machine. Just use the command "`npm start`" in bash terminal. Since nodemon will only be used during development, `-dev` is used during install so that this package gets added to devDependencies.
