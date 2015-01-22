var assert = require('assert'),
webdriver = require('selenium-webdriver');
exports.run =
    function(test, driver) {
        test.describe('ZIF', function() {
            test.it('Change model property', function() {
                driver.get('http://dojozax/').then(function(){
                    driver.executeScript(function() {
                        return window.app.model.ifData =false;
                    }).then(function() {
                        driver.executeScript(function() {
                            return document.querySelector('div[z-if]').innerHTML;
                        }).then(function(html) {
                            assert.equal(html,'','Node in DOM.');
                        });
                    });
                    driver.sleep(1000);
                    driver.executeScript(function() {
                        return window.app.model.ifData =true;
                    }).then(function() {
                        driver.executeScript(function() {
                            return document.querySelector('div[z-if]').innerHTML;
                        }).then(function(html) {
                            assert.equal(html,'Added content with <div z-bind=\"\">John</div> model property.','Node not found!');
                        });
                    });
                });
            });
        });
    };