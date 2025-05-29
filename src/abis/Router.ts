export default {
    abi: [
        {
          type: "constructor",
          stateMutability: "nonpayable",
          inputs: [
            {
              type: "address",
              name: "_factory",
            },
            {
              type: "address",
              name: "_WETH",
            },
          ],
        },
        {
          name: "WETH",
          type: "function",
          stateMutability: "view",
          inputs: [],
          outputs: [
            {
              type: "address",
            },
          ],
        },
        {
          name: "addLiquidity",
          type: "function",
          stateMutability: "nonpayable",
          inputs: [
            {
              type: "address",
              name: "tokenA",
            },
            {
              type: "address",
              name: "tokenB",
            },
            {
              type: "uint256",
              name: "amountADesired",
            },
            {
              type: "uint256",
              name: "amountBDesired",
            },
            {
              type: "uint256",
              name: "amountAMin",
            },
            {
              type: "uint256",
              name: "amountBMin",
            },
            {
              type: "address",
              name: "to",
            },
            {
              type: "uint256",
              name: "deadline",
            },
          ],
          outputs: [
            {
              type: "uint256",
              name: "amountA",
            },
            {
              type: "uint256",
              name: "amountB",
            },
            {
              type: "uint256",
              name: "liquidity",
            },
          ],
        },
        {
          name: "addLiquidityETH",
          type: "function",
          stateMutability: "payable",
          inputs: [
            {
              type: "address",
              name: "token",
            },
            {
              type: "uint256",
              name: "amountTokenDesired",
            },
            {
              type: "uint256",
              name: "amountTokenMin",
            },
            {
              type: "uint256",
              name: "amountETHMin",
            },
            {
              type: "address",
              name: "to",
            },
            {
              type: "uint256",
              name: "deadline",
            },
          ],
          outputs: [
            {
              type: "uint256",
              name: "amountToken",
            },
            {
              type: "uint256",
              name: "amountETH",
            },
            {
              type: "uint256",
              name: "liquidity",
            },
          ],
        },
        {
          name: "factory",
          type: "function",
          stateMutability: "view",
          inputs: [],
          outputs: [
            {
              type: "address",
            },
          ],
        },
        {
          name: "getAmountIn",
          type: "function",
          stateMutability: "pure",
          inputs: [
            {
              type: "uint256",
              name: "amountOut",
            },
            {
              type: "uint256",
              name: "reserveIn",
            },
            {
              type: "uint256",
              name: "reserveOut",
            },
          ],
          outputs: [
            {
              type: "uint256",
              name: "amountIn",
            },
          ],
        },
        {
          name: "getAmountOut",
          type: "function",
          stateMutability: "pure",
          inputs: [
            {
              type: "uint256",
              name: "amountIn",
            },
            {
              type: "uint256",
              name: "reserveIn",
            },
            {
              type: "uint256",
              name: "reserveOut",
            },
          ],
          outputs: [
            {
              type: "uint256",
              name: "amountOut",
            },
          ],
        },
        {
          name: "getAmountsIn",
          type: "function",
          stateMutability: "view",
          inputs: [
            {
              type: "uint256",
              name: "amountOut",
            },
            {
              type: "address[]",
              name: "path",
            },
          ],
          outputs: [
            {
              type: "uint256[]",
              name: "amounts",
            },
          ],
        },
        {
          name: "getAmountsOut",
          type: "function",
          stateMutability: "view",
          inputs: [
            {
              type: "uint256",
              name: "amountIn",
            },
            {
              type: "address[]",
              name: "path",
            },
          ],
          outputs: [
            {
              type: "uint256[]",
              name: "amounts",
            },
          ],
        },
        {
          name: "quote",
          type: "function",
          stateMutability: "pure",
          inputs: [
            {
              type: "uint256",
              name: "amountA",
            },
            {
              type: "uint256",
              name: "reserveA",
            },
            {
              type: "uint256",
              name: "reserveB",
            },
          ],
          outputs: [
            {
              type: "uint256",
              name: "amountB",
            },
          ],
        },
        {
          name: "removeLiquidity",
          type: "function",
          stateMutability: "nonpayable",
          inputs: [
            {
              type: "address",
              name: "tokenA",
            },
            {
              type: "address",
              name: "tokenB",
            },
            {
              type: "uint256",
              name: "liquidity",
            },
            {
              type: "uint256",
              name: "amountAMin",
            },
            {
              type: "uint256",
              name: "amountBMin",
            },
            {
              type: "address",
              name: "to",
            },
            {
              type: "uint256",
              name: "deadline",
            },
          ],
          outputs: [
            {
              type: "uint256",
              name: "amountA",
            },
            {
              type: "uint256",
              name: "amountB",
            },
          ],
        },
        {
          name: "removeLiquidityETH",
          type: "function",
          stateMutability: "nonpayable",
          inputs: [
            {
              type: "address",
              name: "token",
            },
            {
              type: "uint256",
              name: "liquidity",
            },
            {
              type: "uint256",
              name: "amountTokenMin",
            },
            {
              type: "uint256",
              name: "amountETHMin",
            },
            {
              type: "address",
              name: "to",
            },
            {
              type: "uint256",
              name: "deadline",
            },
          ],
          outputs: [
            {
              type: "uint256",
              name: "amountToken",
            },
            {
              type: "uint256",
              name: "amountETH",
            },
          ],
        },
        {
          name: "removeLiquidityETHSupportingFeeOnTransferTokens",
          type: "function",
          stateMutability: "nonpayable",
          inputs: [
            {
              type: "address",
              name: "token",
            },
            {
              type: "uint256",
              name: "liquidity",
            },
            {
              type: "uint256",
              name: "amountTokenMin",
            },
            {
              type: "uint256",
              name: "amountETHMin",
            },
            {
              type: "address",
              name: "to",
            },
            {
              type: "uint256",
              name: "deadline",
            },
          ],
          outputs: [
            {
              type: "uint256",
              name: "amountETH",
            },
          ],
        },
        {
          name: "removeLiquidityETHWithPermit",
          type: "function",
          stateMutability: "nonpayable",
          inputs: [
            {
              type: "address",
              name: "token",
            },
            {
              type: "uint256",
              name: "liquidity",
            },
            {
              type: "uint256",
              name: "amountTokenMin",
            },
            {
              type: "uint256",
              name: "amountETHMin",
            },
            {
              type: "address",
              name: "to",
            },
            {
              type: "uint256",
              name: "deadline",
            },
            {
              type: "bool",
              name: "approveMax",
            },
            {
              type: "uint8",
              name: "v",
            },
            {
              type: "bytes32",
              name: "r",
            },
            {
              type: "bytes32",
              name: "s",
            },
          ],
          outputs: [
            {
              type: "uint256",
              name: "amountToken",
            },
            {
              type: "uint256",
              name: "amountETH",
            },
          ],
        },
        {
          name: "removeLiquidityETHWithPermitSupportingFeeOnTransferTokens",
          type: "function",
          stateMutability: "nonpayable",
          inputs: [
            {
              type: "address",
              name: "token",
            },
            {
              type: "uint256",
              name: "liquidity",
            },
            {
              type: "uint256",
              name: "amountTokenMin",
            },
            {
              type: "uint256",
              name: "amountETHMin",
            },
            {
              type: "address",
              name: "to",
            },
            {
              type: "uint256",
              name: "deadline",
            },
            {
              type: "bool",
              name: "approveMax",
            },
            {
              type: "uint8",
              name: "v",
            },
            {
              type: "bytes32",
              name: "r",
            },
            {
              type: "bytes32",
              name: "s",
            },
          ],
          outputs: [
            {
              type: "uint256",
              name: "amountETH",
            },
          ],
        },
        {
          name: "removeLiquidityWithPermit",
          type: "function",
          stateMutability: "nonpayable",
          inputs: [
            {
              type: "address",
              name: "tokenA",
            },
            {
              type: "address",
              name: "tokenB",
            },
            {
              type: "uint256",
              name: "liquidity",
            },
            {
              type: "uint256",
              name: "amountAMin",
            },
            {
              type: "uint256",
              name: "amountBMin",
            },
            {
              type: "address",
              name: "to",
            },
            {
              type: "uint256",
              name: "deadline",
            },
            {
              type: "bool",
              name: "approveMax",
            },
            {
              type: "uint8",
              name: "v",
            },
            {
              type: "bytes32",
              name: "r",
            },
            {
              type: "bytes32",
              name: "s",
            },
          ],
          outputs: [
            {
              type: "uint256",
              name: "amountA",
            },
            {
              type: "uint256",
              name: "amountB",
            },
          ],
        },
        {
          name: "swapETHForExactTokens",
          type: "function",
          stateMutability: "payable",
          inputs: [
            {
              type: "uint256",
              name: "amountOut",
            },
            {
              type: "address[]",
              name: "path",
            },
            {
              type: "address",
              name: "to",
            },
            {
              type: "uint256",
              name: "deadline",
            },
          ],
          outputs: [
            {
              type: "uint256[]",
              name: "amounts",
            },
          ],
        },
        {
          name: "swapExactETHForTokens",
          type: "function",
          stateMutability: "payable",
          inputs: [
            {
              type: "uint256",
              name: "amountOutMin",
            },
            {
              type: "address[]",
              name: "path",
            },
            {
              type: "address",
              name: "to",
            },
            {
              type: "uint256",
              name: "deadline",
            },
          ],
          outputs: [
            {
              type: "uint256[]",
              name: "amounts",
            },
          ],
        },
        {
          name: "swapExactETHForTokensSupportingFeeOnTransferTokens",
          type: "function",
          stateMutability: "payable",
          inputs: [
            {
              type: "uint256",
              name: "amountOutMin",
            },
            {
              type: "address[]",
              name: "path",
            },
            {
              type: "address",
              name: "to",
            },
            {
              type: "uint256",
              name: "deadline",
            },
          ],
          outputs: [],
        },
        {
          name: "swapExactTokensForETH",
          type: "function",
          stateMutability: "nonpayable",
          inputs: [
            {
              type: "uint256",
              name: "amountIn",
            },
            {
              type: "uint256",
              name: "amountOutMin",
            },
            {
              type: "address[]",
              name: "path",
            },
            {
              type: "address",
              name: "to",
            },
            {
              type: "uint256",
              name: "deadline",
            },
          ],
          outputs: [
            {
              type: "uint256[]",
              name: "amounts",
            },
          ],
        },
        {
          name: "swapExactTokensForETHSupportingFeeOnTransferTokens",
          type: "function",
          stateMutability: "nonpayable",
          inputs: [
            {
              type: "uint256",
              name: "amountIn",
            },
            {
              type: "uint256",
              name: "amountOutMin",
            },
            {
              type: "address[]",
              name: "path",
            },
            {
              type: "address",
              name: "to",
            },
            {
              type: "uint256",
              name: "deadline",
            },
          ],
          outputs: [],
        },
        {
          name: "swapExactTokensForTokens",
          type: "function",
          stateMutability: "nonpayable",
          inputs: [
            {
              type: "uint256",
              name: "amountIn",
            },
            {
              type: "uint256",
              name: "amountOutMin",
            },
            {
              type: "address[]",
              name: "path",
            },
            {
              type: "address",
              name: "to",
            },
            {
              type: "uint256",
              name: "deadline",
            },
          ],
          outputs: [
            {
              type: "uint256[]",
              name: "amounts",
            },
          ],
        },
        {
          name: "swapExactTokensForTokensSupportingFeeOnTransferTokens",
          type: "function",
          stateMutability: "nonpayable",
          inputs: [
            {
              type: "uint256",
              name: "amountIn",
            },
            {
              type: "uint256",
              name: "amountOutMin",
            },
            {
              type: "address[]",
              name: "path",
            },
            {
              type: "address",
              name: "to",
            },
            {
              type: "uint256",
              name: "deadline",
            },
          ],
          outputs: [],
        },
        {
          name: "swapTokensForExactETH",
          type: "function",
          stateMutability: "nonpayable",
          inputs: [
            {
              type: "uint256",
              name: "amountOut",
            },
            {
              type: "uint256",
              name: "amountInMax",
            },
            {
              type: "address[]",
              name: "path",
            },
            {
              type: "address",
              name: "to",
            },
            {
              type: "uint256",
              name: "deadline",
            },
          ],
          outputs: [
            {
              type: "uint256[]",
              name: "amounts",
            },
          ],
        },
        {
          name: "swapTokensForExactTokens",
          type: "function",
          stateMutability: "nonpayable",
          inputs: [
            {
              type: "uint256",
              name: "amountOut",
            },
            {
              type: "uint256",
              name: "amountInMax",
            },
            {
              type: "address[]",
              name: "path",
            },
            {
              type: "address",
              name: "to",
            },
            {
              type: "uint256",
              name: "deadline",
            },
          ],
          outputs: [
            {
              type: "uint256[]",
              name: "amounts",
            },
          ],
        },
        {
          type: "receive",
          stateMutability: "payable",
        },
    ]

} as const