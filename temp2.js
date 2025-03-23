emailjs.init('BGA0G0XkkgqQyHGYI');
function deleteElement() {
    const elements = document.querySelectorAll('.del'); 
    if (elements.length > 0) {
        elements.forEach(element => element.remove()); 
    } else {
    }
}

function changeImage() {
    const fileInput = document.getElementById('imageUpload');
    const imageElement = document.getElementById('change_img');

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function (event) {
            imageElement.src = event.target.result;
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
}

function addExperienceRow() {
    const row = document.createElement('div');
    row.className = 'experience-row';
    row.innerHTML = `
<input type="text" class="job-title" placeholder="Job Title">
<textarea class="job-description" placeholder="Job Description"></textarea>
`;
    document.getElementById('experience').appendChild(row);
}

function addPersonalInfoRow() {
    const container = document.getElementById('personal-info');
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'personal-info';
    input.placeholder = 'Enter personal information';
    container.appendChild(input);
}

function addQualificationRow() {
    const row = document.createElement('div');
    row.className = 'qualification-row';
    row.innerHTML = `
        <input type="text" class="degree" placeholder="Degree">
        <input type="text" class="board" placeholder="Board">
        <input type="text" class="year" placeholder="Year">
        <input type="text" class="group" placeholder="Group">
        <input type="text" class="marks" placeholder="Marks/CGPA">
        <input type="text" class="status" placeholder="Status">
    `;
    document.getElementById('qualifications').appendChild(row);
}

function updateCV(event) {
    event.preventDefault();
    changeImage();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const objectives = document.getElementById('objectives').value;
    document.querySelector('.temp2_header h1').textContent = name;
    document.querySelector('.temp2_header p:nth-child(2)').textContent = `Email: ${email} | Cell no: ${phone}`;
    document.querySelector('.temp2_header p:nth-child(3)').textContent = `Permanent Address: ${address}`;
    document.querySelector('.temp2_section p:nth-child(2) ').innerHTML = objectives;

    const personalInfoList = document.querySelector('.temp2_list');
    personalInfoList.innerHTML = '';

    document.querySelectorAll('.personal-info').forEach(input => {
        if (input.value) {
            const li = document.createElement('li');
            li.textContent = `${input.placeholder}: ${input.value}`;
            personalInfoList.appendChild(li);
        }
    });

    // Update Qualifications
    const qualificationsTable = document.querySelector('.tablebody');
    qualificationsTable.innerHTML = '';
    document.querySelectorAll('.qualification-row').forEach(row => {
        const degree = row.querySelector('.degree').value;
        const board = row.querySelector('.board').value;
        // const institution = row.querySelector('.institution').value;
        const year = row.querySelector('.year').value;
        const group = row.querySelector('.group').value;
        const marks = row.querySelector('.marks').value;
        const status = row.querySelector('.status').value;
        // <td>${institution}</td>
        if (degree && board && year && group && marks && status) {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${degree}</td><td>${board}</td><td>${year}</td><td>${group}</td><td>${marks}</td><td>${status}</td>`;
            qualificationsTable.appendChild(tr);
        }

    });

    const experienceList = document.querySelector('.explsit');
    experienceList.innerHTML = '';
    document.querySelectorAll('.experience-row').forEach(row => {
        const jobTitle = row.querySelector('.job-title').value;
        const jobDescription = row.querySelector('.job-description').value;

        if (jobTitle && jobDescription) {
            const li = document.createElement('dt');

            li.innerHTML = `<b>${jobTitle}:</b> ${jobDescription}`;
            experienceList.appendChild(li);
        }
    });
}

function updatemail(event) {
    event.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        objectives: document.getElementById('objectives').value,
        father_name: document.getElementById('father-name').value,
        dob: document.getElementById('dob').value,
        cnic: document.getElementById('cnic').value,
        gender: document.getElementById('gender').value,
        religion: document.getElementById('religion').value,
        marital_status: document.getElementById('marital-status').value,
        nationality: document.getElementById('nationality').value,
        domicile: document.getElementById('domicile').value,
        degree: document.getElementById("degree").value,
        marks: document.getElementById("marks").value,
        board: document.getElementById("board").value,
        year: document.getElementById("year").value,
        group: document.getElementById("group").value,
        status: document.getElementById("status").value,
    };

    console.log(formData);

    emailjs.send('service_xd7srzq', 'template_iex3dpn', formData)
        .then(response => {
            console.log('CV Done');
        })
        .catch(error => {
            console.error('Error Here');
        });
}

