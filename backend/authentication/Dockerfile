# syntax=docker/dockerfile:1.4
FROM python:3.12-slim AS base

# Avoids prompts from apt
ENV DEBIAN_FRONTEND=noninteractive

# Set working directory
WORKDIR /app

# Install system dependencies for psycopg2 and other binaries
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential libpq-dev curl netcat \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

# Install pipx and poetry-core (PEP 621-compatible)
RUN pip install --no-cache-dir pip setuptools wheel

# Copy pyproject.toml and other config files
COPY pyproject.toml ./

# Install dependencies (without dev dependencies by default)
RUN pip install --no-cache-dir ".[dev]"

# Copy the rest of the source code
COPY . .

# Expose port (if running FastAPI via uvicorn)
EXPOSE 8000

# Default command (adjust as needed)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
