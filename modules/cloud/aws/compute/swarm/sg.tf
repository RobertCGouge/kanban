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
      description      = "SSH Port"
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
        data.aws_vpc.main.cidr_block,
      ]
      description      = "Elixir Phoenix app"
      from_port        = 4000
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "tcp"
      security_groups  = []
      self             = false
      to_port          = 4000
    },
    {
      cidr_blocks = [
        data.aws_vpc.main.cidr_block,
      ]
      description      = "Docker container network discovery"
      from_port        = 7946
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "tcp"
      security_groups  = []
      self             = false
      to_port          = 7946
    },
    {
      cidr_blocks = [
        data.aws_vpc.main.cidr_block,
      ]
      description      = "Docker overlay network"
      from_port        = 4789
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "tcp"
      security_groups  = []
      self             = false
      to_port          = 7946
    },
    {
      cidr_blocks = [
        data.aws_vpc.main.cidr_block,
      ]
      description      = "Docker swarm management"
      from_port        = 2377
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      protocol         = "tcp"
      security_groups  = []
      self             = false
      to_port          = 2377
    }
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