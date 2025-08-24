# from fastapi import Depends, HTTPException, Security
# from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
# import jwt
# import bcrypt
# import re
# from typing import Annotated, ClassVar, Literal
# from datetime import datetime, timedelta
# from pydantic import BaseModel, field_validator

# from backend.authentication.source.infrastructure.database import SessionDependency
# from source.models.device import DeviceModel
# from source.infrastructure.application import JWTConfig, get_app_settings

# class _PasswordManager:
#     def __init__(self):
#         self._password_regex = re.compile(
#             r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,}$'
#         )
#         self._error_message = (
#             "The password must contain at least one lowercase letter, "
#             "one uppercase letter, one digit, and one special character, "
#             "and must be at least 8 characters long."
#         )

#     def validate(self, password: str) -> None:
#         """Validate the strength of the password"""
#         if not self._password_regex.match(password):
#             raise ValueError(self._error_message)

#     def hash(self, password: str) -> str:
#         """Hash the password"""
#         salt = bcrypt.gensalt()
#         return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')
    
#     def verify(self, password: str, hashed_password: str) -> bool:
#         """Verify that the passwords match"""
#         return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))


# class TokenSubject(BaseModel):
#     account_id: str
#     client_id: str

#     # Optional: a ClassVar for customizing the separator if needed
#     separator: ClassVar[str] = ":"

#     def serialize(self) -> str:
#         """Serialize the Subject object into a string format '<account_id><separator><client_id>'."""
#         return f"{self.account_id}{self.separator}{self.client_id}"

#     @classmethod
#     def deserialize(cls, subject_str: str) -> "TokenSubject":
#         """Deserialize the string 'account_id:client_id' back into a Subject object."""
#         try:
#             account_id, client_id = subject_str.split(cls.separator)
#             return cls(account_id=account_id, client_id=client_id)
#         except ValueError:
#             raise ValueError(f"Invalid format for Subject string: {subject_str}")
    
#     # You can also use Pydantic validators if you need extra validation logic
#     @field_validator('account_id')
#     def account_id_must_not_be_empty(cls, value):
#         if not value:
#             raise ValueError('account_id must not be empty')
#         return value

#     @field_validator('client_id')
#     def client_id_must_not_be_empty(cls, value):
#         if not value:
#             raise ValueError('client_id must not be empty')
#         return value
    
# class TokenDecodedPayload(BaseModel):
#     id: str
#     subject: TokenSubject

# class _TokenManager:
#     def __init__(self, config: JWTConfig):
#         """
#         Initialize TokenManager with JWT Config and Secret Key.
#         :param config: JWTConfig instance that contains JWT settings
#         :param secret_key: Secret key for signing the JWT
#         """
#         self.config = config
    
#     def encode(self, type: Literal["access", "refresh"], id: str, subject: TokenSubject) -> str:
#         """
#         Create a token (either access or refresh) depending on the token type.
#         :param type: Type of token, either "access" or "refresh"
#         :param userid: User ID
#         :param deviceid: Device ID
#         :return: The JWT token as a string
#         :raises ValueError: If the token type is invalid
#         """
#         if type not in ["access", "refresh"]:
#             raise ValueError("Invalid token type. Must be 'access' or 'refresh'.")
        
#         now = datetime.now()

#         payload = {
#             "jti": id,
#             "iss": self.config.issuer,
#             "sub": subject.serialize(),
#             "iat": now,
#         }

#         if type == "access":
#             payload["aud"] = self.config.access_audience
#             payload["exp"] = now + timedelta(**{
#                 self.config.duration.unit: self.config.duration.amount
#             })
#         else:
#             payload["aud"] = self.config.refresh_audience

#         return jwt.encode(payload, self.config.secret_key, algorithm=self.config.algorithm)

#     def decode(self, token: str, type: Literal["access", "refresh"]) -> TokenDecodedPayload:
#         """
#         Verify a token (either access or refresh) depending on the token type.
#         :param token: JWT token as a string
#         :param type: Type of token, either "access" or "refresh"
#         :return: The decoded JWT payload
#         :raises ValueError: If the token is invalid or expired
#         """
#         if type not in ["access", "refresh"]:
#             raise ValueError("Invalid token type. Must be 'access' or 'refresh'.")

#         decoded_payload = jwt.decode(
#             token,
#             self.config.secret_key,
#             algorithms=[self.config.algorithm],
#             issuer=self.config.issuer,
#             audience=self.config.access_audience if type == "access" else self.config.refresh_audience
#         )
#         return TokenDecodedPayload(**{
#             "id": decoded_payload["jti"],
#             "subject": TokenSubject.deserialize(decoded_payload["sub"]),
#         })
        
# # CREATE AN ACTIVITY TO AUTHENTICATE THE USER
# # OAuth2PasswordBearer will extract the token from the Authorization header
# TokenDependency = Annotated[HTTPAuthorizationCredentials, Security(HTTPBearer())]

# def authenticate(token: TokenDependency, session: SessionDependency) -> TokenDecodedPayload | None:
#     decoded_payload = token_manager.decode(token.credentials, "access")

#     device = session.query(DeviceModel).filter(
#         DeviceModel.account_id == decoded_payload.subject.account_id,
#         DeviceModel.client_id == decoded_payload.subject.client_id,
#     ).first()

#     if not device or device.access_token != decoded_payload.id or device.force_refresh_token:
#         raise HTTPException(status_code=401, detail="Invalid token")
#     elif device.force_sign_in:
#         raise HTTPException(status_code=401, detail="Session expired, please sign in again")

#     return decoded_payload

# AuthenticationDependency = Annotated[TokenDecodedPayload, Depends(authenticate)]
# # Expose only the instance, not the class
# password_manager = _PasswordManager()
# token_manager = _TokenManager(get_app_settings().jwt_config)