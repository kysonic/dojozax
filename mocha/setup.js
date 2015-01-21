var assert = require('assert'),
    webdriver = require('selenium-webdriver'),
    test = require('selenium-webdriver/testing');

var driver = new webdriver.Builder()
    .usingServer('http://localhost:4444/wd/hub')
    .withCapabilities(webdriver.Capabilities.firefox()).
    build();

test.after(function () {
    driver.quit();
});

var tests = require('./tests');
tests.run(test, driver);


