


// document.getElementById("saveNextButtonSection3").addEventListener("click", function (event) {
//     event.preventDefault(); // Prevent form submission
    
//     let isValid = true; // Track the validity of Section 3 form

//     // Section 3 - Block Programme Management Unit Validation
//     const blockProgrammeManagementUnit = document.querySelectorAll("#block_programme_management_unit input[type='checkbox']");
//     const otherRoleSpecify = document.getElementById("other_role_specify");
    
//     // Check if at least one option is selected
//     const isAnyBlockRoleSelected = Array.from(blockProgrammeManagementUnit).some(input => input.checked);
//     if (!isAnyBlockRoleSelected) {
//         isValid = false;
//         document.getElementById("block_programme_management_unit").classList.add("border-red-500");
//     } else {
//         document.getElementById("block_programme_management_unit").classList.remove("border-red-500");
//     }

//     // Check if 'Any other' is selected, then validate the input
//     if (document.getElementById("other_block_role").checked && !otherRoleSpecify.value) {
//         isValid = false;
//         otherRoleSpecify.classList.add("border-red-500");
//     } else {
//         otherRoleSpecify.classList.remove("border-red-500");
//     }

//     // Section 3 - Which Components are Functional Validation
//     const functionalComponents = document.querySelectorAll("#functional_components input[type='checkbox']");
//     const isAnyComponentSelected = Array.from(functionalComponents).some(input => input.checked);
//     if (!isAnyComponentSelected) {
//         isValid = false;
//         document.getElementById("functional_components").classList.add("border-red-500");
//     } else {
//         document.getElementById("functional_components").classList.remove("border-red-500");
//     }

//     // Section 3 - Is Block Quality Cell Established Validation
//     const blockQualityCellYes = document.getElementById("block_quality_cell_yes");
//     const blockQualityCellNo = document.getElementById("block_quality_cell_no");

//     // Check if Yes/No is selected
//     if (!blockQualityCellYes.checked && !blockQualityCellNo.checked) {
//         isValid = false;
//         document.querySelector('input[name="block_quality_cell"]').parentElement.classList.add("border-red-500");
//     } else {
//         document.querySelector('input[name="block_quality_cell"]').parentElement.classList.remove("border-red-500");
//     }

//     // Section 3 - Activities Proposed Validation (if Block Quality Cell is 'Yes')
//     if (blockQualityCellYes.checked) {
//         const activitiesProposed = document.getElementById("activities_proposed");
//         if (!activitiesProposed.value) {
//             isValid = false;
//             activitiesProposed.classList.add("border-red-500");
//         } else {
//             activitiesProposed.classList.remove("border-red-500");
//         }
//     }
    

//     // If Section 3 is valid, move to the next section
//     if (isValid) {
//         // Optionally, you can show the next section here (if applicable)
//         alert("Section 3 validated successfully!");
//         // Move to next section if needed (for example, display Section 4)
//         document.getElementById("section3").style.display = "none";
//         document.getElementById("section4").style.display = "block"; // Replace section4 with your actual section
//     } else {
//         alert("Please fill out all required fields correctly in Section 3.");
//     }
// });

// // Toggle the "Specify" text input visibility if 'Any other' is selected
// document.getElementById("other_block_role").addEventListener("change", function() {
//     const otherRoleSpecify = document.getElementById("other_role_specify");
//     if (this.checked) {
//         otherRoleSpecify.style.display = "block";
//     } else {
//         otherRoleSpecify.style.display = "none";
//     }
// });

// // Toggle the visibility of the "Activities Proposed" textarea based on Block Quality Cell selection
// document.getElementById("block_quality_cell_yes").addEventListener("change", function() {
//     const activitiesProposedDiv = document.getElementById("activities_proposed_div");
//     if (this.checked) {
//         activitiesProposedDiv.style.display = "block";
//     } else {
//         activitiesProposedDiv.style.display = "none";
//     }
// });
// document.getElementById("block_quality_cell_no").addEventListener("change", function() {
//     const activitiesProposedDiv = document.getElementById("activities_proposed_div");
//     activitiesProposedDiv.style.display = "none"; // Hide if "No" is selected
// });

// Function for 'Save & Next'
 // Track the current section index
// Function to trigger on 'Save & Next' button click
// let currentSectionIndex = 1; // Track the current section index






document.getElementById("saveNextButtonSection2").addEventListener("click", function (event) {
    event.preventDefault(); 
    
    let isValid = true;

    // Section 2 - Facilities for NQAS Certification Validation
    const nqasCertification = document.getElementById("nqas_certification"); 
    const phcCount = document.getElementById("phc_count"); 
    const chcCount = document.getElementById("chc_count");
    const sscCount = document.getElementById("ssc_count");
    const totalFacilities = document.getElementById("total_facilities"); 

    if (nqasCertification.checked) {
        
        if (phcCount.value < 0 || phcCount.value > 50 || isNaN(phcCount.value)) {
            isValid = false;
            phcCount.classList.add("border-red-500");
        } else {
            phcCount.classList.remove("border-red-500");
        }

        // Validate CHC count (0-25)
        if (chcCount.value < 0 || chcCount.value > 25 || isNaN(chcCount.value)) {
            isValid = false;
            chcCount.classList.add("border-red-500");
        } else {
            chcCount.classList.remove("border-red-500");
        }

        // Validate SSC count (0-100)
        if (sscCount.value < 0 || sscCount.value > 100 || isNaN(sscCount.value)) {
            isValid = false;
            sscCount.classList.add("border-red-500");
        } else {
            sscCount.classList.remove("border-red-500");
        }

        // Auto-calculate total facilities (sum of PHC, CHC, and SSC)
        const total = parseInt(phcCount.value) + parseInt(chcCount.value) + parseInt(sscCount.value);
        totalFacilities.value = total;

        // Validate that total facilities value is correctly calculated
        if (totalFacilities.value !== total.toString()) {
            isValid = false;
            totalFacilities.classList.add("border-red-500");
        } else {
            totalFacilities.classList.remove("border-red-500");
        }
    }

    // If Section 2 is valid, move to the next section
        if (isValid) {
            // Move to the next section if valid
            document.getElementById("section2").style.display = "none";
            document.getElementById("section3").style.display = "block"; // Replace section2 with your actual section
        } else {
            alert("Please fill out all required fields correctly.");
        }
});

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


<!-- <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AssesmentCheckList Form</title>
    <link href="css/output.css" rel="stylesheet">
</head>

<body class="bg-gray-100">
    <div class="container mx-auto p-4">
        <form id="dataForm">
           
        </form>
    </div>

    <!-- <script src="js/main.js"></script> -->

<!-- Section 4 Health Care Infrastructure -->
<div id="section4" class="section bg-white p-6 rounded shadow-md mb-4" style="display: block;">
    <div class="mb-6 bg-white p-6 rounded-lg shadow-md">
    <!-- Section Heading Aligned to the Left -->
    <h2 class="text-3xl font-bold mb-6 text-black-600">Health Care Infrastructure</h2>
        <!-- Required Questions Note at the Top -->
        <p class="text-sm text-red-500 mb-4">* indicates a required question</p>
    <h3 class="text-2xl font-semibold text-blue-600 mb-4">Medical College</h3>


    <!-- Sanctioned, Functional, and Non-Functional under one div -->
    <div class="mb-6 bg-white p-6 rounded-lg shadow-md">
        <!-- Sanctioned and Functional in one line, responsive layout -->
        <div class="flex flex-wrap justify-between mb-4">
            <!-- Sanctioned -->
            <div class="w-full sm:w-1/2 pr-3 mb-4 sm:mb-0">
                <label class="block text-gray-700 text-lg font-semibold mb-2" for="sanctioned">Sanctioned <span class="text-red-500">*</span></label>
                <input type="number" id="sanctioned" class="form-input mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" name="sanctioned" required oninput="updateNonFunctional()">
            </div>

            <!-- Functional -->
            <div class="w-full sm:w-1/2 pl-3 mb-4 sm:mb-0">
                <label class="block text-gray-700 text-lg font-semibold mb-2" for="functional">Functional <span class="text-red-500">*</span></label>
                <input type="number" id="functional" class="form-input mt-2 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" name="functional" required oninput="updateNonFunctional()">
            </div>
        </div>

        <!-- Non-Functional below Functional (Smaller and takes less width, responsive) -->
        <div class="mt-2">
            <label class="block text-gray-700 text-sm font-semibold mb-2" for="non_functional">Non Functional</label>
            <input type="number" id="non_functional" class="form-input mt-2 block w-full sm:w-1/3 p-2 border border-gray-300 rounded-md bg-gray-100 text-sm focus:outline-none focus:border-blue-500" name="non_functional" readonly>
        </div>
    </div>
    </div>

    <!-- Save & Next Button -->
    <div class="flex justify-between mb-6">
        <!-- Back Button on the left -->
        <button type="button" class="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300" onclick="goBackToSection3()">Back</button>

        <!-- Save & Next Button on the right -->
        <button type="button" id="saveNextButtonSection4" class="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300" onclick="saveAndNext(4)">Save & Next</button>
    </div>
</div>

</body>

</html> -->

document.getElementById("saveNextButtonSection2").addEventListener("click", function (event) {
    event.preventDefault();

    let isValid = true;
    
    // Section 1 - Radio Button Validation
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
            'facilities_for_nqas'
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
    const phcCount = document.getElementById("num_phc_for_nqas"); 
    const chcCount = document.getElementById("num_chc_for_nqas");
    const scCount = document.getElementById("num_sc_for_nqas");
    const totalFacilities = document.getElementById("num_facilities_for_nqas"); 

    if (hasBlockIdentifiedNQAS) {
        
        // Validate PHC count (0-50)
        if (phcCount.value < 0 || phcCount.value > 50 || isNaN(phcCount.value)) {
            isValid = false;
            phcCount.classList.add("border-red-500");
        } else {
            phcCount.classList.remove("border-red-500");
        }

        // Validate CHC count (0-25)
        if (chcCount.value < 0 || chcCount.value > 25 || isNaN(chcCount.value)) {
            isValid = false;
            chcCount.classList.add("border-red-500");
        } else {
            chcCount.classList.remove("border-red-500");
        }

        // Validate SC count (0-100)
        if (scCount.value < 0 || scCount.value > 100 || isNaN(scCount.value)) {
            isValid = false;
            scCount.classList.add("border-red-500");
        } else {
            scCount.classList.remove("border-red-500");
        }

        // Auto-calculate total facilities (sum of PHC, CHC, and SC)
        const total = parseInt(phcCount.value) + parseInt(chcCount.value) + parseInt(scCount.value);
        totalFacilities.value = total;

        // Validate that total facilities value is correctly calculated
        if (totalFacilities.value !== total.toString()) {
            isValid = false;
            totalFacilities.classList.add("border-red-500");
        } else {
            totalFacilities.classList.remove("border-red-500");
        }
    }

    // Validate Section 1 and Section 2
    if (validateRadioButtons() && isValid) {
        document.getElementById("section2").style.display = "none";
        document.getElementById("section3").style.display = "block"; // Replace section3 with your actual next section
    } else {
        alert("Please fill out all required fields correctly.");
    }
});



document.getElementById("saveNextButtonSection2").addEventListener("click", function (event) {
    event.preventDefault();

    let isValid = true;
    
    // Section 1 - Radio Button Validation
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
            'facilities_for_nqas'
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
    const phcCount = document.getElementById("num_phc_for_nqas"); 
    const chcCount = document.getElementById("num_chc_for_nqas");
    const scCount = document.getElementById("num_sc_for_nqas");
    const totalFacilities = document.getElementById("num_facilities_for_nqas"); 

    if (hasBlockIdentifiedNQAS) {
        
        // Validate PHC count (0-50)
        if (phcCount.value < 0 || phcCount.value > 50 || isNaN(phcCount.value)) {
            isValid = false;
            phcCount.classList.add("border-red-500");
        } else {
            phcCount.classList.remove("border-red-500");
        }

        // Validate CHC count (0-25)
        if (chcCount.value < 0 || chcCount.value > 25 || isNaN(chcCount.value)) {
            isValid = false;
            chcCount.classList.add("border-red-500");
        } else {
            chcCount.classList.remove("border-red-500");
        }

        // Validate SC count (0-100)
        if (scCount.value < 0 || scCount.value > 100 || isNaN(scCount.value)) {
            isValid = false;
            scCount.classList.add("border-red-500");
        } else {
            scCount.classList.remove("border-red-500");
        }

        // Auto-calculate total facilities (sum of PHC, CHC, and SC)
        const total = parseInt(phcCount.value) + parseInt(chcCount.value) + parseInt(scCount.value);
        totalFacilities.value = total;

        // Validate that total facilities value is correctly calculated
        if (totalFacilities.value !== total.toString()) {
            isValid = false;
            totalFacilities.classList.add("border-red-500");
        } else {
            totalFacilities.classList.remove("border-red-500");
        }
    }

    // Validate Section 1 and Section 2
    if (validateRadioButtons() && isValid) {
        document.getElementById("section2").style.display = "none";
        document.getElementById("section3").style.display = "block"; // Replace section3 with your actual next section
    } else {
        alert("Please fill out all required fields correctly.");
    }
});






20 dec - 3-35 
// document.getElementById("saveNextButtonSection2").addEventListener("click", function (event) {
//     event.preventDefault(); 
    
//     let isValid = true;
//     // Section 2 - Facilities for NQAS Certification Validation
//             const hasBlockIdentifiedNQAS = document.getElementById("facilities_for_nqas_yes").checked; 
//             const phcCount = document.getElementById("num_phc_for_nqas"); 
//             const chcCount = document.getElementById("num_chc_for_nqas");
//             const scCount = document.getElementById("num_sc_for_nqas");
//             const totalFacilities = document.getElementById("num_facilities_for_nqas"); 

//     if (hasBlockIdentifiedNQAS) {
        
//         // Validate PHC count (0-50)
//         if (phcCount.value < 0 || phcCount.value > 50 || isNaN(phcCount.value)) {
//             isValid = false;
//             phcCount.classList.add("border-red-500");
//         } else {
//             phcCount.classList.remove("border-red-500");
//         }

//         // Validate CHC count (0-25)
//         if (chcCount.value < 0 || chcCount.value > 25 || isNaN(chcCount.value)) {
//             isValid = false;
//             chcCount.classList.add("border-red-500");
//         } else {
//             chcCount.classList.remove("border-red-500");
//         }

//         // Validate SC count (0-100)
//         if (scCount.value < 0 || scCount.value > 100 || isNaN(scCount.value)) {
//             isValid = false;
//             scCount.classList.add("border-red-500");
//         } else {
//             scCount.classList.remove("border-red-500");
//         }

//         // Auto-calculate total facilities (sum of PHC, CHC, and SC)
//         const total = parseInt(phcCount.value) + parseInt(chcCount.value) + parseInt(scCount.value);
//         totalFacilities.value = total;

//         // Validate that total facilities value is correctly calculated
//         if (totalFacilities.value !== total.toString()) {
//             isValid = false;
//             totalFacilities.classList.add("border-red-500");
//         } else {
//             totalFacilities.classList.remove("border-red-500");
//         }
//     }

//     // If Section 2 is valid, move to the next section
//     if (isValid) {
//         document.getElementById("section2").style.display = "none";
//         document.getElementById("section3").style.display = "block"; // Replace section3 with your actual next section
//     } else {
//         alert("Please fill out all required fields correctly.");
//     }
// });



// validation of all but its not dynamic 
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
        } else {
            name.classList.remove("border-red-500");
            document.getElementById(nameErrorId).textContent = "";
        }

        // Contact Validation
        if (!contact.value || !/^[6-9]\d{9}$/.test(contact.value)) {
            validContact = false;
            contact.classList.add("border-red-500");
            document.getElementById(contactErrorId).textContent = "Contact number should start with 6-9 and have 10 digits.";
        } else {
            contact.classList.remove("border-red-500");
            document.getElementById(contactErrorId).textContent = "";
        }

        return validName && validContact;
    };

    // Block Development Officer Section Validation
    const bdoValid = validateNameAndContact("bdo_name", "bdo_contact", "bdo_name_error", "bdo_contact_error");

    // Sub District Magistrate Section Validation
    const sdmValid = validateNameAndContact("sdm_name", "sdm_contact", "sdm_name_error", "sdm_contact_error");

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
        document.getElementById(errorId).textContent = "";
    }

    // Number validations for demographic details
    const validateNumericField = (field, min, max, errorId) => {
        if (!field.value || isNaN(field.value) || field.value < min || field.value > max) {
            isValid = false;
            field.classList.add("border-red-500");
            document.getElementById(errorId).textContent = `Value should be between ${min} and ${max}.`;
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

    // Total health facilities auto calculation
    const totalHealthFacilities = (parseInt(totalPhc.value) || 0) + (parseInt(totalChc.value) || 0) + (parseInt(totalSubCentre.value) || 0);
    healthFacilities.value = totalHealthFacilities;

    if (bdoValid && sdmValid && bmoValid && isValid) {
        // Move to the next section if valid
        document.getElementById("section1").style.display = "none";
        document.getElementById("section2").style.display = "block"; // Replace section2 with your actual section
    } else {
        alert("Please fill out all required fields correctly.");
    }
});