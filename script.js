function estimateGraduationDate() {
    //define the academic terms.
    const terms = ["Spring 1", "Spring 2", "Summer 1", "Summer 2", "Fall 1", "Fall 2"];
    const currentTerm = document.getElementById("currentTerm").value;
    const creditsRemaining = parseInt(document.getElementById("creditsRemaining").value);

    // using a switch statement to handle different ranges of creditsremaining
    switch (true) {
        case isNaN(creditsRemaining):
            document.getElementById("result").innerHTML = "Please enter a number for remaining credits.";
            return;
        case (creditsRemaining > 120):
            document.getElementById("result").innerHTML = "Please enter a valid value for remaining credits (120 or less).";
            return;
        case (creditsRemaining <= 120):
            break; // continue to calculation part
        default:
            return; // in case of an unexpected input
    }

    const attendingSummer = document.querySelector('input[name="summerTerm"]:checked').value === "yes";
    const isFullTime = document.querySelector('input[name="status"]:checked').value === "fullTime";
    const classesPerTerm = isFullTime ? 2 : 1;
    const currentYear = parseInt(document.getElementById("currentYear").value);

    let classesRemaining = Math.ceil(creditsRemaining / 3);
    let currentTermIndex = terms.indexOf(currentTerm);
    let currentYearValue = currentYear;

    while (classesRemaining > 0) {
        currentTermIndex = (currentTermIndex + 1) % terms.length;
        if (currentTermIndex === 0) {
            currentYearValue++;
        }
        if (attendingSummer || (terms[currentTermIndex] !== "Summer 1" && terms[currentTermIndex] !== "Summer 2")) {
            classesRemaining -= classesPerTerm;
        }
        if (classesRemaining <= 0) {
            break;
        }
    }

    const graduationTerm = terms[currentTermIndex];
    const graduationYear = currentYearValue;

    document.getElementById("result").innerHTML = `Estimated Last Term: ${graduationTerm} ${graduationYear}`;
}
