import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNumberInput } from "@/hooks/useNumberInput";
import { useConfig } from "@/hooks/useConfig";
import { TokenInfo, TokenSelect } from "@/components/token-select";
import { AddressInputWithResolver } from "@/components/address-input-with-resolver";
import { isEmpty, isObject } from "lodash-es";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import FormattedNumberTooltip from "@/components/formatted-number-tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { parseUnits, type Address } from "viem";
import { transferSchema } from "./schema";
import { z } from "zod";
import type { TransferContentType } from "./type";

interface TransferPanelProps {
  index: number;
  visible: boolean;
  content?: TransferContentType;
  onChange: (content: TransferContentType) => void;
  onRemove: (index: number) => void;
}

export const TransferPanel = ({
  index,
  visible,
  content,
  onChange,
  onRemove,
}: TransferPanelProps) => {
  const daoConfig = useConfig();
  const [selectedToken, setSelectedToken] = useState<TokenInfo | null>(null);

  const validateField = useCallback(
    (key: keyof TransferContentType, value: string) => {
      try {
        transferSchema.shape[key].parse(value);
        return "";
      } catch (error) {
        if (error instanceof z.ZodError) {
          return error.errors[0].message;
        }
        return "Invalid value";
      }
    },
    []
  );

  const handleChange = useCallback(
    ({ key, value }: { key: keyof TransferContentType; value: string }) => {
      const error = validateField(key, value);
      onChange({
        ...(content as TransferContentType),
        [key]: {
          value,
          error,
        },
      });
    },
    [onChange, content, validateField]
  );

  const { isLoading, balance } = useTokenBalance(selectedToken);

  const {
    value,
    handleChange: handleChangeAmount,
    handleBlur,
    handleReset,
  } = useNumberInput({
    maxDecimals: daoConfig?.tokenInfo?.decimals ?? 18,
    initialValue: content?.amount?.value ?? "0",
    onChange: (value) => handleChange({ key: "amount", value }),
  });

  const handleTokenChange = useCallback(
    (token: TokenInfo) => {
      setSelectedToken(token);
      handleReset();
    },
    [handleReset]
  );

  const tokenList = useMemo(() => {
    const nativeToken: TokenInfo = {
      address: daoConfig?.tokenInfo.tokenContract as Address,
      symbol: daoConfig?.tokenInfo.symbol as string,
      decimals: daoConfig?.tokenInfo.decimals as number,
      icon: daoConfig?.logo as string,
      isNative: true,
    };

    const treasuryTokenList: TokenInfo[] = [];
    if (
      daoConfig?.timelockAssetsTokenInfo &&
      isObject(daoConfig?.timelockAssetsTokenInfo) &&
      !isEmpty(daoConfig?.timelockAssetsTokenInfo)
    ) {
      Object.values(daoConfig?.timelockAssetsTokenInfo).forEach((token) => {
        treasuryTokenList.push({
          address: token.contract as Address,
          symbol: token.symbol,
          decimals: token.decimals,
          icon: token.logo,
          isNative: false,
        });
      });
    }

    return [nativeToken, ...treasuryTokenList];
  }, [daoConfig]);

  const isValueGreaterThanBalance = useMemo(() => {
    if (!balance || !value || !selectedToken?.decimals) return false;
    return (
      balance &&
      value &&
      parseUnits(value, selectedToken?.decimals ?? 18) > balance
    );
  }, [balance, value, selectedToken?.decimals]);

  useEffect(() => {
    if (tokenList.length > 0) {
      setSelectedToken(tokenList[0]);
    }
  }, [tokenList]);

  return (
    <div
      className={cn(
        "flex flex-col gap-[20px] rounded-[14px] bg-card p-[20px]",
        !visible && "hidden"
      )}
    >
      <header className="flex items-center justify-between">
        <h4 className="text-[18px] font-semibold">Action #{index}</h4>
        <Button
          className="h-[30px] gap-[5px] rounded-[100px] border border-border bg-card"
          variant="outline"
          onClick={() => onRemove(index)}
        >
          <Image
            src="/assets/image/proposal/close.svg"
            alt="plus"
            width={16}
            height={16}
          />
          <span>Remove action</span>
        </Button>
      </header>
      <div className="mx-auto flex w-full flex-col gap-[20px]">
        <div className="flex flex-col gap-[10px]">
          <label className="text-[14px] text-foreground" htmlFor="recipient">
            Transfer to
          </label>

          <AddressInputWithResolver
            id="recipient"
            value={content?.recipient?.value ?? ""}
            onChange={(value) => handleChange({ key: "recipient", value })}
            placeholder="Enter address"
            className={cn(
              "border-border/20 bg-card focus-visible:shadow-none focus-visible:ring-0",
              content?.recipient?.error && "border-red-500"
            )}
          />
          {content?.recipient?.error && (
            <span className="text-[14px] text-danger">
              {content.recipient.error}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-[10px]">
          <label className="text-[14px] text-foreground" htmlFor="titl  e">
            Transfer amount
          </label>
          <div
            className={cn(
              "relative flex flex-col gap-[10px] rounded-[4px] border border-border/20 bg-card px-[10px] py-[20px]",
              content?.amount?.error && "border-red-500"
            )}
          >
            <div className="flex items-center justify-between gap-[10px]">
              <input
                className={cn(
                  "w-full bg-transparent text-[36px] font-semibold tabular-nums text-foreground placeholder:text-foreground/50 focus-visible:outline-none"
                )}
                placeholder="0.000"
                type="number"
                value={value}
                onChange={handleChangeAmount}
                onBlur={handleBlur}
              />
              <TokenSelect
                selectedToken={selectedToken}
                tokenList={tokenList}
                onTokenChange={handleTokenChange}
              />
            </div>
            <div className="flex items-center justify-between gap-[10px]">
              <span className="text-[14px] text-foreground/50"></span>
              <span className="inline-flex flex-shrink-0 items-center gap-[5px] text-[14px] text-foreground/50">
                Balance:
                {isLoading ? (
                  <Skeleton className="h-[20px] w-[80px] rounded-[4px]" />
                ) : (
                  <FormattedNumberTooltip
                    value={balance ?? 0n}
                    valueDecimals={selectedToken?.decimals ?? 18}
                  >
                    {(formattedValue) => (
                      <span className="text-[14px] text-foreground/50">
                        {formattedValue}
                      </span>
                    )}
                  </FormattedNumberTooltip>
                )}
              </span>
            </div>
          </div>
          {content?.amount?.error && (
            <span className="text-[14px] text-danger">
              {content.amount.error}
            </span>
          )}
          {isValueGreaterThanBalance && (
            <span className="text-[14px] text-danger">
              Balance is not enough
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
