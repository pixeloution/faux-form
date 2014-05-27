//
// takes a javascript object and creates a 'form' out of the key/value pairs
// and submits it to the server via post
// 

/**
 * @param [obj] dataObject
 * key/value pairs to be submitted as a form to the server
 *
 * @return [obj]
 * this method is an object constructor
 */
function FauxForm(dataObject, url) {
    // can only be used as constructor
    if ( ! (this instanceof FauxForm))
        return new FauxForm(dataObject, url);

    dataObject && this.data(dataObject);
    url && this.url(url);

}

/**
 * sets the submission URL for the faux form
 * 
 * @param [str] url
 * URL used at the value for 'action'
 */
FauxForm.prototype.url = function(url) {
    if (typeof url === 'undefined')
        return this._url;
    else
        this._url = url;
};

/**
 * set the form data to be submitted
 * 
 * @param [obj] dataObject
 * key/value pairs where the key becomes a hidden form field name; for
 * arrays of values name will have `[]` added to the end. this transformation
 * takes place in `createForm`
 */
FauxForm.prototype.data = function(dataObject) {
    if (typeof dataObject === 'undefined')
        return this._data;
    else
        this._data = dataObject;
};

FauxForm.prototype.submit = function() {
    var form = this.createForm()
    ,   body = document.getElementsByTagName('body')[0];

    body.appendChild(form);
    form.submit();
};

FauxForm.prototype.createForm = function() {
    var keys   = Object.keys(this.rawData)
    ,   len    = keys.length
    ,   form   = document.createElement('form')
    ,   inputs = ''
    ,   value  = null
    ,   i      = 0;

    form.setAttribute('action', this.url);
    form.setAttribute('method', 'POST');


    for (i=0; i<len; i++) {
        value = this.rawData[keys[i]];

        if (Array.isArray(value))
            inputs += this.createHiddenInputString(keys[i] + '[]', value);
        else
            inputs += this.createHiddenInputString(keys[i], [value]);
    }

    form.innerHTML = inputs;
    return form;
};

/** 
 * creates form element(s) for the given field name and value(s) - 
 * used createElement and setAttribute to take advantage of autoescaping
 * the attribute values
 *
 * @param [str] fieldName
 * @param [ary] values
 *
 * @return [str]
 */
FauxForm.prototype.createHiddenInputString = function(fieldName, values) {
    var elm, i, spool = [];

    for (i=0; i<values.length; i++) {
        elm = document.createElement('input');
        elm.setAttribute('type','hidden');
        elm.setAttribute('name', fieldName);
        elm.setAttribute('value', values[i]);

        spool.push(elm.outerHTML);
    }

    return spool.join('');
};


// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
Object.keys||(Object.keys=function(){var e=Object.prototype.hasOwnProperty,f=!{toString:null}.propertyIsEnumerable("toString"),c="toString toLocaleString valueOf hasOwnProperty isPrototypeOf propertyIsEnumerable constructor".split(" "),g=c.length;return function(b){if("object"!==typeof b&&("function"!==typeof b||null===b))throw new TypeError("Object.keys called on non-object");var d=[],a;for(a in b)e.call(b,a)&&d.push(a);if(f)for(a=0;a<g;a++)e.call(b,c[a])&&d.push(c[a]);return d}}());
// isArray polyfill; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
if(!Array.isArray){Array.isArray = function(arg) {return Object.prototype.toString.call(arg) === '[object Array]';};}

/* exported FauxForm */
