module.exports = {
    rootDir: "../src",
    testRegex: "(/__test__/.*|(\\.|/)(test|spec))\\.(js|jsx)?$",
    testPathIgnorePatterns: ["/lib/", "/node_modules/"],
    moduleFileExtensions: ["js", "jsx", "json", "node"],
    collectCoverage: true,
    coverageDirectory: "../coverage",
};
