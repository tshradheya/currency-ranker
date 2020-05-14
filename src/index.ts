import axios from 'axios';

const EXCHANGE_RATE_API = 'https://api.exchangeratesapi.io';

/**
 * Ranks currencies based on current value in ascending order
 * @param currencies [] of format ['100 INR', '1.2 SGD']
 * @returns [] in sorted order
 */
export const rankCurrencies = async (currencies: string[]) => {

  const setOfUniqueCurrencies = new Set<string>();

  for (const curr of currencies) {
    const res = curr.split(' ');
    setOfUniqueCurrencies.add(res[1]);
  }

  const rates: Record<string, number> = await getAllRatesWithUSD(setOfUniqueCurrencies);

  const currValuestoSort = []
  for (const curr of currencies) {
    const res = curr.split(' ');
    currValuestoSort.push([curr, parseFloat(res[0]) * (1 / rates[res[1]])])
  }

  return currValuestoSort.sort((a: any, b: any) => { return a[1] - b[1] }).map(val => val[0])

};

export const convertCurrency = async (value: number, fromCurrency: string, toCurrency: string): Promise<number> => {
  const result = await axios.get(`${EXCHANGE_RATE_API}/latest`, {
    params: {
      base: fromCurrency,
      symbols: toCurrency,
    }
  });
  return value * result.data.rates[toCurrency];
}

const getAllRatesWithUSD = async (uniqueCurrencies: Set<string>): Promise<Record<string, number>> => {
  const currencies = Array.from(uniqueCurrencies);
  const formattedCurrencies = currencies.join(',');
  const response = await axios.get(`${EXCHANGE_RATE_API}/latest`, {
    params: {
      base: 'USD',
      symbols: formattedCurrencies,
    }
  })

  return response.data.rates;

}
