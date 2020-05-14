import { rankCurrencies, convertCurrency } from '../index'

test('Rank currencies empty', async() => {
  const res = await rankCurrencies([]);
  expect(res).toStrictEqual([]);
});

test('Sanity testing', async () => {
  const res = await convertCurrency(1, 'SGD', 'USD')
  expect(typeof res).toBe('number');
})

test('Rank currencies', async() => {
  const res = await rankCurrencies(['100 INR', '15 SGD', '0.5 USD']);
  expect(res).toStrictEqual(['0.5 USD', '100 INR', '15 SGD' ]);
})