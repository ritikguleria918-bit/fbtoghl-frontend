export const adminOverview = {
    totalResellers: 3,
    totalClients: 18,
    totalFbAccounts: 64,
    messages24h: 2471,
};
export const users = [
    {
        id: 1,
        name: "John Doe",
        email: "jdoe@me.com",
        addedAt: "2023-01-01",
        fbAccountsLimit: 5,
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@me.com",
        addedAt: "2023-02-15",
        fbAccountsLimit: 4,
    },
    {
        id: 3,
        name: "Mike Johnson",
        email: "mike@me.com",
        addedAt: "2023-03-10",
        fbAccountsLimit: 6,
    },
];

export const fbAccounts = [
    // John Doe (3 accounts)
    {
        id: 1,
        userId: 1,
        name: "John Doe - FB 1",
        email: "jdoe.fb1@me.com",
        addedAt: "2023-01-02",
        messagesScrapedThisMonth: 120,
        status: "active",
    },
    {
        id: 2,
        userId: 1,
        name: "John Doe - FB 2",
        email: "jdoe.fb2@me.com",
        addedAt: "2023-01-05",
        messagesScrapedThisMonth: 80,
        status: "active",
    },
    {
        id: 3,
        userId: 1,
        name: "John Doe - FB 3",
        email: "jdoe.fb3@me.com",
        addedAt: "2023-01-10",
        messagesScrapedThisMonth: 45,
        status: "inactive",
    },

    // Jane Smith (3 accounts)
    {
        id: 4,
        userId: 2,
        name: "Jane Smith - FB 1",
        email: "jane.fb1@me.com",
        addedAt: "2023-02-16",
        messagesScrapedThisMonth: 200,
        status: "active",
    },
    {
        id: 5,
        userId: 2,
        name: "Jane Smith - FB 2",
        email: "jane.fb2@me.com",
        addedAt: "2023-02-18",
        messagesScrapedThisMonth: 150,
        status: "active",
    },
    {
        id: 6,
        userId: 2,
        name: "Jane Smith - FB 3",
        email: "jane.fb3@me.com",
        addedAt: "2023-02-20",
        messagesScrapedThisMonth: 60,
        status: "suspended",
    },

    // Mike Johnson (4 accounts)
    {
        id: 7,
        userId: 3,
        name: "Mike Johnson - FB 1",
        email: "mike.fb1@me.com",
        addedAt: "2023-03-11",
        messagesScrapedThisMonth: 90,
        status: "active",
    },
    {
        id: 8,
        userId: 3,
        name: "Mike Johnson - FB 2",
        email: "mike.fb2@me.com",
        addedAt: "2023-03-12",
        messagesScrapedThisMonth: 30,
        status: "inactive",
    },
    {
        id: 9,
        userId: 3,
        name: "Mike Johnson - FB 3",
        email: "mike.fb3@me.com",
        addedAt: "2023-03-13",
        messagesScrapedThisMonth: 75,
        status: "active",
    },
    {
        id: 10,
        userId: 3,
        name: "Mike Johnson - FB 4",
        email: "mike.fb4@me.com",
        addedAt: "2023-03-15",
        messagesScrapedThisMonth: 10,
        status: "inactive",
    },
];
export const messagesChartData = [
    { day: "Mon", messages: 120 },
    { day: "Tue", messages: 210 },
    { day: "Wed", messages: 180 },
    { day: "Thu", messages: 260 },
    { day: "Fri", messages: 320 },
    { day: "Sat", messages: 200 },
    { day: "Sun", messages: 150 },
];

export const fbAccountsDistribution = [
    { name: "Used", value: 70 },
    { name: "Available", value: 30 },
];
export const fbUsageChartData = [ 
    { name: "Total", value: 10 },
    { name: "Active", value: 5 },
    { name: "With Issues", value: 5 },
];

export const fbErrorTypeChartData = [
    { name: "Cookies Expired", value: 3 },
    { name: "Proxy Expired", value: 2 },
];

export const fbErrorsByUserChartData = [
    { name: "John Doe", errors: 1 },
    { name: "Jane Smith", errors: 1 },
    { name: "Mike Johnson", errors: 3 },
];
