let currentDate = new Date();

// Extract the individual components of the date
let year = currentDate.getFullYear();
let monthGlobal = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
let date = currentDate.getDate();
if (monthGlobal < 10) {
    monthGlobal = '0' + (monthGlobal - 1);
};


document.addEventListener("DOMContentLoaded", function () {
    let myParagraph = document.getElementById("month");
    myParagraph.textContent = monthGlobal;
});

const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        fetch('http://192.168.0.115:5000/api/data')
        .then(response => response.json())
        .then(data => {
            // Populate the list with data
            console.log(data);
            // Get the current date
            // let currentDate = new Date();
            let monthGlobal2 = currentDate.getMonth() - 1;

            console.log(`month ${monthGlobal2}`);
            let firstDateOfMonth;
            const firstDayOfMonth = new Date(year, monthGlobal2, 1);
            const weekdays = [1, 2, 3, 4, 5, 6, 7];
            firstDateOfMonth = weekdays[firstDayOfMonth.getDay() - 1];
            console.log(firstDateOfMonth);
            
            let staffName;
            text = button.getAttribute('title');
            staffName = text;
            console.log(staffName);
            let choosenMonth;
            choosenMonth = monthGlobal;
            console.log(choosenMonth);
            
            let staffNameHeader = document.getElementById("staff");
            staffNameHeader.textContent = staffName;


            let filteredName = data.filter(function (obj) {
                return obj.staff_name.localeCompare(staffName, "vi", { sensitivity: "accent" }) === 0;
            });
    
            let filteredMonth = filteredName.filter(function (obj) {
                let parts = obj.date.split("-");
                let month = parts[1];
    
                return month === choosenMonth;
            });
    
            let dates = filteredMonth.map(obj => obj.date.split("-")[2]);
            // console.log(dates)
            let trimmedDates = dates.map(date => date.replace(/^0*(\d+)/, '$1'));
            let dateNumber = dates.map(date => +date);
            let overTime = filteredMonth.map(data => data.leaving_time);
            console.log(dateNumber);
            console.log(overTime);
    
    
            const row = ['MON','TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
            const divContainer0 = document.getElementById('day-container0');
    
            // row.map((row) => {
            //     const div = document.createElement('div');
            //     div.textContent = row;
            //     div.classList.add('weekday');
            //     divContainer0.appendChild(div);
            // });


            let calendarEmptySlot = new Array(31 + (firstDateOfMonth-1)).fill('');

            for (let i = 0; i < dateNumber.length; i++) {
                let idx = dateNumber[i];
                if (idx >= 0 && idx < calendarEmptySlot.length) {
                
                    // calendarEmptySlot[idx - 1 + (firstDateOfMonth - (firstDateOfMonth - 1) - 1)] = overTime[i];
                    calendarEmptySlot[idx + firstDateOfMonth - (firstDateOfMonth - 1)-2] = overTime[i];
                    console.log(`index: ${idx}`);
                    // console.log(idx + firstDateOfMonth - firstDateOfMonth - 1);
                };
            };

        
            const divContainer1 = document.getElementById('day-container1');
            calendarEmptySlot.map((item, index) => {
                const div = document.createElement('div');
                div.textContent = item;
                div.classList.add('day');
                divContainer1.appendChild(div);

                // if (index === 6) {
                //     const row = [8, 9, 10, 11, 12, 13, 14];
                //     row.map((row) => {
                //         const div = document.createElement('div');
                //         div.textContent = row;
                //         div.classList.add('weekday');
                //         divContainer1.appendChild(div);
    
            });

            const dateDivContainers = document.querySelectorAll('.day');
            let startIndex = firstDateOfMonth - 1; // Month are zero-base
            let endIndex = 35; // Index of the 8th div (inclusive)
            dateDivContainers.forEach((container, index) => {
                const dateDiv = document.createElement('div');

                if (index >= startIndex && index < endIndex) {
                    dateDiv.textContent = index - startIndex + 1;
                } else {
                    dateDiv.textContent = '';
                }
                dateDiv.classList.add('dateDisplay');
                container.appendChild(dateDiv);
            });



        })
        .catch(error => {
            console.log('Error:', error);
        });
    });
});
