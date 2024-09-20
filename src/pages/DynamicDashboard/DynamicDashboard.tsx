import { contractAddress, environment } from 'config';
import abi from 'contracts/liquid-locking.abi.json';
import { AuthRedirectWrapper } from 'wrappers';
import { useGetAccountInfo, useGetLoginInfo, useScrollToElement } from 'hooks';
import { ScExplorerContainer } from '@multiversx/sdk-dapp-sc-explorer/containers/ScExplorerContainer';
import { ContractEndpointMutabilityEnum } from '@multiversx/sdk-dapp-sc-explorer/types';
import {
  faAngleDown,
  faAngleRight,
  faCommand,
  faListTree,
  faList,
  faQuestionCircle,
  faLink,
  faFileCode,
  faPen,
  faEye,
  faUserLock,
  faTerminal,
  faReceipt,
  faPlus,
  faMinus,
  faPlay,
  faSpinner
} from 'icons/solid';
import { faClone } from 'icons/regular';
import { ContractEndpoints } from '@multiversx/sdk-dapp-sc-explorer/components/ContractEndpoints'
import { useGetSmartContractDetails } from 'hooks/useGetSmartContractDetails';
import './styles.css'
import { Account } from '../Dashboard/widgets';
import { WidgetType } from 'types';
import { Widget } from 'pages/Dashboard/components/Widget';
import { ContractAddress } from 'components/ContractAddress';

const customClassNames = {
    wrapperClassName: 'bg-white flex flex-col gap-4 max-w-3xl w-[740px] p-6 rounded-xl',
    cardClassName: 'flex flex-col flex-1 rounded-xl bg-slate-100 p-6 justify-center',
    cardHeaderClassName: 'mb-5',
    cardBodyClassName: 'flex items-center w-full',
    listItemClassName:'mb-4',
    badgePrimaryClassName: 'text-gray-500 text-sm',
    badgeSecondaryClassName: 'border rounded-xl border-gray-300 text-gray-500 text-sm',
    buttonClassName: 'hidden',
    buttonPrimaryClassName: 'rounded-xl px-3 py-2 text-center bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed',
    inputClassName: 'text-sm border border-gray-200 bg-white rounded-xl overflow-auto p-3.5 w-full'
};

const icons = {
  expandedIcon: faAngleDown,
  collapsedIcon: faAngleRight,
  structTypeIcon: faListTree,
  enumTypeIcon: faList,
  hintIcon: faQuestionCircle,
  copyIcon: faClone,
  linkIcon: faLink,
  contractFileIcon: faFileCode,
  mutableEndpointIcon: faPen,
  readonlyEndpointIcon: faEye,
  onlyOwnerEndpointIcon: faUserLock,
  interactiveEndpointIcon: faTerminal,
  payableEndpointIcon: faReceipt,
  plusIcon: faPlus,
  minusIcon: faMinus,
  playIcon: faPlay,
  loadIcon: faSpinner
};

export const DynamicDashboard = () => {
  useScrollToElement();
  const { smartContractDetails } = useGetSmartContractDetails();
  const WIDGETS: WidgetType[] = [
    {
      title: 'Account',
      widget: Account,
      description: 'Connected account details',
      reference: 'https://docs.multiversx.com/sdk-and-tools/sdk-dapp/#account'
    },
  ];

  return (
    <AuthRedirectWrapper>
      <div className='flex flex-col gap-6'>
        {WIDGETS.map((element) => (
          <Widget key={element.title} {...element} />
        ))}
        <div className='bg-white p-6 rounded-xl flex flex-col gap-4'>
          <p className='font-medium text-xl'>Contract</p>
          <ContractAddress />
        </div>
        <ScExplorerContainer
            smartContract={{
              contractAddress: contractAddress,
              abi: abi,
              deployedContractDetails: smartContractDetails
            }}
            accountConsumerHandlers={{
              useGetLoginInfo,
              useGetAccountInfo
            }}
            networkConfig={{ environment }}
            config={{
              canMutate: true,
              canLoadAbi: false,
              canDeploy: false,
              canUpgrade: false,
              canDisplayContractDetails: false
            }}
            icons={icons}
            customClassNames={customClassNames}
            className='mx-sdk-sc'
            children={
                <div className="flex flex-col gap-6">
                    <ContractEndpoints mutability={ContractEndpointMutabilityEnum.mutable} />
                    <ContractEndpoints mutability={ContractEndpointMutabilityEnum.readonly} />
                </div>
            }
          />
      </div>
      </AuthRedirectWrapper>
  );
};