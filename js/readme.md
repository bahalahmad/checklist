


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