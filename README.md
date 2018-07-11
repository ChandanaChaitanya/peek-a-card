# peek-a-card

## Install It
Navigate to the 'peek-a-card' folder.
```
npm install
```
## Initial Settings
Assuming mongodb is installed locally and the PATH variable is set to bin folder,
- Start mongodb by typing '`mongod`' in the command prompt.
- Based on the MongoDB connection settings, modify the `mongoose.connect(uri)` in 'app.js' file.
- Suggestion: 'Robo 3T' can be used as the GUI for MongoDB to visualize how documents are created under '`peekACard`' database connection as different requests are made using the API.

## Run It
1. To start the application using nodemon,
```
npm start
```

## API Usage:

### CATEGORIES:

1. To save a category,

    POST request to `/category/save`,

    Request Body:

    ```json
    {
    	"categoryName" : "Opposites",
    	"categoryDesc" : "contrary meaning"
    }
    ```

    DB entry:

    ```json
    {
        "_id" : ObjectId("5ac2db7452c0c52dd042a986"),
        "lastModifiedDate" : ISODate("2018-04-03T01:40:04.998Z"),
        "categoryName" : "Opposites",
        "categoryDesc" : "contrary meaning",
        "__v" : 0
    }
    ```

2. To view all available categories,

    GET request to `/category/`,
    
    Response:

    ```json
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
    ```

3. To modify a category,

    PUT request to `/category/:categoryName`,

    Request Body: (/category/Family)

    ```json
    {
    	"categoryDesc" : "Loved ones"
    }
    ```

    Response:

    ```json
    {
        "message": "Entry successfully updated!",
        "category": {
            "_id": "5b0dd42ee6dce43ff811d72c",
            "categoryName": "Family",
            "categoryDesc": "Loved ones"
        }
    }
    ```

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

### DECKS: (under development)

1. To add a new Deck,

    POST request to `/decks/save/:newDeckName`,
    Header: "category" : "Opposites"

    Request Body: (/decks/save/English)

    ```json
    {
        "deckDesc" : "Few basic ones",
    	"cards" : {
    		"Happy" : "Sad",
    		"Big" : "Small",
    		"Thin" : "Thick"
    	}
    }
    ```

    DB entry: 

    ```json
    {
        "deckName": "English",
        "deckDesc" : "Few basic ones",
        "category": ObjectId("5ac2db7452c0c52dd042a986"),
        "cards": {
    		"Happy" : "Sad",
    		"Big" : "Small",
    		"Thin" : "Thick"
        }
    }
    ```


2. To view all available decks,

    GET request to `/decks/`,

    Response Body:

    ```json
    [
        {
            "_id": "5b0defef40be003e74beefce",
            "deckDesc": "Few basic opposites",
            "cards": {
                "Happy": "Sad",
                "Big": "Small",
                "Thin": "Thick"
            },
            "deckName": "Opp0",
            "category": {
                "lastModifiedDate": "2018-04-03T01:40:04.998Z",
                "_id": "5ac2db7452c0c52dd042a986",
                "categoryImage": {},
                "categoryName": "English",
                "categoryDesc": "All things english",
                "__v": 0
            }
        },
        {
            "_id": "5b0dfc9357b220160c6396cb",
            "deckDesc": "IELTS General realted stuff",
            "cards": {
                "Reading": "questions based on a given passage",
                "Writing": "Argument or opinionated essay",
                "Speaking": "Speak about a topic and then answer questions based on the spoken topic",
                "Listening": "Includes choose the right answer, fill in the blanks, match the following, understanding a map from an audio clip"
            },
            "deckName": "IELTS General",
            "category": "5b0dfc1772cad70ea8acbe4f"
            "category": {
                "lastModifiedDate": "2018-05-03T01:40:04.998Z",
                "category": "5b0dfc1772cad70ea8acbe4f",
                "categoryImage": {},
                "categoryName": "IELTS",
                "categoryDesc": "All things IELTS",
                "__v": 0
            }
        }
    ]
    ```

3. To view the cards of  particular deck, 

    GET request to `/decks/:deckName`

    Request: (/decks/Opposites)

    Response Body:

    ```json
    {
        "_id": "5b0defef40be003e74beefce",
        "deckDesc": "Few basic opposites",
        "cards": {
            "Happy": "Sad",
            "Big": "Small",
            "Thin": "Thick"
        },
        "deckName": "Opposites",
        "category": {
            "lastModifiedDate": "2018-04-03T01:40:04.998Z",
            "_id": "5ac2db7452c0c52dd042a986",
            "categoryImage": {},
            "categoryName": "English",
            "categoryDesc": "All things english",
            "__v": 0
        }
    }
    ```

4. To retrieve all decks by category,

    GET request to `/decks/:category`

5. To modify a deck,

    PUT request to `/decks/:deckName`,

6. To delete a deck,

    DELETE request to `/decks/delete/:deckName`

    URI: (/decks/delete/Opposites)

    Response:

    ```json
    {
        "message": "Entry successfully deleted!",
        "deck": {
            "_id": "5b0defef40be003e74beefce",
            "deckDesc": "Few basic opposites",
            "cards": {
                "Happy": "Sad",
                "Big": "Small",
                "Thin": "Thick"
            },
            "deckName": "Opposites",
            "__v" : 0,
            "category": "5ac2db7452c0c52dd042a986"
        }
    }
    ```

**Note**

Comments cannot be added to a JSON file. Hence just making a note here.

Snippet from 'package.json' file,

    ```json
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "nodemon server.js"
     }
    ```

After installing nodemon using "`npm install --save-dev nodemon`", adding "`nodemon server.js`" as a "`start`" script would start nodemon though it is not installed globally on the machine. Just use the command "`npm start`" in bash terminal.
