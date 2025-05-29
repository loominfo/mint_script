import Board from "../abis/Board";
import Card721 from "../abis/Card721";
import Forge from "../abis/Forge";
import Router from "../abis/Router";
import { publicClient } from "./utils";

type TokenIdCalls = {
  abi: typeof Card721.abi;
  address: `0x${string}`;
  functionName: "tokenOfOwnerByIndex";
  args: [`0x${string}`, bigint];
}[];

type EarnCalls = {
  abi: typeof Forge.abi;
  address: `0x${string}`;
  functionName: "earn";
  args: [bigint];
}[];

type AmountOutCalls = {
  abi: typeof Router.abi;
  address: `0x${string}`;
  functionName: "getAmountsOut";
  args: [bigint, `0x${string}`[]];
}[];

type BoardEarnCalls = {
  abi: typeof Board.abi;
  address: `0x${string}`;
  functionName: "earn";
  args: [bigint];
}[];

type EarnResult = {
  tokenId: bigint;
  earn: bigint;
}[];

const step = 100;

export async function fetchTokenIds(owner: `0x${string}`, cardCount: bigint) {
  const tokenIds: bigint[] = [];

  let calls: TokenIdCalls = [];
  for (let i = 0n; i < cardCount; i++) {
    calls.push({
      abi: Card721.abi,
      address: import.meta.env.VITE_NFT_ADDRESS,
      functionName: "tokenOfOwnerByIndex",
      args: [owner, i],
    });

    if (calls.length === step || i === cardCount - 1n) {
      const results = await publicClient.multicall({
        contracts: calls,
      });

      for (const result of results) {
        if (result.result !== undefined) {
          tokenIds.push(result.result as bigint);
        }
      }

      calls = [];
    }
  }

  return tokenIds;
}

export async function fetchEarns(tokenIds: bigint[]) {
  const earns: bigint[] = [];

  let calls: EarnCalls = [];
  for (let i = 0; i < tokenIds.length; i++) {
    calls.push({
      abi: Forge.abi,
      address: import.meta.env.VITE_FORGE_ADDRESS,
      functionName: "earn",
      args: [tokenIds[i]],
    });

    if (calls.length === step || i === tokenIds.length - 1) {
      const results = await publicClient.multicall({
        contracts: calls,
      });

      for (const result of results) {
        if (result.result !== undefined) {
          earns.push(result.result as bigint);
        }
      }

      calls = [];
    }
  }

  return earns.reduce((result, earn, index) => {
    if (earn === 0n) {
      return result;
    }
    return [
      ...result,
      {
        tokenId: tokenIds[index],
        earn,
      },
    ];
  }, [] as EarnResult);
}

export async function fetchAmountOut(earns: EarnResult) {
  const oneCoinAmount: bigint[] = [];

  let calls: AmountOutCalls = [];
  for (let i = 0; i < earns.length; i++) {
    calls.push({
      abi: Router.abi,
      address: import.meta.env.VITE_ROUTER_ADDRESS,
      functionName: "getAmountsOut",
      args: [
        earns[i].earn,
        [import.meta.env.VITE_USDT_ADDRESS, import.meta.env.VITE_TOKEN_ADDRESS],
      ],
    });

    if (calls.length === step || i === earns.length - 1) {
      const results = await publicClient.multicall({
        contracts: calls,
      });

      for (const result of results) {
        if (result.result !== undefined) {
          oneCoinAmount.push((result.result[1] * 9n) / 10n);
        }
      }

      calls = [];
    }
  }

  return earns.map((earn, index) => ({
    ...earn,
    oneCoinAmount: oneCoinAmount[index],
  }));
}

export async function fetchBoardEarns(tokenIds: bigint[]) {
  const boardEarns: bigint[] = [];

  let calls: BoardEarnCalls = [];
  for (let i = 0; i < tokenIds.length; i++) {
    calls.push({
      abi: Board.abi,
      address: import.meta.env.VITE_BOARD_ADDRESS,
      functionName: "earn",
      args: [tokenIds[i]],
    });

    if (calls.length === step || i === tokenIds.length - 1) {
      const results = await publicClient.multicall({
        contracts: calls,
      });

      for (const result of results) {
        if (result.result !== undefined) {
          boardEarns.push(result.result as bigint);
        }
      }

      calls = [];
    }
  }

  return boardEarns.reduce((result, earn, index) => {
    if (earn === 0n) {
      return result;
    }
    return [
      ...result,
      {
        tokenId: tokenIds[index],
        earn,
      },
    ];
  }, [] as EarnResult);
}
