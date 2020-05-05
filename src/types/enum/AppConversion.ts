export namespace AppConversion {
  export enum AppPlatform {
    NONE = 'NONE',
    ITUNES = 'ITUNES',
    ANDROID_MARKET = 'ANDROID_MARKET',
    MOBILE_APP_CHANNEL = 'MOBILE_APP_CHANNEL',
  }

  export enum AppConversionType {
    NONE = 'NONE',
    DOWNLOAD = 'DOWNLOAD',
    IN_APP_PURCHASE = 'IN_APP_PURCHASE',
    FIRST_OPEN = 'FIRST_OPEN',
  }
}
