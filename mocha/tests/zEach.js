var assert = require('assert'),
webdriver = require('selenium-webdriver');
exports.run =
    function(test, driver) {
        test.describe('ZEACH', function() {
            test.it('Push', function() {
                driver.executeScript(function() {
                    return window.app.model.persons.push({name:'August',lastName:'Minsky',age:29});
                }).then(function() {
                    driver.executeScript(function() {
                        return document.querySelector('div[z-each]').innerHTML;
                    }).then(function(html) {
                        assert(/\<div z-bind\=\"\">August\<\/div\>/.test(html),'Not Found August');
                    });
                });
            });
            test.it('Splice', function() {
                driver.executeScript(function() {
                    return window.app.model.persons.splice(1);
                }).then(function() {
                    driver.executeScript(function() {
                        return document.querySelector('div[z-each]').innerHTML;
                    }).then(function(html) {
                        assert(!/Jim/.test(html),'Found Jim');
                    });
                });
            });
            test.it('Query', function() {
                driver.executeScript(function() {
                    return window.app.model.persons.query({name:/Frank/i});
                }).then(function() {
                    driver.executeScript(function() {
                        return document.querySelector('div[z-each]').innerHTML;
                    }).then(function(html) {
                        assert(/Frank/.test(html) && !/Jim/i.test(html),'Not found Frank but Found Jim');
                    });
                });
            });
            test.it('Change model property', function() {
                driver.executeScript(function() {
                    return window.app.model.persons[0].name = 'September';
                }).then(function() {
                    driver.executeScript(function() {
                        return document.querySelector('div[z-each]').innerHTML;
                    }).then(function(html) {
                        assert(/August/.test(html),'September not found.');
                    });
                });
            });
        });
    };