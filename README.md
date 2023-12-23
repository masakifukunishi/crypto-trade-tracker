## Architecture
![architecture](https://github.com/masakifukunishi/crypto-trade-tracker/assets/42294938/e8eabb3f-e843-4b65-ac1a-96b8ff644baf)

## How to run
### 1. Clone this repository
   
### 2. Install dependencies
```bash
npm run install-all
```

### 3. Set environment variables
```bash
cp server/.env.example server/.env
```
`MONGODB_URI` is the URI of the MongoDB database to be used.

Set firebase information

### 4. Set config
If you want to change the asset pairs or candlestick period, change the settings in server/config/default.json.

```json
{
  "kraken": {
    "apiUrl": "https://api.kraken.com",
    "wsUrl": "wss://ws.kraken.com",
    "baseAsset": {
      "symbol": "ZUSD",
      "altname": "USD"
    },
    "quoteAssets": [
      {
        "symbol": "XETH",
        "altname": "ETH"
      },
      {
        "symbol": "XXRP",
        "altname": "XRP"
      }
    ],
    "dataNum": 365,
    "period": {
      "daily": 1440
    }
  }
}
```
[server/config/default.json](server/config/default.json)

For the list of asset pairs, see the following API documentation.

https://docs.kraken.com/rest/#tag/Market-Data/operation/getTradableAssetPairs

### 5. Run batch processing to register initial ohlcv data
```bash
npm run dev-initialize-data
```

### 6. Run frontend and backend
```bash
npm run dev
```

## How to build
### 1. The same as 1-5 of 'How to run'

### 2. Build frontend and backend
```bash
npm run build
```

### 3. Run the built app
```bash
npm run start
```
