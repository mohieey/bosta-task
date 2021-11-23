const generateReportByCheck = require("./generateReportByCheck");

module.exports = function (checks, tag) {
  const reports = [];

  checks.forEach((check) => {
    const report = generateReportByCheck(check);
    reports.push(report);
  });

  const aggregateReport = aggregateReports(reports);

  aggregateReport.availability = aggregateReport.availability / reports.length;
  aggregateReport.responseTime = aggregateReport.responseTime / reports.length;
  aggregateReport.tag = tag;
  aggregateReport.date = new Date();

  console.log(aggregateReport);
};

const aggregateReports = (reports) => {
  const aggregateReport = {
    names: [],
    urls: [],
    lastStatus: [],
    availability: 0,
    outages: 0,
    downtime: 0,
    uptime: 0,
    responseTime: 0,
    history: [],
  };

  reports.forEach((curr) => {
    aggregateReport.names.push(curr.name);
    aggregateReport.urls.push(curr.url);
    aggregateReport.lastStatus.push(curr.lastStatus);
    aggregateReport.availability =
      aggregateReport.availability + curr.availability;

    aggregateReport.outages = aggregateReport.outages + curr.outages;
    aggregateReport.downtime = aggregateReport.downtime + curr.downtime;
    aggregateReport.uptime = aggregateReport.uptime + curr.uptime;
    aggregateReport.responseTime =
      aggregateReport.responseTime + curr.responseTime;

    curr.history.forEach((record) => {
      aggregateReport.history.push(record);
    });
  });

  return aggregateReport;
};
