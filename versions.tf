terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.10"
    }
    random = {
      source  = "hashicorp/random"
      version = ">= 2.1"
    }
  }
  required_version = ">= 0.13"
}

terraform {
  backend "gcs" {
    bucket  = "charged-muse-376504-iac-tf-state"
    prefix  = "terraform/state"
  }
}