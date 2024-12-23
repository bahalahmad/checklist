const totalphcCount = document.getElementById("total_phc");
const totalchcCount = document.getElementById("total_chc");
const totalSubCentreCount = document.getElementById("total_sub_centre");
const totalHealthFacilitiesCount = document.getElementById("health_facilities");

function updateTotal() {
    const total = (parseInt(totalphcCount.value) || 0) + (parseInt(totalchcCount.value) || 0) + (parseInt(totalSubCentreCount.value) || 0);
    totalHealthFacilitiesCount.value = total;
}

totalphcCount .addEventListener("input", updateTotal);
totalchcCount.addEventListener("input", updateTotal);
totalSubCentreCount.addEventListener("input", updateTotal);
document.getElementById("saveNextButtonSection1").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission
    
    let isValid = true; // Track the validity of the form

    // General Information Validation
    const district = document.getElementById("district");
    const block = document.getElementById("block");
    if (!district.value) {
        isValid = false;
        district.classList.add("border-red-500");
    } else {
        district.classList.remove("border-red-500");
    }

    if (!block.value) {
        isValid = false;
        block.classList.add("border-red-500");
    } else {
        block.classList.remove("border-red-500");
    }

    // Validate Name and Contact fields in all sections
    const validateNameAndContact = (nameId, contactId, nameErrorId, contactErrorId) => {
        const name = document.getElementById(nameId);
        const contact = document.getElementById(contactId);
        let validName = true, validContact = true;

        // Name Validation
        if (!name.value || name.value.length > 50) {
            validName = false;
            name.classList.add("border-red-500");
            document.getElementById(nameErrorId).textContent = "Name is required and should not exceed 50 characters.";
            document.getElementById(nameErrorId).classList.add("text-red-500");
        } else {
            name.classList.remove("border-red-500");
            document.getElementById(nameErrorId).textContent = "";
        }

        // Contact Validation
        if (!contact.value || !/^[6-9]\d{9}$/.test(contact.value)) {
            validContact = false;
            contact.classList.add("border-red-500");
            document.getElementById(contactErrorId).textContent = "Contact number should start with 6-9 and have 10 digits.";
            document.getElementById(contactErrorId).classList.add("text-red-500");
        } else {
            contact.classList.remove("border-red-500");
            document.getElementById(contactErrorId).textContent = "";
        }

        return validName && validContact;
    };

    // Block Development Officer Section Validation
    // const bdoValid = validateNameAndContact("bdo_name", "bdo_contact", "bdo_name_error", "bdo_contact_error");

    // // Sub District Magistrate Section Validation
    // const sdmValid = validateNameAndContact("sdm_name", "sdm_contact", "sdm_name_error", "sdm_contact_error");
    const bdoName = document.getElementById("bdo_name");
    const bdoContact = document.getElementById("bdo_contact");
    let bdoValid = true;
    if (bdoName.value || bdoContact.value) {
        bdoValid = validateNameAndContact("bdo_name", "bdo_contact", "bdo_name_error", "bdo_contact_error");
    }

    // Sub District Magistrate Section Validation
    const sdmName = document.getElementById("sdm_name");
    const sdmContact = document.getElementById("sdm_contact");
    let sdmValid = true;
    if (sdmName.value || sdmContact.value) {
        sdmValid = validateNameAndContact("sdm_name", "sdm_contact", "sdm_name_error", "sdm_contact_error");
    }

    // Block Medical Officer Section Validation
    const bmoValid = validateNameAndContact("bmo_name", "bmo_contact", "bmo_name_error", "bmo_contact_error");

    // Demographic Details Section Validation
    const areaType = document.querySelector('input[name="area_type"]:checked');
    const numVillages = document.getElementById("num_villages");
    const healthFacilities = document.getElementById("health_facilities");
    const totalPhc = document.getElementById("total_phc");
    const totalChc = document.getElementById("total_chc");
    const totalSubCentre = document.getElementById("total_sub_centre");
    const aanganwadiCentre = document.getElementById("aanganwadi_centre");
    const populationCovered = document.getElementById("population_covered");
    const eligibleCouple = document.getElementById("eligible_couple");
    const pregnantWomen = document.getElementById("pregnant_women");
    const liveBirth = document.getElementById("live_birth");
    const children01 = document.getElementById("children_0_1");
    const populationAbove30 = document.getElementById("population_above_30");
    const pmjayCard = document.getElementById("pmjay_card");
    const abhaId = document.getElementById("abha_id");

    if (!areaType) {
        isValid = false;
        document.querySelector('input[name="area_type"]').parentElement.classList.add("text-red-500");
    } else {
        document.querySelector('input[name="area_type"]').parentElement.classList.remove("text-red-500");
    }

    // Number validations for demographic details
    const validateNumericField = (field, min, max, errorId) => {
        if (!field.value || isNaN(field.value) || field.value < min || field.value > max) {
            isValid = false;
            field.classList.add("border-red-500");
            document.getElementById(errorId).textContent = `*Value should be between ${min} and ${max}.`;
            document.getElementById(errorId).classList.add("text-red-500");
        } else {
            field.classList.remove("border-red-500");
            document.getElementById(errorId).textContent = "";
        }
    };

    validateNumericField(numVillages, 10, 500, "num_villages_error");
    validateNumericField(totalPhc, 0, 50, "total_phc_error");
    validateNumericField(totalChc, 0, 20, "total_chc_error");
    validateNumericField(totalSubCentre, 0, 100, "total_sub_centre_error");
    validateNumericField(aanganwadiCentre, 50000, 100000, "aanganwadi_centre_error");
    validateNumericField(populationCovered, 50000, 100000, "population_covered_error");
    validateNumericField(eligibleCouple, 0, 100000, "eligible_couple_error");
    validateNumericField(pregnantWomen, 0, 99999, "pregnant_women_error");
    validateNumericField(liveBirth, 0, 99999, "live_birth_error");
    validateNumericField(children01, 0, 99999, "children_0_1_error");
    validateNumericField(populationAbove30, 1, 10000, "population_above_30_error");
    validateNumericField(pmjayCard, 0, 99999, "pmjay_card_error");
    validateNumericField(abhaId, 0, 99999, "abha_id_error");    
    if (bdoValid && sdmValid && bmoValid && isValid) {
        // Move to the next section if valid
        document.getElementById("section1").style.display = "none";
        document.getElementById("section2").style.display = "block"; // Replace section2 with your actual section
    } else {
        alert("Please fill out all required fields correctly.");
    }
});

// Start of section 2 validation

document.getElementById("facilities_for_nqas_yes").addEventListener("change", function() {
    document.getElementById("nqasDetails").classList.remove("hidden");
});

document.getElementById("facilities_for_nqas_no").addEventListener("change", function() {
    document.getElementById("nqasDetails").classList.add("hidden");
});

const phcCount = document.getElementById("num_phc_for_nqas");
const chcCount = document.getElementById("num_chc_for_nqas");
const scCount = document.getElementById("num_sc_for_nqas");
const totalFacilities = document.getElementById("num_facilities_for_nqas");

function updateNQASTotal() {
    const total = (parseInt(phcCount.value) || 0) + (parseInt(chcCount.value) || 0) + (parseInt(scCount.value) || 0);
    totalFacilities.value = total;
}

phcCount.addEventListener("input", updateNQASTotal);
chcCount.addEventListener("input", updateNQASTotal);
scCount.addEventListener("input", updateNQASTotal);

document.getElementById("saveNextButtonSection2").addEventListener("click", function (event) {
    event.preventDefault();
    let isValid = true;

    // Section 2 - Radio Button Validation
    function validateRadioButtons() {
        const radioGroups = [
            'orientation_completed', 
            'action_plan_prepared', 
            'mchn_plan_available', 
            'map_displayed', 
            'key_focus_areas', 
            'disseminated_with_health_functionaries', 
            'monthly_dhs_meeting', 
            'review_mechanism', 
            'facilities_for_nqas',
            'referral_mechanism'
        ];

        radioGroups.forEach(groupName => {
            const selectedOption = document.querySelector(`input[name="${groupName}"]:checked`);
            if (!selectedOption) {
                isValid = false;
            }
        });
        return isValid;
    }

    // Section 2 - Facilities for NQAS Certification Validation
    const hasBlockIdentifiedNQAS = document.getElementById("facilities_for_nqas_yes").checked; 

    function validateField(field, min, max,errorId) {
        if (field.value < min || field.value > max || isNaN(field.value)) {
            isValid = false;
            field.classList.add("border-red-500");
            document.getElementById(errorId).textContent = `Value should be between ${min} and ${max}.`;
            document.getElementById(errorId).classList.add("text-red-500");
        } else {
            field.classList.remove("border-red-500");
            document.getElementById(errorId).textContent = "";
        }
    }

    if (hasBlockIdentifiedNQAS) {
        validateField(phcCount, 0, 50,"phc_count_error");
        validateField(chcCount, 0, 25,"chc_count_error");
        validateField(scCount, 0, 100,"sc_count_error");
    }

    if (validateRadioButtons() && isValid) {
        document.getElementById("section2").style.display = "none";
        document.getElementById("section3").style.display = "block";
    } else {
        alert("Please fill out all required fields correctly.");
    }
});


// //section 3 validations 

// Function to toggle visibility based on radio button selection
function toggleVisibility(triggerId, targetId, action) {
    document.getElementById(triggerId).addEventListener("change", function () {
        const targetElement = document.getElementById(targetId);
        if (action === "show") {
            targetElement.classList.remove("hidden");
        } else if (action === "hide") {
            targetElement.classList.add("hidden");
        }
    });
}

// Show/hide based on BPHU setup radio button selection
toggleVisibility("block_public_health_yes", "functional_components", "show");
toggleVisibility("block_public_health_no", "functional_components", "hide");
toggleVisibility("additional_funds_cell_yes", "activities_proposed_div", "show");
toggleVisibility("additional_funds_cell_no", "activities_proposed_div", "hide");
toggleVisibility("block_quality_cell_additional_yes", "activities_proposed_div1", "show");
toggleVisibility("block_quality_cell_additional_no", "activities_proposed_div1", "hide");
toggleVisibility("block_quality_cell_direct_yes", "dbt_question_label", "show");
toggleVisibility("block_quality_cell_direct_no", "dbt_question_label", "hide");
toggleVisibility("block_quality_cell_comittess_yes", "verify_with_question_label", "show");
toggleVisibility("block_quality_cell_comittess_no", "verify_with_question_label", "hide");

// Function to show or hide the 'Specify' input field based on the 'Any other (specify)' checkbox
document.getElementById("other_block_role").addEventListener("change", function () {
    const otherRoleSpecify = document.getElementById("other_role_specify");
    otherRoleSpecify.style.display = this.checked ? "block" : "none";
    if (!this.checked) {
        otherRoleSpecify.value = "";
    }
});
function toggleCheckboxes(triggerId, checkboxes, enable) {
    document.getElementById(triggerId).addEventListener("change", function() {
        checkboxes.forEach(function(checkboxId) {
            document.getElementById(checkboxId).disabled = !enable;
        });
    });
}

const checkboxes = ["block_public_health_unit", "block_public_health_lab", "block_hmis_cell"];
toggleCheckboxes("block_public_health_yes", checkboxes, true);
toggleCheckboxes("block_public_health_no", checkboxes, false);

// Function to handle the Save & Next button click event
document.getElementById("saveNextButtonSection3").addEventListener("click", function (event) {
    event.preventDefault();
    let isValid = true;

    // Utility function for radio button validation
    function validateRadioButtons(groupName) {
        const selectedOption = document.querySelector(`input[name="${groupName}"]:checked`);
        return !!selectedOption;
    }
    // Validate radio button groups
    const radioGroups = [
        'block_public_health',
        'block_quality_cell_established',
        'additional_funds_cell',
        'block_quality_cell_additional',
        'block_quality_cell_direct',
        'block_quality_cell_payment',
        'block_quality_cell_comittees',
    ];

    radioGroups.forEach(groupName => {
        if (!validateRadioButtons(groupName)) {
            isValid = false;
        }
    });

    // Utility function for input validation length
    function validateTextInputLength(inputId, maxLength, errorId) {
        const input = document.getElementById(inputId);
                    if (input.value.length > maxLength) {
                        document.getElementById(errorId).textContent = `Text cannot be more than ${maxLength} characters.`;
                        document.getElementById(errorId).classList.add("text-red-500");
                        return false;
                    }
                    else{
                    document.getElementById(errorId).textContent = "";
                    }
                    return true;
    }

    // Utility function for number input validation range
    function validateNumberInputRange(field, min, max, errorId) {
        if (field.value < min || field.value > max || isNaN(field.value)) {
            document.getElementById(errorId).textContent = `Value should be between ${min} and ${max}.`;
            document.getElementById(errorId).classList.add("text-red-500");
            return false;
        } else {
            document.getElementById(errorId).textContent = "";
        }
        return true;
    }
    // Validation for "Any other (specify)" text input
    if (document.getElementById("other_block_role").checked) {
        if (!validateTextInputLength("other_role_specify", 30, "other_role_count")) {
            isValid = false;
        }
    }
                        if (document.getElementById("block_public_health_yes").checked) {
               const functionalComponentsCheckboxes = document.querySelectorAll("#functional_components input[type='checkbox']");
                let isAnyFunctionalSelected = Array.from(functionalComponentsCheckboxes).some(checkbox => checkbox.checked);
                if (!isAnyFunctionalSelected) {
                    isValid = false;
                }
            }

    // Validation for "Any additional funds proposed by district in NHM PIP"
    if (document.getElementById("additional_funds_cell_yes").checked) {
        if (!validateTextInputLength("activities_proposed", 150, "activities_proposed_count")) {
            isValid = false;
        }
    }

    // Validation for "Any additional funds available for activities under CSR/JICS/other resources"
    if (document.getElementById("block_quality_cell_additional_yes").checked) {
        if (!validateTextInputLength("activities_proposed1", 150, "activities_proposed_count1")) {
            isValid = false;
        }
    }
    // Validation for "Is the Direct Beneficiary Transfer (DBT) done timely?"
    if (document.getElementById("block_quality_cell_direct_yes").checked) {
        if (!validateNumberInputRange("num_villages", 0, 15000, "num_count_error")) {
            isValid = false;
        }
        if (!validateNumberInputRange("health_facilities", 0, 15000, "health_count_error")) {
            isValid = false;
        }
        if (!validateNumberInputRange("total_phc", 0, 15000, "total_count_error")) {
            isValid = false;
        }
    }

    // Validation for "Verification done with last minutes of meeting"
    if (document.getElementById("block_quality_cell_comittess_yes").checked) {
        const verificationWithLastMin = document.querySelector(`input[name="verify_with_last_min"]:checked`);
        if (!verificationWithLastMin) {
            document.getElementById("verify_with_question_error").textContent = "Please select an option.";           
        }
        isValid = true;
    }

    isValid = true;
    // If all validations pass, go to the next section
    if (isValid) {
        document.getElementById("section3").style.display = "none";
        document.getElementById("section4").style.display = "block";
    } else {
        alert("Please fill out all required fields correctly.");
    }
});



//section 4 validation 
document.getElementById("saveNextButtonSection4").addEventListener("click", function (event) {
   

});


//             // Validation for "Any additional funds proposed by district in NHM PIP" (yes --> activities proposed text box)
//             const additionalFundsYes = document.getElementById("additional_funds_cell_yes");
//             if (additionalFundsYes.checked) {
//                 isValid = validateTextInputLength("activities_proposed", 150,"activities_proposed_count");
//             }

//             // Validation for "Any additional funds available for activities under CSR/JICS/other resources" (yes --> activities proposed text box)
//             const additionalFundsAvailableYes = document.getElementById("block_quality_cell_additional_yes");

//             if (additionalFundsAvailableYes.checked) {
//                 isValid = validateTextInputLength("activities_proposed1", 150,"activities_proposed_count1");
//             }

//             // Validation for "Is the Direct Beneficiary Transfer (DBT) done timely?" (yes --> number inputs for beneficiaries)
//             const dbtYes = document.getElementById("block_quality_cell_direct_yes");
//             const dbtQuestionDiv = document.getElementById("dbt_question_label");
//             const numVillages = document.getElementById("num_villages");
//             const healthFacilities = document.getElementById("health_facilities");
//             const totalPhc = document.getElementById("total_phc");

//             if (dbtYes.checked) {
//                 isValid = validateNumberInputRange(num_villages, 0, 15000,"num_count_error");
//                 isValid = validateNumberInputRange(health_facilities, 0,15000, "health_count_error");
//                 isValid = validateNumberInputRange(total_phc, 0, 15000,"total_count_error");
//             }

//             // Validation for "Verification done with last minutes of meeting"
//             const verifyWithLastMinYes = document.getElementById("verify_with_last_min_yes");
//             const verifyWithLastMinNo = document.getElementById("verify_with_last_min_no");
//             if (!verifyWithLastMinYes.checked && !verifyWithLastMinNo.checked) {
//                 isValid = false;
//             }

//             // If all validations pass, go to the next section
//             if (validateRadioButtons() && isValid) {
//                 document.getElementById("section3").style.display = "none";
//                 document.getElementById("section4").style.display = "block";
//             } else {
//                 alert("Please fill out all required fields correctly.");
//             }
// });


function saveAndNext(sectionIndex) {
    const sections = document.querySelectorAll(".section");
    sections.forEach((section, index) => {
        if (index === sectionIndex - 1) {
            section.classList.remove("hidden");
        } else {
            section.classList.add("hidden");
        }
    });
}

//     // Validate Section 1 and Section 2
//     if (validateRadioButtons() && isValid) {
//         document.getElementById("section2").style.display = "none";
//         document.getElementById("section3").style.display = "block"; // Replace section3 with your actual next section
//     } else {
//         alert("Please fill out all required fields correctly.");
//     }
// });


