document.addEventListener("DOMContentLoaded", function() {
    const calculateButton = document.getElementById("calculate");
    const totalMessage = document.getElementById("total-message");

    calculateButton.addEventListener("click", function() {
        const events = [
            {
                name: document.getElementById("nameEvents1").value.trim(),
                days: parseFloat(document.getElementById("daysLeft1").value),
                totalHours: parseFloat(document.getElementById("workHours1").value),
                resultFieldId: "numEvents1Result"
            },
            {
                name: document.getElementById("nameEvents2").value.trim(),
                days: parseFloat(document.getElementById("daysLeft2").value),
                totalHours: parseFloat(document.getElementById("workHours2").value),
                resultFieldId: "numEvents2Result"
            },
            {
                name: document.getElementById("nameEvents3").value.trim(),
                days: parseFloat(document.getElementById("daysLeft3").value),
                totalHours: parseFloat(document.getElementById("workHours3").value),
                resultFieldId: "numEvents3Result"
            },
            {
                name: document.getElementById("nameEvents4").value.trim(),
                days: parseFloat(document.getElementById("daysLeft4").value),
                totalHours: parseFloat(document.getElementById("workHours4").value),
                resultFieldId: "numEvents4Result"
            }
        ];

        let hasValidEvents = false;
        let totalDailyHours = 0;

        events.forEach(event => {
            const resultField = document.getElementById(event.resultFieldId);
            
            if (isNaN(event.days) || isNaN(event.totalHours) || event.days <= 0 || event.totalHours < 0) {
                resultField.value = "Invalid input";
                return;
            }

            if (event.totalHours === 0) {
                resultField.value = "0.00";
                return;
            }

            const hoursPerDay = event.totalHours / event.days;
            resultField.value = hoursPerDay.toFixed(2);
            totalDailyHours += hoursPerDay;
            hasValidEvents = true;
        });

        if (hasValidEvents) {
            totalMessage.textContent = `Total daily commitment: ${totalDailyHours.toFixed(2)} hours`;
            
            if (totalDailyHours > 10) {
                totalMessage.style.color = "red";
                totalMessage.innerHTML += " ⚠️ Heavy workload!";
            } else if (totalDailyHours > 6) {
                totalMessage.style.color = "orange";
                totalMessage.innerHTML += " ✏️ Manage carefully!";
            } else {
                totalMessage.style.color = "green";
                totalMessage.innerHTML += " 👍 You've got this!";
            }
        } else {
            totalMessage.textContent = "Please enter valid values for at least one event";
            totalMessage.style.color = "red";
        }
    });

    // Input validation
    const numberInputs = document.querySelectorAll("input[type='number']");
    numberInputs.forEach(input => {
        input.addEventListener("input", function() {
            if (this.value < 0) this.value = 0;
            if (this.id.includes("daysLeft") && this.value < 1) this.value = 1;
        });
    });
});