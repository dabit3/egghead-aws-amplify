# How to Build Serverless Web Applications with React & AWS Amplify

Building Serverless REST APIs with AWS Lambda 

### Lambda function:

```js
app.get('/people', function(req, res) {
  // const people = [
  //   { name: 'Nader' , hair_color: 'brown' },
  //   { name: 'Lilly' , hair_color: 'black' },
  //   { name: 'Victor' , hair_color: 'blonde' }
  // ]
  axios.get('https://swapi.co/api/people/')
    .then(response => {
      const people = response.data.results
      res.json({
        error: null,
        people
      })
    })
    .catch(err => {
      res.json({
        error: err,
        people: null
      });
    })
});
```