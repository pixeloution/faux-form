faux-form
=========
submits data to a URL via POST by creating and submitting a form filled with hidden fields. can be used to simulate submitting a clicked link via POST.


### Usage
```javascript
var FauxForm = new FauxForm()
,   FormData = {"name":"Skywalker", "jobs":["Padawan","Dark Lord"]};

FauxForm.setURL('/path/to/action');
FauxForm.setData(formData);
FauxForm.submit();
```

The above example creates and submits the following HTML form:

```HTML
<form action="/path/to/action" method="POST">
  <input type="hidden" name="name" value="Skywalker">
  <input type="hidden" name="jobs[]" value="Padawan">
  <input type="hidden" name="jobs[]" value="Dark Lord">
</form>
```

### Running Tests
Everything needed to run the tests is included; simply drop `runner.html` into your browser and you
should see the qUnit test results. External libraries are CDN driven and linked via `http://` urls, so
they will load properly when loading `runner.html` via `file://`.
