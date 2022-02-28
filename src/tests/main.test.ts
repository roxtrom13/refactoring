import { statement } from "../main";

import plays from "../data/plays.json";
import invoices from "../data/invoices.json";

const dumpResult = `Statement for BigCo
 Hamlet: $650.00 (55 seats)
 As You Like It: $580.00 (35 seats)
 Othello: $500.00 (40 seats)
Amount owed is $1,730.00
You earned 47 credits
`

test("Testing result from statement", () => {
  expect(statement(invoices[0], plays)).toBe(dumpResult);
});
