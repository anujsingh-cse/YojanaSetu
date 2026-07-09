import logging
from twilio.rest import Client
from twilio.base.exceptions import TwilioRestException
from app.core.config import settings

logger = logging.getLogger(__name__)

# Check if all Twilio keys are configured
has_twilio_config = all([
    settings.TWILIO_ACCOUNT_SID,
    settings.TWILIO_AUTH_TOKEN,
    settings.TWILIO_VERIFY_SERVICE_SID
])

def send_verification_code(phone: str) -> bool:
    """
    Sends a 6-digit verification code using Twilio Verify Service.
    Falls back to mock mode if credentials are not configured.
    """
    if not has_twilio_config:
        logger.warning(
            "Twilio is not configured. Falling back to local development mock. "
            f"Expected mock OTP '123456' for phone number: {phone}"
        )
        return True

    try:
        client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
        verification = client.verify.v2.services(settings.TWILIO_VERIFY_SERVICE_SID) \
            .verifications.create(to=phone, channel='sms')
        return verification.status == "pending"
    except TwilioRestException as e:
        logger.error(f"Failed to dispatch Twilio verification code: {e}")
        return False

def check_verification_code(phone: str, code: str) -> bool:
    """
    Validates a submitted code against the Twilio Verify Service.
    Falls back to checking code == '123456' if credentials are not configured.
    """
    if not has_twilio_config:
        logger.warning("Twilio is not configured. Checking code against mock OTP '123456'.")
        return code == "123456"

    try:
        client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
        check = client.verify.v2.services(settings.TWILIO_VERIFY_SERVICE_SID) \
            .verification_checks.create(to=phone, code=code)
        return check.status == "approved"
    except TwilioRestException as e:
        logger.error(f"Failed to check Twilio verification code: {e}")
        return False
