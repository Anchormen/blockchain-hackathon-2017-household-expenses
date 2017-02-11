# /bin/bash!
CMD="geth --identity $1 --rpc --rpccorsdomain '*' --rpcport 3000 --rpcapi eth,web3,personal --datadir $2 --port 30303 --networkid 198565849 $3"


if [ $3 == "init" ]; then
    CMD="$CMD $4"
fi

echo executing $CMD
$CMD

