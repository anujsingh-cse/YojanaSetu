from sqlalchemy import Column, String, Integer, Boolean, Float, Date, Text, ForeignKey, JSON, Uuid
from sqlalchemy.orm import declarative_base, relationship
import uuid
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    phone = Column(String, unique=True, index=True)
    name = Column(String)
    age = Column(Integer)
    gender = Column(String)
    state_code = Column(String(2))
    district = Column(String)
    tehsil = Column(String)
    category = Column(String)
    occupation = Column(String)
    annual_income = Column(Float)
    land_holding_acres = Column(Float)
    disability_status = Column(Boolean, default=False)
    education_level = Column(String)
    preferred_language = Column(String(5), default="hi")
    aadhaar_hash = Column(String)
    ekyc_verified = Column(Boolean, default=False)
    created_at = Column(Date, default=datetime.utcnow)

class Scheme(Base):
    __tablename__ = "schemes"
    
    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    scheme_name_en = Column(String)
    scheme_name_hi = Column(String)
    scheme_name_ta = Column(String)
    scheme_name_bn = Column(String)
    scheme_name_mr = Column(String)
    scheme_name_te = Column(String)
    central_or_state = Column(String)
    state_code = Column(String(2), nullable=True)
    ministry = Column(String)
    category = Column(String)
    eligibility_rules = Column(JSON)
    benefits = Column(JSON)
    documents_required = Column(JSON)
    application_link = Column(String)
    offline_process = Column(Text)
    deadline = Column(Date)
    is_active = Column(Boolean, default=True)
    created_at = Column(Date, default=datetime.utcnow)

class UserApplication(Base):
    __tablename__ = "user_applications"
    
    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(Uuid(as_uuid=True), ForeignKey("users.id"))
    scheme_id = Column(Uuid(as_uuid=True), ForeignKey("schemes.id"))
    status = Column(String)
    applied_via = Column(String)
    application_id_govt = Column(String)
    documents_uploaded = Column(JSON)
    next_action = Column(String)
    follow_up_date = Column(Date)
    notes = Column(Text)
    created_at = Column(Date, default=datetime.utcnow)

class Document(Base):
    __tablename__ = "documents"
    
    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(Uuid(as_uuid=True), ForeignKey("users.id"))
    doc_type = Column(String)
    extracted_data = Column(JSON)
    storage_path = Column(String)
    verification_status = Column(String)
    uploaded_at = Column(Date, default=datetime.utcnow)

class ServiceCenter(Base):
    __tablename__ = "service_centers"
    
    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String)
    type = Column(String)
    state_code = Column(String(2))
    district = Column(String)
    address = Column(Text)
    phone = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    services_available = Column(JSON)
