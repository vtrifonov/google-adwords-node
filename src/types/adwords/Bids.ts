import { IMoney } from './Money';
import { IBids } from '../abstract';
import { IAttributes } from './Attributes';
import { BidSource } from '../enum';

interface ICpaBid extends IBids, IAttributes<'CpaBid'> {
  bid: IMoney;
  readonly bidSource?: BidSource;
}

interface ICpcBid extends IBids, IAttributes<'CpcBid'> {
  bid: IMoney;
  readonly cpcBidSource?: BidSource;
}

interface ICpmBid extends IBids, IAttributes<'CpmBid'> {
  bid: IMoney;
  readonly cpmBidSource?: BidSource;
}

type PartialBid = Partial<ICpcBid | ICpaBid | ICpmBid>;

export { ICpaBid, ICpcBid, ICpmBid, PartialBid };
