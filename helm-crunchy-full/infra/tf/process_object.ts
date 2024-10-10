export interface ComputeInstanceNetworkInterface {
    network: string,
    accessConfig: []
}
export interface ComputeInstance {
        description: string,
        machineType: string,
        zone: string,
        name: string,
        bootDisk: {
          autoDelete?: boolean,
          initializeParams: {
            type: string,
            image: string,
            labels?: {
                [key: string]: string;
            },
            size?: number
          }
        },
        networkInterface: ComputeInstanceNetworkInterface[],
        metadata?: {
            [key: string]: string;
        },
        serviceAccount: {
          email: string,
          scopes: string[]
        }
      }

export interface GCPObjects {
    read?: boolean
    instances: ComputeInstance[];
}


export interface ProjectInfo {
    projectMeta?: {
        project?: string
        region?: string
    }
    gcpObjects?: GCPObjects[]
}
