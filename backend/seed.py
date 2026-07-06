import os
import sys
sys.path.append(os.getcwd())

from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app.models import Base, Scheme
from datetime import date

def seed_schemes():
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()
    
    # Check if schemes already exist
    if db.query(Scheme).count() > 0:
        print("Schemes already seeded.")
        return

    schemes_data = [
        {
            "scheme_name_en": "PM-KISAN",
            "scheme_name_hi": "पीएम-किसान",
            "central_or_state": "central",
            "ministry": "Agriculture",
            "category": "Agriculture",
            "eligibility_rules": {"land_holding_max_acres": 5},
            "benefits": {"annual_amount_inr": 6000},
            "documents_required": ["aadhaar", "land_record", "bank_passbook"],
            "application_link": "https://pmkisan.gov.in"
        },
        {
            "scheme_name_en": "Ayushman Bharat / PM-JAY",
            "central_or_state": "central",
            "ministry": "Health",
            "category": "Health",
            "eligibility_rules": {"category": ["SC", "ST", "BPL"]},
            "benefits": {"health_cover_max_inr": 500000},
            "documents_required": ["aadhaar", "ration_card"],
        },
        {
            "scheme_name_en": "NREGA",
            "central_or_state": "central",
            "ministry": "Rural Development",
            "category": "Employment",
            "eligibility_rules": {"age_min": 18, "residency": "rural"},
            "benefits": {"days_of_employment": 100},
            "documents_required": ["aadhaar", "bank_passbook"],
        },
        {
            "scheme_name_en": "E-Shram",
            "central_or_state": "central",
            "ministry": "Labour",
            "category": "Employment",
            "eligibility_rules": {"age_min": 16, "age_max": 59, "occupation": ["unorganized"]},
            "benefits": {"insurance_cover_inr": 200000},
            "documents_required": ["aadhaar", "bank_passbook"],
        },
        {
            "scheme_name_en": "PMJJBY",
            "central_or_state": "central",
            "category": "Insurance",
            "eligibility_rules": {"age_min": 18, "age_max": 50},
            "benefits": {"life_cover_inr": 200000},
            "documents_required": ["aadhaar", "bank_passbook"],
        },
        {
            "scheme_name_en": "PMSBY",
            "central_or_state": "central",
            "category": "Insurance",
            "eligibility_rules": {"age_min": 18, "age_max": 70},
            "benefits": {"accidental_cover_inr": 200000},
            "documents_required": ["aadhaar", "bank_passbook"],
        },
        {
            "scheme_name_en": "Atal Pension Yojana (APY)",
            "central_or_state": "central",
            "category": "Pension",
            "eligibility_rules": {"age_min": 18, "age_max": 40},
            "benefits": {"pension_inr_per_month": [1000, 2000, 3000, 4000, 5000]},
            "documents_required": ["aadhaar", "bank_passbook"],
        },
        {
            "scheme_name_en": "Mudra Shishu",
            "central_or_state": "central",
            "category": "Finance",
            "eligibility_rules": {"business_type": "micro"},
            "benefits": {"loan_max_inr": 50000},
            "documents_required": ["aadhaar", "pan"],
        },
        {
            "scheme_name_en": "Stand-Up India",
            "central_or_state": "central",
            "category": "Finance",
            "eligibility_rules": {"category": ["SC", "ST", "Women"]},
            "benefits": {"loan_max_inr": 10000000},
            "documents_required": ["aadhaar", "pan", "caste_certificate"],
        },
        {
            "scheme_name_en": "PMAY-G",
            "central_or_state": "central",
            "category": "Housing",
            "eligibility_rules": {"housing_status": "kucha", "residency": "rural"},
            "benefits": {"assistance_inr": 120000},
            "documents_required": ["aadhaar", "bank_passbook"],
        },
        {
            "scheme_name_en": "Ujjwala Yojana",
            "central_or_state": "central",
            "category": "Welfare",
            "eligibility_rules": {"gender": "female", "category": ["BPL", "SC", "ST"]},
            "benefits": {"lpg_connection": True},
            "documents_required": ["aadhaar", "ration_card", "bank_passbook"],
        },
        {
            "scheme_name_en": "NSP Scholarships",
            "central_or_state": "central",
            "category": "Education",
            "eligibility_rules": {"education_level": ["pre_matric", "post_matric"]},
            "benefits": {"scholarship": True},
            "documents_required": ["aadhaar", "income_certificate", "bank_passbook"],
        },
        {
            "scheme_name_en": "Ladli Laxmi Yojana",
            "central_or_state": "state",
            "state_code": "MP",
            "category": "Welfare",
            "eligibility_rules": {"gender": "female"},
            "benefits": {"financial_assistance": True},
            "documents_required": ["aadhaar", "domicile"],
        },
        {
            "scheme_name_en": "Kanya Sumangala Yojana",
            "central_or_state": "state",
            "state_code": "UP",
            "category": "Welfare",
            "eligibility_rules": {"gender": "female"},
            "benefits": {"financial_assistance": True},
            "documents_required": ["aadhaar", "domicile"],
        },
        {
            "scheme_name_en": "Rythu Bandhu",
            "central_or_state": "state",
            "state_code": "TS",
            "category": "Agriculture",
            "eligibility_rules": {"land_holding": True},
            "benefits": {"amount_per_acre": 5000},
            "documents_required": ["aadhaar", "land_record", "bank_passbook"],
        },
        {
            "scheme_name_en": "Amma Vodi",
            "central_or_state": "state",
            "state_code": "AP",
            "category": "Education",
            "eligibility_rules": {"children_in_school": True},
            "benefits": {"amount_inr": 15000},
            "documents_required": ["aadhaar", "ration_card", "bank_passbook"],
        },
        {
            "scheme_name_en": "KCR Kit",
            "central_or_state": "state",
            "state_code": "TS",
            "category": "Welfare",
            "eligibility_rules": {"pregnant_women": True},
            "benefits": {"kit": True, "amount_inr": 12000},
            "documents_required": ["aadhaar", "bank_passbook"],
        },
        {
            "scheme_name_en": "Gruha Lakshmi",
            "central_or_state": "state",
            "state_code": "KA",
            "category": "Welfare",
            "eligibility_rules": {"gender": "female", "head_of_family": True},
            "benefits": {"amount_inr": 2000},
            "documents_required": ["aadhaar", "ration_card", "bank_passbook"],
        },
        {
            "scheme_name_en": "Magalir Urimai Thogai",
            "central_or_state": "state",
            "state_code": "TN",
            "category": "Welfare",
            "eligibility_rules": {"gender": "female", "head_of_family": True},
            "benefits": {"amount_inr": 1000},
            "documents_required": ["aadhaar", "ration_card", "bank_passbook"],
        },
        {
            "scheme_name_en": "Gruha Jyothi",
            "central_or_state": "state",
            "state_code": "KA",
            "category": "Welfare",
            "eligibility_rules": {"residency": "KA"},
            "benefits": {"free_electricity_units": 200},
            "documents_required": ["aadhaar", "electricity_bill"],
        }
    ]

    for data in schemes_data:
        scheme = Scheme(**data)
        db.add(scheme)
    
    db.commit()
    print(f"Seeded {len(schemes_data)} schemes successfully.")

if __name__ == "__main__":
    seed_schemes()
