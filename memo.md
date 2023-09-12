# BUIDL 2023-5-19(uji) AA Wallet

https://github.com/eth-infinitism/bundler

[ERC-4337 Quickstart Guide](https://docs.stackup.sh/docs/getting-started)

Avalanche C-chain fujiで動作

- simpleAccount `0xa64490C1271aFd8F223dfDAb039Ab3CEFD4Cc3eB`
    - https://testnet.snowtrace.io/address/0xa64490c1271afd8f223dfdab039ab3cefd4cc3eb
- transfer from simple account
    - bundlerのEOAとentrypointのcontractにfeeが取られてるのが見れた
![image](https://github.com/uji/erc4337-playground/assets/49834542/c3939d1a-c170-4c86-8452-7e1d1351ba92)


    [](https://testnet.snowtrace.io/tx/0x9746f588f202024e40035cc387bd51b9876e2b85dc537d866bb389193721eb97)

- approveのコマンド

    ```bash
    yarn run simpleAccount erc20Approve \
        --token 0x5425890298aed601595a70ab815c96711a31bc65 \
        --spender 0xFE7dBcAb8AaeE4eB67943c1e6BE95B1D065985c6 \
        --amount 0.01 \
        --withPaymaster
    ```

    tokenはUSDCのaddress

    spenderはavalanche fujiでstackupが提供してるpaymaster

- paymasterの利用は有料だった…ここでstackupマネージドのものを使うのはストップ
    - stackupのbundlerのコードが公開されてる（しかもGo）これをもとに手元で動かしてみる

    https://github.com/stackup-wallet/stackup-bundler

    - Gin使ってる
    - GPL-3.0なので扱いには注意が要る
    - ERC4337_BUNDLER_ETH_CLIENT_URL=https://rpc.ankr.com/avalanche_fuji を.env二設定してfuji networkで動かせた
    - Entrypointのコントラクトはどこで指定している？
        - https://github.com/stackup-wallet/stackup-bundler/blob/0bb9e26564dafd2e2302f1dc7952bd4babd48593/internal/config/values.go#L62
        - https://docs.stackup.sh/docs/entity-addresses のやつを使っている
            - 公式っぽい https://mirror.xyz/erc4337official.eth/cSdZl9X-Hce71l_FzjVKQ5eN398ial7QmkDExmIIOQk
    - `go run scripts/fetchwallet/main.go` でBundler EOAのアドレスを表示`0xDF011a8eF20f8D7272e04fc4B7F58A769fF05613`

        https://testnet.snowtrace.io/address/0xDF011a8eF20f8D7272e04fc4B7F58A769fF05613

- thirdweb の最もシンプルなテンプレートからAccount, AccountFactoryを作ってデプロイ
    - deploy時にEntryPointのアドレスが必要 [`0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789`](https://blockscan.com/address/0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789)
    - Accountデプロイの際、AccountFactoryのアドレスが必要になる
    - AccountFactory: https://thirdweb.com/avalanche-fuji/0xbcdC230b48026e906D47c43D1543757A6cDb7cb1
    - Account: https://thirdweb.com/avalanche-fuji/0xBdC1Ab72c0610b8491615cb76f1f53aF14b07760
- bundler, Account, AccountFactoryが用意できたので、ウォレットを動かせるブラウザアプリを作ってみる
    - thirdwebのテンプレートはエンドユーザーがどうやってAccountの利用権限を証明するのかを確認する
    - bundlerのAPIの使い方はこのあたりを見る https://docs.stackup.sh/docs/erc-4337-bundler-rpc-methods
        - tsのライブラリもありそう
