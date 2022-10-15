#!/bin/bash

function is_test() {
  [[ "$MODE" = "test" ]]
}

function is_e2e() {
  [[ "$MODE" = "e2e" ]]
}

function is_lint() {
  [[ "$MODE" = "lint" ]]
}

function is_prod() {
  [[ "$MODE" = "prod" ]]
}

function is_dev() {
  [[ "$MODE" = "dev" ]]
}

function is_hom() {
  [[ "$MODE" = "hom" ]]
}
