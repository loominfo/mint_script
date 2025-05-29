import { createPublicClient, defineChain, fallback, http } from "viem";
import { bsc } from "viem/chains";

export const chain =
  import.meta.env.MODE === "development"
    ? defineChain({
        id: 666,
        name: "Local Network",
        nativeCurrency: {
          name: "Ether",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: {
          default: { http: ["http://192.168.1.10:8588"] },
        },
        contracts: {
          multicall3: {
            address: "0x39695F8713AD9C45C63Faf1e99cCaa3Fdcf02A4f",
            blockCreated: 55,
          },
        },
      })
    : bsc;

export const transport =
  import.meta.env.MODE === "development"
    ? http()
    : fallback(
        [
          http("https://binance.llamarpc.com"),
          http("https://bsc-dataseed.bnbchain.org"),
          http("https://bsc-dataseed.nariox.org"),
          http("https://bsc-dataseed.defibit.io"),
          http("https://bsc-dataseed.ninicoin.io"),
          http("https://bsc.nodereal.io"),
          http("https://bsc-dataseed-public.bnbchain.org"),
          http("https://bnb.rpc.subquery.network/public"),
        ],
        { rank: true }
      );

export const publicClient = createPublicClient({ chain, transport });
