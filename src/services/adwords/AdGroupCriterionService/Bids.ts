import { IMoney } from './Money';
import { BidSource } from '../../../types/enum';
import { IBids } from '../../../types/abstract';

interface ICpaBid extends IBids {
  bid: IMoney;
  readonly bidSource?: BidSource;
}

interface ICpcBid extends IBids {
  bid: IMoney;
  readonly cpcBidSource?: BidSource;
}

interface ICpmBid extends IBids {
  bid: IMoney;
  readonly cpmBidSource?: BidSource;
}

export { ICpaBid, ICpcBid, ICpmBid };
