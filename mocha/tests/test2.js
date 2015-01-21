var assert = require('assert')

exports.run =
    function(test, driver) {
        test.describe('Google Search', function() {
            test.it('should work', function() {
                driver.get('http://www.google.com');
                var searchBox = driver.findElement({name:'q'});
                searchBox.sendKeys('Google Search');
                searchBox.getAttribute('value').then(function(value) {
                    assert.equal(value, 'Google Search');
                });
            });
        });
    };