variable "private_key_path" {
  description = "The path to the pvirate key file."
  type = string
}

variable "number_of_nodes" {
  description = "The number of nodes to create."
  type = number
  default = 3

  validation {
    condition = var.number_of_nodes % 2 == 1
    error_message = "The number_of_nodes value must be an odd number."
  }
}

variable "region" {
  type = string
  description = "AWS region"
  default = "us-east-1"
}

variable "account_id" {
  type = string
  description = "AWS account ID"
  default = "872515294075"
}