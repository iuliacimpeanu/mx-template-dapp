import { useSCExplorerContext } from '@multiversx/sdk-dapp-sc-explorer/contexts/SCExplorerContextProvider';
import { EndpointDefinition } from '@multiversx/sdk-core/out/smartcontracts';
import { Endpoint } from './Endpoint';

export const Endpoints = () => {
    const { smartContract } = useSCExplorerContext();
  
    const endpoints = smartContract?.abiRegistry
      ?.endpoints as EndpointDefinition[];
  
    if (!(endpoints && endpoints.length > 0)) {
      return null;
    }
  // TODO: make components from read & write endpoints
  // TODO: do not use div mb-4
    return (
            <Endpoint 
                endpoints={endpoints} 
            /> 
    );
  };