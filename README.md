# checklist
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

    function validateField(field, min, max) {
        if (field.value < min || field.value > max || isNaN(field.value)) {
            isValid = false;
            field.classList.add("border-red-500");
        } else {
            field.classList.remove("border-red-500");
        }
    }

    if (hasBlockIdentifiedNQAS) {
        validateField(phcCount, 0, 50);
        validateField(chcCount, 0, 25);
        validateField(scCount, 0, 100);

        const total = (parseInt(phcCount.value) || 0) + (parseInt(chcCount.value) || 0) + (parseInt(scCount.value) || 0);
        totalFacilities.value = total;
    }

    if (validateRadioButtons() && isValid) {
        alert("Form Validate Succesfully.");
    } else {
        alert("Please fill out all required fields correctly.");
    }
});
