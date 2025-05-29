import { Button, Flex, Form, Input, message, Typography } from "antd";
import {
  Account,
  createWalletClient,
  encodeFunctionData,
  formatEther,
  http,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { useImmer } from "use-immer";

import { chain, publicClient } from "./config/utils";
import {
  fetchAmountOut,
  fetchBoardEarns,
  fetchEarns,
  fetchTokenIds,
} from "./config/methods";
import Card721 from "./abis/Card721";
import Forge from "./abis/Forge";
import Board from "./abis/Board";

interface FormValues {
  privateKey: `0x${string}`;
}

interface Data {
  tokenIds?: bigint[];
  cardCount: number;
  earnCount: number;
  usdtAmount: string;
  tokenAmount: string;
  successCount: number;
  faildCount: number;
  loading: boolean;
  boardLoading: boolean;
  btnText: string;
  boardEarnAmount: string;
  boardBtnText: string;
  tradeCount: number;
}

const initialData: Data = {
  cardCount: 0,
  earnCount: 0,
  usdtAmount: "0",
  tokenAmount: "0",
  successCount: 0,
  faildCount: 0,
  loading: false,
  boardLoading: false,
  btnText: "开始铸币",
  boardEarnAmount: "0",
  boardBtnText: "领取流动性奖励",
  tradeCount: 0,
};

function App() {
  const [form] = Form.useForm<FormValues>();
  const [data, updateData] = useImmer<Data>(initialData);

  const mintToken = async () => {
    const values = form.getFieldsValue();
    if (!/^(0x)?[0-9a-fA-F]{64}$/.test(values.privateKey)) {
      return;
    }

    updateData({ ...initialData, tokenIds: data.tokenIds });
    const privateKey: `0x${string}` = values.privateKey.startsWith("0x")
      ? values.privateKey
      : `0x${values.privateKey}`;
    const account = privateKeyToAccount(privateKey);
    const walletClient = createWalletClient({
      account,
      chain,
      transport: http(),
    });
    updateData((draft) => {
      draft.loading = true;
      draft.btnText = "读取数据中...";
    });

    try {
      const tokenIds = await getTokenIds(account);
      const earns = await fetchEarns(tokenIds);
      updateData((draft) => {
        draft.earnCount = earns.length;
        draft.usdtAmount = formatEther(
          earns.reduce((acc, earn) => acc + earn.earn, 0n)
        );
      });
      const amountOuts = await fetchAmountOut(earns);
      updateData((draft) => {
        draft.tokenAmount = formatEther(
          amountOuts.reduce((acc, amount) => acc + amount.oneCoinAmount, 0n)
        );
      });

      if (amountOuts.length > 0) {
        updateData((draft) => {
          draft.btnText = "交易签名中...";
        });
        const tx = {
          account,
          to: import.meta.env.VITE_FORGE_ADDRESS,
          chain,
          data: encodeFunctionData({
            abi: Forge.abi,
            functionName: "mintToken",
            args: [amountOuts[0].tokenId, amountOuts[0].oneCoinAmount],
          }),
          gasPrice: BigInt(import.meta.env.VITE_GAS_PRICE),
        };
        const gas = (await publicClient.estimateGas(tx)) * 2n;
        let nonce = await publicClient.getTransactionCount({
          address: account.address,
        });

        const serializedTransactions: `0x${string}`[] = [];
        for (let i = 0; i < amountOuts.length; i++) {
          const data = encodeFunctionData({
            abi: Forge.abi,
            functionName: "mintToken",
            args: [amountOuts[i].tokenId, amountOuts[i].oneCoinAmount],
          });
          const serializedTransaction = await walletClient.signTransaction({
            ...tx,
            data,
            gas,
            nonce: nonce++,
          });
          serializedTransactions.push(serializedTransaction);
        }

        updateData((draft) => {
          draft.btnText = "交易中...";
        });
        const hashs: `0x${string}`[] = [];
        for (let i = 0; i < serializedTransactions.length; i++) {
          const hash = await publicClient.sendRawTransaction({
            serializedTransaction: serializedTransactions[i],
          });
          hashs.push(hash);
        }

        for (let i = 0; i < hashs.length; i++) {
          publicClient
            .waitForTransactionReceipt({
              hash: hashs[i],
            })
            .then((receipt) => {
              if (receipt.status === "success") {
                updateData((draft) => {
                  draft.successCount = (draft.successCount || 0) + 1;
                });
              } else {
                updateData((draft) => {
                  draft.faildCount = (draft.faildCount || 0) + 1;
                });
              }
            });
        }
        message.success("交易发送完成✅");
      } else {
        message.info("没有可铸币的NFT");
      }
    } catch (error) {
      console.log(error);
      message.error("交易失败❌");
    }
    updateData((draft) => {
      draft.loading = false;
      draft.btnText = "开始铸币";
    });
  };

  const takeReward = async () => {
    const values = form.getFieldsValue();
    if (!/^(0x)?[0-9a-fA-F]{64}$/.test(values.privateKey)) {
      return;
    }

    updateData({ ...initialData, tokenIds: data.tokenIds });
    const privateKey: `0x${string}` = values.privateKey.startsWith("0x")
      ? values.privateKey
      : `0x${values.privateKey}`;
    const account = privateKeyToAccount(privateKey);
    const walletClient = createWalletClient({
      account,
      chain,
      transport: http(),
    });
    updateData((draft) => {
      draft.boardLoading = true;
      draft.boardBtnText = "读取数据中...";
    });

    try {
      const tokenIds = await getTokenIds(account);
      const earns = await fetchBoardEarns(tokenIds);
      updateData((draft) => {
        draft.boardEarnAmount = formatEther(
          earns.reduce((acc, earn) => acc + earn.earn, 0n)
        );
      });

      if (earns.length > 0) {
        updateData((draft) => {
          draft.boardBtnText = "交易签名中...";
        });
        const tx = {
          account,
          to: import.meta.env.VITE_BOARD_ADDRESS,
          chain,
          data: encodeFunctionData({
            abi: Board.abi,
            functionName: "takeReward",
            args: [earns[0].tokenId],
          }),
          gasPrice: BigInt(import.meta.env.VITE_GAS_PRICE),
        };
        const gas = (await publicClient.estimateGas(tx)) * 2n;
        let nonce = await publicClient.getTransactionCount({
          address: account.address,
        });

        const serializedTransactions: `0x${string}`[] = [];
        for (let i = 0; i < earns.length; i++) {
          const data = encodeFunctionData({
            abi: Board.abi,
            functionName: "takeReward",
            args: [earns[i].tokenId],
          });
          const serializedTransaction = await walletClient.signTransaction({
            ...tx,
            data,
            gas,
            nonce: nonce++,
          });
          serializedTransactions.push(serializedTransaction);
        }

        updateData((draft) => {
          draft.boardBtnText = "交易中...";
        });
        const hashs: `0x${string}`[] = [];
        for (let i = 0; i < serializedTransactions.length; i++) {
          const hash = await publicClient.sendRawTransaction({
            serializedTransaction: serializedTransactions[i],
          });
          hashs.push(hash);
        }

        for (let i = 0; i < hashs.length; i++) {
          publicClient
            .waitForTransactionReceipt({
              hash: hashs[i],
            })
            .then((receipt) => {
              if (receipt.status === "success") {
                updateData((draft) => {
                  draft.successCount = (draft.successCount || 0) + 1;
                });
              } else {
                updateData((draft) => {
                  draft.faildCount = (draft.faildCount || 0) + 1;
                });
              }
            });
        }

        message.success("交易发送完成✅");
      } else {
        message.info("没有可领取的流动性奖励");
      }
    } catch (error) {
      console.log(error);
      message.error("交易失败❌");
    }
    updateData((draft) => {
      draft.boardLoading = false;
      draft.boardBtnText = "领取流动性奖励";
    });
  };

  const getTokenIds = async (account: Account) => {
    if (data.tokenIds && data.tokenIds.length > 0) {
      updateData((draft) => {
        draft.cardCount = data.tokenIds!.length;
      });
      return data.tokenIds;
    }

    const cardCount = await publicClient.readContract({
      abi: Card721.abi,
      address: import.meta.env.VITE_NFT_ADDRESS,
      functionName: "balanceOf",
      args: [account.address],
    });
    updateData((draft) => {
      draft.cardCount = Number(cardCount);
    });
    const tokenIds = await fetchTokenIds(account.address, cardCount);
    updateData((draft) => {
      draft.tokenIds = tokenIds;
    });
    return tokenIds;
  };

  return (
    <div className="container">
      <Form layout="vertical" autoComplete="off" form={form}>
        <Form.Item
          label="私钥"
          name="privateKey"
          rules={[
            { required: true, message: "请输入私钥" },
            {
              pattern: /^(0x)?[0-9a-fA-F]{64}$/,
              message: "请输入有效的私钥",
            },
          ]}
        >
          <Input.TextArea></Input.TextArea>
        </Form.Item>
        <Form.Item>
          <Flex gap={20} justify="center">
            <Button
              type="primary"
              loading={data.loading}
              disabled={data.loading || data.boardLoading}
              onClick={mintToken}
            >
              {data.btnText}
            </Button>
            <Button
              type="primary"
              loading={data.boardLoading}
              disabled={data.loading || data.boardLoading}
              onClick={takeReward}
            >
              {data.boardBtnText}
            </Button>
          </Flex>
        </Form.Item>
        <Flex vertical gap={10}>
          {data.faildCount > 0 && (
            <Typography.Text type="danger">
              存在失败交易，请等待（成功交易笔数+失败交易笔数=应交易笔数）后再次点击按钮完成剩余交易
            </Typography.Text>
          )}
          <Typography.Text>持有NFT数量: {data.cardCount}</Typography.Text>
          <Typography.Text>中签NFT数量: {data.earnCount}</Typography.Text>
          <Typography.Text>可铸币金额: {data.usdtAmount} USDT</Typography.Text>
          <Typography.Text>中签奖励: ≈ {data.tokenAmount} ON</Typography.Text>
          <Typography.Text>应交易笔数: {data.tradeCount}</Typography.Text>
          <Typography.Text>成功交易笔数: {data.successCount}</Typography.Text>
          <Typography.Text>失败交易笔数: {data.faildCount}</Typography.Text>
          <Typography.Text>
            流动性奖励: {data.boardEarnAmount} ON
          </Typography.Text>
        </Flex>
      </Form>
    </div>
  );
}

export default App;
