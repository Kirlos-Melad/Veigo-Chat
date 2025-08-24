from typing import Annotated
from fastapi import Depends

from source.utilities.security.jwt import TokenDecodedPayload, authenticate_token

AuthenticationDependency = Annotated[TokenDecodedPayload, Depends(authenticate_token)]
