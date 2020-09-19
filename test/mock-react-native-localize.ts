jest.mock("react-native-localize", () => {
  return {
    findBestAvailableLanguage: ([language = "fr"]) => ({
      languageTag: language,
      isRTL: false,
    }),
  }
})
