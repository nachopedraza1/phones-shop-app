import { IMegamenu } from "@/interfaces/MegaMenu";

export const provincias = [
    "Buenos Aires",
    "Catamarca",
    "Chaco",
    "Chubut",
    "Córdoba",
    "Corrientes",
    "Entre Ríos",
    "Formosa",
    "Jujuy",
    "La Pampa",
    "La Rioja",
    "Mendoza",
    "Misiones",
    "Neuquén",
    "Río Negro",
    "Salta",
    "San Juan",
    "San Luis",
    "Santa Cruz",
    "Santa Fe",
    "Santiago del Estero",
    "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
    "Tucumán"
];

export const megamenu: IMegamenu[] = [
    {
        type: 'iPhones',
        image: {
            url: '/iphone-megamenu.png',
            width: 140,
            height: 100
        },
        models: [
            'iPhone XS Max',
            'iPhone XS',
            'iPhone 11',
            'iPhone 11 Pro Max',
            'iPhone 11 Pro',
            'iPhone 12 mini',
            'iPhone 12',
            'iPhone 12 Pro',
            'iPhone 12 Pro Max',
            'iPhone 13 mini',
            'iPhone 13',
            'iPhone 13 Pro',
            'iPhone 13 Pro Max',
            'iPhone 14',
            'iPhone 14 Plus',
            'iPhone 14 Pro',
            'iPhone 14 Pro Max',
            'iPhone 15',
            'iPhone 15 Plus',
            'iPhone 15 Pro',
            'iPhone 15 Pro Max',
        ]
    },
    {
        type: 'iPads',
        image: {
            url: '/ipad-megamenu.png',
            width: 90,
            height: 100
        },
        models: [
            'iPad Pro',
            'iPad Air',
            'iPad Mini',
            'iPad 9th Generation',
            'iPad 10th Generation',
        ]
    },
    {
        type: 'MacBooks',
        image: {
            url: '/macbooks-megamenu.png',
            width: 150,
            height: 100
        },
        models: [
            'iMac',
            'MacBook Air',
            'MacBook Pro',
        ]
    },
    {
        type: 'AppleWatch',
        image: {
            url: '/applewatch-megamenu.png',
            width: 100,
            height: 80
        },
        models: [
            'Apple Watch SE',
            'Apple Watch Ultra',
            'Apple Watch Series 7',
            'Apple Watch Series 8',
            'Apple Watch Series 9',
        ]
    },
    {
        type: 'HomePod',
        image: {
            url: '/homepod-megamenu.png',
            width: 90,
            height: 80
        },
        models: [
            'HomePod Mini',
        ]
    }
];

export const carrousel = [
    {
        width: 5.9,
        height: 250,
        image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400_opt_1/34b5bf180145769.6505ae7623131.jpg',
        alt: 'iPhones'
    },
    {
        width: 5.9,
        height: 250,
        image: 'https://www.gizmochina.com/wp-content/uploads/2021/10/macbook-pro-2021-renders-3-1024x576.jpg',
        alt: 'Macbooks'
    },
    {
        width: 2.9,
        height: 120,
        image: 'https://i.pinimg.com/564x/16/cb/95/16cb9581bebe2365ee88d0b5c81c992b.jpg',
        alt: 'Airpods'
    },
    {
        width: 2.9,
        height: 120,
        image: 'https://i.pinimg.com/564x/36/9b/c3/369bc3be09b8f8bf7039225b3029fc69.jpg',
        alt: 'Macbook Pro'
    },
    {
        width: 2.9,
        height: 120,
        image: 'https://i.pinimg.com/564x/d7/99/5c/d7995c04fdee19527327cd8e80bf9815.jpg',
        alt: 'iPad Pro'
    },
    {
        width: 2.9,
        height: 120,
        image: 'https://i.pinimg.com/564x/93/2d/e1/932de1b5674511802ab2c6067eccffba.jpg',
        alt: 'Apple Watch'
    },
];

export const categories = [
    {
        name: 'iPhones',
        image: '/iphone-megamenu.png',
        alt: 'iPhones',
        height: 90,
        width: 120,
    },
    {
        name: 'Macbooks',
        image: '/macbooks-megamenu.png',
        alt: 'Macbooks',
        height: 90,
        width: 140,
    },
    {
        name: 'iPads',
        image: '/ipad-megamenu.png',
        alt: 'iPads',
        height: 90,
        width: 85,
    },
    {
        name: 'Watch',
        image: '/applewatch-megamenu.png',
        alt: 'Watch',
        height: 90,
        width: 100,
    },
    {
        name: 'Homepods',
        image: '/homepod-megamenu.png',
        alt: 'Homepods',
        height: 90,
        width: 100,
    },
    {
        name: 'Accesories',
        image: '/fundas-megamenu.png',
        alt: 'Accesories',
        height: 90,
        width: 90,
    },
];