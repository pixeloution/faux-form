faux-form
=========
submits data to a URL via POST by creating and submitting a form filled with hidden fields


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
