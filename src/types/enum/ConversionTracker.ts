export namespace ConversionTracker {
  export enum Status {
    ENABLED = 'ENABLED',
    DISABLED = 'DISABLED',
    HIDDEN = 'HIDDEN',
  }

  export enum Category {
    DEFAULT = 'DEFAULT',
    PAGE_VIEW = 'PAGE_VIEW',
    PURCHASE = 'PURCHASE',
    SIGNUP = 'SIGNUP',
    LEAD = 'LEAD',
    REMARKETING = 'REMARKETING',
    DOWNLOAD = 'DOWNLOAD',
  }

  export enum Type {
    AdCallMetricsConversion = 'AdCallMetricsConversion',
    AdWordsConversionTracker = 'AdWordsConversionTracker',
    AppConversion = 'AppConversion',
    UploadCallConversion = 'UploadCallConversion',
    UploadConversion = 'UploadConversion',
    WebsiteCallMetricsConversion = 'WebsiteCallMetricsConversion',
  }
}
