#!/bin/sh
url="https://api.paystack.co/bank"
authorization="Authorization: Bearer sk_test_8f88d45f65a1bbe065f5c5b9f9fcdca6a1e7b09e"

curl "$url" -H "$authorization" -X GET