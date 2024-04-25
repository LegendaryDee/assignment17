const express = require("express");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
const cors = require("cors");
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

let crafts = [
    {
        _id:1,
        name: "Character Bookmarks",
        img: "/images/bookmarks.jpeg",
        description: "Create a little birdy bookmark to always remin you were you were",
            supplies: [
                "yellow construction paper",
                "orange construction paper",
                "black construction paper"
            ]
        },
  {
    _id: 2,
    name: "Button Flowers",
    img: "/images/button-flowers.jpeg",
    description: "Create a fun bouquet of flowers with your favorite buttons",
    supplies: [
                "multicolored buttons",
                "multicolored flet",
                "green straws",
                "ribbon"
            ],
  },
  {
    _id: 3,
    name: "Cheerio Necklaces",
    img: "/images/cheerio-necklace.webp",
    description: "Create a fun and edible necklace",
    supplies: [
                "Cheerios or Fruit Loops",
                "Elastic string"
            ],
  },
  {
    _id: 4,
    "name": "Cotton Ball Cupcakes",
            "img": "/images/cotton-ball-cupcakes.webp",
            "description": "Decorate your fun filled cupcake however you want.",
            "supplies": [
                "Construction Paper",
                "Cotton Balls",
                "Black Sharpie",
                "Glitter"
            ],
  },
  {
    _id: 5,
    "name": "School Themed Mason Jars",
            "img": "/images/decorated-jars.jpeg",
            "description": "Let's make mason jars to ",
            "supplies": [
                "Construction Paper",
                "Cotton Balls",
                "Black Sharpie",
                "Glitter"
            ],
  },
  {
    _id: 6,
    "name": "Egg Carton Flowers",
            "img": "/images/egg-carton-flowers.jpg",
            "description": "Make a beautiful bouquet with egg cartons and other items you can find around the house",
            "supplies": [
                "Egg Cartons",
                "Butons",
                "Green Pipe Cleaner",
                "Ribbon",
                "Canvas"
            ],
  },
  {
    _id: 7,
    "name": "Finger Puppets",
            "img": "/images/finger-puppets.jpeg",
            "description": "These little critters are easy to make, and will entertain your little one while they make a show.",
            "supplies": [
                "Pom-poms",
                "Googly Eyes",
                "Pipe Cleaner"
            ],
  },
  {
    _id: 8,
    
    "name": "Ribbon Flower Headbands",
    "img": "/images/flower-headbands.jpg",
    "description": "Let your little one show off her new style with these pretty and customizable headbands",
    "supplies": [
        "Plain headband",
        "Ribbon",
        "Buttons",
        "Gems"
    ],
  },
  {
    _id: 9,
    "name": "Hand Print Fish Puppets",
            "img": "/images/handprint-fish.jpg",
            "description": "We all need to take every opportunity we can to remember those tiny hands, and what better way to do it, then to make fish puppets!",
            "supplies": [
                "Popsicle sticks",
                "Cardstock",
                "Gems",
                "Googly Eyes"
            ],
  },
  {
    _id: 10,
    "name": "Hand Print Tree",
            "img": "/images/hand-print-tree.jpeg",
            "description": "This is a fun way to get your little one into finger painting.",
            "supplies": [
                "Watercolor Paper",
                "Finger paint"
            ],
  },
  {
    _id: 11,
    "name": "Melted Bead Bowl",
            "img": "/images/melted-bead-bowl.jpeg",
            "description": "All they need to do is shape their faviorte design, warm it up and they have a brand new bowl.",
            "supplies": [
                "Beads",
                "Bowl",
                "Parchment paper"
            ],
  },
  {
    _id: 12,
    "name": "Monster Kites",
    "img": "/images/monster-rolls.jpg",
    "description": "Let's make those scary toilet paper rolls fly!",
    "supplies": [
        "Toilet paper rolls",
        "Paint",
        "Tissue Paper",
        "String"
    ],
  },
  {
    _id: 13,
    "name": "Pool Noodle Boats",
            "img": "/images/noodle-boats.png",
            "description": "Let's make a boat that will actually float, due to the floating bottom of a pool noodle.",
            "supplies": [
                "Pool Noodle",
                "Straw",
                "Plastic Paper"
            ],
  },
  {
    _id: 14,
    "name": "Paper Plate Bees",
            "img": "/images/paper-plate-bees.jpeg",
            "description": "Let's have fun with making cute little bees, or big bees actually.",
            "supplies": [
                "Paper Plate",
                "Googly Eyes",
                "Close Pins",
                "Black pom poms",
                "Yellow Paint",
                "Black Paint"
            ],
  },
  {
    _id: 15,
    "name": "Paper Plate Dinosaurs",
            "img": "/images/paper-plate-dinosaurs.jpg",
            "description": "Who would have thought that half a paper plate would be the base of a dinosaur.",
            "supplies": [
                "Paper Plate",
                "Paint",
                "Close Pins",
                "Construction Paper"
            ],
  },
  {
    _id: 16,
    "name": "Porcupine Leafs",
            "img": "/images/porcupine-leaf.webp",
            "description": "Let's turn an ordinary paper plate into a fun filled mask.",
            "supplies": [
                "Leafs",
                "Berries",
                "Acorns",
                "Construction Paper"
            ],
  },
  {
    _id: 17,
    "name": "Rainbow Cloud",
            "img": "/images/rainbow-cloud.webp",
            "description": "Some cotton and color and you'll have a beautiful rainbow.",
            "supplies": [
                "Paper Plate",
                "Cotton Balls",
                "Construction Paper"
            ],
  },
  {
    _id: 18,
    "name": "Fun Shaped Crayons",
            "img": "/images/shaped-crayons.jpg",
            "description": "Let's melt some crayons together and let them harden into fun shapes.",
            "supplies": [
                "Broken Crayons",
                "Mold"
            ],
  },
  {
    _id: 19,
    "name": "Straw Farris Wheel",
    "img": "/images/straw-faris-wheel.jpg",
    "description": "It might be too small to ride, but this farris wheel is the most colorful of all.",
    "supplies": [
        "Multicolored straws",
        "Platform"
    ],
  },
  {
    _id: 20,
    "name": "Paper Plate Dinosaurs",
            "img": "/images/paper-plate-dinosaurs.jpg",
            "description": "Who would have thought that half a paper plate would be the base of a dinosaur.",
            "supplies": [
                "Paper Plate",
                "Paint",
                "Close Pins",
                "Construction Paper"
            ],
  },
  {
    _id: 21,
    "name": "Tissue Ballerinas",
    "img": "/images/tisue-dancer.jpeg",
    "description": "These beautiful dancers will look great on display",
    "supplies": [
        "Pipe cleaner",
        "Tissue Paper",
        "Elastics"
    ],
  },
  {
    _id: 22,
    "name": "Toilet Paper Roll Animals",
            "img": "/images/toilet-paper-animals.jpeg",
            "description": "These beautiful dancers will look great on display",
            "supplies": [
                "Toilet Paper Rolls",
                "Construction Paper",
                "Googly Eyes"
            ],
  },
  {
    _id: 23,
    "name": "Toilet Paper Butterfly",
            "img": "/images/toilet-paper-butterfly.jpg",
            "description": "Such a sweat little flyer",
            "supplies": [
                "Toilet Paper Rolls",
                "Construction Paper",
                "Googly Eyes",
                "Buttons"
            ],
  },
  {
    _id: 24,
    "name": "Valentines Jar",
    "img": "/images/valentines-jar.webp",
    "description": "So much hearts all in one",
    "supplies": [
        "Clay",
        "Glitter"
    ],
  },



  
  
];

app.get("/api/crafts", (req, res) => {
  res.send(crafts);
});

app.post("/api/crafts", upload.single("img"), (req, res) => {
  const result = validateRecipe(req.body);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  const craft = {
    _id: crafts.length + 1,
    name: req.body.name,
    description: req.body.description,
    supplies: req.body.supplies.split(","),
  };

  if (req.file) {
    craft.img = "images/" + req.file.filename;
  }

  crafts.push(craft);
  res.send(crafts);
});

app.put("/api/crafts/:id", upload.single("img"), (req, res)=>{
  const craft = crafts.find((r)=>r._id === parseInt(req.params.id));

  if(!craft) res.status(400).send("Craft with given id was not found");

  const result = validateRecipe(req.body);

  if(result.error){
    res.status(400).send(result.error.details[0].message);
    return;
  }

  craft.name = req.body.name;
  craft.description - req.body.description;
  craft.supplies = req.body.supplies.split(",");

  if(req.file) {
    craft.img = "images/" + req.file.filename;
  }

  res.send(craft);
});

app.delete("/api/crafts/:id", (req, res)=>{
  const craft = crafts.find((r)=>r._id === parseInt(req.params.id));

  if(!craft){
    res.status(404).send("The craft with the given id was not found");
  }

  const index = crafts.indexOf(craft);
  crafts.splice(index,1);
  res.send(craft);
});

const validateRecipe = (craft) => {
  const schema = Joi.object({
    _id: Joi.allow(""),
    supplies: Joi.allow(""),
    name: Joi.string().min(3).required(),
    description: Joi.string().min(3).required(),
  });

  return schema.validate(craft);
};

app.listen(3000, () => {
  console.log("I'm listening");
});