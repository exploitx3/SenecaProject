variable "public_key_path" {
  description = <<DESCRIPTION
Path to the SSH public key to be used for authentication.
Ensure this keypair is added to your local SSH agent so provisioners can
connect.

Example: ~/.ssh/terraform.pub
DESCRIPTION
}

variable "key_name" {
  description = "Desired name of AWS key pair"
}

variable "aws_region" {
  description = "AWS region to launch servers."
  default     = "eu-west-2"
}


variable "aws_amis" {
  default = {
    eu-west-1 = "ami-d41d58a7"
    eu-west-2 = "ami-bfe0eadb"
    us-west-2 = "ami-b04e92d0"
    eu-central-1 = "ami-0044b96f"
  }
}

variable "access_key" {
  type = "string"
  description = "The aws access key set as env var"
}

variable "secret_access_key" {
  type = "string"
  description = "The aws secret access key set as env var"
}