import time
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from source.infrastructure.application import get_app_settings
from source.routers import login
from source.routers import devices

app = FastAPI(
    debug=get_app_settings().debug,
    title="Veigo Chat Authentication Service",
)

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = (time.time() - start_time) * 1000
    response.headers["X-Process-Time"] = f"{process_time:.2f} ms"
    return response


@app.exception_handler(Exception)
async def exception_handler(request: Request, exc: Exception):

    return JSONResponse(
        status_code=500,
        content={
            "detail": "An unexpected error occurred. Please try again later.",
        },
    )

app.include_router(login.router)
app.include_router(devices.router)