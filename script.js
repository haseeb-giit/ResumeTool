




document.getElementById("add-skill").addEventListener("click", function () {
    const skillSection = document.getElementById("skill-section");

    const skillEntry = document.createElement("div");
    skillEntry.classList.add("skill-entry");

    skillEntry.innerHTML = `
        <label>Skill Name</label>
        <input type="text" class="skill-name" placeholder="Skill Name">
        <label>Skill Progress</label>
        <input type="range" class="skill-progress" min="0" max="100">
        <button type="button" class="remove-skill">Delete</button>
    `;

    // Append to skill section
    skillSection.appendChild(skillEntry);

    // Add event listener to the delete button
    skillEntry.querySelector(".remove-skill").addEventListener("click", function () {
        skillEntry.remove();
    });
});

function removeimg() {
    const image = document.getElementById("newimg"); // Get the image by ID
    image.remove(); // Remove the image from the DOM
}

// function clk() {
//     function deleteHideElements() {
//         const elements = document.querySelectorAll(".hide"); // Select all elements with the class 'hide'
//         elements.forEach(element => element.remove()); // Remove each element from the DOM
//     }
//     // Name and Job Title
//     document.getElementById("cv-name").innerHTML = document.getElementById("name").value;
//     document.getElementById("cv-job").innerHTML = document.getElementById("job").value;

//     // Profile Description
//     document.getElementById("cv_profile_desc").innerHTML = document.getElementById("profile-description").value;

//     // School Name
//     const schoolName = document.getElementById("school-name").value;

//     const dateFrom = document.getElementById("date-from").value;
//     const dateTo = document.getElementById("date-to").value;
//     document.getElementById("cv-school").innerHTML = `${schoolName} (${dateFrom} - ${dateTo})`;

//     // Company Name and Job Description
//     const companyName = document.getElementById("company-name").value;
//     const jobDescription = document.getElementById("job-description").value;
//     document.getElementById("cv-company").innerHTML = `${companyName} (${dateFrom} - ${dateTo})<br>${jobDescription}`;

//     // Contact Information
//     document.getElementById("cv-phone").innerHTML = `<strong>PHONE:</strong> ${document.getElementById("phone").value}`;
//     document.getElementById("cv-email").innerHTML = `<strong>EMAIL:</strong> ${document.getElementById("email").value}`;

//     // Hobbies
//     const hobbies = document.getElementById("hobbies").value.split(",");
//     const hobbiesList = hobbies.map(hobby => `<li>${hobby.trim()}</li>`).join("");
//     document.getElementById("cv-hobbies").innerHTML = hobbiesList;
//     // Image 
//     const fileInput = document.getElementById("profile-image"); // Select the file input
//     const file = fileInput.files[0]; // Get the uploaded file
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function (e) {
//             // Update the <img> tag with ID 'newimg' to show the uploaded image
//             const imgTag = document.getElementById("newimg");
//             imgTag.src = e.target.result;
//         };
//         reader.readAsDataURL(file); // Read the file as a Data URL
//     }
//     // Skills
//     const skillEntries = document.querySelectorAll(".skill-entry");
//     const cvSkills = document.getElementById("cv-skills");
//     cvSkills.innerHTML = ""; // Clear existing skills
//     skillEntries.forEach(entry => {
//         const skillName = entry.querySelector(".skill-name").value;
//         const skillProgress = entry.querySelector(".skill-progress").value;
//         if (skillName) {
//             cvSkills.innerHTML += `
//                 <div class="skill">
//                     <span>${skillName}</span>
//                     <div class="bar">
//                         <div class="fill" style="width: ${skillProgress}%;"></div>
//                     </div>
//                 </div>
//             `;
//         }
//     });
// }

// function clk() {
//     // Name and Job Title
//     document.getElementById("cv-name").innerHTML = document.getElementById("name").value;
//     document.getElementById("cv-job").innerHTML = document.getElementById("job").value;

//     // Profile Description
//     document.getElementById("cv_profile_desc").innerHTML = document.getElementById("profile-description").value;

//     // School Name and Dates
//     const schoolName = document.getElementById("school-name").value;
//     const dateFrom = document.getElementById("date-from").value;
//     const dateTo = document.getElementById("date-to").value;

//     // Split school names on comma and display each on a new line
//     const schoolLines = schoolName
//         .split(",") // Split input by comma
//         .map(line => line.trim()) // Remove extra spaces
//         .map(line => `<p>${line}</p>`) // Wrap each line in a paragraph
//         .join(""); // Combine all lines

//     document.getElementById("cv-school").innerHTML = `
//         ${schoolLines}
//         (${dateFrom} - ${dateTo})
//     `;

//     // Company Name and Job Description
//     const companyName = document.getElementById("company-name").value;
//     const jobDescription = document.getElementById("job-description").value;
//     document.getElementById("cv-company").innerHTML = `${companyName} (${dateFrom} - ${dateTo})<br>${jobDescription}`;

//     // Contact Information
//     document.getElementById("cv-phone").innerHTML = `<strong>PHONE:</strong> ${document.getElementById("phone").value}`;
//     document.getElementById("cv-email").innerHTML = `<strong>EMAIL:</strong> ${document.getElementById("email").value}`;

//     // Hobbies
//     const hobbies = document.getElementById("hobbies").value.split(",");
//     const hobbiesList = hobbies.map(hobby => `<li>${hobby.trim()}</li>`).join("");
//     document.getElementById("cv-hobbies").innerHTML = hobbiesList;

//     // Image Upload
//     const fileInput = document.getElementById("profile-image");
//     const file = fileInput.files[0];
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function (e) {
//             const imgTag = document.getElementById("newimg");
//             imgTag.src = e.target.result;
//         };
//         reader.readAsDataURL(file);
//     }

//     // Skills
//     const skillEntries = document.querySelectorAll(".skill-entry");
//     const cvSkills = document.getElementById("cv-skills");
//     cvSkills.innerHTML = ""; // Clear existing skills
//     skillEntries.forEach(entry => {
//         const skillName = entry.querySelector(".skill-name").value;
//         const skillProgress = entry.querySelector(".skill-progress").value;
//         if (skillName) {
//             cvSkills.innerHTML += `
//                 <div class="skill">
//                     <span>${skillName}</span>
//                     <div class="bar">
//                         <div class="fill" style="width: ${skillProgress}%;"></div>
//                     </div>
//                 </div>
//             `;
//         }
//     });
// }
// Add Education Entry
document.getElementById("add-education").addEventListener("click", function () {
    const container = document.getElementById("education-container");
    const newBlock = document.querySelector(".education-block").cloneNode(true);

    // Clear values
    newBlock.querySelectorAll('input').forEach(input => input.value = '');

    // Add remove functionality
    newBlock.querySelector(".remove-edu").addEventListener("click", function () {
        this.closest(".education-block").remove();
    });

    container.insertBefore(newBlock, this);
});

// Add Experience Entry
document.getElementById("add-experience").addEventListener("click", function () {
    const container = document.getElementById("experience-container");
    const newBlock = document.querySelector(".experience-block").cloneNode(true);

    // Clear values
    newBlock.querySelectorAll('input, textarea').forEach(input => input.value = '');

    // Add remove functionality
    newBlock.querySelector(".remove-exp").addEventListener("click", function () {
        this.closest(".experience-block").remove();
    });

    container.insertBefore(newBlock, this);
});

function clk() {
    // Name and Job Title
    document.getElementById("cv-name").innerHTML = document.getElementById("name").value;
    document.getElementById("cv-job").innerHTML = document.getElementById("job").value;

    // Profile Description (Splits on comma)
    const profileDescription = document.getElementById("profile-description").value
        .split(",") // Split on comma
        .map(desc => `<p>${desc.trim()}</p>`) // Wrap each part in <p>
        .join(""); // Combine into a single string
    document.getElementById("cv_profile_desc").innerHTML = profileDescription;

    // School Name and Dates
    const schoolName = document.getElementById("school-name").value;
    const dateFrom = document.getElementById("date-from").value;
    const dateTo = document.getElementById("date-to").value;


    // Update Education Section
    const educationBlocks = document.querySelectorAll(".education-block");
    let educationHTML = '';

    educationBlocks.forEach(block => {
        const schoolName = block.querySelector(".school-name").value;
        const dateFrom = block.querySelector(".edu-date-from").value;
        const dateTo = block.querySelector(".edu-date-to").value;

        if (schoolName) {
            educationHTML += `
                <div class="education-item">
                    <strong>${schoolName}</strong><br>
                    ${dateFrom} - ${dateTo}
                </div><br>
            `;
        }
    });
    document.getElementById("cv-school").innerHTML = educationHTML;

    // Update Experience Section
    const experienceBlocks = document.querySelectorAll(".experience-block");
    let experienceHTML = '';

    experienceBlocks.forEach(block => {
        const companyName = block.querySelector(".company-name").value;
        const jobDesc = block.querySelector(".job-description").value;
        const dateFrom = block.querySelector(".exp-date-from").value;
        const dateTo = block.querySelector(".exp-date-to").value;

        if (companyName) {
            experienceHTML += `
                <div class="experience-item">
                    <strong>${companyName}</strong><br>
                    ${dateFrom} - ${dateTo}<br>
                    ${jobDesc}
                </div><br>
            `;
        }
    });
    document.getElementById("cv-company").innerHTML = experienceHTML;

    // Phone Number (Split on comma for multiple numbers)
    const phoneNumbers = document.getElementById("phone").value
        .split(",") // Split phone numbers on comma
        .map(phone => `<p>${phone.trim()}</p>`) // Wrap each in <p>
        .join(""); // Combine into a single string
    document.getElementById("cv-phone").innerHTML = `
        <strong>PHONE:</strong> ${phoneNumbers}
    `;

    // Email (No splitting needed)
    document.getElementById("cv-email").innerHTML = `<strong>EMAIL:</strong> ${document.getElementById("email").value}`;

    // Hobbies (Comma-separated into a list)
    const hobbies = document.getElementById("hobbies").value
        .split(",") // Split hobbies on comma
        .map(hobby => `<li>${hobby.trim()}</li>`) // Wrap each in <li>
        .join(""); // Combine into a single string
    document.getElementById("cv-hobbies").innerHTML = hobbies;

    // Image Upload
    const fileInput = document.getElementById("profile-image");
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imgTag = document.getElementById("newimg");
            imgTag.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    // Skills
    const skillEntries = document.querySelectorAll(".skill-entry");
    const cvSkills = document.getElementById("cv-skills");
    cvSkills.innerHTML = ""; // Clear existing skills
    skillEntries.forEach(entry => {
        const skillName = entry.querySelector(".skill-name").value;
        const skillProgress = entry.querySelector(".skill-progress").value;
        if (skillName) {
            cvSkills.innerHTML += `
                <div class="skill">
                    <span>${skillName}</span>
                    <div class="bar">
                        <div class="fill" style="width: ${skillProgress}%;"></div>
                    </div>
                </div>
            `;
        }
    });
}

document.getElementById("download-btn").addEventListener("click", function () {
    const resumeContainer = document.querySelector(".resume-container"); // Select the resume section
    const options = {
        margin: 0,
        filename: "Resume.pdf",
        html2canvas: { scale: 2 }, // Improves quality
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }, // A4 size
    };
    // Generate the PDF
    html2pdf().set(options).from(resumeContainer).save();
});
