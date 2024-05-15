

document.addEventListener("DOMContentLoaded", function () {
    var month = "5";
    var myParagraph = document.getElementById("month");
    myParagraph.textContent = month;
});


// fetch('http://127.0.0.1:5000/api/data')
fetch('http://192.168.0.115:5000/api/data')

    .then(response => response.json())
    .then(data => {
        // Populate the list with data
        console.log(data);
        // Get the current date
        var currentDate = new Date();

        // Extract the individual components of the date
        var year = currentDate.getFullYear();
        var monthGlobal = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
        var day = currentDate.getDate();
        if (monthGlobal < 10) {
            monthGlobal = '0' + monthGlobal
        }
        // Format the date as a string
        var formattedDate = year + '-' + monthGlobal + '-' + day;

        // Print the date
        console.log(formattedDate);


        let filteredName = data.filter(function (obj) {
            return obj.staff_name.localeCompare("NGUYỄN TUẤN ANH", "vi", { sensitivity: "accent" }) === 0;
        });

        let filteredMonth = filteredName.filter(function (obj) {
            let parts = obj.date.split("-");
            let month = parts[1];

            return month === monthGlobal;
        });

        let dates = filteredMonth.map(obj => obj.date.split("-")[2]);
        // console.log(dates)
        let trimmedDates = dates.map(date => date.replace(/^0*(\d+)/, '$1'));
        let dateNumber = dates.map(date => +date);
        let overTime = filteredMonth.map(data => data.leaving_time);




        console.log(filteredMonth);
        console.log(trimmedDates);
        // console.log(dateNumber);
        // console.log(overTime);








        const row = [1, 2, 3, 4, 5, 6, 7];
        const divContainer0 = document.getElementById('day-container0');

        row.map((row) => {
            const div = document.createElement('div');
            div.textContent = row;
            div.classList.add('weekday');
            divContainer0.appendChild(div);
        });

        let calendarData = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];

        for (let i = 0; i < dateNumber.length; i++) {
            let idx = dateNumber[i];
            if (idx >= 0 && idx < calendarData.length) {
                calendarData[idx - 1] = overTime[i];
            };
        };


        const divContainer1 = document.getElementById('day-container1');
        calendarData.map((item, index) => {
            const div = document.createElement('div');
            div.textContent = item;
            div.classList.add('day');
            divContainer1.appendChild(div);

            if (index === 6) {
                const row = [8, 9, 10, 11, 12, 13, 14];
                row.map((row) => {
                    const div = document.createElement('div');
                    div.textContent = row;
                    div.classList.add('weekday');
                    divContainer1.appendChild(div);

                });
            };
            if (index === 13) {
                const row = [15, 16, 17, 18, 19, 20, 21];
                row.map((row) => {
                    const div = document.createElement('div');
                    div.textContent = row;
                    div.classList.add('weekday');
                    divContainer1.appendChild(div);

                });
            };
            if (index === 20) {
                const row = [22, 23, 24, 25, 26, 27, 28];
                row.map((row) => {
                    const div = document.createElement('div');
                    div.textContent = row;
                    div.classList.add('weekday');
                    divContainer1.appendChild(div);

                });
            };

            if (index === 27) {
                const row = ['29', '30', '31', '', '', '', ''];
                row.map((row) => {
                    const div = document.createElement('div');
                    div.textContent = row;
                    div.classList.add('weekday');
                    divContainer1.appendChild(div);

                });
            };





        });

    })
    .catch(error => {
        console.log('Error:', error);
    });








