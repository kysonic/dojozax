var assert = require('assert'),
webdriver = require('selenium-webdriver');
exports.run =
    function(test, driver) {
        test.describe('VK', function() {
            test.it('should work', function() {
                driver.get('https://vk.com/').then(function(){
                    driver.sleep(2000);
                    driver.findElement({id:'quick_email'}).sendKeys('soooyc@gmail.com');
                    driver.sleep(2000);
                    driver.findElement({id:'quick_pass'}).sendKeys('kysonicpass89');
                    driver.sleep(1000);
                    driver.findElement({id:'quick_login_button'}).click();
                    driver.sleep(2000);
                    driver.findElement({id:'l_fr'}).findElement({tagName:'a'}).click();
                    driver.sleep(2000);
                    driver.findElement({id:'user_block33918235'}).findElement({css:'.friends_act'}).click();
                    driver.sleep(2000);
                    driver.findElement({id:'mail_box_editable'}).sendKeys('Я тебя люблю зайка!');
                    driver.sleep(2000);
                    driver.findElement({id:'mail_box_send'}).click();
                    driver.sleep(10000);
                });
            });
        });
    };