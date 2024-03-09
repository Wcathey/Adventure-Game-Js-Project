const { Room } = require('./room');
const { Item } = require('./item');
const { Food } = require('./food');
const Data = require('../data/world-data')
class World {
    constructor() {
        this.rooms = {};

    }

    loadWorld(worldData) {

        const roomList = worldData.rooms;
        const itemList = worldData.items;

        // Instantiate new room objects
        // Get name, id and description from room data
        for (let i = 0 ; i < roomList.length ; i++) {

            let roomData = roomList[i];
            let newRoom = new Room(roomData.name, roomData.description);

            this.rooms[roomData.id] = newRoom;
        }

        // Connect rooms by ID
        // Note that all rooms must be created before they can be connected
        for (let i = 0 ; i < roomList.length ; i++) {

            let roomID = roomList[i].id;
            let roomConnections = roomList[i].exits;

            for (const direction in roomConnections) {
                let connectedRoomID = roomConnections[direction];
                let roomToConnect = this.rooms[connectedRoomID];
                this.rooms[roomID].connectRooms(direction, roomToConnect);
            }

        }

        // Instantiate items using data stored in the itemList variable
            // A non-food item should be instantiated as an instance of the `Item` class
            // A food item should be instantiated as an instance of the `Food` class


            //declare a variable newItem without a value
            //check if that item is and instance of food, if true make a new food instance

            //if it is not food just make a new item
            //after both is done, determine which room the item is placed into using indexing to the room object

            itemList.forEach((item) => {
                let newItem;
                if(item instanceof Food) {
                    newItem = new Food(item.name, item.description)
                }
                else {
                    newItem = new Item(item.name, item.description)
                }
                let addItemToRoom = this.rooms[item.room]
                addItemToRoom.items.push(newItem)
            })


        }
    }


module.exports = {
  World,
};
