/* tslint:disable */
/* eslint-disable */
declare module "node-config-ts" {
  interface IConfig {
    NODE_ENV: string
    SERVICE_NAME: string
    INSTANCE_ID: string,
    HOSTNAME: string
    PORT: number
    IP: string
    API_ROOT: string
    MONGODB_URI: string
    EUREKA_SERVER: EUREKASERVER
  }
  interface EUREKASERVER {
    HOSTNAME: string
    PORT: number
    SERVICE_PATH: string
  }
  export const config: Config
  export type Config = IConfig
}