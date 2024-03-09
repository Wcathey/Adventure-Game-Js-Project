const { Food } = require('./food');

class Player {

    constructor(name, startingRoom) {
        this.name = name;
        this.currentRoom = startingRoom;
        this.items = [];
    }

    move(direction) {

        const nextRoom = this.currentRoom.getRoomInDirection(direction);

        // If the next room is valid, set the player to be in that room
        if (nextRoom) {
            this.currentRoom = nextRoom;

            nextRoom.printRoom(this);
        } else {
            console.log("You cannot move in that direction");
        }
    }

    printInventory() {
        if (this.items.length === 0) {
            console.log(`${this.name} is not carrying anything.`);
        } else {
            console.log(`${this.name} is carrying:`);
            for (let i = 0 ; i < this.items.length ; i++) {
                console.log(`  ${this.items[i].name}`);
            }
        }
    }

    takeItem(itemName) {
        // Picks up an item from the current room into the player's inventory
        const foundItem = this.currentRoom.getItemByName(itemName)
        let roomItems = this.currentRoom.items
        this.items.push(foundItem);
        if(foundItem) {
            roomItems = roomItems.splice(roomItems.indexOf(foundItem),1)

        }
    }

    dropItem(itemName) {
        let foundItem = this.getItemByName(itemName)
        if(foundItem) {
        this.currentRoom.items.push(foundItem)
        this.items.splice(this.items.indexOf(foundItem,1));
        }
        // Your code here
    }

    eatItem(itemName) {
        // Allow the player to eat food items, but not non-food items
        const foundItem =this.getItemByName(itemName);
        if(foundItem instanceof Food) {
            this.items.splice(this.items.indexOf(foundItem), 1)
        }


    }

    getItemByName(name) {

        for(let item of this.items) {
            if(item.name === name) {
            return item;
        }
    }
    return retrieved;
}
}

module.exports = {
  Player,
};
