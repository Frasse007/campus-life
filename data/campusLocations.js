const campusLocations = [
    {
        id: 1,
        name: "Old Main",
        category: "academic",
        description: "Description Here",
        lat: 41.97538910157699,
        lng: -87.70987957966918,
        icon: "graduation-cap"
    },
    {
        id: 2,
        name: "Wilson Hall",
        category: "academic",
        description: "Description Here",
        lat: 41.975309685364,
        lng: -87.71037100350316,
        icon: "graduation-cap"
    },
    {
        id: 3,
        name: "Hamming Hall",
        category: "academic",
        description: "Description Here",
        lat: 41.97558851072431,
        lng: -87.7093789581782,
        icon: "graduation-cap"
    },
    {
        id: 4,
        name: "Carlson Tower",
        category: "academic",
        description: "Description Here",
        lat: 41.974956903073604,
        lng: -87.709601906978,
        icon: "graduation-cap"
    },
    {
        id: 5,
        name: "Lecture Hall Auditorium",
        category: "academic",
        description: "Description Here",
        lat: 41.974844920954524,
        lng: -87.70973095362373,
        icon: "graduation-cap"
    },
    {
        id: 6,
        name: "Hanson Hall",
        category: "academic",
        description: "Description Here",
        lat: 41.97513931807559,
        lng: -87.7108252464588,
        icon: "graduation-cap"
    },
    {
        id: 7,
        name: "Johnson Center",
        category: "academic",
        description: "Campus center",
        lat: 41.97515954282262,
        lng: -87.71169727466733,
        icon: "graduation-cap"
    },
    {
        id: 8,
        name: "Nyvall Hall",
        category: "academic",
        description: "Description Here",
        lat: 41.974288038966854,
        lng: -87.7114708079638,
        icon: "graduation-cap"
    },
    {
        id: 9,
        name: "Magnuson Campus Center",
        category: "academic",
        description: "Description Here",
        lat: 41.9726972847766,
        lng: -87.7114777207293,
        icon: "graduation-cap"
    },
    {
        id: 10,
        name: "Campus Safety",
        category: "services",
        description: "Description Here",
        lat: 41.974716728099736,
        lng: -87.71091887692035,
        icon: "shield"
    },
    {
        id: 11,
        name: "Brandel Library",
        category: "services",
        description: "Description Here",
        lat: 41.97434596888514,
        lng: -87.71229531061573,
        icon: "book"
    },
    {
        id: 12,
        name: "Physical Plant",
        category: "services",
        description: "Description Here",
        lat: 41.97377192841164,
        lng: -87.70851867523149,
        icon: "tools"
    },
    {
        id: 13,
        name: "Postal Office",
        category: "services",
        description: "Description Here",
        lat: 41.97562300448354,
        lng: -87.7116597446603,
        icon: "envelope"
    },
    {
        id: 14,
        name: "Health Services",
        category: "services",
        description: "Description Here",
        lat: 41.975615730743606,
        lng: -87.71189064788067,
        icon: "hospital"
    },
    {
        id: 15,
        name: "Anderson Chapel",
        category: "services",
        description: "Description Here",
        lat: 41.975541188482076,
        lng: -87.71084151849224,
        icon: "cross"
    },
    {
        id: 20,
        name: "Ohlson House",
        category: "housing",
        description: "Description Here",
        lat: 41.97543586679909,
        lng: -87.71122583991342,
        icon: "house"
    },
    {
        id: 21,
        name: "Anderson Hall",
        category: "housing",
        description: "Description Here",
        lat: 41.972447231587964,
        lng: -87.71189865952032,
        icon: "house"
    },
    {
        id: 22,
        name: "Sawyer Court",
        category: "housing",
        description: "Description Here",
        lat: 41.971881036433444,
        lng: -87.70967214585166,
        icon: "house"
    },
    {
        id: 23,
        name: "Lund House",
        category: "housing",
        description: "Description Here",
        lat: 41.97216376948542,
        lng: -87.71058147451028,
        icon: "house"
    },
    {
        id: 24,
        name: "Park North",
        category: "housing",
        description: "Description Here",
        lat: 41.97158675533827,
        lng: -87.70869502499282,
        icon: "house"
    },
    {
        id: 25,
        name: "Campus Apartment & Houses",
        category: "housing",
        description: "Description Here",
        lat: 41.973989035504715,
        lng: -87.70961842328963,
        icon: "house"
    },
    {
        id: 26,
        name: "Burgh Hall",
        category: "housing",
        description: "Description Here",
        lat: 41.9727704265233,
        lng: -87.71122916671438,
        icon: "house"
    },
    {
        id: 27,
        name: "Football Field",
        category: "athletics",
        description: "Description Here",
        lat: 41.97499006331066,
        lng: -87.70502013205135,
        icon: "football"
    },
    {
        id: 28,
        name: "Baseball & Softball Field",
        category: "athletics",
        description: "Description Here",
        lat: 41.97559034463004,
        lng: -87.70603963296232,
        icon: "baseball-bat-ball"
    },
    {
        id: 29,
        name: "North Park University Gymnasium",
        category: "athletics",
        description: "Description Here",
        lat: 41.975205531733174,
        lng: -87.70887986133881,
        icon: "basketball"
    },
    {
        id: 30,
        name: "Visitor Parking",
        category: "parking",
        description: "Description Here",
        lat: 41.9752944243178,
        lng: -87.70838073638114,
        icon: "parking"
    },
    {
        id: 31,
        name: "Staff & Faculty Parking",
        category: "parking",
        description: "Description Here",
        lat: 41.97599199243844,
        lng: -87.70948383742594,
        icon: "parking"
    },
    {
        id: 32,
        name: "Staff & Faculty Parking",
        category: "parking",
        description: "Description Here",
        lat: 41.974958011015374,
        lng: -87.71316703257548,
        icon: "parking"
    },
    {
        id: 33,
        name: "Student Parking",
        category: "parking",
        description: "Description Here",
        lat: 41.973753748158764,
        lng: -87.7107363579681,
        icon: "parking"
    },
    {
        id: 34,
        name: "Student Parking",
        category: "parking",
        description: "Description Here",
        lat: 41.97438763506995,
        lng: -87.70922321128391,
        icon: "parking"
    },
    {
        id: 35,
        name: "Student Parking",
        category: "parking",
        description: "Description Here",
        lat: 41.97262303996255,
        lng: -87.70826111591569,
        icon: "parking"
    },
    {
        id: 36,
        name: "Student Parking",
        category: "parking",
        description: "Description Here",
        lat: 41.97425843017941,
        lng: -87.70831831331154,
        icon: "parking"
    },
    {
        id: 37,
        name: "Helwig Athletics & Recreation Center",
        category: "recreation",
        description: "Description Here",
        lat: 41.97382629468521,
        lng: -87.70895860777107,
        icon: "dumbbell"
    },
    {
        id: 38,
        name: "Fire Pit",
        category: "recreation",
        description: "Description Here",
        lat: 41.97223930550702,
        lng: -87.71170157296704,
        icon: "people-group"
    },
]