EXQUISITE CORPSE

User landing - add new or did you receive an image
Add new photo process
 - Name new canvas
 - Select person to send to
Send to server
Sends back as first pic
Now at a new canvas
Image edge is sent to selected person

User gets notification when 3rd pic completes it
Goes into the user gallery and global gallery

Edge Case Features (after proof of concept):
- Timeframe for taking the pic? Reminders?
- Maybe sent to multiple people and first person gets to add the pic


MODELS

- User
	- username
	- email
	- password
	- googleId
	- facebookId

- Corpse
	- title
	- total-cells
	- complete (boolean)

- Photo
	- imageURL
	- cell (1-top, 2-middle, 3-bottom)

- Assignment?
	- assignee (userId)
	- corpse (corpseId)
	- assignor (userId)
	- complete (boolean)

- Like


ASSOCIATIONS

Photo belongsTo Corpse
Photo belongsTo User

Corpse hasMany Photos
Corpse hasMany Users
Corpse hasMany Likes

Like belongsTo User
Like belongsTo Corpse

User hasMany Photos
User hasMany Corpses
User hasMany Likes

User hasMany Users (as Friends)


APIS

users
- get one user
- post new user
- put (update) user
- delete a user

corpses
- get one corpse
- get find all w/ userID
- post new corpse
- put (update) corpse 
- delete a corpse

photos
- get one photo
- get all w/ corpseID
- post new photo
- put (update) photo
- delete a photo

likes
- get all likes
- post new like
- delete a like


TECHNICAL CHALLENGES

- Uploading and storing photos - Firebase or S3?
- Getting to the camera and taking photos
- Getting edge to display in camera view
- Reducing photo file size
- Photo orientation - force horizontal (landscape)
- Check repo setup for both (mobile app and server)
- Web sockets?


































