/**
 * test the object constructor. the first test is a gimme, but the seonc test insures
 * the code always returns an instantiated object even if the caller forgets the `new` keyword
 */
test('object constructor', function() {
    ok(new FauxForm() instanceof FauxForm,  'creates instance with new()');
    ok(FauxForm() instanceof FauxForm, 'creates instance without new()');
});

/**
 * tests the getters/setters for the following:
 *
 *  + url
 *  + data
 *  
 */
test('Getters and Setters', function() {
    var oFauxForm = new FauxForm()
    ,   URL       = 'http://www.example.com'
    ,   dataObj   = { "name" : "bill", "friends" : ["gumby"] };

    oFauxForm.url(URL);
    equal(oFauxForm.url(), URL, 'set and get for .url() successful');

    oFauxForm.data(dataObj);
    equal(dataObj, oFauxForm.data(), 'set and get for .data() successful');
});

/**
 * tests that the form can be created with the proper values, with both key:string and
 * key:array values in the data object
 */
test('Form Creation', function() {
    var URL       = 'http://www.example.com'
    ,   withArray = { "name" : "bill", "friends" : ["gumby","peter"] }
    ,   noArray   = { "name" : "bill", "age" : 99, "location" : "Paris" }
    ,   expected  = {
                withArray : '<form action="http://www.example.com" method="POST" id="FauxFormForm"><input type="hidden" name="name" value="bill"><input type="hidden" name="friends[]" value="gumby"><input type="hidden" name="friends[]" value="peter"></form>'
            ,   noArray   : '<form action="http://www.example.com" method="POST" id="FauxFormForm"><input type="hidden" name="name" value="bill"><input type="hidden" name="age" value="99"><input type="hidden" name="location" value="Paris"></form>' }
    ,   oFauxForm = new FauxForm({}, URL);

    oFauxForm.data(noArray);
    equal(oFauxForm._createForm().outerHTML, expected.noArray, 'works without array parameters');
    
    oFauxForm.data(withArray);
    equal(oFauxForm._createForm().outerHTML, expected.withArray, 'works with array parameters');
});

/**
 * hackish test to make sure form gets attached to the page and submitted
 */
test('Form Submission', function() {
    var URL       = 'http://www.example.com'
    ,   dataObj   = { "name" : "bill", "friends" : ["gumby"] }
    ,   oFauxForm = new FauxForm(dataObj, URL)
    ,   _isSubmitted = false;

    $(document).on('submit', '#FauxFormForm', function() {
        _isSubmitted = true;
        return false;
    });

    oFauxForm.submit();
    ok(_isSubmitted, 'form attached to page and submitted');
});

