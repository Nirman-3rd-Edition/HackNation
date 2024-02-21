export const menu = [
  {
    id: 1,
    title: "main",
    listItems: [
      {
        id: 1,
        title: "Homepage",
        url: "/",
        icon: "home.svg",
      },
      {
        id: 2,
        title: "Profile",
        url: "/users/1",
        icon: "user.svg",
      },
    ],
  },
  {
    id: 2,
    title: "lists",
    listItems: [
      {
        id: 1,
        title: "Friends",
        url: "/users",
        icon: "user.svg",
      },
      {
        id: 2,
        title: "Wishlist",
        url: "/products",
        icon: "product.svg",
      },
      {
        id: 3,
        title: "Orders",
        url: "/orders",
        icon: "order.svg",
      },
      {
        id: 4,
        title: "Posts",
        url: "/posts",
        icon: "post.svg",
      },
    ],
  },
  {
    id: 3,
    title: "general",
    listItems: [
      {
        id: 1,
        title: "Evaluations",
        url: "/",
        icon: "element.svg",
      },
      {
        id: 2,
        title: "Notes",
        url: "/",
        icon: "note.svg",
      },
      {
        id: 3,
        title: "Training",
        url: "/",
        icon: "form.svg",
      },
      {
        id: 4,
        title: "Schedule",
        url: "/",
        icon: "calendar.svg",
      },
    ],
  },
  {
    id: 4,
    title: "Maintenance",
    listItems: [
      {
        id: 1,
        title: "Settings",
        url: "/",
        icon: "setting.svg",
      },
      {
        id: 2,
        title: "Backups",
        url: "/",
        icon: "backup.svg",
      },
    ],
  },
  {
    id: 5,
    title: "analytics",
    listItems: [
      {
        id: 1,
        title: "Charts",
        url: "/",
        icon: "chart.svg",
      },
      {
        id: 2,
        title: "Logs",
        url: "/",
        icon: "log.svg",
      },
    ],
  },
];

export const topDealUsers = [
  {
    id: 1,
    img: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    username: "Sujoy Mahan",
    email: "mahan45@gmail.com",
    grade: "4.000",
  },
  {
    id: 2,
    img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Sandeep Howaldar",
    email: "indiawala@gmail.com",
    grade: "3.256",
  },
  {
    id: 3,
    img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Harkirat Singh",
    email: "singh_paji@gmail.com",
    grade: "3.998",
  },
  {
    id: 4,
    img: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Suhana Chada",
    email: "chada@gmail.com",
    grade: "2.512",
  },
  {
    id: 5,
    img: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Johnson Auguste",
    email: "auguste_beda@gmail.com",
    grade: "2.134",
  },
  {
    id: 6,
    img: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Vikram Rathore",
    email: "senior_rathore@gmail.com",
    grade: "4.932",
  },
  {
    id: 7,
    img: "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Ama Mallick",
    email: "mallick@gmail.com",
    grade: "3.560",
  },
];

export const chartBoxBPM = {
  color: "#8884d8",
  icon: "/userIcon.svg",
  title: "Heart Rate Spike",
  number: "110.85",
  dataKey: "bpm",
  percentage: 15,
  chartData: [
    { name: "Sun", 'bpm': 114 },
    { name: "Mon", 'bpm': 108 },
    { name: "Tue", 'bpm': 120 },
    { name: "Wed", 'bpm': 102 },
    { name: "Thu", 'bpm': 109 },
    { name: "Fri", 'bpm': 118 },
    { name: "Sat", 'bpm': 105 },
  ],
};

export const chartBoxTotalHours = {
  color: "skyblue",
  icon: "/productIcon.svg",
  title: "Total Daily Hours",
  number: "34.5",
  dataKey: "hours",
  percentage: 21,
  chartData: [
    { name: "Sun", hours: 4 },
    { name: "Mon", hours: 6 },
    { name: "Tue", hours: 5 },
    { name: "Wed", hours: 7 },
    { name: "Thu", hours: 4 },
    { name: "Fri", hours: 5 },
    { name: "Sat", hours: 3.5 },
  ],
};
export const chartBoxRevenue = {
  color: "teal",
  icon: "/revenueIcon.svg",
  title: "Logistic Regression",
  number: "0.74",
  dataKey: "LR",
  percentage: -12,
  chartData: [
    { name: "Sun", LR: 0.70 },
    { name: "Mon", LR: 0.80 },
    { name: "Tue", LR: 0.78 },
    { name: "Wed", LR: 0.89 },
    { name: "Thu", LR: 0.60 },
    { name: "Fri", LR: 0.72 },
    { name: "Sat", LR: 0.70 },
  ],
};
export const chartBoxConversion = {
  color: "gold",
  icon: "/conversionIcon.svg",
  title: "Risk Perception",
  number: "5.07",
  dataKey: "ratio",
  percentage: 12,
  chartData: [
    { name: "Sun", ratio: 4 },
    { name: "Mon", ratio: 6 },
    { name: "Tue", ratio: 5 },
    { name: "Wed", ratio: 7 },
    { name: "Thu", ratio: 4 },
    { name: "Fri", ratio: 5 },
    { name: "Sat", ratio: 4.5 },
  ],
};

export const barChartBoxRevenue = {
  title: "Aim Accuracy Percentage",
  color: "#8884d8",
  dataKey: "accuracy",
  chartData: [
    {
      name: "Sun",
      accuracy: 80,
    },
    {
      name: "Mon",
      accuracy: 60,
    },
    {
      name: "Tue",
      accuracy: 40,
    },
    {
      name: "Wed",
      accuracy: 66,
    },
    {
      name: "Thu",
      accuracy: 85,
    },
    {
      name: "Fri",
      accuracy: 90,
    },
    {
      name: "Sat",
      accuracy: 65,
    },
  ],
};

export const barChartBoxVisit = {
  title: "Weekly Performance",
  color: "#FF8042",
  dataKey: "performance",
  chartData: [
    {
      name: "Sun",
      performance: 3000,
    },
    {
      name: "Mon",
      performance: 1300,
    },
    {
      name: "Tue",
      performance: 400,
    },
    {
      name: "Wed",
      performance: 2780,
    },
    {
      name: "Thu",
      performance: 1890,
    },
    {
      name: "Fri",
      performance: 2390,
    },
    {
      name: "Sat",
      performance: 1490,
    },
  ],
};

export const userRows = [
  {
    id: 1,
    img: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    "lastName": "Singh",
    "firstName": "Raj",
    "email": "raj@@gmail.com",
    "phone": "91 1234567890",
    "createdAt": "2023-01-01T00:00:00Z",
    "verified": true,
  },
  {
    id: 2,
    img: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "lastName": "Kapoor",
    "firstName": "Priya",
    "email": "priya.kapoor@example.com",
    "phone": "+91 9876543210",
    "createdAt": "2023-02-02T00:00:00Z",
    "verified": false,
  },
  {
    id: 3,
    img: "https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "lastName": "Desai",
    "firstName": "Rahul",
    "email": "rahul.desai@example.com",
    "phone": "+91 8901234567",
    "createdAt": "2023-03-03T00:00:00Z",
    "verified": true,
  },
  {
    id: 4,
    img: "https://images.pexels.com/photos/871495/pexels-photo-871495.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "lastName": "Desai",
    "firstName": "Rahul",
    "email": "rahul.desai@example.com",
    "phone": "+91 8901234567",
    "createdAt": "2023-03-03T00:00:00Z",
    "verified": true,
  },
  {
    id: 5,
    img: "https://images.pexels.com/photos/1758144/pexels-photo-1758144.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "lastName": "Gross",
    "firstName": "Jose",
    "email": "gobtagbes@yahoo.com",
    "phone": "123 456 789",
    "createdAt": "01.02.2023",
  },
  {
    id: 6,
    img: "https://images.pexels.com/photos/769745/pexels-photo-769745.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "lastName": "Malhotra",
    "firstName": "Vikas",
    "email": "vikas.malhotra@example.com",
    "phone": "+91 2109876543",
    "createdAt": "2023",
  },
  {
    id: 7,
    img: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "lastName": "Joshi",
    "firstName": "Priyanka",
    "email": "priyanka.joshi@example.com",
    "phone": "+91 3210987654",
    "createdAt": "2023-08-08T00:00:00Z",
    "verified": false,
  },
  {
    id: 8,
    img: "https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "lastName": "Joshi",
    "firstName": "Priyanka",
    "email": "priyanka.joshi@example.com",
    "phone": "+91 3210987654",
    "createdAt": "2023-08-08T00:00:00Z",
    "verified": false,
  },
  {
    id: 9,
    img: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "lastName": "Sharma",
    "firstName": "Aditi",
    "email": "aditi.sharma@example.com",
    "phone": "+91 5432109876",
    "createdAt": "2023-06-06T00:00:00Z",
    "verified": false,
  },
  {
    id: 10,
    img: "https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "lastName": "Sharma",
    "firstName": "Aditi",
    "email": "aditi.sharma@example.com",
    "phone": "+91 5432109876",
    "createdAt": "2023-06-06T00:00:00Z",
    "verified": false,
  },
  {
    id: 11,
    img: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "lastName": "Sharma",
    "firstName": "Aditi",
    "email": "aditi.sharma@example.com",
    "phone": "+91 5432109876",
    "createdAt": "2023-06-06T00:00:00Z",
    "verified": false,
  },
  {
    id: 12,
    img: "https://images.pexels.com/photos/774095/pexels-photo-774095.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "lastName": "Desai",
    "firstName": "Rahul",
    "email": "rahul.desai@example.com",
    "phone": "+91 8901234567",
    "createdAt": "2023-03-03T00:00:00Z",
    "verified": true,
  },
  {
    id: 13,
    img: "https://images.pexels.com/photos/761977/pexels-photo-761977.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "lastName": "Desai",
    "firstName": "Rahul",
    "email": "rahul.desai@example.com",
    "phone": "+91 8901234567",
    "createdAt": "2023-03-03T00:00:00Z",
    "verified": true,
  },
  {
    id: 14,
    img: "https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "lastName": "Mehta",
    "firstName": "Anjali",
    "email": "anjali.mehta@example.com",
    "phone": "+91 7654321098",
    "createdAt": "2023-04-04T00:00:00Z",
    "verified": false,
  },
  {
    id: 15,
    img: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    "lastName": "Mehta",
    "firstName": "Anjali",
    "email": "anjali.mehta@example.com",
    "phone": "+91 7654321098",
    "createdAt": "2023-04-04T00:00:00Z",
    "verified": false,
  },
];

export const products = [
  {
    id: 1,
    img: "https://www.armorexpress.com/wp-content/uploads/2018/01/M1-Front-Light_View-Port.png",
    "title": "Ballistic Shield",
    "color": "Black",
    "producer": "ACME Security Products",
    "createdAt": "2023-01-01T00:00:00Z",
    "price": 55000,
    "inStock": "Yes"
  },
  {
    id: 2,
    img: "https://www.specshop.pl/eng_pl_Husha-TX100P-Taser-55-000-V-Basic-Set-TX100P-BASIC-38337_1.jpg",

      "title": "Taser X2",
      "color": "Yellow",
      "producer": "Axon",
      "createdAt": "2023-02-02T00:00:00Z",
      "price": 3200,
      "inStock": "Low"
  },
  {
    id: 3,
    img: "https://static.vecteezy.com/system/resources/previews/024/087/966/non_2x/handcuffs-law-tool-free-png.png",
    "title": "Handcuffs",
    "color": "Silver",
    "producer": "Smith & Wesson",
    "createdAt": "2023-03-03T00:00:00Z",
    "price": 1000,
    "inStock": "Yes"
  },
  {
    id: 4,
    img: "https://cdn11.bigcommerce.com/s-4iwpyceis0/images/stencil/1280x1280/products/610/3398/wraparound-body-armor-tactical-vest-IIIA-qtr__59098.1567096988.jpg?c=2",
    "title": "Body Armor Vest",
    "color": "Olive Green",
    "producer": "Point Blank Body Armor",
    "createdAt": "2023-05-05T00:00:00Z",
    "price": 28000,
    "inStock": "Yes"
  },
  {
    id: 5,
    img: "https://www.extac.com.au/assets/full/FY12131.jpg?20210309034343",
    "title": "Baton",
    "color": "Black",
    "producer": "ASP Baton",
    "createdAt": "2023-07-07T00:00:00Z",
    "price": 1500,
    "inStock": "Low"
  },
  {
    id: 6,
    img: "https://www.mytrendyphone.eu/images/RC-Drone-with-GPS-and-4K-HD-Dual-Camera-F11-20122021-01-p.webp",
    "title": "Drone",
    "color": "Black",
    "producer": "DJI",
    "createdAt": "2023-08-08T00:00:00Z",
    "price": 112000,
    "inStock": "Yes"
  },
  {
    id: 7,
    img: "https://preview.free3d.com/img/2022/11/3190252246004663946/wlmfh2wr.jpg",
    "title": "Stun Gun",
    "color": "Black",
    "producer": "Taser International",
    "createdAt": "2023-09-09T00:00:00Z",
    "price": 3200,
    "inStock": "Out of Stock"
  },
  {
    id: 8,
    img: "https://preview.free3d.com/img/2022/11/3190252246004663946/wlmfh2wr.jpg",
    "title": "Stun Gun",
    "color": "Black",
    "producer": "Taser International",
    "createdAt": "2023-09-09T00:00:00Z",
    "price": 3700,
    "inStock": "Out of Stock"
  },
  {
    id: 9,
    img: "https://preview.free3d.com/img/2022/11/3190252246004663946/wlmfh2wr.jpg",
    "title": "Stun Gun",
    "color": "Black",
    "producer": "Taser International",
    "createdAt": "2023-09-09T00:00:00Z",
    "price": 3700,
    "inStock": "Out of Stock"
  },
  {
    id: 10,
    img: "https://lh3.googleusercontent.com/proxy/0Nl9Z81KWWo29nsbbRxK0vksEoo_iSyM25ZoJLiYsUv3_OXQATWbk-8lvII2LExn_f0_K83ZSahZTevd_CaEiJcPk1AZdRLxvXYeXD8gciM9oe5I8orsjvaA8T6QJNNwGKI2wl0N2vo",
    "title": "Tear Gas Launcher",
    "color": "Black",
    "producer": "Combined Tactical Systems",
    "createdAt": "2023-10-10T00:00:00Z",
    "price": 32000,
    "inStock": "Yes"
  },
];



export const singleUser = {
  id: 1,
  title: "Abhijeet Saxena",
  img: "https://images.pexels.com/photos/4891762/pexels-photo-4891762.jpeg",
  info: {
    username: "Abhijeet",
    fullname: "Abhijeet Saxena",
    email: "saxena.abhijeet@gmail.com",
    phone: "+91 9546790432",
    status: "Verified ✅",
  },
  chart: {
    dataKeys: [
      { name: "Presence", color: "#82ca9d" },
      { name: "moves", color: "#8884d8" },
    ],
    data: [
      {
        name: "Sun",
        Presence: 1000,
        moves: 2400,
      },
      {
        name: "Mon",
        Presence: 1200,
        moves: 1398,
      },
      {
        name: "Tue",
        Presence: 1300,
        moves: 3800,
      },
      {
        name: "Wed",
        Presence: 780,
        moves: 3908,
      },
      {
        name: "Thu",
        Presence: 890,
        moves: 4800,
      },
      {
        name: "Fri",
        Presence: 390,
        moves: 3800,
      },
      {
        name: "Sat",
        Presence: 490,
        moves: 4300,
      },
    ],
  },
  activities: [
    {
      text: "Abhijeet landed five accurate gunshots in a row.",
      time: "3 day ago",
    },
    {
      text: "Abhijeet solved murder mystery in coop.",
      time: "1 week ago",
    },
    {
      text: "Abhijeet defused a bomb within 5 minutes.",
      time: "2 weeks ago",
    },
    {
      text: "Abhijeet solved his first crime scene investigation.",
      time: "1 month ago",
    },
    {
      text: "Abhijeet had a heart rate spike of 127 bpm.",
      time: "1 month ago",
    },
    {
      text: "Abhijeet enrolled the Training Programme through mobile.",
      time: "2 months ago",
    },
  ],
};
export const singleProduct = {
  id: 1,
  title: "Playstation 5 Digital Edition",
  img: "https://store.sony.com.au/on/demandware.static/-/Sites-sony-master-catalog/default/dw1b537bbb/images/PLAYSTATION5W/PLAYSTATION5W.png",
  info: {
    productId: "Ps5SDF1156d",
    color: "white",
    price: "$250.99",
    producer: "Sony",
    export: "Japan",
  },
  chart: {
    dataKeys: [
      { name: "visits", color: "#82ca9d" },
      { name: "orders", color: "#8884d8" },
    ],
    data: [
      {
        name: "Sun",
        visits: 4000,
        orders: 2400,
      },
      {
        name: "Mon",
        visits: 3000,
        orders: 1398,
      },
      {
        name: "Tue",
        visits: 2000,
        orders: 3800,
      },
      {
        name: "Wed",
        visits: 2780,
        orders: 3908,
      },
      {
        name: "Thu",
        visits: 1890,
        orders: 4800,
      },
      {
        name: "Fri",
        visits: 2390,
        orders: 3800,
      },
      {
        name: "Sat",
        visits: 3490,
        orders: 4300,
      },
    ],
  },
  activities: [
    {
      text: "John Doe purchased Playstation 5 Digital Edition",
      time: "3 day ago",
    },
    {
      text: "Jane Doe added Playstation 5 Digital Edition into their wishlist",
      time: "1 week ago",
    },
    {
      text: "Mike Doe purchased Playstation 5 Digital Edition",
      time: "2 weeks ago",
    },
    {
      text: "Anna Doe reviewed the product",
      time: "1 month ago",
    },
    {
      text: "Michael Doe added Playstation 5 Digital Edition into their wishlist",
      time: "1 month ago",
    },
    {
      text: "Helen Doe reviewed the product",
      time: "2 months ago",
    },
  ],
};
