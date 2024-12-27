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
    // updateTotalHealthFacilities();
}

function validateWordCount(id, maxWords) {
    const input = document.getElementById(id);
    const errorElement = document.getElementById(id + "_error");
    const wordCount = input.value.trim().split(/\s+/).length;

    if (input.value.trim() && wordCount > maxWords) {
        errorElement.textContent = `Word count must not exceed ${maxWords} words.`;
        return false;
    } else {
        errorElement.textContent = "";
        return true;
    }
}


function updateFields(section) {
    const sanctionedField = document.getElementById(`${section}-sanctioned`);
    const functionalField = document.getElementById(`${section}-functional`);
    const nonFunctionalField = document.getElementById(`${section}-non-functional-count`);
    const nonFunctionalContainer = document.getElementById(`${section}-non-functional-container`);

    const sanctioned = parseInt(sanctionedField.value, 10) || 0;
    const functional = parseInt(functionalField.value, 10) || 0;

    // Validate Sanctioned field
    if (!validateInput(`${section}-sanctioned`, 0, parseInt(sanctionedField.max, 10))) {
        return;
    }

    // Enable or disable Functional field
    functionalField.disabled = sanctioned === 0;
    functionalField.setAttribute("max", sanctioned);

    // Validate Functional field
    if (sanctioned > 0 && functional > sanctioned) {
        functionalField.value = sanctioned;
    }

    // Calculate Non-Functional value
    const nonFunctional = Math.max(sanctioned - functional, 0);
    if (sanctioned > 0) {
        nonFunctionalContainer.style.display = "block";
        nonFunctionalField.textContent = nonFunctional;
    } else {
        nonFunctionalContainer.style.display = "none";
        nonFunctionalField.textContent = "0";
    }
}
function validateInput(id, min, max) {
    const field = document.getElementById(id);
    const errorField = document.getElementById(`${id}_error`);
    const value = parseInt(field.value, 10);

    if (isNaN(value) || value < min || value > max) {
        errorField.textContent = `Value must be between ${min} and ${max}.`;
        field.classList.add("border-red-500");
        return false;
    } else {
        errorField.textContent = "";
        field.classList.remove("border-red-500");
        return true;
    }
}



document.addEventListener("DOMContentLoaded", () => {
    // Shared Helper Functions
    function validateNumberRange(id, min, max) {
        const input = document.getElementById(id);
        const errorElement = document.getElementById(id + "_error");
        const value = parseInt(input.value, 10);

        if (isNaN(value) || value < min || value > max) {
            errorElement.textContent = `Value should be between ${min} and ${max}.`;
            return false;
        } else {
            errorElement.textContent = "";
            return true;
        }
    }
    function validateWordCount(id, maxWords) {
        const input = document.getElementById(id);
        const errorElement = document.getElementById(id + "_error");
        const wordCount = input.value.trim().split(/\s+/).length;

        if (input.value.trim() && wordCount > maxWords) {
            errorElement.textContent = `Word count must not exceed ${maxWords} words.`;
            return false;
        } else {
            errorElement.textContent = "";
            return true;
        }
    }
    function updateTotalHealthFacilities() {
        const totalPhc = parseInt(document.getElementById('total_phc').value) || 0;
        const totalChc = parseInt(document.getElementById('total_chc').value) || 0;
        const totalSubCentre = parseInt(document.getElementById('total_sub_centre').value) || 0;
        document.getElementById('total_health_facilities').value = totalPhc + totalChc + totalSubCentre;
    }

    document.getElementById("total_phc").addEventListener('input', updateTotalHealthFacilities);
    document.getElementById("total_chc").addEventListener('input', updateTotalHealthFacilities);
    document.getElementById("total_sub_centre").addEventListener('input', updateTotalHealthFacilities);


    function toggleVisibility(triggerId, targetId, condition) {
        const triggerElement = document.getElementById(triggerId);
        const targetElement = document.getElementById(targetId);

        if (triggerElement && triggerElement.checked === condition) {
            targetElement.classList.remove("hidden");
            targetElement.querySelectorAll("input, textarea").forEach((input) => (input.required = true));
        } else {
            targetElement.classList.add("hidden");
            targetElement.querySelectorAll("input, textarea").forEach((input) => {
                input.required = false;
                input.value = ""; // Clear input
                const errorElement = document.getElementById(input.id + "_error");
                if (errorElement) errorElement.textContent = ""; // Clear errors
            });
        }
    }
    const areaTypeRadios = document.querySelectorAll('input[name="area_type"]');
    const errorElement = document.getElementById("area_type_error");
    areaTypeRadios.forEach(radio => {
        radio.addEventListener("change", () => {
            if (errorElement) {
                errorElement.textContent = ""; // Clear the error message
            }
        });
    });

    // Section 1 Logic
    function initializeSection1() {



        document.getElementById("total_phc").addEventListener('input', updateTotalHealthFacilities);
        document.getElementById("total_chc").addEventListener('input', updateTotalHealthFacilities);
        document.getElementById("total_sub_centre").addEventListener('input', updateTotalHealthFacilities);

        document.getElementById("saveNextButtonSection1").addEventListener("click", (event) => {
            event.preventDefault();
            let allValid = true;
            // Validate all required fields
            const selectedAreaType = document.querySelector('input[name="area_type"]:checked');
            const areaTypeError = document.getElementById("area_type_error");
            if (!selectedAreaType) {
                areaTypeError.textContent = "Please select an area type.";
                allValid = false;
            } else {
                areaTypeError.textContent = "";
            }
            const requiredFields = document.querySelectorAll('#section1 [required]');
            requiredFields.forEach((field) => {
                field.dispatchEvent(new Event('input'));
                const errorElement = document.getElementById(field.id + "_error");
                if (errorElement && errorElement.textContent !== "") {
                    allValid = false;
                }
            });

            if (allValid) {
                document.getElementById('section1').style.display = 'none';
                document.getElementById('section2').style.display = 'block';
            } else {
                alert("Please fix errors before proceeding.");
            }
        });
    }

    // Section 2 Logic
    function initializeSection2() {
        document.querySelectorAll('input[name="facilities_for_nqas1"]').forEach((radio) => {
            radio.addEventListener("change", () => {
                toggleVisibility("facilities_for_nqas1_yes", "nqasDetails", true);
            });
        });

        ["phc_for_nqas1", "chc_for_nqas1", "sc_for_nqas1"].forEach((id, index) => {
            const min = [0, 0, 0][index];
            const max = [50, 25, 100][index];

            document.getElementById(id).addEventListener("input", () => {
                validateNumberRange(id, min, max);
                const phc = parseInt(document.getElementById("phc_for_nqas1").value, 10) || 0;
                const chc = parseInt(document.getElementById("chc_for_nqas1").value, 10) || 0;
                const sc = parseInt(document.getElementById("sc_for_nqas1").value, 10) || 0;
                document.getElementById("num_facilities_for_nqas1").value = phc + chc + sc;
            });
        });

        document.getElementById("saveNextButtonSection2").addEventListener("click", (event) => {
            event.preventDefault();
            let allValid = true;

            const radioGroups = [
                "orientation_completed",
                "action_plan_prepared",
                "mchn_plan_available",
                "map_displayed",
                "key_focus_areas",
                "disseminated_with_health_functionaries",
                "monthly_dhs_meeting",
                "review_mechanism",
                "facilities_for_nqas1",
                "referral_mechanism",
            ];
            radioGroups.forEach((group) => {
                const groupChecked = document.querySelector(`input[name="${group}"]:checked`);
                if (!groupChecked) {
                    allValid = false;
                    console.error(`Validation failed: No option selected for "${group}"`);
                }
            });

            if (document.getElementById("facilities_for_nqas1_yes").checked) {
                allValid =
                    validateNumberRange("phc_for_nqas1", 0, 50) &&
                    validateNumberRange("chc_for_nqas1", 0, 25) &&
                    validateNumberRange("sc_for_nqas1", 0, 100) &&
                    allValid;
            }

            if (allValid) {
                document.getElementById('section2').style.display = 'none';
                document.getElementById('section3').style.display = 'block';
            } else {
                alert("Please fix errors before proceeding.");
            }
        });
    }

    // Section 3 Logic
    function initializeSection3() {
        // Show or hide "Other Specify" text box dynamically
        document.getElementById("other_block_role").addEventListener("change", (event) => {
            const otherSpecifyInput = document.getElementById("other_role_specify");
            const errorElement = document.getElementById("other_role_specify_error");

            if (event.target.checked) {
                otherSpecifyInput.style.display = "block";
                otherSpecifyInput.required = true;
            } else {
                otherSpecifyInput.style.display = "none";
                otherSpecifyInput.required = false;
                otherSpecifyInput.value = ""; // Clear input
                errorElement.textContent = ""; // Clear errors
            }
        });

        document.querySelectorAll('input[name="block_quality_cell_comittess"]').forEach((radio) => {
            radio.addEventListener("change", () => {
                toggleVisibility("block_quality_cell_comittess_yes", "verify_with_question_label", true);
                const isYesSelected = document.getElementById("block_quality_cell_comittess_yes").checked;
                // Set the required attribute dynamically for the verification question
                const verificationRadios = document.querySelectorAll('input[name="verify_with_last_min"]');
                verificationRadios.forEach((radio) => {
                    radio.required = isYesSelected; // Make required only if "Yes" is selected
                });
            });
        });
        document.querySelectorAll('input[name="block_quality_cell_direct"]').forEach((radio) => {
            radio.addEventListener("change", () => {
                toggleVisibility("block_quality_cell_direct_yes", "dbt_question_label", true);
            });
        });
        // Validate word count dynamically for "Other Specify"
        document.getElementById("other_role_specify").addEventListener("input", () => {
            validateWordCount("other_role_specify", 30);
        });

        // Toggle visibility for "Block Public Health Unit"
        document.querySelectorAll('input[name="block_public_health"]').forEach((radio) => {
            radio.addEventListener("change", () => {
                const functionalComponents = document.getElementById("functional_components");
                if (document.getElementById("block_public_health_yes").checked) {
                    functionalComponents.classList.remove("hidden");
                    functionalComponents.querySelectorAll("input").forEach((input) => (input.required = true));
                } else {
                    functionalComponents.classList.add("hidden");
                    functionalComponents.querySelectorAll("input").forEach((input) => {
                        input.required = false;
                        input.checked = false; // Reset checkboxes
                    });
                    document.getElementById("functional_components_error").textContent = ""; // Clear errors
                }
            });
        });


        // Dynamic error messages for DBT number inputs
        ["num_villages1", "health_facilities1", "total_phc"].forEach((id) => {
            const min = 0;
            const max = 15000;
            document.getElementById(id).addEventListener("input", () => {
                validateNumberRange(id, min, max);
            });
        });
        document.querySelectorAll('input[name="block_quality_cell_direct"]').forEach((radio) => {
            radio.addEventListener("change", () => {
                toggleVisibility("block_quality_cell_direct_yes", "dbt_question_label", true);
            });
        });



        // Attach dynamic visibility logic for "Any additional funds proposed"
        document.querySelectorAll('input[name="additional_funds_cell"]').forEach((radio) => {
            radio.addEventListener("change", () => {
                const isYesSelected = document.getElementById("additional_funds_cell_yes").checked;

                toggleVisibility("additional_funds_cell_yes", "activities_proposed_div", true);
                const activitiesProposedInput = document.getElementById("activities_proposed");
                activitiesProposedInput.required = isYesSelected; // Make required if "Yes" is selected
            });
        });

        // Attach dynamic visibility logic for "Any additional funds available for activities"
        document.querySelectorAll('input[name="block_quality_cell_additional"]').forEach((radio) => {
            radio.addEventListener("change", () => {

                const isYesSelected = document.getElementById("block_quality_cell_additional_yes").checked;

                toggleVisibility("block_quality_cell_additional_yes", "activities_proposed_div1", true);
                const activitiesProposedInput1 = document.getElementById("activities_proposed1");
                activitiesProposedInput1.required = isYesSelected; // Make required if "Yes" is selected
            });
        });
        // Attach validation logic for word count dynamically
        document.getElementById("activities_proposed").addEventListener("input", () => {
            validateWordCount("activities_proposed", 150);
        });
        document.getElementById("activities_proposed1").addEventListener("input", () => {
            validateWordCount("activities_proposed1", 150);
        });

        // Validation logic for Section 3
        document.getElementById("saveNextButtonSection3").addEventListener("click", (event) => {
            event.preventDefault();
            let allValid = true;

            // Validate radio buttons
            const radioGroups = [
                "block_public_health",
                "block_quality_cell_established",
                "additional_funds_cell",
                "block_quality_cell_direct",
                "block_quality_cell_payment",
            ];
            radioGroups.forEach((group) => {
                if (!document.querySelector(`input[name="${group}"]:checked`)) {
                    allValid = false;
                    console.error(`Validation failed: No option selected for "${group}"`);
                }
            });

            if (document.getElementById("block_quality_cell_comittess_yes").checked) {
                const verificationChecked = document.querySelector('input[name="verify_with_last_min"]:checked');
                if (!verificationChecked) {
                    allValid = false;
                    console.error("Validation failed: No option selected for 'verify_with_last_min'");
                    document.getElementById("verify_with_last_min_error").textContent =
                        "This field is required.";
                } else {
                    document.getElementById("verify_with_last_min_error").textContent = "";
                }
            }

            const checkboxes = document.querySelectorAll('input[name="block_program_unit"]');
            if (!Array.from(checkboxes).some((checkbox) => checkbox.checked)) {
                allValid = false;
                document.getElementById("block_program_unit_error").textContent = "Please select at least one functional component.";
            } else {
                document.getElementById("block_program_unit_error").textContent = "";
            }
            
            // Validate functional components
            if (!document.getElementById("functional_components").classList.contains("hidden")) {
                const checkboxes = document.querySelectorAll('input[name="functional_components"]');
                if (!Array.from(checkboxes).some((checkbox) => checkbox.checked)) {
                    allValid = false;
                    document.getElementById("functional_components_error").textContent =
                        "Please select at least one functional component.";
                } else {
                    document.getElementById("functional_components_error").textContent = "";
                }
            }

            // Validate "Other Specify"
            if (document.getElementById("other_block_role").checked) {
                allValid = validateWordCount("other_role_specify", 30) && allValid;
            }

            // Validate "Activities Proposed"
            if (document.getElementById("additional_funds_cell_yes").checked) {
                allValid = validateWordCount("activities_proposed", 150) && allValid;
            }

            if (document.getElementById("block_quality_cell_additional_yes").checked) {
                allValid = validateWordCount("activities_proposed1", 150) && allValid;
            }

            // Validate DBT number inputs
            if (document.getElementById("block_quality_cell_direct_yes").checked) {
                allValid =
                    validateNumberRange("num_villages1", 0, 15000) &&
                    validateNumberRange("health_facilities1", 0, 15000) &&
                    validateNumberRange("total_phc", 0, 15000) &&
                    allValid;
            }

            if (allValid) {
                document.getElementById("section3").style.display = "none";
                document.getElementById("section4").style.display = "block";
            } else {
                alert("Please fix the errors in Section 2 before proceeding.");
            }
        });
    }
    // Section 4 Logic
function initializeSection4() {
    // Update dependent fields dynamically
    // Attach event listeners for each section
    const sections = [
        "medical-college",
        "district-hospital",
        "sub-district-hospital",
        "community-health-centre",
        "phc",
        "twenty-four-seven-phc",
        "aam-phc",
        "urban-primary-health-centre",
        "urban-primary-health-centre-aam",
        "sub-centre",
        "aam-sub-centre",
        "aam-urban-health-centre",
        "mch-wings",
        "sncus",
        "nbsus",
        "nutritional-rehabilitation-centres",
        "afhcs",
        "bsu-bb"
    ];

    sections.forEach(section => {
        const sanctionedField = document.getElementById(`${section}-sanctioned`);
        const functionalField = document.getElementById(`${section}-functional`);

        if (sanctionedField) {
            sanctionedField.addEventListener("input", () => updateFields(section));
        }
        if (functionalField) {
            functionalField.addEventListener("input", () => updateFields(section));
        }
    });

    ["delivery-points", "ambulance-count", "beds-count","cold-chain-points"].forEach((id, index) => {
        const min = [0, 0, 0,0][index];
        const max = [50, 50, 250,100][index];

        document.getElementById(id).addEventListener("input", () => {
            validateNumberRange(id, min, max);
;
        });
    });

    // Save & Next Button Logic
    document.getElementById("saveNextButtonSection4").addEventListener("click", (event) => {
        event.preventDefault();
        let allValid = true;

        // Validate each section
        sections.forEach(section => {
            const sanctionedField = document.getElementById(`${section}-sanctioned`);
            const functionalField = document.getElementById(`${section}-functional`);

            if (!validateNumberRange(`${section}-sanctioned`, 0, parseInt(sanctionedField.max || "100", 10))) {
                allValid = false;
            }

            if (sanctionedField.value > 0 && !validateNumberRange(`${section}-functional`, 0, parseInt(sanctionedField.value, 10))) {
                allValid = false;
            }
        });

       

        // Validate additional fields
        allValid &= validateNumberRange("delivery-points", 0, 50);
        allValid &= validateNumberRange("ambulance-count", 0, 50);
        allValid &= validateNumberRange("beds-count", 0, 250);
        allValid &= validateNumberRange("cold-chain-points", 0, 100);

        if (allValid) {
            document.getElementById("section4").style.display = "none";
            document.getElementById("section5").style.display = "block";
        } else {
            alert("Please fix errors before proceeding.");
        }
    });
}


    

    // Initialize Section 5 Logic
  
   

// Initialize Section 4 Logic
    // Initialize Sections
    initializeSection1();
    initializeSection2();
    initializeSection3();
    initializeSection4();
    // initializeSection5();
});
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section");
    let currentSectionIndex = 0;

    // Function to validate a single input pair (sanctioned and available)
    function validateInputPair(sanctionedId, availableId, minValue, maxValue) {
        const sanctionedInput = document.getElementById(sanctionedId);
        const availableInput = document.getElementById(availableId);
        const sanctionedValue = parseInt(sanctionedInput.value, 10);
        const availableValue = parseInt(availableInput.value, 10);

        let isValid = true;

        // Create or find error elements
        let sanctionedError = document.getElementById(`${sanctionedId}-error`);
        if (!sanctionedError) {
            sanctionedError = document.createElement("span");
            sanctionedError.id = `${sanctionedId}-error`;
            sanctionedError.className = "error";
            sanctionedInput.parentElement.appendChild(sanctionedError);
        }

        let availableError = document.getElementById(`${availableId}-error`);
        if (!availableError) {
            availableError = document.createElement("span");
            availableError.id = `${availableId}-error`;
            availableError.className = "error";
            availableInput.parentElement.appendChild(availableError);
        }

        // Validate sanctioned input
        if (isNaN(sanctionedValue) || sanctionedValue < minValue || sanctionedValue > maxValue) {
            sanctionedError.textContent = `Sanctioned value must be between ${minValue} and ${maxValue}.`;
            isValid = false;
        } else {
            sanctionedError.textContent = "";
        }

        // Validate available input if sanctioned is valid
        if (sanctionedValue > 0) {
            availableInput.disabled = false;
            if (isNaN(availableValue) || availableValue < 0 || availableValue > sanctionedValue) {
                availableError.textContent = "Available value must be between 0 and the sanctioned value.";
                isValid = false;
            } else {
                availableError.textContent = "";
            }
        } else {
            availableInput.disabled = true;
            availableInput.value = "";
            availableError.textContent = "";
        }

        return isValid;
    }

    // Function to validate all input pairs within the current section
    function validateSection(section) {
        const inputs = section.querySelectorAll("input[type='number']");
        let isValid = true;

        inputs.forEach(input => {
            const inputId = input.id;
            if (inputId.includes("sanctioned")) {
                const availableId = inputId.replace("sanctioned", "available");
                const minValue = parseInt(input.getAttribute("data-min"), 10) || 0;
                const maxValue = parseInt(input.getAttribute("data-max"), 10) || 200;
                if (!validateInputPair(inputId, availableId, minValue, maxValue)) {
                    isValid = false;
                }
            }
        });

        return isValid;
    }

    // Function to handle Save & Next button click
    function handleSaveAndNext() {
        const currentSection = sections[currentSectionIndex];

        if (!validateSection(currentSection)) {
            alert("Please fill out all required fields correctly before proceeding.");
            return;
        }

        // If valid, move to the next section
        currentSection.style.display = "none";
        currentSectionIndex++;

        if (currentSectionIndex < sections.length) {
            sections[currentSectionIndex].style.display = "block";
        } else {
            alert("Form completed successfully!");
        }
    }

    // Bind event listeners to all Save & Next buttons
    sections.forEach((section, index) => {
        const saveNextButton = section.querySelector("button[id^='saveNextButton']");
        if (saveNextButton) {
            saveNextButton.addEventListener("click", handleSaveAndNext);
        }
    });

    // Bind validation to all input pairs
    document.querySelectorAll("input[type='number']").forEach(input => {
        if (input.id.includes("sanctioned")) {
            const sanctionedId = input.id;
            const availableId = sanctionedId.replace("sanctioned", "available");
            const minValue = parseInt(input.getAttribute("data-min"), 10) || 0;
            const maxValue = parseInt(input.getAttribute("data-max"), 10) || 200;

            input.addEventListener("input", () => validateInputPair(sanctionedId, availableId, minValue, maxValue));
            const availableInput = document.getElementById(availableId);
            availableInput.addEventListener("input", () => validateInputPair(sanctionedId, availableId, minValue, maxValue));
        }
    });
});

