# Variables
DOCKER_REGISTRY = 127.0.0.1:5000/vchat
K8S_NAMESPACE = vchat
K8S_CONTEXT = minikube
MICROSERVICES = authentication
IMAGE_SUFFIX = -worker
DEPLOYMENT_SUFFIX = -worker-deployment
# Use minikube's kubectl wrapper
KUBECTL = minikube kubectl --

# Build Docker images for each microservice
.PHONY: build
build: $(MICROSERVICES)
$(MICROSERVICES):
	@echo "Building Docker image for $@..."
	docker build -t $(DOCKER_REGISTRY)/$@$(IMAGE_SUFFIX):latest ./backend/$@

# Push Docker images to local registry
.PHONY: push
push: build
	@echo "Pushing Docker images to local registry..."
	@for service in $(MICROSERVICES); do \
		docker push $(DOCKER_REGISTRY)/$$service$(IMAGE_SUFFIX):latest; \
	done

# Update Kubernetes deployments with new images
.PHONY: deploy
deploy: push
	@echo "Deploying to Kubernetes..."
	@for service in $(MICROSERVICES); do \
		$(KUBECTL) --context=$(K8S_CONTEXT) -n $(K8S_NAMESPACE) set image deployment/$$service$(DEPLOYMENT_SUFFIX) $$service=$(DOCKER_REGISTRY)/$$service$(IMAGE_SUFFIX):latest; \
	done

# Rollout restart to apply changes
.PHONY: rollout
rollout: deploy
	@echo "Rolling out changes to Kubernetes..."
	@for service in $(MICROSERVICES); do \
		$(KUBECTL) --context=$(K8S_CONTEXT) -n $(K8S_NAMESPACE) rollout restart deployment/$$service$(DEPLOYMENT_SUFFIX); \
	done

# The default target, will trigger full build, push, and deploy process
.PHONY: all
all: build push deploy rollout
