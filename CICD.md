# MHLC Web CI/CD

The continuous integration / continuous deployment (CI/CD) pipeline for MHLC Web is configured in GitHub actions and split into two parts: build and deploy.  The build pipeline performs our continuous integration development checks on all branches.  The deploy pipeline performs continuous deployment to the live kubernetes environment from the `main` branch.

## GitHub Actions

The workflows are defined at: [`./github/workflows/pipeline.yaml`](./github/workflows/pipeline.yaml)

- Build
    - Install dependencies
    - Build source code
    - TODO Lint source code
    - TODO Run unit tests
    - Build container image

- Deploy
    - TODO - Push container image to deployment registry
    - TODO - Run Helm deployment to kubernetes environment

## Reference Materials

- https://docs.docker.com/build/ci/github-actions/
- https://docs.digitalocean.com/products/container-registry/how-to/enable-push-to-deploy/