// Your code here
function createEmployeeRecord(employeeData) {
    const [firstName, familyName, title, payPerHour] = employeeData;
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  function createEmployeeRecords(arr) {
    return arr.map(employeeData => createEmployeeRecord(employeeData));
  }
  function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
  
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date: date
    });
  
    return employee;
  }
  function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(" ");
  
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date: date
    });
  
    return employee;
  }
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
  
    if (timeIn && timeOut) {
      const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
      return hoursWorked;
    }
  
    return 0;
  }
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    const payRate = employee.payPerHour;
    const wagesEarned = hoursWorked * payRate;
    return wagesEarned;
  }
  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => {
      const wagesEarned = wagesEarnedOnDate(employee, date);
      return total + wagesEarned;
    }, 0);
    return totalWages;
  }
  function calculatePayroll(employees) {
    const totalPayroll = employees.reduce((total, employee) => {
      const wages = allWagesFor(employee);
      return total + wages;
    }, 0);
    return totalPayroll;
  }
  
  