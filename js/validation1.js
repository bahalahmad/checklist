
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

                // Section 2 Logic
                function initializeSection2() {
                    // Attach dynamic visibility logic for Section 2
                    document.querySelectorAll('input[name="facilities_for_nqas1"]').forEach((radio) => {
                        radio.addEventListener("change", () => {
                            toggleVisibility("facilities_for_nqas1_yes", "nqasDetails", true);
                        });
                    });

                    // Dynamic calculation for NQAS facilities
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

                    // Validation logic for Section 2
                    document.getElementById("saveNextButtonSection2").addEventListener("click", (event) => {
                        event.preventDefault();
                        let allValid = true;

                        // Validate radio buttons
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

                        // Validate NQAS inputs if "Yes" is selected
                        if (document.getElementById("facilities_for_nqas1_yes").checked) {
                            allValid =
                                validateNumberRange("phc_for_nqas1", 0, 50) &&
                                validateNumberRange("chc_for_nqas1", 0, 25) &&
                                validateNumberRange("sc_for_nqas1", 0, 100) &&
                                allValid;
                        }

                        if (allValid) {
                            document.getElementById("section2").style.display = "none";
                            document.getElementById("section3").style.display = "block";
                        } else {
                            alert("Please fix the errors in Section 2 before proceeding.");
                        }
                    });
                }

                // Section 3 Logic

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
                    ["num_villages", "health_facilities", "total_phc"].forEach((id) => {
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
                                validateNumberRange("num_villages", 0, 15000) &&
                                validateNumberRange("health_facilities", 0, 15000) &&
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

                // Initialize Sections
                initializeSection2();
                initializeSection3();
            });


        