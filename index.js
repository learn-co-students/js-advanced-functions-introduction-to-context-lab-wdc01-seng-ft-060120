const createEmployeeRecord = (array) => {
    let obj = {};
    obj['firstName'] = `${array[0]}`;
    obj['familyName'] = `${array[1]}`;
    obj['title'] = `${array[2]}`;
    obj['payPerHour'] = array[3];
    obj['timeInEvents'] = [];
    obj['timeOutEvents'] = [];
    return obj;
}

const createEmployeeRecords = (array) => {
    let new_arr = [];
    array.forEach((record) => {
        new_arr.push(createEmployeeRecord(record));
    })
    return new_arr;
}

// return array.map(function(record){
//     return createEmployeeRecord(record)
// })

const createTimeInEvent = (employeeRecord, dateString) => {
    let dateTime = dateString.split(' ');
    // let hour = dateTime[1];
    // let date = dateTime[0];
    employeeRecord['timeInEvents'].push({
        type: "TimeIn",
        hour: parseInt(dateTime[1]),
        date: dateTime[0]
    })
    return employeeRecord;
}

const createTimeOutEvent = (employeeRecord, dateString) => {
    let dateTime = dateString.split(' ');
    // let hour = dateTime[1];
    // let date = dateTime[0];
    employeeRecord['timeOutEvents'].push({
        type: "TimeOut",
        hour: parseInt(dateTime[1]),
        date: dateTime[0]
    })
    return employeeRecord;
}

const hoursWorkedOnDate = (employeeRecord, dateString) => {
    let clockIn = employeeRecord.timeInEvents.find(function(date){
        return date.date === dateString;
    })

    let clockOut = employeeRecord.timeOutEvents.find(function(date){
        return date.date === dateString;
    })

    return (clockOut.hour - clockIn.hour) / 100;
    //return console.log(employeeRecord);
    let wages = employeeRecord['timeOutEvents']['hour'] - employeeRecord['timeInEvents']['hour'];
    return parseInt(wages / 100);

}

const wagesEarnedOnDate = (employeeRecord, dateString) => {
    return employeeRecord.payPerHour * hoursWorkedOnDate(employeeRecord, dateString);
}

const allWagesFor = (employeeRecord) => {
    let allDates = employeeRecord.timeInEvents.map(function(date){
        return date.date
    })

    let allWages = allDates.reduce(function(acc, i){
        return acc + wagesEarnedOnDate(employeeRecord, i)
    }, 0)

    return allWages;
}

const findEmployeeByFirstName = (srcArray, firstName) => {
    let answer =  srcArray.find(employee => employee['firstName'] === firstName);
    return answer;
}

const calculatePayroll = (array) => {
    return array.reduce(function(acc, employeeRecord){
        return acc + allWagesFor(employeeRecord)
    }, 0)
}
// mdn Array.find;