
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

    // Block Development Officer Section Validation
    const bdoName = document.getElementById("bdo_name");
    const bdoContact = document.getElementById("bdo_contact");
    const bdoEmail = document.getElementById("bdo_email");
    if (!bdoName.value) {
        isValid = false;
        bdoName.classList.add("border-red-500");
    } else {
        bdoName.classList.remove("border-red-500");
    }

    if (!bdoContact.value || !/^\d{10}$/.test(bdoContact.value)) {
        isValid = false;
        bdoContact.classList.add("border-red-500");
    } else {
        bdoContact.classList.remove("border-red-500");
    }

    if (!bdoEmail.value || !/\S+@\S+\.\S+/.test(bdoEmail.value)) {
        isValid = false;
        bdoEmail.classList.add("border-red-500");
    } else {
        bdoEmail.classList.remove("border-red-500");
    }

    // Sub District Magistrate Section Validation
    const sdmName = document.getElementById("sdm_name");
    const sdmContact = document.getElementById("sdm_contact");
    const sdmEmail = document.getElementById("sdm_email");
    if (!sdmName.value) {
        isValid = false;
        sdmName.classList.add("border-red-500");
    } else {
        sdmName.classList.remove("border-red-500");
    }

    if (!sdmContact.value || !/^\d{10}$/.test(sdmContact.value)) {
        isValid = false;
        sdmContact.classList.add("border-red-500");
    } else {
        sdmContact.classList.remove("border-red-500");
    }

    if (!sdmEmail.value || !/\S+@\S+\.\S+/.test(sdmEmail.value)) {
        isValid = false;
        sdmEmail.classList.add("border-red-500");
    } else {
        sdmEmail.classList.remove("border-red-500");
    }

    // Block Medical Officer Section Validation
    const bmoName = document.getElementById("bmo_name");
    const bmoContact = document.getElementById("bmo_contact");
    const bmoEmail = document.getElementById("bmo_email");
    if (!bmoName.value) {
        isValid = false;
        bmoName.classList.add("border-red-500");
    } else {
        bmoName.classList.remove("border-red-500");
    }

    if (!bmoContact.value || !/^\d{10}$/.test(bmoContact.value)) {
        isValid = false;
        bmoContact.classList.add("border-red-500");
    } else {
        bmoContact.classList.remove("border-red-500");
    }

    if (!bmoEmail.value || !/\S+@\S+\.\S+/.test(bmoEmail.value)) {
        isValid = false;
        bmoEmail.classList.add("border-red-500");
    } else {
        bmoEmail.classList.remove("border-red-500");
    }

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
    const numericFields = [
        numVillages, healthFacilities, totalPhc, totalChc, totalSubCentre, 
        aanganwadiCentre, populationCovered, eligibleCouple, pregnantWomen, 
        liveBirth, children01, populationAbove30, abhaId
    ];

    numericFields.forEach(field => {
        if (!field.value || isNaN(field.value)) {
            isValid = false;
            field.classList.add("border-red-500");
        } else {
            field.classList.remove("border-red-500");
        }
    });

    if (!pmjayCard.value) {
        isValid = false;
        pmjayCard.classList.add("border-red-500");
    } else {
        pmjayCard.classList.remove("border-red-500");
    }

    if (isValid) {
        // Move to the next section if valid
        document.getElementById("section1").style.display = "none";
        document.getElementById("section2").style.display = "block"; // Replace section2 with your actual section
    } else {
        alert("Please fill out all required fields correctly.");
    }
});


document.getElementById("facilities_for_nqas_yes").addEventListener("change", function() {
    document.getElementById("nqasDetails").classList.remove("hidden");
});

document.getElementById("facilities_for_nqas_no").addEventListener("change", function() {
    document.getElementById("nqasDetails").classList.add("hidden");
});

document.getElementById("saveNextButtonSection2").addEventListener("click", function (event) {
    event.preventDefault(); 
    
    let isValid = true;

    if (!validateRadioButtons()) {
        event.preventDefault(); // Prevent form submission
        alert('Please answer all required questions.');
    }
    function validateRadioButtons() {
        const radioGroups = document.querySelectorAll('input[type="radio"][value="yes"]');
        const radioNames = [...new Set(Array.from(radioGroups).map(radio => radio.name))];

        for (let name of radioNames) {
            const group = document.getElementsByName(name);
            if (![...group].some(radio => radio.checked)) {
                return false; // Found a group with no checked radio
            }
        }

        return true; // All required groups have at least one checked radio
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

    // If Section 2 is valid, move to the next section
    if (isValid) {
        document.getElementById("section2").style.display = "none";
        document.getElementById("section3").style.display = "block"; // Replace section3 with your actual next section
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


// function saveAndNext(sectionNumber) {
   
//     document.getElementById(`section${sectionNumber}`).style.display = 'none';
//     const nextSection = sectionNumber + 1;
//     const nextSectionElement = document.getElementById(`section${nextSection}`);
//     if (nextSectionElement) {
//         nextSectionElement.style.display = 'block';
//     }
// }

//     function goBackToSection1() {
//         // Hide Section 2
//         document.getElementById('section2').classList.add('hidden');
//         // Show Section 1
//         document.getElementById('section1').classList.remove('hidden');
//     }
// }
