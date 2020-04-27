#!/bin/bash

docker rm -f risk_management_db

docker run --name risk_management_db -p 5432:5432 -d risk_management_db