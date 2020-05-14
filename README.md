# Currency Ranker

Small Library to rank money in different currencies or just to get the value in different currency

## Installation

`npm install @tshradheya/currency-ranker`

## Usage
```ts
    import { rankCurrencies } from '@tshradheya/currency-ranker';

    const currenciesToRank = ['100 INR', '1.3 SGD', '0.5 EUR'];

    const res = await rankCurrencies(currenciesToRank);
    // [ '0.5 EUR', '1.3 SGD', '100 INR' ]
```

## Tests

`npm run test`

You can also run in watch mode while developing `npm run test:watch`



## Contributing

With Github Actions in place ensure any new features pass all checks.
Feel free to create issues to request extra features. 
Add unit tests for any new or changed functionality. Lint and write code accoring to enforced code quality.
