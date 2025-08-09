export const fundingRequestFormConfig = {
  "entityType": "FORM",
  "formType": "FUNDING_REQUEST",
  "formName": "DAP Funding Request",
  "sections": [
    {
      "sectionId": "DISCHARGE_REQUEST",
      "fields": [
        {
          "fieldId": "FR_CSB",
          "name": "csbId",
          "type": "select",
          "label": "CSB",
          "required": true,
          "fieldConfig": {
            "validations": [],
            "options": [
              {
                "label": "Alexandria",
                "value": "001"
              },
              {
                "label": "Fairfax-Falls Church",
                "value": "023"
              },
              {
                "label": "Chesterfield",
                "value": "011"
              },
              {
                "label": "Horizon",
                "value": "007"
              },
              {
                "label": "Rappahannock-Rapidan",
                "value": "061"
              },
              {
                "label": "Richmond",
                "value": "065"
              },
              {
                "label": "Henrico Area",
                "value": "033"
              },
              {
                "label": "Colonial",
                "value": "013"
              },
              {
                "label": "Blue Ridge",
                "value": "067"
              },
              {
                "label": "Dickenson",
                "value": "020"
              },
              {
                "label": "Mount Rogers",
                "value": "041"
              },
              {
                "label": "Alleghany-Highlands",
                "value": "003"
              },
              {
                "label": "Chesapeake",
                "value": "009"
              },
              {
                "label": "Crossroads",
                "value": "015"
              },
              {
                "label": "Southside",
                "value": "071"
              },
              {
                "label": "Harrisonburg-Rockingham",
                "value": "031"
              },
              {
                "label": "Norfolk",
                "value": "045"
              },
              {
                "label": "Middle Peninsula-Northern Neck",
                "value": "039"
              },
              {
                "label": "Prince William",
                "value": "057"
              },
              {
                "label": "Virginia Beach",
                "value": "075"
              },
              {
                "label": "Portsmouth",
                "value": "055"
              },
              {
                "label": "Valley",
                "value": "073"
              },
              {
                "label": "Piedmont",
                "value": "049"
              },
              {
                "label": "Cumberland Mountain",
                "value": "017"
              },
              {
                "label": "Hanover",
                "value": "029"
              },
              {
                "label": "Rockbridge Area",
                "value": "069"
              },
              {
                "label": "Loudoun County",
                "value": "037"
              },
              {
                "label": "Arlington",
                "value": "005"
              },
              {
                "label": "Eastern Shore",
                "value": "021"
              },
              {
                "label": "Hampton-Newport News",
                "value": "027"
              },
              {
                "label": "Highlands",
                "value": "035"
              },
              {
                "label": "New River Valley",
                "value": "043"
              },
              {
                "label": "Goochland-Powhatan",
                "value": "025"
              },
              {
                "label": "Western Tidewater",
                "value": "077"
              },
              {
                "label": "Greater Reach",
                "value": "053"
              },
              {
                "label": "Region Ten",
                "value": "063"
              },
              {
                "label": "Rappahannock Area",
                "value": "059"
              },
              {
                "label": "Northwestern",
                "value": "047"
              },
              {
                "label": "Planning District I",
                "value": "051"
              },
              {
                "label": "Danville-Pittsylvania",
                "value": "019"
              }
            ],
            "layoutOptions": {
              "cols": 3
            }
          }
        },
        {
          "fieldId": "FR_REQUESTOR_NAME",
          "name": "requestorName",
          "type": "string",
          "label": "Requestor Name",
          "required": true,
          "fieldConfig": {
            "layoutOptions": {
              "cols": 6
            }
          }
        },
        {
          "fieldId": "FR_DATE_OF_REQUEST",
          "name": "dateOfRequest",
          "type": "date",
          "label": "Date of Request",
          "required": true,
          "fieldConfig": {
            "layoutOptions": {
              "cols": 3
            }
          }
        },
        {
          "fieldId": "FR_TYPE_OF_FUNDS",
          "name": "typeOfFunds",
          "type": "select",
          "label": "Type of Funds",
          "required": true,
          "fieldConfig": {
            "options": [
              {
                "label": "One Time",
                "value": "ONE_TIME"
              },
              {
                "label": "Ongoing",
                "value": "ONGOING"
              }
            ],
            "layoutOptions": {
              "cols": 6
            }
          }
        },
        {
          "fieldId": "FR_PLAN_START_DATE",
          "name": "plan_start_date",
          "type": "date",
          "label": "Plan Start Date",
          "required": true,
          "fieldConfig": {
            "layoutOptions": {
              "cols": 3
            }
          }
        },
        {
          "fieldId": "FR_PLAN_END_DATE",
          "name": "plan_end_date",
          "type": "date",
          "label": "Plan End Date",
          "required": false,
          "fieldConfig": {
            "layoutOptions": {
              "cols": 3
            }
          }
        },
        {
          "fieldId": "FR_IS_PLAN_MODIFICATION",
          "name": "isPlanModification",
          "type": "yes_no",
          "label": "Is this a plan modification?",
          "required": true,
          "fieldConfig": {
            "layoutOptions": {
              "cols": 4
            }
          }
        },
        {
          "fieldId": "FR_ORIGINAL_PLAN_AMOUNT",
          "name": "originalPlanAmount",
          "type": "amount",
          "label": "If Yes, then Original Plan Amount?",
          "required": false,
          "fieldConfig": {
            "dependsOn": [
              {
                "fieldName": "isPlanModification",
                "value": true
              }
            ],
            "layoutOptions": {
              "cols": 4
            }
          }
        },
        {
          "fieldId": "FR_REQUESTED_AMOUNT",
          "name": "requestedAmount",
          "type": "amount",
          "label": "Requested Amount?",
          "required": true,
          "fieldConfig": {
            "layoutOptions": {
              "cols": 4
            }
          }
        }
      ]
    },
    {
      "sectionId": "MEMORY_CARE",
      "fields": [
        {
          "fieldId": "MEMORY_CARE_Q1",
          "name": "memoryCareQ1Dementia",
          "type": "yes_no",
          "label":
            "Has this individual been diagnosed with Major Neurocognitive Disorder (dementia)? If No, then the individual doesn't meet criteria.",
          "required": true,
          "fieldConfig": {
            "validations": [
              {
                "type": "required",
                "message": "Q1 must be answered Yes or No"
              }
            ],
            "layoutOptions": {
              "cols": 12
            }
          }
        },
        {
          "fieldId": "MEMORY_CARE_Q2",
          "name": "memoryCareQ2Diagnosis",
          "type": "textarea",
          "label": "What is the individual's diagnosis?",
          "required": true,
          "fieldConfig": {
            "validations": [
              {
                "type": "maxLength",
                "value": 1000,
                "message": "Response cannot exceed 1000 characters"
              }
            ],
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "memoryCareQ1Dementia",
                "value": true
              }
            ],
            "placeholder": "Enter diagnosis"
          }
        },
        {
          "fieldId": "MEMORY_CARE_Q3",
          "name": "memoryCareQ3Mobility",
          "type": "textarea",
          "label":
            "What is this individual's level of mobility? Does this individual require equipment to ambulate (walker, wheelchair)?",
          "required": true,
          "fieldConfig": {
            "validations": [
              {
                "type": "maxLength",
                "value": 1000,
                "message": "Response cannot exceed 1000 characters"
              }
            ],
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "memoryCareQ1Dementia",
                "value": true
              }
            ],
            "placeholder": "Enter explanation"
          }
        },
        {
          "fieldId": "MEMORY_CARE_Q4",
          "name": "memoryCareQ4Elopement",
          "type": "textarea",
          "label":
            "Is this individual currently identified by the state hospital as an elopement risk? What exit-seeking behaviors has the individual displayed consistently while hospitalized? Explain.",
          "required": true,
          "fieldConfig": {
            "validations": [
              {
                "type": "required",
                "message": "Q4 must be answered Yes or No"
              }
            ],
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "memoryCareQ1Dementia",
                "value": true
              }
            ],
            "placeholder": "Enter explanation"
          }
        },
        {
          "fieldId": "MEMORY_CARE_Q5",
          "name": "memoryCareQ5Unsafe",
          "type": "textarea",
          "label":
            "Has this individual had any wandering or unsafe behaviors, within 30 days prior to hospitalization, due to their cognitive impairment while living in the community? If yes, please explain.",
          "required": true,
          "fieldConfig": {
            "validations": [
              {
                "type": "required",
                "message": "Q5 must be answered Yes or No"
              }
            ],
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "memoryCareQ1Dementia",
                "value": true
              }
            ],
            "placeholder": "Enter explanation"
          }
        },
        {
          "fieldId": "MEMORY_CARE_Q6",
          "name": "memoryCareQ6Monitoring",
          "type": "textarea",
          "label":
            "Can the individual be supported safely in a less restrictive setting with a monitoring device such as Project Lifesaver or Wander Guard?",
          "required": true,
          "fieldConfig": {
            "validations": [
              {
                "type": "required",
                "message": "Q6 must be answered Yes or No"
              }
            ],
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "memoryCareQ1Dementia",
                "value": true
              }
            ],
            "placeholder": "Enter explanation"
          }
        },
        {
          "fieldId": "MEMORY_CARE_Q7",
          "name": "memoryCareQ7Cognitive",
          "type": "textarea",
          "label":
            "What is the individual's Cognitive Functioning? Does the individual know where they are and what they are doing, can they recognize danger and get to safety, able to let needs be known, to ask for help, etc.?",
          "required": true,
          "fieldConfig": {
            "validations": [
              {
                "type": "required",
                "message": "Q7 must be answered Yes or No"
              }
            ],
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "memoryCareQ1Dementia",
                "value": true
              }
            ],
            "placeholder": "Enter explanation"
          }
        },
        {
          "fieldId": "MEMORY_CARE_APPROVAL_BY_CTS",
          "name": "memoryCareApprovalByCts",
          "type": "yes_no",
          "label":
            "Memory Care Approval by DBHDS Community Transition Specialist",
          "fieldConfig": {
            "layoutOptions": {
              "cols": 4
            },
            "dependsOn": [
              {
                "fieldName": "memoryCareQ1Dementia",
                "value": true
              }
            ]
          }
        },
        {
          "fieldId": "MEMORY_CARE_DATE_OF_APPROVAL_BY_DBHDS",
          "name": "memoryCareApprovalDate",
          "type": "date",
          "label": "Memory Care Date of Approval by DBHDS",
          "fieldConfig": {
            "layoutOptions": {
              "cols": 4
            },
            "dependsOn": [
              {
                "fieldName": "memoryCareQ1Dementia",
                "value": true
              }
            ]
          }
        },
      ]
    },
    {
      "sectionId": "CATCHMENT_PLAN",
      "fields": [
        {
          "fieldId": "FR_IS_OUT_OF_CATCHMENT",
          "name": "isOutOfCatchment",
          "type": "yes_no",
          "label": "Is this an out of catchment plan?",
          "required": true,
          "fieldConfig": {
            "layoutOptions": {
              "cols": 6
            }
          }
        },
        {
          "fieldId": "FR_HAS_OUT_OF_CATCHMENT_REFERRAL_COMPLETED",
          "name": "hasOutOfCatchmentReferralCompleted",
          "type": "yes_no",
          "label": "Has the out of catchment referral been completed?",
          "required": true,
          "fieldConfig": {
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "isOutOfCatchment",
                "value": true
              }
            ]
          }
        },
        {
          "fieldId": "FR_HAS_RECEIVING_CSB_DAP_COORDINATOR_CONSULTED",
          "name": "hasReceivingCoordinatorConsulted",
          "type": "yes_no",
          "label": "Has the receiving CSB DAP coordinator been consulted?",
          "required": true,
          "fieldConfig": {
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "isOutOfCatchment",
                "value": true
              }
            ]
          }
        },
        {
          "fieldId": "FR_RECEIVING_CSB_DAP_COORDINATOR_CONSULTED",
          "name": "receivingCoordinatorConsulted",
          "type": "string",
          "label": "If Yes, then who was consulted",
          "required": true,
          "fieldConfig": {
            "layoutOptions": {
              "cols": 8
            },
            "dependsOn": [
              {
                "fieldName": "isOutOfCatchment",
                "value": true
              },
              {
                "fieldName": "hasReceivingCoordinatorConsulted",
                "value": true
              }
            ]
          }
        },
        {
          "fieldId": "FR_RECEIVING_CSB_DAP_COORDINATOR_CONSULTED_DATE",
          "name": "receivingCoordinatorConsultedDate",
          "type": "date",
          "label": "If Yes, Date of Consultation",
          "required": true,
          "fieldConfig": {
            "layoutOptions": {
              "cols": 4
            },
            "dependsOn": [
              {
                "fieldName": "isOutOfCatchment",
                "value": true
              },
              {
                "fieldName": "hasReceivingCoordinatorConsulted",
                "value": true
              }
            ]
          }
        },
        {
          "fieldId": "FR_RECEIVING_CSB_DAP_COORDINATOR_NOT_CONSULTED_REASON",
          "name": "receivingCoordinatorNotConsultedReason",
          "type": "textarea",
          "label": "If No, then reason why?",
          "required": true,
          "fieldConfig": {
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "isOutOfCatchment",
                "value": true
              },
              {
                "fieldName": "hasReceivingCoordinatorConsulted",
                "value": false
              }
            ]
          }
        }
      ]
    },
    {
      "sectionId": "DAP_RESIDENTIAL_RATE",
      "fields": [
        {
          "fieldId": "RR_IS_RESIDENTIAL_CARE_NEEDED",
          "name": "isResidentialCareNeeded",
          "label": "Is residential care needed?",
          "type": "yes_no",
          "required": true
        },
        {
          "fieldId": "RR_FACILITY_LOCATION_CSB_REGION",
          "name": "facilityLocationCsbRegion",
          "label": "Facility location/CSB/Region",
          "type": "selectInfoNeeded",
          "required": true,
          "section": "auxiliaryGrant",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "options": [
              {
                "label": "Northern VA",
                "value": "Northern VA",
                "rates": {
                  "baseRate": 2418
                }
              },
              {
                "label": "All Other Regions",
                "value": "All Other Regions",
                "rates": {
                  "baseRate": 2103
                }
              }
            ],
            "dependsOn": [
              {
                "fieldName": "isResidentialCareNeeded",
                "value": true
              }
            ]
          }
        },
        {
          "fieldId": "RR_POTENTIAL_PLACEMENT_FACILITY_TYPE",
          "name": "potentialPlacementFacilityType",
          "label": "Potential placement facility type",
          "type": "selectInfoNeeded",
          "required": true,
          "section": "functionalStatus",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "options": [
              {
                "label": "Assisted Living/Group Home",
                "value": "Assisted Living/Group Home",
                "rates": {
                  "cap": 6875
                }
              },
              {
                "label": "Memory Care",
                "value": "Memory Care",
                "rates": {
                  "cap": 7933
                }
              },
              {
                "label": "Nursing Facility",
                "value": "Nursing Facility",
                "rates": {
                  "cap": 8991
                }
              },
              {
                "label": "Assisted Living/Group Home - Northern",
                "value": "Assisted Living/Group Home - Northern",
                "rates": {
                  "cap": 7906
                }
              },
              {
                "label": "Memory Care - Northern",
                "value": "Memory Care - Northern",
                "rates": {
                  "cap": 9123
                }
              },
              {
                "label": "Nursing Facility - Northern",
                "value": "Nursing Facility - Northern",
                "rates": {
                  "cap": 10340
                }
              }
            ],
            "dependsOn": [
              {
                "fieldName": "isResidentialCareNeeded",
                "value": true
              }
            ]
          }
        },
        {
          "fieldId": "RR_UAI_SECTION_2_FUNCTIONAL_STATUS_ADLS_AND_AMBULATION",
          "name": "adlsAndAmbulation",
          "label": "UAI Section 2 - Functional Status - ADLs and Ambulation",
          "type": "selectInfoNeeded",
          "required": true,
          "section": "functionalStatus",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "options": [
              {
                "label": "Ambulation - no assistance needed or supervision only",
                "value": "Ambulation - no assistance needed or supervision only"
              },
              {
                "label": "Ambulation - physical assistance needed",
                "value": "Ambulation - physical assistance needed",
                "rates": {
                  "northern": 643,
                  "all_others": 559
                }
              }
            ],
            "dependsOn": [
              {
                "fieldName": "isResidentialCareNeeded",
                "value": true
              }
            ]
          }
        },
        {
          "fieldId": "RR_UAI_SECTION_2_CONTINENCE",
          "name": "continence",
          "label": "UAI Section 2  - Continence - Continence",
          "type": "selectInfoNeeded",
          "required": true,
          "section": "functionalStatus",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "options": [
              {
                "label": "Continence - no assistance needed or supervision only",
                "value": "Continence - no assistance needed or supervision only"
              },
              {
                "label": "Continence - not self care/needs help",
                "value": "Continence - not self care/needs help",
                "rates": {
                  "northern": 643,
                  "all_others": 559
                }
              }
            ],
            "dependsOn": [
              {
                "fieldName": "isResidentialCareNeeded",
                "value": true
              }
            ]
          }
        },
        {
          "fieldId": "RR_UAI_SECTION_2_FUNCTIONAL_STATUS_EATING_AND_FEEDING",
          "name": "eatingAndFeeding",
          "label": "UAI Section 2 - Functional Status - Eating and Feeding",
          "type": "selectInfoNeeded",
          "required": true,
          "section": "functionalStatus",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "options": [
              {
                "label":
                  "Eating/Feeding - no assistance needed, supervision only or minimal assistance",
                "value":
                  "Eating/Feeding - no assistance needed, supervision only or minimal assistance"
              },
              {
                "label": "Eating/Feeding - Performed by others",
                "value": "Eating/Feeding - Performed by others",
                "rates": {
                  "northern": 1446,
                  "all_others": 1257
                }
              }
            ]
          }
        },
        {
          "fieldId":
            "RR_UAI_SECTION_2_FUNCTIONAL_STATUS_BATHING_DRESSING_TOILETING_AND_TRANSFERS",
          "name": "bathingDressingToiletingAndTransfers",
          "label":
            "UAI Section 2 - Functional Status - Bathing, dressing, toileting, and transfers",
          "type": "selectInfoNeeded",
          "required": true,
          "section": "functionalStatus",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "options": [
              {
                "label":
                  "Bathing, dressing, transfers - no assistance needed, supervision only or minimal assistance",
                "value":
                  "Bathing, dressing, transfers - no assistance needed, supervision only or minimal assistance"
              },
              {
                "label": "Bathing, dressing, transfers - Performed by others",
                "value": "Bathing, dressing, transfers - Performed by others",
                "rates": {
                  "northern": 1446,
                  "all_others": 1257
                }
              }
            ]
          }
        },
        {
          "fieldId":
            "RR_UAI_SECTION_3_PHYSICAL_HEALTH_ASSESSMENT_DIAGNOSES_AND_MEDICATION_PROFILE_1",
          "name": "majorActiveDiagnoses1",
          "label":
            "UAI Section 3 - Physical Health Assessment: Diagnoses & Medication Profile - #1",
          "type": "selectInfoNeeded",
          "required": true,
          "section": "functionalStatus",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "options": [
              {
                "label": "Not applicable - no health conditions",
                "value": "Not applicable - no health conditions"
              },
              {
                "label": " Cancer (03)",
                "value": " Cancer (03)",
                "rates": {
                  "northern": 643,
                  "all_others": 559
                }
              },
              {
                "label": " Dementia (08,09), Developmental Disabilities (10-17)",
                "value": " Dementia (08,09), Developmental Disabilities (10-17)",
                "rates": {
                  "northern": 482,
                  "all_others": 419
                }
              },
              {
                "label": " Diabetes (19) or renal failure (40)",
                "value": " Diabetes (19) or renal failure (40)",
                "rates": {
                  "northern": 482,
                  "all_others": 419
                }
              },
              {
                "label": " Immune System Disorders / HIV (22)",
                "value": " Immune System Disorders / HIV (22)",
                "rates": {
                  "northern": 482,
                  "all_others": 419
                }
              },
              {
                "label": " Psychiatric Disorders (30-35)",
                "value": " Psychiatric Disorders (30-35)",
                "rates": {
                  "northern": 482,
                  "all_others": 419
                }
              },
              {
                "label": " Neurological Problems Brain Trauma/Injury (26-29)",
                "value": " Neurological Problems Brain Trauma/Injury (26-29)",
                "rates": {
                  "northern": 1521,
                  "all_others": 1521
                }
              }
            ]
          }
        },
        {
          "fieldId":
            "RR_UAI_SECTION_3_PHYSICAL_HEALTH_ASSESSMENT_DIAGNOSES_AND_MEDICATION_PROFILE_2",
          "name": "majorActiveDiagnoses2",
          "label":
            "UAI Section 3 - Physical Health Assessment: Diagnoses & Medication Profile - #2",
          "type": "selectInfoNeeded",
          "required": true,
          "section": "functionalStatus",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "options": [
              {
                "label": "Not applicable - no health conditions",
                "value": "Not applicable - no health conditions"
              },
              {
                "label": " Cancer (03)",
                "value": " Cancer (03)",
                "rates": {
                  "northern": 643,
                  "all_others": 559
                }
              },
              {
                "label": " Dementia (08,09), Developmental Disabilities (10-17)",
                "value": " Dementia (08,09), Developmental Disabilities (10-17)",
                "rates": {
                  "northern": 482,
                  "all_others": 419
                }
              },
              {
                "label": " Diabetes (19) or renal failure (40)",
                "value": " Diabetes (19) or renal failure (40)",
                "rates": {
                  "northern": 482,
                  "all_others": 419
                }
              },
              {
                "label": " Immune System Disorders / HIV (22)",
                "value": " Immune System Disorders / HIV (22)",
                "rates": {
                  "northern": 482,
                  "all_others": 419
                }
              },
              {
                "label": " Psychiatric Disorders (30-35)",
                "value": " Psychiatric Disorders (30-35)",
                "rates": {
                  "northern": 482,
                  "all_others": 419
                }
              },
              {
                "label": " Neurological Problems Brain Trauma/Injury (26-29)",
                "value": " Neurological Problems Brain Trauma/Injury (26-29)",
                "rates": {
                  "northern": 1521,
                  "all_others": 1521
                }
              }
            ]
          }
        },
        {
          "fieldId":
            "RR_UAI_SECTION_3_PHYSICAL_HEALTH_ASSESSMENT_DIAGNOSES_AND_MEDICATION_PROFILE_3",
          "name": "majorActiveDiagnoses3",
          "label":
            "UAI Section 3 - Physical Health Assessment: Diagnoses & Medication Profile - #3",
          "type": "selectInfoNeeded",
          "required": true,
          "section": "functionalStatus",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "options": [
              {
                "label": "Not applicable - no health conditions",
                "value": "Not applicable - no health conditions"
              },
              {
                "label": " Cancer (03)",
                "value": " Cancer (03)",
                "rates": {
                  "northern": 643,
                  "all_others": 559
                }
              },
              {
                "label": " Dementia (08,09), Developmental Disabilities (10-17)",
                "value": " Dementia (08,09), Developmental Disabilities (10-17)",
                "rates": {
                  "northern": 482,
                  "all_others": 419
                }
              },
              {
                "label": " Diabetes (19) or renal failure (40)",
                "value": " Diabetes (19) or renal failure (40)",
                "rates": {
                  "northern": 482,
                  "all_others": 419
                }
              },
              {
                "label": " Immune System Disorders / HIV (22)",
                "value": " Immune System Disorders / HIV (22)",
                "rates": {
                  "northern": 482,
                  "all_others": 419
                }
              },
              {
                "label": " Psychiatric Disorders (30-35)",
                "value": " Psychiatric Disorders (30-35)",
                "rates": {
                  "northern": 482,
                  "all_others": 419
                }
              },
              {
                "label": " Neurological Problems Brain Trauma/Injury (26-29)",
                "value": " Neurological Problems Brain Trauma/Injury (26-29)",
                "rates": {
                  "northern": 1521,
                  "all_others": 1521
                }
              }
            ]
          }
        },
        {
          "fieldId": "RR_UAI_SECTION_3_SENSORY_FUNCTIONS",
          "name": "sensoryFunctions",
          "label": "UAI Section 3 Sensory Functions - Vision, Hearing, Speech",
          "type": "selectInfoNeeded",
          "required": true,
          "section": "functionalStatus",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "options": [
              {
                "label": " Sensory functions - No Impairment",
                "value": " Sensory functions - No Impairment",
                "rates": {
                  "northern": 0,
                  "all_others": 0
                }
              },
              {
                "label": " Sensory functions - Impairment",
                "value": " Sensory functions - Impairment",
                "rates": {
                  "northern": 0,
                  "all_others": 0
                }
              },
              {
                "label": " Sensory functions - Complete Loss (any one)",
                "value": " Sensory functions - Complete Loss (any one)",
                "rates": {
                  "northern": 963,
                  "all_others": 837
                }
              }
            ]
          }
        },
        {
          "fieldId": "RR_UAI_SECTION_3_BEHAVIOR_PATTERN",
          "name": "behaviorPattern",
          "label": "Behavior pattern",
          "type": "select",
          "required": true,
          "section": "behaviors",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "options": [
              {
                "label": " Behavior pattern - Appropriate",
                "value": " Behavior pattern - Appropriate"
              },
              {
                "label":
                  " Behavior pattern - Wandering / Passive - Less than weekly",
                "value":
                  " Behavior pattern - Wandering / Passive - Less than weekly"
              },
              {
                "label":
                  " Behavior pattern - Wandering / Passive - Weekly or more",
                "value":
                  " Behavior pattern - Wandering / Passive - Weekly or more"
              },
              {
                "label":
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Less than weekly",
                "value":
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Less than weekly"
              },
              {
                "label":
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Weekly or more",
                "value":
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Weekly or more"
              }
            ]
          }
        },
        {
          "fieldId": "RR_UAI_SECTION_3_BEHAVIORAL_INTERVENTION_ASSAULTS",
          "name": "behavioralInterventionAssaults",
          "label": "Prevention of assaults or injuries to others",
          "type": "selectBehaviorScore",
          "required": true,
          "section": "behaviors",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "options": [
              {
                "label": " No Support Needed",
                "value": " No Support Needed"
              },
              {
                "label": " Some Support Needed",
                "value": " Some Support Needed"
              },
              {
                "label": " Extensive Support Needed",
                "value": " Extensive Support Needed"
              }
            ],
            "dependsOn": [
              {
                "fieldName": "behaviorPattern",
                "value": [
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Less than weekly",
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Weekly or more"
                ]
              }
            ]
          }
        },
        {
          "fieldId": "RR_UAI_SECTION_3_BEHAVIORAL_INTERVENTION_ASSAULTS_NOTES",
          "name": "behavioralInterventionAssaultsNotes",
          "label": "Comments",
          "type": "textarea",
          "required": true,
          "section": "behaviors",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "behaviorPattern",
                "value": [
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Less than weekly",
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Weekly or more"
                ]
              },
              {
                "fieldName": "behavioralInterventionAssaults",
                "value": [" Some Support Needed", " Extensive Support Needed"]
              }
            ],
            "placeholder": "Explanation required"
          }
        },
        {
          "fieldId": "RR_UAI_SECTION_3_BEHAVIORAL_INTERVENTION_DESTRUCTION",
          "name": "behavioralInterventionDestruction",
          "label":
            "Prevention of property destruction (e.g. fire setting, breaking furniture)",
          "type": "selectBehaviorScore",
          "required": true,
          "section": "behaviors",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "behaviorPattern",
                "value": [
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Less than weekly",
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Weekly or more"
                ]
              }
            ],
            "options": [
              {
                "label": " No Support Needed",
                "value": " No Support Needed"
              },
              {
                "label": " Some Support Needed",
                "value": " Some Support Needed"
              },
              {
                "label": " Extensive Support Needed",
                "value": " Extensive Support Needed"
              }
            ]
          }
        },
        {
          "fieldId": "RR_UAI_SECTION_3_BEHAVIORAL_INTERVENTION_DESTRUCTION_NOTES",
          "name": "behavioralInterventionDestructionNotes",
          "label": "Comments",
          "type": "textarea",
          "required": true,
          "section": "behaviors",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "behaviorPattern",
                "value": [
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Less than weekly",
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Weekly or more"
                ]
              },
              {
                "fieldName": "behavioralInterventionDestruction",
                "value": [" Some Support Needed", " Extensive Support Needed"]
              }
            ]
          }
        },
        {
          "fieldId": "RR_UAI_SECTION_3_BEHAVIORAL_INTERVENTION_STEALING",
          "name": "behavioralInterventionStealing",
          "label": "Prevention of stealing",
          "type": "selectBehaviorScore",
          "required": true,
          "section": "behaviors",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "behaviorPattern",
                "value": [
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Less than weekly",
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Weekly or more"
                ]
              }
            ],
            "options": [
              {
                "label": " No Support Needed",
                "value": " No Support Needed"
              },
              {
                "label": " Some Support Needed",
                "value": " Some Support Needed"
              },
              {
                "label": " Extensive Support Needed",
                "value": " Extensive Support Needed"
              }
            ]
          }
        },
        {
          "fieldId": "RR_UAI_SECTION_3_BEHAVIORAL_INTERVENTION_STEALING_NOTES",
          "name": "behavioralInterventionStealingNotes",
          "label": "Comments",
          "type": "textarea",
          "required": true,
          "section": "behaviors",
          "fieldConfig": {
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "behaviorPattern",
                "value": [
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Less than weekly",
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Weekly or more"
                ]
              },
              {
                "fieldName": "behavioralInterventionStealing",
                "value": [" Some Support Needed", " Extensive Support Needed"]
              }
            ]
          }
        },
        {
          "fieldId": "RR_UAI_SECTION_3_BEHAVIORAL_INTERVENTION_SELF_INJURY",
          "name": "behavioralInterventionSelfInjury",
          "label": "Prevention of self-injury",
          "type": "selectBehaviorScore",
          "required": true,
          "section": "behaviors",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "behaviorPattern",
                "value": [
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Less than weekly",
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Weekly or more"
                ]
              }
            ],
            "options": [
              {
                "label": " No Support Needed",
                "value": " No Support Needed"
              },
              {
                "label": " Some Support Needed",
                "value": " Some Support Needed"
              },
              {
                "label": " Extensive Support Needed",
                "value": " Extensive Support Needed"
              }
            ]
          }
        },
        {
          "fieldId": "RR_UAI_SECTION_3_BEHAVIORAL_INTERVENTION_SELF_INJURY_NOTES",
          "name": "behavioralInterventionSelfInjuryNotes",
          "label": "Comments",
          "type": "textarea",
          "required": true,
          "section": "behaviors",
          "fieldConfig": {
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "behaviorPattern",
                "value": [
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Less than weekly",
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Weekly or more"
                ]
              },
              {
                "fieldName": "behavioralInterventionSelfInjury",
                "value": [" Some Support Needed", " Extensive Support Needed"]
              }
            ]
          }
        },
        {
          "fieldId":
            "RR_UAI_SECTION_3_BEHAVIORAL_INTERVENTION_INTRUSIVE_BEHAVIOR",
          "name": "behavioralInterventionIntrusiveBehavior",
          "label": "Prevention of Intrusive Behavior with Peers",
          "type": "selectBehaviorScore",
          "required": true,
          "section": "behaviors",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "behaviorPattern",
                "value": [
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Less than weekly",
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Weekly or more"
                ]
              }
            ],
            "options": [
              {
                "label": " No Support Needed",
                "value": " No Support Needed"
              },
              {
                "label": " Some Support Needed",
                "value": " Some Support Needed"
              },
              {
                "label": " Extensive Support Needed",
                "value": " Extensive Support Needed"
              }
            ]
          }
        },
        {
          "fieldId":
            "RR_UAI_SECTION_3_BEHAVIORAL_INTERVENTION_INTRUSIVE_BEHAVIOR_NOTES",
          "name": "behavioralInterventionIntrusiveBehaviorNotes",
          "label": "Comments",
          "type": "textarea",
          "required": true,
          "section": "behaviors",
          "fieldConfig": {
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "behaviorPattern",
                "value": [
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Less than weekly",
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Weekly or more"
                ]
              },
              {
                "fieldName": "behavioralInterventionIntrusiveBehavior",
                "value": [" Some Support Needed", " Extensive Support Needed"]
              }
            ]
          }
        },
        {
          "fieldId": "RR_UAI_SECTION_3_BEHAVIORAL_INTERVENTION_SUICIDE",
          "name": "behavioralInterventionSuicide",
          "label": "Prevention of suicide attempts",
          "type": "selectBehaviorScore",
          "required": true,
          "section": "behaviors",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "behaviorPattern",
                "value": [
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Less than weekly",
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Weekly or more"
                ]
              }
            ],
            "options": [
              {
                "label": " No Support Needed",
                "value": " No Support Needed"
              },
              {
                "label": " Some Support Needed",
                "value": " Some Support Needed"
              },
              {
                "label": " Extensive Support Needed",
                "value": " Extensive Support Needed"
              }
            ]
          }
        },
        {
          "fieldId": "RR_UAI_SECTION_3_BEHAVIORAL_INTERVENTION_SUICIDE_NOTES",
          "name": "behavioralInterventionSuicideNotes",
          "label": "Comments",
          "type": "textarea",
          "required": true,
          "section": "behaviors",
          "fieldConfig": {
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "behaviorPattern",
                "value": [
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Less than weekly",
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Weekly or more"
                ]
              },
              {
                "fieldName": "behavioralInterventionSuicide",
                "value": [" Some Support Needed", " Extensive Support Needed"]
              }
            ]
          }
        },
        {
          "fieldId": "RR_UAI_SECTION_3_BEHAVIORAL_INTERVENTION_SEXUAL_AGGRESSION",
          "name": "behavioralInterventionSexualAggression",
          "label": "Prevention of sexual aggression",
          "type": "selectBehaviorScore",
          "required": true,
          "section": "behaviors",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "behaviorPattern",
                "value": [
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Less than weekly",
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Weekly or more"
                ]
              }
            ],
            "options": [
              {
                "label": " No Support Needed",
                "value": " No Support Needed"
              },
              {
                "label": " Some Support Needed",
                "value": " Some Support Needed"
              },
              {
                "label": " Extensive Support Needed",
                "value": " Extensive Support Needed"
              }
            ]
          }
        },
        {
          "fieldId":
            "RR_UAI_SECTION_3_BEHAVIORAL_INTERVENTION_SEXUAL_AGGRESSION_NOTES",
          "name": "behavioralInterventionSexualAggressionNotes",
          "label": "Comments",
          "type": "textarea",
          "required": true,
          "section": "behaviors",
          "fieldConfig": {
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "behaviorPattern",
                "value": [
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Less than weekly",
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Weekly or more"
                ]
              },
              {
                "fieldName": "behavioralInterventionSexualAggression",
                "value": [" Some Support Needed", " Extensive Support Needed"]
              }
            ]
          }
        },
        {
          "fieldId": "RR_UAI_SECTION_3_BEHAVIORAL_INTERVENTION_NON_AGGRESSIVE",
          "name": "behavioralInterventionNonAggressive",
          "label": "Prevention of non-aggressive but inappropriate behavior",
          "type": "selectBehaviorScore",
          "required": true,
          "section": "behaviors",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "behaviorPattern",
                "value": [
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Less than weekly",
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Weekly or more"
                ]
              }
            ],
            "options": [
              {
                "label": " No Support Needed",
                "value": " No Support Needed"
              },
              {
                "label": " Some Support Needed",
                "value": " Some Support Needed"
              },
              {
                "label": " Extensive Support Needed",
                "value": " Extensive Support Needed"
              }
            ]
          }
        },
        {
          "fieldId":
            "RR_UAI_SECTION_3_BEHAVIORAL_INTERVENTION_NON_AGGRESSIVE_NOTES",
          "name": "behavioralInterventionNonAggressiveNotes",
          "label": "Comments",
          "type": "textarea",
          "required": true,
          "section": "behaviors",
          "fieldConfig": {
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "behaviorPattern",
                "value": [
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Less than weekly",
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Weekly or more"
                ]
              },
              {
                "fieldName": "behavioralInterventionNonAggressive",
                "value": [" Some Support Needed", " Extensive Support Needed"]
              }
            ]
          }
        },
        {
          "fieldId": "RR_UAI_SECTION_3_BEHAVIORAL_INTERVENTION_TANTRUMS",
          "name": "behavioralInterventionTantrums",
          "label": "Prevention of tantrums or emotional outbursts",
          "type": "selectBehaviorScore",
          "required": true,
          "section": "behaviors",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "behaviorPattern",
                "value": [
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Less than weekly",
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Weekly or more"
                ]
              }
            ],
            "options": [
              {
                "label": " No Support Needed",
                "value": " No Support Needed"
              },
              {
                "label": " Some Support Needed",
                "value": " Some Support Needed"
              },
              {
                "label": " Extensive Support Needed",
                "value": " Extensive Support Needed"
              }
            ]
          }
        },
        {
          "fieldId": "RR_UAI_SECTION_3_BEHAVIORAL_INTERVENTION_TANTRUMS_NOTES",
          "name": "behavioralInterventionTantrumsNotes",
          "label": "Comments",
          "type": "textarea",
          "required": true,
          "section": "behaviors",
          "fieldConfig": {
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "behaviorPattern",
                "value": [
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Less than weekly",
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Weekly or more"
                ]
              },
              {
                "fieldName": "behavioralInterventionTantrums",
                "value": [" Some Support Needed", " Extensive Support Needed"]
              }
            ]
          }
        },
        {
          "fieldId": "RR_UAI_SECTION_3_BEHAVIORAL_INTERVENTION_WANDERING",
          "name": "behavioralInterventionWandering",
          "label": "Prevention of wandering",
          "type": "selectBehaviorScore",
          "required": true,
          "section": "behaviors",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "behaviorPattern",
                "value": [
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Less than weekly",
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Weekly or more"
                ]
              }
            ],
            "options": [
              {
                "label": " No Support Needed",
                "value": " No Support Needed"
              },
              {
                "label": " Some Support Needed",
                "value": " Some Support Needed"
              },
              {
                "label": " Extensive Support Needed",
                "value": " Extensive Support Needed"
              }
            ]
          }
        },
        {
          "fieldId": "RR_UAI_SECTION_3_BEHAVIORAL_INTERVENTION_WANDERING_NOTES",
          "name": "behavioralInterventionWanderingNotes",
          "label": "Comments",
          "type": "textarea",
          "required": true,
          "section": "behaviors",
          "fieldConfig": {
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "behaviorPattern",
                "value": [
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Less than weekly",
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Weekly or more"
                ]
              },
              {
                "fieldName": "behavioralInterventionWandering",
                "value": [" Some Support Needed", " Extensive Support Needed"]
              }
            ]
          }
        },
        {
          "fieldId": "RR_UAI_SECTION_3_BEHAVIORAL_INTERVENTION_SUBSTANCE_ABUSE",
          "name": "behavioralInterventionSubstanceAbuse",
          "label": "Prevention of substance abuse",
          "type": "selectBehaviorScore",
          "required": true,
          "section": "behaviors",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "behaviorPattern",
                "value": [
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Less than weekly",
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Weekly or more"
                ]
              }
            ],
            "options": [
              {
                "label": " No Support Needed",
                "value": " No Support Needed"
              },
              {
                "label": " Some Support Needed",
                "value": " Some Support Needed"
              },
              {
                "label": " Extensive Support Needed",
                "value": " Extensive Support Needed"
              }
            ]
          }
        },
        {
          "fieldId":
            "RR_UAI_SECTION_3_BEHAVIORAL_INTERVENTION_SUBSTANCE_ABUSE_NOTES",
          "name": "behavioralInterventionSubstanceAbuseNotes",
          "label": "Comments",
          "type": "textarea",
          "required": true,
          "section": "behaviors",
          "fieldConfig": {
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "behaviorPattern",
                "value": [
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Less than weekly",
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Weekly or more"
                ]
              },
              {
                "fieldName": "behavioralInterventionSubstanceAbuse",
                "value": [" Some Support Needed", " Extensive Support Needed"]
              }
            ]
          }
        },
        {
          "fieldId": "RR_UAI_SECTION_3_BEHAVIORAL_INTERVENTION_MAINTENANCE",
          "name": "behavioralInterventionMaintenance",
          "label": "Maintenance of mental health treatments",
          "type": "selectBehaviorScore",
          "required": true,
          "section": "behaviors",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "behaviorPattern",
                "value": [
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Less than weekly",
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Weekly or more"
                ]
              }
            ],
            "options": [
              {
                "label": " No Support Needed",
                "value": " No Support Needed"
              },
              {
                "label": " Some Support Needed",
                "value": " Some Support Needed"
              },
              {
                "label": " Extensive Support Needed",
                "value": " Extensive Support Needed"
              }
            ]
          }
        },
        {
          "fieldId": "RR_UAI_SECTION_3_BEHAVIORAL_INTERVENTION_MAINTENANCE_NOTES",
          "name": "behavioralInterventionMaintenanceNotes",
          "label": "Comments",
          "type": "textarea",
          "required": true,
          "section": "behaviors",
          "fieldConfig": {
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "behaviorPattern",
                "value": [
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Less than weekly",
                  " Behavior pattern - Abusive / Aggressive / Disruptive - Weekly or more"
                ]
              },
              {
                "fieldName": "behavioralInterventionMaintenance",
                "value": [" Some Support Needed", " Extensive Support Needed"]
              }
            ]
          }
        },
        {
          "fieldId": "RR_DAP_BEHAVIORAL_ASSESSMENT_FORM",
          "name": "descriptionOfBehaviors",
          "label": "DAP Behavioral Assessment Form - Description of behaviors",
          "type": "selectInfoNeeded",
          "required": true,
          "section": "behaviors",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "options": [
              { 
                "label": " Behavior total",
                "value": " Behavior total",
                "rates": {
                  "northern": 0,
                  "all_others": 0
                }
              },
              {
                "label": " Disruptive - Behavioral supplement score 1-3",
                "value": " Disruptive - Behavioral supplement score 1-3",
                "rates": {
                  "northern": 320,
                  "all_others": 279
                }
              },
              {
                "label": " Disruptive - Behavioral supplement score 4-6",
                "value": " Disruptive - Behavioral supplement score 4-6",
                "rates": {
                  "northern": 482,
                  "all_others": 419
                }
              },
              {
                "label": " Disruptive - Behavioral supplement score 7-9",
                "value": " Disruptive - Behavioral supplement score 7-9",
                "rates": {
                  "northern": 643,
                  "all_others": 559
                }
              },
              {
                "label": " Disruptive - Behavioral supplement score 10-12",
                "value": " Disruptive - Behavioral supplement score 10-12",
                "rates": {
                  "northern": 1285,
                  "all_others": 1117
                }
              },
              {
                "label": " Disruptive - Behavioral supplement score 13-15",
                "value": " Disruptive - Behavioral supplement score 13-15",
                "rates": {
                  "northern": 1929,
                  "all_others": 1677
                }
              },
              {
                "label": " Disruptive - Behavioral supplement score 16-20",
                "value": " Disruptive - Behavioral supplement score 16-20",
                "rates": {
                  "northern": 2570,
                  "all_others": 2235
                }
              },
              {
                "label":
                  " Disruptive - Behavioral Supplement Score 21-24 daily staff log required",
                "value":
                  " Disruptive - Behavioral Supplement Score 21-24 daily staff log required",
                "rates": {
                  "northern": 5783,
                  "all_others": 5029
                }
              }
            ]
          }
        },
        {
          "fieldId": "RR_EXTRAORDINARY_CIRCUMSTANCES_PAYMENT_REQUEST_DESCRIPTION",
          "name": "extraordinaryCircumstancesPaymentRequestDescription",
          "type": "textarea",
          "label": "Extraordinary ...",
          "required": false,
          "section": "behaviors",
          "fieldConfig": {
            "validations": [],
            "placeholder":
              "Extraordinary circumstances payment request - please provide description"
          }
        },
        {
          "fieldId": "RR_SOCIAL_HISTORY_NGRI",
          "name": "socialHistoryNgri",
          "type": "selectInfoNeeded",
          "label": "NGRI or pending trial/incompetent to stand trial",
          "required": false,
          "section": "socialHistory",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "options": [
              {
                "label": "NGRI - not applicable",
                "value": "NGRI - not applicable"
              },
              {
                "label": "NGRI - non-violent offence",
                "value": "NGRI - non-violent offence",
                "rates": {
                  "northern": 500,
                  "all_others": 500
                }
              },
              {
                "label": "NGRI - violent offence",
                "value": "NGRI - violent offence",
                "rates": {
                  "northern": 1000,
                  "all_others": 1000
                }
              }
            ]
          }
        },
        {
          "fieldId": "RR_SOCIAL_HISTORY_SEX_OFFENDER",
          "name": "socialHistorySexOffender",
          "type": "selectInfoNeeded",
          "label": "Registered Sex Offender",
          "required": false,
          "section": "socialHistory",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "options": [
              {
                "label": "Registered sex offender - not applicable",
                "value": "Registered sex offender - not applicable"
              },
              {
                "label": "Registered sex offender - non-violent",
                "value": "Registered sex offender - non-violent",
                "rates": {
                  "northern": 750,
                  "all_others": 750
                }
              },
              {
                "label": "Registered sex offender - violent",
                "value": "Registered sex offender - violent",
                "rates": {
                  "northern": 1000,
                  "all_others": 1000
                }
              }
            ]
          }
        },
        {
          "fieldId": "RR_SOCIAL_HISTORY_ARSON",
          "name": "socialHistoryArson",
          "type": "selectInfoNeeded",
          "label": "Arson",
          "required": false,
          "section": "socialHistory",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "options": [
              {
                "label": "Arson - not applicable",
                "value": "Arson - not applicable"
              },
              {
                "label": "Arson",
                "value": "Arson",
                "rates": {
                  "northern": 1000,
                  "all_others": 1000
                }
              }
            ]
          }
        },
        {
          "fieldId": "RR_SOCIAL_HISTORY_OTHER",
          "name": "socialHistoryOther",
          "type": "selectInfoNeeded",
          "label": "Other significant social history impeding hospital discharge",
          "required": false,
          "section": "socialHistory",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "options": [
              {
                "label": "Not applicable",
                "value": "Not applicable"
              },
              {
                "label": "No legal decision maker currently in place",
                "value": "No legal decision maker currently in place",
                "rates": {
                  "northern": 1000,
                  "all_others": 1000
                }
              }
            ]
          }
        },
        {
          "fieldId": "RR_FACILITY_INFO_LICENSURE_STATUS",
          "name": "licensureStatus",
          "type": "selectInfoNeeded",
          "label": "Licensure status",
          "required": false,
          "section": "facilityInformation",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "options": [
              {
                "label": "Unlicensed facility",
                "value": "Unlicensed facility",
                "rates": {
                  "northern": 0,
                  "all_others": 0
                }
              },
              {
                "label": "Licensed facility",
                "value": "Licensed facility",
                "rates": {
                  "northern": 500,
                  "all_others": 500
                }
              }
            ]
          }
        },
        {
          "fieldId": "RR_FACILITY_INFO_TRAINING_NEEDS",
          "name": "trainingNeeds",
          "type": "selectInfoNeeded",
          "label": "Training needs",
          "required": false,
          "section": "facilityInformation",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "options": [
              {
                "label": "No special training needs beyond those required",
                "value": "No special training needs beyond those required",
                "rates": {
                  "northern": 0,
                  "all_others": 0
                }
              },
              {
                "label":
                  "Special behavioral or medical management needs beyond those required",
                "value":
                  "Special behavioral or medical management needs beyond those required",
                "rates": {
                  "northern": 575,
                  "all_others": 500
                }
              }
            ]
          }
        },
        {
          "fieldId": "RR_PERSON_COMPLETING_REQUEST",
          "name": "personCompletingRequest",
          "type": "text",
          "label": "Person completing request",
          "required": true,
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 6
            },
            "placeholder": "Enter name"
          }
        },
        {
          "fieldId": "RR_PERSON_REVIEWING_AUTHORIZING",
          "name": "personReviewingAuthorizing",
          "type": "text",
          "label": "Person reviewing/authorizing",
          "required": false,
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 6
            },
            "placeholder": "Enter name"
          }
        }
      ]
    },
    {
      "sectionId": "DISCHARGE_BARRIERS",
      "fields": [
        {
          "fieldId": "DISCHARGE_BARRIERS_BRIEF_DESCRIPTION",
          "name": "dischargeBarriersBriefDescription",
          "type": "textarea",
          "label":
            "Are there any barriers to discharge? Please provide a brief description of the discharge barriers.",
          "required": true,
          "fieldConfig": {
            "validations": [
              {
                "type": "maxLength",
                "value": 1000,
                "message": "Brief Description cannot exceed 1000 characters"
              }
            ],
            "layoutOptions": {
              "cols": 12
            },
            "placeholder": "Enter text"
          }
        },
        {
          "fieldId": "DISCHARGE_BARRIERS_ALTERNATIVES_TO_DAP_ATTEMPTED",
          "name": "dischargeBarriersAlternativesToDapAttempted",
          "type": "textarea",
          "label": "What alternatives to DAP have been attempted?",
          "required": true,
          "fieldConfig": {
            "validations": [
              {
                "type": "maxLength",
                "value": 1000,
                "message":
                  "Alternatives to DAP Attempted cannot exceed 1000 characters"
              }
            ],
            "layoutOptions": {
              "cols": 12
            },
            "placeholder": "Enter text",
            "helpText":
              "(For residential placements, please include which facilities that accept alternative payment sources have been attempted)"
          }
        },
        {
          "fieldId": "DISCHARGE_BARRIERS_PLAN_STEP_DOWN",
          "name": "dischargeBarriersPlanStepDown",
          "type": "textarea",
          "label": "What is the plan to step the person down off DAP?",
          "required": false,
          "fieldConfig": {
            "validations": [
              {
                "type": "maxLength",
                "value": 1000,
                "message":
                  "Alternatives to DAP Attempted cannot exceed 1000 characters"
              }
            ],
            "layoutOptions": {
              "cols": 12
            },
            "placeholder": "Enter text"
          }
        }
      ]
    },
    {
      "sectionId": "PATIENT_RESOURCES",
      "fields": [
        {
          "fieldId": "PATIENT_RESOURCES_PERSON_RESPONSIBLE_FOR_ACQUISITION_OF_BENEFITS",
          "name": "patientResourcesPersonResponsibleForAcquisitionOfBenefits",
          "type": "string",
          "label": "Person responsible for acquisition of benefits",
          "required": true,
          "fieldConfig": {
            "layoutOptions": {
              "cols": 9
            },
            "placeholder": "Enter name"
          }
        },
        {
          "fieldId": "PATIENT_RESOURCES_IS_AUXILIARY_GRANT_ELIGIBLE",
          "name": "patientResourcesIsAuxiliaryGrantEligible",
          "type": "yes_no",
          "label": "Auxiliary grant eligible",
          "required": false,
          "fieldConfig": {
            "layoutOptions": {
              "cols": 3
            }
          }
        },
        {
          "fieldId": "PATIENT_RESOURCES_ID_DD",
          "name": "patientResourcesIsIdDd",
          "type": "yes_no",
          "label": "ID / DD",
          "required": true,
          "fieldConfig": {
            "layoutOptions": {
              "cols": 12
            }
          }
        },
        {
          "fieldId": "PATIENT_RESOURCES_WAIVER_STATUS",
          "name": "patientResourcesWaiverStatus",
          "type": "select",
          "label": "Waiver Status",
          "required": true,
          "fieldConfig": {
            "options": [
              {
                "label": "Not Waiver Eligible",
                "value": "Not Waiver Eligible"
              },
              {
                "label": "On Waitlist",
                "value": "On Waitlist"
              },
              {
                "label": "Will be Referred",
                "value": "Will be Referred"
              },
              {
                "label": "Has Waiver",
                "value": "Has Waiver"
              },
              {
                "label": "N/A",
                "value": "N/A"
              }
            ]
          }
        },
        {
          "fieldId": "PATIENT_RESOURCES_INSURANCE",
          "name": "patientResourcesInsurance",
          "type": "select",
          "label": "Insurance",
          "required": true,
          "fieldConfig": {
            "options": [
              {
                "label": "Medicaid",
                "value": "medicaid"
              },
              {
                "label": "Medicare",
                "value": "medicare"
              },
              {
                "label": "Not Applicable",
                "value": "not_applicable"
              },
              {
                "label": "VA Benefits",
                "value": "va_benefits"
              }
            ],
            "layoutOptions": {
              "cols": 4
            }
          }
        },
        {
          "fieldId": "PATIENT_RESOURCES_INCOME",
          "name": "patientResourcesIncome",
          "type": "amount",
          "label": "Income",
          "required": false,
          "fieldConfig": {
            "layoutOptions": {
              "cols": 4
            }
          }
        },
        {
          "fieldId": "PATIENT_RESOURCES_OTHER",
          "name": "patientResourcesOther",
          "type": "amount",
          "label": "Other",
          "required": false,
          "fieldConfig": {
            "visibility": "hidden",
            "validations": [
              {
                "type": "maxLength",
                "value": 1000,
                "message":
                  "Patient Resources Other cannot exceed 1000 characters"
              }
            ],
            "placeholder": "Enter other financial assets",
            "layoutOptions": {
              "cols": 4
            }
          }
        }
      ]
    },
  
    {
      "sectionId": "CUSTOM_RATE_PLAN",
      "fields": [
        {
          "fieldId": "CUSTOM_RATE_PLAN_MODIFICATION",
          "name": "isCustomRatePlanModification",
          "type": "yes_no",
          "label": "Is a custom rate needed for the individual?",
          "fieldConfig": {
            "layoutOptions": {
              "cols": 3
            }
          }
        },
        {
          "fieldId": "CUSTOM_RATE_PLAN_APPLICATION_DATE",
          "name": "applicationDate",
          "type": "date",
          "label": "Application Date",
          "subSection": "customRateServiceRequested",
          "required": true,
          "fieldConfig": {
            "layoutOptions": {
              "cols": 4
            }
          }
        },
        {
          "fieldId": "CUSTOM_RATE_PLAN_CSB_CONTACT_INFORMATION",
          "name": "csbContactInformation",
          "type": "text",
          "label": "CSB contact information",
          "subSection": "customRateServiceRequested",
          "required": true,
          "fieldConfig": {
            "layoutOptions": {
              "cols": 4
            },
            "placeholder": "Enter information"
          }
        },
        {
          "fieldId": "CUSTOM_RATE_PLAN_PROVIDER_CONTACT_INFORMATION",
          "name": "providerContactInformation",
          "type": "text",
          "label": "Provider contact information",
          "subSection": "customRateServiceRequested",
          "required": true,
          "fieldConfig": {
            "layoutOptions": {
              "cols": 4
            },
            "placeholder": "Enter information"
          }
        },
        {
          "fieldId": "CUSTOM_RATE_PLAN_SERVICE_REQUESTED",
          "name": "serviceRequested",
          "type": "select",
          "label": "Service requested",
          "required": true,
          "subSection": "customRateServiceRequested",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "options": [
              {
                "label": "Transitional Support",
                "value": "Transitional Support"
              },
              {
                "label": "1:1 Support",
                "value": "1:1 Support"
              },
              {
                "label": "2:1 Support",
                "value": "2:1 Support"
              },
              {
                "label": "Program Oversight",
                "value": "Program Oversight"
              }
            ]
          }
        },
        {
          "fieldId": "CUSTOM_RATE_PLAN_TRANSITIONAL_SERVICE",
          "name": "transitionalService",
          "type": "select",
          "label": "Transitional service (Must Meet Both)",
          "required": true,
          "subSection": "customRateEligibility",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "serviceRequested",
                "value": [
                  "Transitional Support"
                ]
              }
            ],
            "options": [
              {
                "label":
                  "Individual has been in state facility for 12 months or longer",
                "value":
                  "Individual has been in state facility for 12 months or longer"
              },
              {
                "label":
                  "Individual is hospitalized and has been in more than 3 residential placements in the last 12 months",
                "value":
                  "Individual is hospitalized and has been in more than 3 residential placements in the last 12 months"
              },
              {
                "label":
                  "Individual has been hospitalized more than twice in the past 12 months",
                "value":
                  "Individual has been hospitalized more than twice in the past 12 months"
              }
            ]
          }
        },
        {
          "fieldId": "CUSTOM_RATE_PLAN_ALL_OTHER_SERVICES",
          "name": "allOtherServices",
          "type": "select",
          "label": "All Other Services",
          "required": true,
          "subSection": "customRateEligibility",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 12
            },
            "dependsOn": [
              {
                "fieldName": "serviceRequested",
                "value": [
                  "1:1 Support",
                  "2:1 Support",
                  "Program Oversight"
                ]
              }
            ],
            "options": [
              {
                "label":
                  "Individual scored 20 or higher on DAP Behavioral Assessment AND needs one of the avaliable supports in the customized rate plan",
                "value":
                  "Individual scored 20 or higher on DAP Behavioral Assessment AND needs one of the avaliable supports in the customized rate plan"
              },
              {
                "label":
                  "Individual rate on DAP Rate Tool is $200 or more a month than the designated CAP AND needs one of the avaliable supports in the customized rate plan",
                "value":
                  "Individual rate on DAP Rate Tool is $200 or more a month than the designated CAP AND needs one of the avaliable supports in the customized rate plan"
              },
              {
                "label":
                  "Individual has documented extraordinary behavioral or medical condition in which one of avaliable supports is needed for community integration.  (Note : Elopement is only considered a behavioral condition for individuals with extreme safety concerns.)",
                "value":
                  "Individual has documented extraordinary behavioral or medical condition in which one of avaliable supports is needed for community integration.  (Note : Elopement is only considered a behavioral condition for individuals with extreme safety concerns.)"
              }
            ]
          }
        },
        {
          "fieldId": "CUSTOM_RATE_PLAN_DESCRIBE_INDIVIDUALS_NEED_FOR_SERVICE",
          "name": "describeIndividualsNeedForService",
          "type": "textarea",
          "label": "Describe the individuals need for the service",
          "required": false,
          "subSection": "customRateEligibility",
          "fieldConfig": {
            "layoutOptions": {
              "cols": 12
            },
            "placeholder": "Enter Description"
          }
        },
        {
          "fieldId": "CUSTOM_RATE_PLAN_WHO_WILL_PROVIDE_THE_SERVICE",
          "name": "whoWillProvideTheService",
          "type": "select",
          "label": "Who will provide the service?",
          "required": true,
          "subSection": "customRateEligibility",
          "fieldConfig": {
            "validations": [],
            "layoutOptions": {
              "cols": 4
            },
            "options": [
              {
                "label": "DSP",
                "value": "DSP"
              },
              {
                "label": "Peer Support",
                "value": "Peer Support"
              },
              {
                "label": "CNA",
                "value": "CNA"
              },
              {
                "label": "LPN",
                "value": "LPN"
              },
              {
                "label": "QMHP",
                "value": "QMHP"
              },
              {
                "label": "RN",
                "value": "RN"
              },
              {
                "label": "LPC/LCSW",
                "value": "LPC/LCSW"
              }
            ]
          }
        },
        {
          "fieldId": "CUSTOM_RATE_PLAN_NUMBER_PER_DAY",
          "name": "numberOfHoursRequestedPerDay",
          "type": "number",
          "label": "For 1:1 or 2:1, what hours are requested?",
          "required": true,
          "subSection": "customRateEligibility",
          "fieldConfig": {
            "layoutOptions": {
              "cols": 4
            }
          }
        },
        {
          "fieldId": "CUSTOM_RATE_PLAN_SPECIFY_TIMES",
          "name": "specifyTimes",
          "type": "text",
          "label": "Specify times",
          "required": true,
          "subSection": "customRateEligibility",
          "fieldConfig": {
            "layoutOptions": {
              "cols": 4
            }
          }
        },
        {
          "fieldId": "CUSTOM_RATE_PLAN_ENABLE_FEATURE_1",
          "name": "forProgrammaticOversightCheckbox1",
          "type": "checkbox",
          "label": "For programmatic oversight what tasks will be completed?",
          "required": true,
          "subSection": "customRateEligibilityCheckbox",
          "fieldConfig": {
            "layoutOptions": {
              "cols": 3,
              "data": "Training to direct support staff specific to the individual served (especially as it relates to changes in care plan), which is evidence-based and/or evidence driven requiring adherence to support protocols."
            },
            "dependsOn": [
              {
                "fieldName": "serviceRequested",
                "value": [
                  "Program Oversight"
                ]
              }
            ]
          }
        },
        {
          "fieldId": "CUSTOM_RATE_PLAN_ENABLE_FEATURE_2",
          "name": "forProgrammaticOversightCheckbox2",
          "type": "checkbox",
          "label": "",
          "required": false,
          "subSection": "customRateEligibilityCheckbox",
          "fieldConfig": {
            "layoutOptions": {
              "cols": 3,
              "data": "Development of protocols specific for the individual served and implementation of the processes that drive effective, safe, evidence driven interventions/plans of care which result in outcomes that improve the daily life of the individual with high needs"
            },
            "dependsOn": [
              {
                "fieldName": "serviceRequested",
                "value": [
                  "Program Oversight"
                ]
              }
            ]
          }
        },
        {
          "fieldId": "CUSTOM_RATE_PLAN_ENABLE_FEATURE_3",
          "name": "forProgrammaticOversightCheckbox3",
          "type": "checkbox",
          "label": "",
          "required": false,
          "subSection": "customRateEligibilityCheckbox",
          "fieldConfig": {
            "layoutOptions": {
              "cols": 3,
              "data": "Oversight of medical or behavioral data specific to the individual served to assure proper implementation of protocols, including changing the protocols as needed as an individual navigates his or her environment successfully, to achieve maintenance at a less intense level of staffing and resources, which results in a higher quality of engaged life with the community and family."
            },
            "dependsOn": [
              {
                "fieldName": "serviceRequested",
                "value": [
                  "Program Oversight"
                ]
              }
            ]
          }
        },
        {
          "fieldId": "CUSTOM_RATE_PLAN_ENABLE_FEATURE_4",
          "name": "forProgrammaticOversightCheckbox4",
          "type": "checkbox",
          "label": "",
          "required": false,
          "subSection": "customRateEligibilityCheckbox",
          "fieldConfig": {
            "layoutOptions": {
              "cols": 3,
              "data": "Oversee resident and/or program participant care to ensure all aspects of services which are prescribed and/or recommended by service area experts are delivered according to the individual's identified financial, medical, behavioral, social, and emotional support needs."
            },
            "dependsOn": [
              {
                "fieldName": "serviceRequested",
                "value": [
                  "Program Oversight"
                ]
              }
            ]
          }
        },
        {
          "fieldId": "CUSTOM_RATE_PLAN_ENABLE_FEATURE_5",
          "name": "forProgrammaticOversightCheckbox5",
          "type": "checkbox",
          "label": "",
          "required": false,
          "subSection": "customRateEligibilityCheckbox",
          "fieldConfig": {
            "layoutOptions": {
              "cols": 3,
              "data": "Coordinate and/or facilitate patient related meetings and appointments to include medical appointments, behavioral health, psychiatric services, and individual service plan meetings."
            },
            "dependsOn": [
              {
                "fieldName": "serviceRequested",
                "value": [
                  "Program Oversight"
                ]
              }
            ]
          }
        },
        {
          "fieldId": "CUSTOM_RATE_PLAN_ENABLE_FEATURE_6",
          "name": "forProgrammaticOversightCheckbox6",
          "type": "checkbox",
          "label": "",
          "required": false,
          "subSection": "customRateEligibilityCheckbox",
          "fieldConfig": {
            "layoutOptions": {
              "cols": 3,
              "data": "Act as the primary point of contact for individual served providing individual and program specific information to stakeholders such as families, guardians, state representatives, and community services boards and make critical decisions related to overall program operations."
            },
            "dependsOn": [
              {
                "fieldName": "serviceRequested",
                "value": [
                  "Program Oversight"
                ]
              }
            ]
          }
        },
        {
          "fieldId": "CUSTOM_RATE_PLAN_REGIONAL_COMMITTEE_PERSON_APPROVING",
          "name": "customRatePlanRegionalCommitteePersonApproving",
          "type": "text",
          "label": "Person reviewing/authorizing",
          "required": true,
          "subSection": "customRateApproval",
          "fieldConfig": {
            "layoutOptions": {
              "cols": 12
            }
          }
        },
        {
          "fieldId": "CUSTOM_RATE_PLAN_REGIONAL_COMMITTEE_APPROVAL_STATUS",
          "name": "customRatePlanStateWideCommitteeApprovalStatus",
          "type": "string",
        },
        {
          "fieldId": "CUSTOM_RATE_PLAN_REGIONAL_COMMITTEE_APPROVAL_NOTES",
          "name": "customRatePlanRegionalCommitteeApprovalNotes",
          "type": "textarea",
          "label": "Notes",
          "required": false,
          "subSection": "customRateApproval",
          "fieldConfig": {
            "layoutOptions": {
              "cols": 12
            },
            "placeholder": "Reasons for approval/rejection"
          }
        },
        {
          "fieldId": "CUSTOM_RATE_PLAN_STATEWIDE_COMMITTEE_PERSON_APPROVING",
          "name": "customRatePlanStateWideCommitteePersonApproving",
          "type": "text",
          "label": "Person reviewing/authorizing",
          "required": true,
          "subSection": "customRateApproval",
          "fieldConfig": {
            "layoutOptions": {
              "cols": 12
            }
          }
        },
        {
          "fieldId": "CUSTOM_RATE_PLAN_STATEWIDE_COMMITTEE_APPROVAL_NOTES",
          "name": "customRatePlanStateWideCommitteeApprovalNotes",
          "type": "textarea",
          "label": "Notes",
          "required": false,
          "subSection": "customRateApproval",
          "fieldConfig": {
            "layoutOptions": {
              "cols": 12
            },
            "placeholder": "Reasons for approval/rejection"
          }
        },
        {
          "fieldId": "CUSTOM_RATE_PLAN_STATEWIDE_COMMITTEE_APPROVAL_STATUS",
          "name": "customRatePlanRegionalCommitteeApprovalStatus",
          "type": "string",
        },
        {
          "fieldId": "CUSTOM_RATE_PLAN_REGIONAL_MANAGER_PERSON_APPROVING",
          "name": "customRatePlanRegionalManagerPersonApproving",
          "type": "text",
          "label": "Person reviewing/authorizing",
          "required": true,
          "subSection": "customRateApproval",
          "fieldConfig": {
            "layoutOptions": {
              "cols": 12
            }
          }
        },
        {
          "fieldId": "CUSTOM_RATE_PLAN_REGIONAL_MANAGER_APPROVAL_NOTES",
          "name": "customRatePlanRegionalManagerApprovalNotes",
          "type": "textarea",
          "label": "Notes",
          "required": false,
          "subSection": "customRateApproval",
          "fieldConfig": {
            "layoutOptions": {
              "cols": 12
            },
            "placeholder": "Reasons for approval/rejection"
          }
        },
        {
          "fieldId": "CUSTOM_RATE_PLAN_REGIONAL_MANAGER_APPROVAL_STATUS",
          "name": "customRatePlanRegionalManagerApprovalStatus",
          "type": "string",
        },
        {
          "fieldId": "CUSTOM_RATE_PLAN_CTS_APPROVAL_COMMENTS",
          "name": "customRatePlanCTSApprovalComments",
          "type": "textarea",
          "label": "Community Transition Specialists Comments",
          "required": false,
          "subSection": "customRateApproval",
          "fieldConfig": {
            "layoutOptions": {
              "cols": 12
            },
            "placeholder": "Reasons for approval/rejection"
          }
        },
      ]
    }
  ]
}