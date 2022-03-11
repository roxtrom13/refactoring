import plays from "./data/plays.json";
import invoices from "./data/invoices.json";
import createStatementData from "./createStatementdata";
import { Invoice } from "./types";

const app = document.querySelector<HTMLDivElement>('#app')!

window.onload = function() {
  what();
  function what() {
    app.innerHTML = htmlStatement(invoices[0], plays);
  }
}

export function statement(invoice: Invoice, plays: any) {
  return renderPlainText(createStatementData(invoice, plays));
}

export function htmlStatement(invoice: Invoice, plays: any) {
  const result =  renderHtml(createStatementData(invoice, plays));
  return result;
}

function toUSD(aNumber: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
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
}

function renderHtml(data: any) {
  let result = `<h1>Statement for ${data.customer}</h1>\n`;
  result += `<table>\n`;
  result += `<tr><th>play</th><th>seats</th><th>cost</th></tr>`;
  for (let perf of data.performances) {
    result += `<tr><td>${perf.play.name}</td><td>${perf.audience}</td>`;
    result += `<td>${perf.amount}</td></tr>\n`;
  }
  result += `</table>\n`;
  result += `<p>Amount owed is ${toUSD(data.totalAmount)}</p>\n`;
  result += `<p>You earned ${data.totalVolumeCredits} credits</p>\n`;

  return result;
}

console.log(statement(invoices[0], plays));
