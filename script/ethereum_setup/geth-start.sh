# /bin/bash!


CMD="geth --identity $1 --rpc --rpccorsdomain '*' --rpcport 3000 --rpcapi eth,web3,personal --datadir $2 --port 30303 --networkid 198565849 --bootnodes 'enode://fef6273321959e3916bd15b5679bd784bbab1ca26e1e55e0408698a9153b8debe4405149d0a77a2bad9a9d3aa8b6ee5fc238a23d8b8123ab100233e29e8799dc@10.20.102.16:30303' $3"


if [ $3 == "init" ]; then
    CMD="$CMD $4"
fi

echo executing $CMD

$CMD

