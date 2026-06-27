import json
import os
from pathlib import Path
from google_auth_oauthlib.flow import InstalledAppFlow

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

# If modifying these scopes, delete the file token.json.
SCOPES = ['https://www.googleapis.com/auth/gmail.modify']

def main():
    creds_path = Path(__file__).parent.parent / "credentials" / "gmail_credentials.json"
    token_path = Path(__file__).parent.parent / "credentials" / "gmail_token.json"
    
    if not creds_path.exists():
        print(f"Credentials not found at {creds_path}")
        return

    flow = InstalledAppFlow.from_client_secrets_file(str(creds_path), SCOPES)
    creds = flow.run_local_server(port=0)
    
    # Save the credentials for the next run
    with open(token_path, "w") as token:
        token.write(creds.to_json())
    print(f"Token saved to {token_path}")
    print("You can now run the backend and it will sync from your actual Gmail account.")

if __name__ == '__main__':
    main()
