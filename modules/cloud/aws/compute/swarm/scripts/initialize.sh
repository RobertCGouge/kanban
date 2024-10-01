#!/usr/bin/env bash
#---
# Excerpted from "Engineering Elixir Applications",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit https://pragprog.com/titles/beamops for more book information.
#---

get_aws_api_token() {
  curl -X PUT "http://169.254.169.254/latest/api/token" \
       -H "X-aws-ec2-metadata-token-ttl-seconds: 3600"
}

get_instance_meta_data() {
  local API_TOKEN=$1
  local META_DATA_ATTRIBUTE_NAME=$2
  curl -H "X-aws-ec2-metadata-token: $API_TOKEN" \
        "http://169.254.169.254/latest/meta-data/$META_DATA_ATTRIBUTE_NAME"
}

# create swarm
docker swarm init

# save swarm token to parameter store
MANAGER_TOKEN=$(docker swarm join-token manager -q)
aws ssm put-parameter --name "/docker/swarm_manager_token" \
                      --value "$MANAGER_TOKEN" \
                      --type "SecureString" --overwrite

# ensure port 22 is open
AWS_API_TOKEN=$(get_aws_api_token)
CURRENT_INSTANCE_IP=$(get_instance_meta_data $AWS_API_TOKEN "public-ipv4")

while ! nc -z -v -w1 "$CURRENT_INSTANCE_IP" 22; do 
  echo "Waiting for SSH to be available..."
  sleep 2
done

# add "SwarmReady" tag
CURRENT_INSTANCE_ID=$(get_instance_meta_data $AWS_API_TOKEN "instance-id")

aws ec2 create-tags \
    --resources "$CURRENT_INSTANCE_ID" \
    --tags "Key=SwarmReady,Value=true" \
    --region "us-east-1"
