# Setting up Identity Acces management (IAM)

TODO: documentation

- Give service accounts access read the private docker registry.
- Add IAM to each Cloud run project to allow it to serve requests publicly (Ideally instead of using `allUsers` we would restrict access to the GCP Load balancer (GCLB) service account so the cloud run services themselves aren't public).
- setup CI/CD access to github
- setup CI/CD access to publish containers and deploy cloud run services.
