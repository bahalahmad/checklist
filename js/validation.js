//   Section 1 Validation

// Form validation functions
function validateTextField(id) {
    const input = document.getElementById(id);
    const errorElement = document.getElementById(id + "_error");
    if (input.value.length > 50) {
        errorElement.textContent = "Input should not exceed 50 characters.";
    } else {
        errorElement.textContent = "";
    }
}

function validatePhoneNumber(id) {
    const input = document.getElementById(id);
    const errorElement = document.getElementById(id + "_error");
    const regex = /^[6-9][0-9]{9}$/;
    if (!regex.test(input.value)) {
        errorElement.textContent = "Phone number should start from 6-9 and be 10 digits.";
    } else {
        errorElement.textContent = "";
    }
}

function validateEmail(id) {
    const input = document.getElementById(id);
    const errorElement = document.getElementById(id + "_error");
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!regex.test(input.value)) {
        errorElement.textContent = "Please enter a valid email.";
    } else {
        errorElement.textContent = "";
    }
}

function validateDistrictBlock() {
    const district = document.getElementById("district");
    const block = document.getElementById("block");
    const districtError = document.getElementById("district_error");
    const blockError = document.getElementById("block_error");

    if (district.value === "") {
        districtError.textContent = "District is required.";
    } else {
        districtError.textContent = "";
    }

    if (block.value === "") {
        blockError.textContent = "Block is required.";
    } else {
        blockError.textContent = "";
    }
}

function validateNumberRange(id, min, max) {
    const input = document.getElementById(id);
    const errorElement = document.getElementById(id + "_error");
    const value = parseInt(input.value);
    if (value < min || value > max || isNaN(value)) {
        errorElement.textContent = `Value should be between ${min} and ${max}.`;
    } else {
        errorElement.textContent = "";
    }
    updateTotalHealthFacilities();
}

function updateTotalHealthFacilities() {
    const totalPhc = parseInt(document.getElementById('total_phc').value) || 0;
    const totalChc = parseInt(document.getElementById('total_chc').value) || 0;
    const totalSubCentre = parseInt(document.getElementById('total_sub_centre').value) || 0;
    document.getElementById('total_health_facilities').value = totalPhc + totalChc + totalSubCentre;
}
// Auto-calculate the total health facilities

// const totalHealthFacilities = document.getElementById("total_health_facilities");
// function calculateTotalHealthFacilities() {
//     const total = (parseInt(phcInput.value) || 0) + (parseInt(chcInput.value) || 0) + (parseInt(subCentreInput.value) || 0);
//     totalHealthFacilities.value = total;
// }




const phcInput = document.getElementById("total_phc");
const chcInput = document.getElementById("total_chc");
const subCentreInput = document.getElementById("total_sub_centre");
phcInput.addEventListener('input', updateTotalHealthFacilities);
chcInput.addEventListener('input', updateTotalHealthFacilities);
subCentreInput.addEventListener('input', updateTotalHealthFacilities);

function validateAndSave() {
    const requiredFields = document.querySelectorAll('[required]');
    // let allValid = [];
    let allValid = true;
    const areaType = document.querySelector('input[name="area_type"]:checked');
    if (!areaType) {
        allValid = false;
        document.querySelector('input[name="area_type"]').parentElement.classList.add("text-red-500");
    } else {
        document.querySelector('input[name="area_type"]').parentElement.classList.remove("text-red-500");
    }
    requiredFields.forEach(field => {
        field.dispatchEvent(new Event('input'));
        const errorElement = document.getElementById(field.id + "_error");
        if (errorElement && errorElement.textContent !== "") {
            console.log(field.id)
            allValid = false;
        }
        // if (errorElement && errorElement.textContent !== "") {
        //     console.log(field.id)
        //     allValid.push(field.id + "_error");
        // }else{
        //     allValid.pop(field.id + "_error")
        // }
    });
    if (allValid) {
        // Proceed to the next section
        document.getElementById('section1').style.display = 'none';
        // Assuming the next section's id is 'section2'
        document.getElementById('section2').style.display = 'block';
    } else {
        alert("Please fill out all required fields correctly.");
    }
}








