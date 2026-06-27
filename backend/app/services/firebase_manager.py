import os
import json
from firebase_admin import auth, initialize_app, credentials
from app.core.exceptions import UnauthorizedError

# Initialize Firebase Admin SDK
_firebase_app = None

def _initialize_firebase():
    global _firebase_app
    if _firebase_app is not None:
        return
    # Expect service account JSON string in env var FIREBASE_SERVICE_ACCOUNT
    sa_json = os.getenv("FIREBASE_SERVICE_ACCOUNT")
    if not sa_json:
        raise UnauthorizedError("Firebase service account not configured")
    try:
        cred_dict = json.loads(sa_json)
    except json.JSONDecodeError as exc:
        raise UnauthorizedError("Invalid FIREBASE_SERVICE_ACCOUNT JSON") from exc
    cred = credentials.Certificate(cred_dict)
    _firebase_app = initialize_app(cred)

def verify_id_token(token: str) -> dict:
    """Verify a Firebase ID token and return the decoded claims.

    Raises:
        UnauthorizedError: If verification fails.
    """
    _initialize_firebase()
    try:
        decoded = auth.verify_id_token(token)
        return decoded
    except Exception as exc:
        raise UnauthorizedError(str(exc)) from exc

