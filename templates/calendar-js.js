let currentDate = new Date();

// Extract the individual components of the date
let year = currentDate.getFullYear();
let monthGlobal = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
let date = currentDate.getDate();
let weekday = currentDate.getDay();
if (monthGlobal < 10) {
    monthGlobal = '0' + (monthGlobal - 0);
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
            let x = 0; 
            if (1 <= date && date <= 7) {
                x = 1;
            } else if (8 <= date && date <= 14) {
                x = 2;
            } else if (15 <= date && date <= 21) {
                x = 3;
            } else if (22 <= date && date <= 28) {
                x = 4;
            } else if (29 <= date && date <= 31) {
                x = 5;
            };

            let condition = (7 * x - (7 - weekday)) - (date - 1);
            if (condition < 1) {
                x = x + 1;
            }

            firstDateOfMonth = (7 * x - (7 - weekday)) - (date - 1);

            console.log(x);
            console.log(date);
            console.log(`First day of month: ${firstDateOfMonth}`);


            
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
            console.log(trimmedDates);
    
    
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
                    // calendarEmptySlot[idx + firstDateOfMonth - (firstDateOfMonth - 1)] = overTime[i];
                    calendarEmptySlot[(idx + (firstDateOfMonth - 1)) - 1] = overTime[i];

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
            let startIndex = firstDateOfMonth - 1; // Index of the 3rd div (0-based)
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
