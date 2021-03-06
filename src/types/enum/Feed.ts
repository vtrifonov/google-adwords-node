export namespace Feed {
  export enum Type {
    NONE = 'NONE',
    SITELINK = 'SITELINK',
    CALL = 'CALL',
    APP = 'APP',
    REVIEW = 'REVIEW',
    AD_CUSTOMIZER = 'AD_CUSTOMIZER',
    CALLOUT = 'CALLOUT',
    STRUCTURED_SNIPPET = 'STRUCTURED_SNIPPET',
    MESSAGE = 'MESSAGE',
    PRICE = 'PRICE',
    PROMOTION = 'PROMOTION',
  }

  export enum Status {
    ENABLED = 'ENABLED',
    REMOVED = 'REMOVED',
    UNKNOWN = 'UNKNOWN',
  }

  export enum Origin {
    USER = 'USER',
    ADWORDS = 'ADWORDS',
    UNKNOWN = 'UNKNOWN',
  }
}
