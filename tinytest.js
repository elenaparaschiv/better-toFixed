//Done: Get successes to be green
//Done: Make sure only one error per failure goes to the console
//Done: Make failures red
//Done: Show stack traces for failures
//Done: Only show stack traces if you click expand

//Done: Output summary statistics to the DOM

var TinyTestHelper = {
     renderStats : function(tests, failures) {
        var numberOfTests = Object.keys(tests).length;
            var successes = numberOfTests - failures;

            var summaryString = 'Ran ' + numberOfTests + ' tests: '
                                 + successes + ' successes, '
                                  + failures + ' failures';

            var summaryElement = document.createElement('h1');
            summaryElement.textContent =  summaryString;
            document.body.appendChild(summaryElement) ;
     }
};


var TinyTest = {

    run: function(tests) {

        var failures = 0;

        for (testName in tests) {
            var testAction = tests[testName];
            try {
                testAction.apply(this);
                console.log('%c' + testName  , 'color:#008000');
            } catch (e) {
                failures++;
                console.groupCollapsed('%c' + testName, 'color:red');
                console.error(e.stack);
                console.groupEnd();
            }
        }

        setTimeout(function() { // Give document a chance to complete
            if (window.document && document.body) {
                document.body.style.backgroundColor = (failures == 0 ? '#99ff99' : '#ff9999');
                TinyTestHelper.renderStats(tests, failures);
            }
        }, 0);

    },

    fail: function(msg) {
        throw new Error('failyMaily(): ' + msg);
    },

    assert: function(value, msg) {
        if (!value) {
            throw new Error('assert(): ' + msg);
        }
    },

    assertEquals: function(expected, actual) {
        if (expected != actual) {
            throw new Error('assertEquals() "' + expected + '" != "' + actual + '"');
        }
    },

    assertStrictEquals: function(expected, actual) {
        if (expected !== actual) {
            throw new Error('assertStrictEquals() "' + expected + '" !== "' + actual + '"');
        }
    },

};

var fail               = TinyTest.fail.bind(TinyTest),
    assert             = TinyTest.assert.bind(TinyTest),
    assertEquals       = TinyTest.assertEquals.bind(TinyTest),
    eq                 = TinyTest.assertEquals.bind(TinyTest), // alias for assertEquals
    assertStrictEquals = TinyTest.assertStrictEquals.bind(TinyTest),
    tests              = TinyTest.run.bind(TinyTest);
