import plays from "./data/plays.json";
import invoices from "./data/invoices.json";
import createStatementData from "./createStatementdata";
import { Invoice } from "./types";

export function statement(invoice: Invoice, plays: any) {
  return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data: any) {
  let result = `Statement for ${data.customer}\n`;

  for (let perf of data.performances) {
    result += ` ${perf.play.name}: ${toUSD(perf.amount)} (${
      perf.audience
    } seats)\n`;
  }

  result += `Amount owed is ${toUSD(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
  return result;

  // EXTRACTED FUNCTIONS
  function toUSD(aNumber: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }

  // END OF EXTRACTED FUNCTIONS
}

console.log(statement(invoices[0], plays));
