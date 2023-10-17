# Final project - Trade management of crypto assets

## Decide on the project
### What is the project about?
1. Users can view cryptocurrency chart of selected coins.
2. Users can also track their trade history.

### What is the goal of the project?
1. To be able to collect information on the cryptocurrency imfromation (OHLCV) over a period of time selected by the user.
2. Allows users to track their trade history and see their profits

### What is the target user?
Target users are those who are want to see the cryptocurrency price trends for a selected coin or time period, and those who trade and want to manage their trading history.

### Is there any existing project that you can use as a reference?
Coinmarketcap are have some of the features of the app I want to make.

## Project Approval Requirements:

### ERD
![ERD](./images/ERD.png)

### At least 3 to 5 Wireframes.
![Wireframe](./images/Wireframe.png)

### At least 2 to 3 User Stories.
**As a** user,
**I want to** be able to see cryptocurrency price transitions
**so that I** can see the candlestick chart for selected coins.

**As a** user,
**I want to** be able to track my trade history and see my profits
**so that I** can manage my trade history.

### Tech Stack. (Can be modified in future).
#### Frontend
- TypeScript
- React
- Redux
- Tailwind CSS
- ApexCharts
- Vite
- websocket
- Firebase Authentication
- ESLint

#### Backend
- TypeScript
- Node.js
- Express
- MongoDB
- mongoose
- node-cron or websocket
- Kraken API and websocket
- ESLint

### Feature List (At least 5). (Can be modified in future).
- User can see the candlestick chart for selected coins and time period.
- User can see the volume chart for selected coins and time period.
- User can login and logout.
- User can add, edit, and delete their trade history.
- User can see their trade history.
- User can see their profit/loss.
