#!/usr/bin/env bash

# Stop script on error
set -e

# --- Cleanup Function ---
cleanup() {
    echo ""
    echo "🛑 Shutting down..."
    # Kill the port forward process if it exists
    if [ -n "$PF_PID" ]; then kill $PF_PID 2>/dev/null || true; fi
    echo "Bye!"
}

# Register the cleanup function to run on EXIT (Ctrl+C)
trap cleanup EXIT

echo "🚀 Starting Dev Connection (No Sudo)..."

# 1. Check if Minikube is running
if ! minikube status >/dev/null 2>&1; then
    echo "❌ Minikube is not running. Starting it..."
    minikube start
fi

echo "---------------------------------------------------"

# 2. Start Port Forward (Background)
# This connects localhost:8080 -> Ingress Controller -> Kafka UI
echo "🔌 Forwarding Ingress Controller (8080 -> 80)..."

# We allow this to print to console so you see errors (like port conflicts)
minikube kubectl -- port-forward -n ingress-nginx service/ingress-nginx-controller 8080:80 --address 0.0.0.0 &
PF_PID=$!

# Wait a moment to ensure it doesn't crash immediately (e.g., port 8080 busy)
sleep 2
if ! kill -0 $PF_PID 2>/dev/null; then
    echo "❌ Port Forward crashed! Likely 'Address already in use'."
    echo "👉 Check if something else is running on port 8080."
    exit 1
fi

# 3. Success Message
echo ""
echo "✅ CONNECTION ESTABLISHED"
echo "---------------------------------------------------"
echo "📝 Logs are active below. Press Ctrl+C to stop."

# 4. Keep script running until the Port Forward process dies
wait $PF_PID
