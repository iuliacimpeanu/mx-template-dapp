import { EnvironmentsEnum } from 'types';
import abi from 'contracts/liquid-locking.abi.json';

export * from './sharedConfig';

export const contractAbi = abi
export const contractAddress =
  'erd1qqqqqqqqqqqqqpgqd8fcu7nmwu68wscmj2dxgp52nuslrx46dk2s63kpqh';
export const API_URL = 'https://devnet-template-api.multiversx.com';
export const sampleAuthenticatedDomains = [API_URL];
export const environment = EnvironmentsEnum.devnet;
export const metamaskSnapWalletAddress =
  'https://devnet-snap-wallet.multiversx.com';

interface IWhitelistEndpoint {
  name: string,
  title: string
}
export const whitelistEndpoints: IWhitelistEndpoint[] = [
  {name: 'set_unbond_period', title: 'Unbond Period'},
  {name: 'lock', title: 'Lock'},
]
