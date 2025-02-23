export const membershipTypes = [
    {
        name: 'Starter',
        price: '$20',
        imageUrl: "https://res.cloudinary.com/dtnif6mzm/image/upload/v1738328778/express-gym/lady1_no_bg_cdopcc.png",
        imageAlt: "A happy gymgoer",
        description: 'Perfect for beginners who want access to basic facilities.',
        benefits: [
            'Access to gym equipment',
            'Locker room access',
            '1 free fitness consultation'
        ]
    },
    {
        name: 'Pro',
        price: '$50',
        imageUrl: "https://res.cloudinary.com/dtnif6mzm/image/upload/v1738328778/express-gym/girl1_no_bg_lnzycj.png",
        imageAlt: "A happy gymgoer",
        description: 'Ideal for fitness enthusiasts who want extra perks.',
        benefits: [
            'Access to all gym equipment',
            'Locker room and sauna access',
            '5 free group classes per month',
            '1 personal training session per month'
        ]
    },
    {
        name: 'Elite',
        price: '$100',
        imageUrl: "https://res.cloudinary.com/dtnif6mzm/image/upload/v1738330415/express-gym/openart-973fcdaf-c538-445c-8b2c-edaeb8f4b37d_fwxkdi.png",
        imageAlt: "A happy gymgoer",
        description: 'For the dedicated athlete looking for premium benefits.',
        benefits: [
            'Unlimited access to gym equipment',
            'Priority booking for classes',
            'Unlimited group classes',
            '5 personal training sessions per month',
            'Access to VIP lounge'
        ]
    }
];

export const membershipPaymentTypes = {
    monthly: {
        label: "Per 4 weeks",
        description: "Pay your subscription annually. After 1 year, your contract is automatically renewed.",
        price: "324.87",
        reminder: "You've chosen a contract with payment every 4 weeks, the first payment shall be made through a card or online payment."
    },
    yearly: {
        label: "Annually (52 weeks)",
        description: "When you register you only pay your subscription fee. The first period membership fee will be debited after your free period. Your membership fee will be debited automatically every 4 weeks.",
        price: "39.99",
        reminder: "You've chosen a contract with payment every 52 weeks (annual), the first payment shall be made through a card-or online payment."
    },
}