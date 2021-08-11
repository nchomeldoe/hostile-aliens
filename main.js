// sleep function

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// query selectors

const mothershipDiv = document.querySelector(".mothership");
const dsDiv1 = document.querySelector(".ds1");
const dsDiv2 = document.querySelector(".ds2");
const dsDiv3 = document.querySelector(".ds3");
const dsDiv4 = document.querySelector(".ds4");
const dsDiv5 = document.querySelector(".ds5");
const asDiv1 = document.querySelector(".as1");
const asDiv2 = document.querySelector(".as2");
const asDiv3 = document.querySelector(".as3");
const asDiv4 = document.querySelector(".as4");
const asDiv5 = document.querySelector(".as5");
const asDiv6 = document.querySelector(".as6");
const asDiv7 = document.querySelector(".as7");
const asDiv8 = document.querySelector(".as8");

const shoot = document.querySelector(".shoot");
const reset = document.querySelector(".reset");

// classes

class Ship {
    constructor(startingPoints, pointLoss, shipDiv, number) {
        this.startingPoints = startingPoints;
        this.pointLoss = pointLoss;
        this.shipDiv = shipDiv;
        this.hitPoints = startingPoints;
        this.number = number;
    }

    setNewScore() {
        if((this.hitPoints - this.pointLoss) >= 0) {
            this.hitPoints -= this.pointLoss
        } else {
            this.hitPoints = 0
        }
        this.shipDiv.children[2].innerHTML = `${this.hitPoints} hit points`
    }

    async borderFlash() {
        this.shipDiv.style.border = "1px solid";
        await sleep(100);
        this.shipDiv.style.border = "";
    }

    disappear() {
        this.shipDiv.style.visibility = "hidden";
}

    async getHit() {
        this.setNewScore();
        this.borderFlash();
        if(this.hitPoints === 0) {
            this.disappear();
            await sleep(20);
            const index = shipNumbers.indexOf(this.number);
            shipNumbers.splice(index, 1)
        }
    } 

    reset() {
        this.shipDiv.children[2].innerHTML = `${this.startingPoints} hit points`;
        this.shipDiv.style.visibility = "";
        this.hitPoints = this.startingPoints;
    }
}

class Mothership extends Ship {
    constructor(shipDiv, number) {
        super(100, 9, shipDiv, number)
    }

   async endGame() {
        await sleep(100);
        alert("Game over! The mothership is destroyed!")
    }
}

class DefenceShip extends Ship {
    constructor(shipDiv, number) {
        super(80, 10, shipDiv, number)
    }
}

class AttackShip extends Ship {
    constructor(shipDiv, number) {
        super(45, 12, shipDiv, number)
    }
}

// ship objects

const mothership1 = new Mothership(mothershipDiv, 1);
const defenceShip1 = new DefenceShip(dsDiv1, 2);
const defenceShip2 = new DefenceShip(dsDiv2, 3);
const defenceShip3 = new DefenceShip(dsDiv3, 4);
const defenceShip4 = new DefenceShip(dsDiv4, 5);
const defenceShip5 = new DefenceShip(dsDiv5, 6);
const attackShip1 = new AttackShip(asDiv1, 7);
const attackShip2 = new AttackShip(asDiv2, 8);
const attackShip3 = new AttackShip(asDiv3, 9);
const attackShip4 = new AttackShip(asDiv4, 10);
const attackShip5 = new AttackShip(asDiv5, 11);
const attackShip6 = new AttackShip(asDiv6, 12);
const attackShip7 = new AttackShip(asDiv7, 13);
const attackShip8 = new AttackShip(asDiv8, 14);

// target random ship

const fleet = [mothership1, defenceShip1, defenceShip2, defenceShip3, defenceShip4, defenceShip5, attackShip1, attackShip2, attackShip3, attackShip4, attackShip5, attackShip6, attackShip7, attackShip8]

let shipNumbers = fleet.map((ship) => ship.number)

const getRandomNumber = (number) => (Math.floor(Math.random() * number));

const hitRandomShip = () => {
    let randomNumber = getRandomNumber(shipNumbers.length);
    fleet.forEach((ship) => {
        if(ship.number === shipNumbers[randomNumber]) {
            ship.getHit()
        }
    });
}

// shoot and reset

shoot.addEventListener("click", () => {
    hitRandomShip();
    if(mothership1.hitPoints === 0) {
        mothership1.endGame();
        shoot.disabled = true;
    }
});

reset.addEventListener("click", () => {
    fleet.forEach((ship) => {
        ship.reset()
    })
    shipNumbers = fleet.map((ship) => ship.number);
    shoot.disabled = false;
})