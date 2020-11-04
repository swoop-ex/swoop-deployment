contractDeployed=${NETWORK}_contract_deployed.txt
echo "Deploy contract into" $NETWORK

echo ""
echo "step 1: core contract deploy"
coreContract=`node tools/deployment/core/deploy.js --network $NETWORK | grep export`
echo $coreContract
eval $coreContract

echo ""
echo "step 2: external contracts deploy"
extContract=`node tools/deployment/external/deploy.js --network $NETWORK --extra | grep export`
echo $extContract
eval $extContract

echo ""
echo "step 3: periphery contract deploy"
peripheryContract=`node tools/deployment/periphery/deploy.js --network $NETWORK --factory $UNISWAPV2FACTORY --wone $WONE | grep export`
echo $peripheryContract
eval $peripheryContract

echo ""
echo "worte contract address into " $contractDeployed
echo '# '`date` > $contractDeployed
echo $coreContract >> $contractDeployed
echo $extContract >> $contractDeployed
echo $peripheryContract >> $contractDeployed
echo "DONE."