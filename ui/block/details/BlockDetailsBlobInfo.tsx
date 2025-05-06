import { Text } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import React from 'react';

import type { Block } from 'types/api/block';

import { currencyUnits } from 'lib/units';
import { WEI, WEI_IN_GWEI } from 'toolkit/utils/consts';
import { space } from 'toolkit/utils/htmlEntities';
import * as DetailedInfo from 'ui/shared/DetailedInfo/DetailedInfo';

interface Props {
  data: Block;
}

const BlockDetailsBlobInfo = ({ data }: Props) => {
  if (
    !data.blob_gas_price ||
    !data.blob_gas_used ||
    !data.burnt_blob_fees ||
    !data.excess_blob_gas
  ) {
    return null;
  }

  return (
    <>

      { data.blob_gas_price && (
        <>
          <DetailedInfo.ItemLabel
            // eslint-disable-next-line max-len
            hint="Price per unit of gas used for for blob deployment. Blob gas is independent of normal gas. Both gas prices can affect the priority of transaction execution."
          >
            Blob gas price
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <Text>{ BigNumber(data.blob_gas_price).dividedBy(WEI).toFixed() } { currencyUnits.ether } </Text>
            <Text color="text.secondary" whiteSpace="pre">
              { space }({ BigNumber(data.blob_gas_price).dividedBy(WEI_IN_GWEI).toFixed() } { currencyUnits.gwei })
            </Text>
          </DetailedInfo.ItemValue>
        </>
      ) }
      { data.blob_gas_used && (
        <>
          <DetailedInfo.ItemLabel
            hint="Actual amount of gas used by the blobs in this block"
          >
            Blob gas used
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <Text>{ BigNumber(data.blob_gas_used).toFormat() }</Text>
          </DetailedInfo.ItemValue>
        </>
      ) }
      { data.excess_blob_gas && (
        <>
          <DetailedInfo.ItemLabel
            hint="A running total of blob gas consumed in excess of the target, prior to the block."
          >
            Excess blob gas
          </DetailedInfo.ItemLabel>
          <DetailedInfo.ItemValue>
            <Text>{ BigNumber(data.excess_blob_gas).dividedBy(WEI).toFixed() } { currencyUnits.ether } </Text>
            <Text color="text.secondary" whiteSpace="pre">
              { space }({ BigNumber(data.excess_blob_gas).dividedBy(WEI_IN_GWEI).toFixed() } { currencyUnits.gwei })
            </Text>
          </DetailedInfo.ItemValue>
        </>
      ) }
      <DetailedInfo.ItemDivider/>
    </>
  );
};

export default React.memo(BlockDetailsBlobInfo);
