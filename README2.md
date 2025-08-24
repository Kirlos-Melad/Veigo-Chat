Here is a more **raw, no-BS markdown doc** tailored to your workflow:

---

# 🐳🔥 **Local K8s / Minikube Deployment Cheatsheet**

## ✅ Apply / Unapply Kustomizations

```bash
kubectl apply -k .
kubectl delete -k .
```

---

## 🌐 Get Local Node IP for NodePorts

```bash
kubectl get nodes -o wide
```

---

## 🔥 Build Locally Inside Minikube Docker Daemon

> This makes images directly accessible to Kubernetes without a registry.

1. **Switch Docker to Minikube's daemon:**

```bash
eval $(minikube docker-env)
```

2. **Build your image directly:**

```bash
docker build -t <image-name>:latest .
```

Example:

```bash
docker build -t authentication-worker:latest .
```

3. **Set imagePullPolicy to `Never` in K8s manifest:**

```yaml
containers:
  - name: authentication-worker
    image: authentication-worker:latest
    imagePullPolicy: Never
```

4. **Apply / Restart Deployment**

```bash
kubectl apply -k .
kubectl rollout restart deployment <deployment-name> -n <namespace>
```

---

## ✅ Reset Docker Daemon to Host Machine

```bash
eval $(minikube docker-env --unset)
```

---

## 🚀 Optional: Push to Local Registry (if set up)

1. **Ensure Docker Daemon on host allows insecure registries:**

`/etc/docker/daemon.json`:

```json
{
  "insecure-registries": ["192.168.49.2:30050"]
}
```

Restart Docker:

```bash
sudo systemctl restart docker
```

2. **Tag and push**

```bash
docker tag <image-name>:latest 192.168.49.2:30050/<image-name>:latest
docker push 192.168.49.2:30050/<image-name>:latest
```

3. **Check registry content**

```bash
curl http://192.168.49.2:30050/v2/_catalog
```

---

## ✅ Useful Commands

| Command                              | Purpose                 |
| ------------------------------------ | ----------------------- |
| `kubectl describe pod <pod> -n <ns>` | Pod deep info & events  |
| `kubectl logs <pod> -n <ns>`         | View logs               |
| `kubectl delete pod <pod> -n <ns>`   | Restart pod             |
| `docker images`                      | List built images       |
| `docker rmi <image>`                 | Delete image            |
| `docker ps -a`                       | Show running containers |
| `docker rm -f <container>`           | Force remove container  |

---

## ⚠️ Common Gotchas

* Always check you're in **Minikube's Docker env** with:

```bash
docker info | grep -i 'name'
```

* If Kubernetes still tries to pull:
  **Set `imagePullPolicy: Never`**

* If stuck images:

```bash
docker rmi -f <image-id>
```

---

## ✅ Bonus: Rollout Restart Shortcut

```bash
kubectl rollout restart deployment <deployment-name> -n <namespace>
```

---

Let me know if you want me to generate a **Makefile, CI/CD pipeline config, or even an Obsidian-compatible version.**
