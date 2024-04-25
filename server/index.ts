import express, { Request, Response } from "express"; // Importing express types for Request and Response
import cors from "cors";
import mongoose, { Document } from "mongoose"; // Importing mongoose and Document type

const app = express();

mongoose.connect('mongodb://localhost:27017/tableData')
    .then(() => {
        console.log("Mongo Connection open");
        initializeDatabaseAndServer();
    })
    .catch((err: Error) => { // Explicitly specifying Error type for error handling
        console.error("OH NO MONGO CONNECTION ERROR:", err);
    });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("connection open");
});

interface TableInterface extends Document { // Defining interface for Table document
    key: number;
    state: string;
    paymentMethod: string;
    date: Date;
    value: number;
    platform: string;
}

const tableSchema = new mongoose.Schema({
    key: Number,
    state: String,
    paymentMethod: String,
    date: Date,
    value: Number,
    platform: String,
});

const Tablee = mongoose.model<TableInterface>('Tablee', tableSchema);

interface RecentCustomerInterface extends Document { // Defining interface for Recent Customer document
    id: number;
    img: string;
    name: string;
    email: string;
    amount: number;
    city: string;
}

const recentVisitorSchema = new mongoose.Schema({
    id: Number,
    img: String,
    name: String,
    email: String,
    amount: Number,
    city: String,
});

const recentCustomerss = mongoose.model<RecentCustomerInterface>('recentCustomerss', recentVisitorSchema);

interface Customer {
    id: number;
    img: string;
    name: string;
    email: string;
    amount: number;
    city: string;
}

const customers: Customer[] = [ // Specifying type for customers array
    {
        id: 1,
        img: "/assets/Avikal.jpg",
        name: "Avikal Sinha",
        email: "haravikal06@gmail.com",
        amount: 11.234,
        city: "Noida"
    },
    {
        id: 2,
        img: "/assets/disha.png",
        name: "Disha Mishra",
        email: "dishamsr@gmail.com",
        amount: 11.234,
        city: "Kanpur"


    },
    {
        id: 3,
        img: "/assets/divyansh.png",
        name: "Divyansh Chawla",
        email: "dchawla01@.com",
        amount: 11.234,
        city: "Ghaziabad"

    },
    {
        id: 4,
        img: "/assets/mohil.jpg",
        name: "Mohil Chitransh",
        email: "mchitransh29@gmail.com",
        amount: 11.234,
        city: "Gurgaon"
    }
   

    // Add other customer data...
];

app.use(cors());

async function initializeDatabaseAndServer() {
    try {
        await initializeDatabase();
        await initializeRecentCustomers();
        app.listen(3000, () => {
            console.log("Listening on port 3000!!");
        });
    } catch (error) {
        console.error("Error initializing database and server:", error);
    }
}

async function initializeDatabase() {
    try {
        const tableCount = await Tablee.countDocuments({});
        if (tableCount === 0) {
            await Tablee.insertMany([
                {
                    key: 1, // Changed to number type
                    state: 'Complete',
                    paymentMethod: 'Card',
                    value: 100,
                    date: new Date('2024-01-01'),
                    platform: 'Amazon',
                },
                {
                    key: '2',
                    state: 'Complete',
                    paymentMethod: 'Card',
                    value: 50,
                    date: new Date('2024-01-01'),
                    platform: 'Netflix',
                },
                {
                    key: '3',
                    state: 'Canceled',
                    paymentMethod: 'Card',
                    value: 75,
                    date: new Date('2024-01-01'),
                    platform: 'Facebook',
                },
                {
                    key: '4',
                    state: 'Pending',
                    paymentMethod: 'Card',
                    value: 120,
                    date: new Date('2024-01-01'),
                    platform: 'Amazon Prime',
                }

                // Insert other table data...
            ]);
            console.log("Table data inserted successfully");
        } else {
            console.log("Table data already exists");
        }
    } catch (error) {
        console.error("Error initializing database:", error);
    }
}

async function initializeRecentCustomers() {
    try {
        const recentCustomersCount = await recentCustomerss.countDocuments({});
        if (recentCustomersCount === 0) {
            await recentCustomerss.insertMany(customers);
            console.log("Recent customers data inserted successfully");
        } else {
            console.log("Recent customers data already exists");
        }
    } catch (error) {
        console.error("Error initializing recent customers:", error);
    }
}

app.get("/table", async (req: Request, res: Response) => { // Specifying types for request and response
    try {
        const tableData = await Tablee.find({});
        res.json(tableData);
    } catch (error) {
        console.error("Error fetching table data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/recent-customers", async (req: Request, res: Response) => { // Specifying types for request and response
    try {
        const recentCustomersData = await recentCustomerss.find({});
        res.json(recentCustomersData);
    } catch (error) {
        console.error("Error fetching recent customers data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.use((req: Request, res: Response) => { // Specifying types for request and response
    console.log("we get a new request!!");
    res.send({ color: 'green' });
});
