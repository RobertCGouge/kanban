variable "private_key_path" {
  description = "The path to the pvirate key file."
  type = string
}

variable "number_of_nodes" {
  description = "The number of nodes to create."
  type = number
  default = 3
}