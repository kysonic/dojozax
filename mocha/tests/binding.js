var assert = require('assert'),
    webdriver = require('selenium-webdriver');

exports.run =
    function(test, driver) {
        test.describe('Data binding', function() {
            test.it('Check binding in non wrapped expression', function() {
                driver.get('http://dojozax/').then(function(){
                    driver.executeScript(function() {
                        return document.querySelector('#binding > div').innerHTML;
                    }).then(function(innerHTML) {
                        assert.equal(innerHTML,'John');
                    });
                });
            });
            test.it('Change model params', function() {
                driver.get('http://dojozax/').then(function(){
                    driver.executeScript(function() {
                        window.app.model.name = 'Jim';
                    }).then(function() {
                        driver.executeScript(function() {
                            return document.querySelector('#binding > div').innerHTML;
                        }).then(function(innerHTML) {
                            assert.equal(innerHTML,'Jim');
                        });
                    });
                });
            });
            test.it('Input', function() {
                driver.get('http://dojozax/').then(function(){
                    var input = driver.findElement({id:'name-input'});
                    input.sendKeys(webdriver.Key.BACK_SPACE,webdriver.Key.BACK_SPACE,webdriver.Key.BACK_SPACE,webdriver.Key.BACK_SPACE);
                    input.sendKeys('Linda');
                    driver.executeScript(function() {
                        return document.querySelector('#binding > div').innerHTML;
                    }).then(function(innerHTML) {
                        assert.equal(innerHTML,'Linda');
                    });
                });
            });
            test.it('Textarea', function() {
                driver.get('http://dojozax/').then(function(){
                    var textarea = driver.findElement({id:'textarea'});
                    textarea.sendKeys(', consectetur');
                    driver.executeScript(function() {
                        return window.app.model.text;
                    }).then(function(text) {
                        assert.equal(text,'Lorem ipsum dolor sit amet, consectetur');
                    });
                });
            });
            test.it('Hidden attribute', function() {
                driver.get('http://dojozax/').then(function(){
                    driver.executeScript(function() {
                        return window.app.model.hide = false;
                    }).then(function() {
                        driver.executeScript(function() {
                            return document.querySelector('#hidden').innerHTML;
                        }).then(function(innerHTML) {
                            assert.equal(innerHTML,'HIDDEN CONTENT');
                        });
                    });
                });
            });
            test.it('Checkbox', function() {
                driver.get('http://dojozax/').then(function(){
                    driver.executeScript(function() {
                        return window.app.model.check = false;
                    }).then(function() {
                        driver.executeScript(function() {
                            return document.querySelector('#checkbox').checked;
                        }).then(function(checked) {
                            assert.equal(checked,false);
                        });
                        driver.findElement({id:'checkbox'}).click();
                        driver.executeScript(function() {
                            return window.app.model.check;
                        }).then(function(checked) {
                            assert.equal(checked,true);
                        });
                    });
                });
            });
            test.it('Radio', function() {
                driver.get('http://dojozax/').then(function(){
                    driver.executeScript(function() {
                        return window.app.model.radio = 1;
                    }).then(function() {
                        driver.executeScript(function() {
                            return document.querySelector('#radio1').checked;
                        }).then(function(checked) {
                            assert.equal(checked,true);
                        });
                        driver.findElement({id:'radio2'}).click();
                        driver.executeScript(function() {
                            return window.app.model.radio;
                        }).then(function(checked) {
                            assert.equal(checked,2);
                        });
                    });
                });
            });
            test.it('Select', function() {
                driver.get('http://dojozax/').then(function(){
                    driver.executeScript(function() {
                        return window.app.model.select = 'one';
                    }).then(function() {
                        driver.executeScript(function() {
                            return document.querySelector('#select').value;
                        }).then(function(value) {
                            assert.equal(value,'one');
                        });
                        driver.findElement({id:'select'}).findElement({id:"select-two"}).click();
                        driver.sleep(1000);
                        driver.executeScript(function() {
                            return window.app.model.select;
                        }).then(function(value) {
                            assert.equal(value,'two');
                        });
                    });
                });
            });
        });
    };
