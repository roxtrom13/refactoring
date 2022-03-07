import plays from "./data/plays.json";
import invoices from "./data/invoices.json";
import { Invoice, Performance, Play, EnrichedPerformance } from "./types";

export function statement(invoice: Invoice, plays: any) {
  const statementData = {} as any;
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  return renderPlainText(statementData);

  function enrichPerformance(aPerformance: Performance) {
    const result: any = Object.assign({}, aPerformance);
    result.play = playFor(result);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
    return result;
  }

  function playFor(aPerformance: Performance): Play {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance: EnrichedPerformance) {
    let result = 0;
    switch (aPerformance.play.type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;

      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;

      default:
        throw new Error(`Unknown type: ${aPerformance.play.type}`);
    }

    return result;
  }

  function volumeCreditsFor(aPerformance: EnrichedPerformance): number {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" == aPerformance.play.type)
      result += Math.floor(aPerformance.audience / 5);
    return result;
  }

  function totalVolumeCredits(data: any) {
    let result = 0;
    for (let perf of data.performances) {
      result += perf.volumeCredits;
    }
    return result;
  }

  function totalAmount(data: any) {
    let result = 0;
    for (let perf of data.performances) {
      result += perf.amount;
    }
    return result;
  }

}

export function renderPlainText(data: any) {
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
