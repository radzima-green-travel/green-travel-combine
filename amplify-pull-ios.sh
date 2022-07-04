#!/bin/bash
cd ./ios
set -e
IFS='|'

AWSCLOUDFORMATIONCONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":false,\
\"profileName\":\"default\",\
\"accessKeyId\":\"AKIATRAWO47IY4HMC66S\",\
\"secretAccessKey\":\"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\",\
\"region\":\"eu-central-1\"\
}"
AMPLIFY="{\
\"projectName\":\"radzima\",\
\"appId\":\"d86eq06y04xkl\",\
\"envName\":\"develop\",\
\"defaultEditor\":\"xcode\"\
}"
FRONTEND="{\
\"frontend\":\"ios\"
}"
PROVIDERS="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG\
}"

echo $PROVIDERS
echo $AMPLIFY

amplify pull \
--amplify $AMPLIFY \
--frontend $FRONTEND \
--providers $PROVIDERS \
--yes

cat ./amplifyconfiguration.json
cat ./awsconfiguration.json
