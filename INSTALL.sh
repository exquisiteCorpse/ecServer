#!/usr/bin/bash

yarn add --dev mocha chai sinon enzyme react-test-renderer axios-mock-adapter redux-mock-store

# mocha && chai                    our good, familiar friends

# sinon                            for spies ;)

# enzyme && react-test-renderer    for testing react components

# axios-mock-adapter               mocks axios so that we don't send real http requests

# redux-mock-store                 pretends to be a redux store so that we can test thunks
#                                  without accidentally testing our reducer
