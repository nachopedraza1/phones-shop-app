export interface Megamenu {
    type: string;
    image: {
        url: string;
        width: number;
        height: number;
    },
    models: string[];
}

export const megamenu: Megamenu[] = [
    {
        type: 'iPhones',
        image: {
            url: '/iphone-megamenu.png',
            width: 140,
            height: 100
        },
        models: [
            'iPhones XR',
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
]