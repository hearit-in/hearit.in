#!/bin/bash

deploy_msg=$(git show --oneline --quiet HEAD)
firebase deploy -m "$deploy_msg"