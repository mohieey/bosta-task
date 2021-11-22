module.exports = function (check) {
  const report = {
    date: new Date(),
    url: check.url,
    lastStatus: check.lastStatus,
    availability: 0,
    outages: 0,
    downtime: 0,
    uptime: 0,
    responseTime: 0,
    history: check.pollRecords,
  };

  const [upTime, downTime, outages, availability] =
    calculateAverageAvailability(check.interval, check.pollRecords);
  report.uptime = upTime;
  report.downtime = downTime;
  report.outages = outages;
  report.availability = availability;

  report.responseTime = calculateAverageResponseTime(check.pollRecords);

  return report;
};

const calculateAverageAvailability = (interval, pollRecords) => {
  const numberOfRecords = pollRecords.length;
  let available = 0;
  let nonAvailable = 0;

  pollRecords.forEach((record) => {
    if (record.status < 500) available++;
    else nonAvailable++;
  });

  return [
    available * interval,
    nonAvailable * interval,
    nonAvailable,
    (available / numberOfRecords) * 100,
  ];
};

const calculateAverageResponseTime = (pollRecords) => {
  const numberOfRecords = pollRecords.length;
  const totalResponseTime = pollRecords.reduce(
    (prev, curr) => prev + curr.responseTime,
    0
  );
  return totalResponseTime / numberOfRecords;
};
