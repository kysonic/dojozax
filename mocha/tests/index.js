exports.run =
    function(test, driver) {
        require('./binding.js').run(test, driver);
        require('./zIf.js').run(test, driver);
        require('./zEach.js').run(test, driver);
        //require('./vk.js').run(test, driver);
        //require('./test2.js').run(test, driver);
    }