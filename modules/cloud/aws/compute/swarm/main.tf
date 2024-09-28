terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.13.1"
    }
    tls = {
      source  = "hashicorp/tls"
      version = "4.0.4"
    }
    local = {
      source  = "hashicorp/local"
      version = "2.4.0"
    }
  }
}

data "aws_vpc" "main" {
  filter {
    name   = "isDefault"
    values = ["true"]
  }
}

data "aws_subnets" "main_subnets" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.main.id]
  }
}

resource "aws_instance" "my_swarm" {
  ami                                  = "ami-0ebfd941bbafe70c6"
  associate_public_ip_address          = true
  availability_zone                    = "us-east-1c"
  instance_initiated_shutdown_behavior = "stop"
  instance_type                        = "t2.micro"
  key_name                             = aws_key_pair.deployer_key.key_name
  monitoring                           = false
  user_data                            = <<-EOF
 	            #!/usr/bin/env bash
 	
 	            sudo dnf update -y && \
 	            sudo dnf install -y docker && \
 	            sudo systemctl start docker && \
 	            sudo systemctl enable docker && \
 	            sudo usermod -a -G docker ec2-user && \
 	            newgrp docker
 	            EOF
  placement_partition_number           = 0
  secondary_private_ips                = []
  source_dest_check                    = true
  subnet_id                            = data.aws_subnets.main_subnets.ids[4]
  tags = {
    "Name" = "docker-swarm-manager"
  }
  tags_all = {
    "Name" = "docker-swarm-manager"
  }
  tenancy = "default"
  vpc_security_group_ids = [
    aws_security_group.swarm_sg.id
  ]
}

resource "aws_security_group" "swarm_sg" {
  name     = "swarm_pool_ports"
  tags     = {}
  tags_all = {}
  vpc_id   = data.aws_vpc.main.id
  ingress = [
    {
      cidr_blocks = [
        "0.0.0.0/0",
      ]
      description      = ""
      from_port        = 22
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "tcp"
      security_groups  = []
      self             = false
      to_port          = 22
    },
    {
      cidr_blocks = [
        "0.0.0.0/0",
      ]
      description      = ""
      from_port        = 4000
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "tcp"
      security_groups  = []
      self             = false
      to_port          = 4000
    },
  ]
  egress = [
    {
      cidr_blocks = [
        "0.0.0.0/0",
      ]
      description      = ""
      from_port        = 0
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "-1"
      security_groups  = []
      self             = false
      to_port          = 0
    },
  ]
}

resource "aws_key_pair" "deployer_key" {
  key_name   = "swarm-key"
  public_key = tls_private_key.rsa.public_key_openssh
}

resource "tls_private_key" "rsa" {
  algorithm = "RSA"
  rsa_bits  = "4096"
}

resource "local_sensitive_file" "private_key" {
  filename        = var.private_key_path
  content         = tls_private_key.rsa.private_key_pem
  file_permission = "0400"
}
