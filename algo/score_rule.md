# Credit Score Rule
## Score Range: 0 - 1000
## Score Weight
````
account life: 100
transaction count: 200
transaction value: 500
gas spent: 200
````

## Main curve
````

````

## account life
````
account life score = 100 - (first_block_used ^ n) / (current_block ^ n / 100)
where n is the smooth factor, the higher n, the higher overall score
````

## transaction count
````
max score transaction = 5000
transaction count score = 100 - (transaction ^ n) / (5000 ^ n / 100)
where n is the smooth factor, the higher n, the higher overall score
````

## transaction value
````
max score value = 1000000000000000000000 (1000 ETH)
transaction value score = 100 - (value/1000000000000000000000 ^ n) / (1000 ^ n / 100)
where n is the smooth factor, the higher n, the higher overall score
````

