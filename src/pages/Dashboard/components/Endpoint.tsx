import { EndpointDefinition } from "@multiversx/sdk-core/out";
import { EndpointDisplay } from "./EndpointDisplay";
import { whitelistEndpoints } from "config";

export const Endpoint = ({
    endpoints,
}: {
    endpoints: EndpointDefinition[];
}) => {
    let filteredEndpoints = endpoints;
    if(whitelistEndpoints && whitelistEndpoints.length > 0) {
        filteredEndpoints = whitelistEndpoints
            .map(({ name }) =>  endpoints.find((endpoint) => endpoint.name === name))
            .filter((endpoint) => endpoint !== undefined)
    }
    
    if(filteredEndpoints.length === 0) {
        return null;
    }
   
    return (
        <div className='flex flex-col gap-6'>
            {filteredEndpoints
                .map((endpoint, index) => {
                    return (
                        <EndpointDisplay 
                            key={`${endpoint.name}-${index}`} 
                            endpoint={endpoint}
                        />
                    );
                })
            }
        </div>
    )
}