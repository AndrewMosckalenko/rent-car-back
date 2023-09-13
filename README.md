# Rent car app

Start: docker compose up --build

Swagger: /api-config

# Test cases

## GET:/rent-session/cost

### 1) Date of start rent session is weekend

dateStartPeriod = 09-03-2023 (sun)

dateEndPeriod = 09-12-2023

status - 400

returt - {

          statusCode: 400,

          message: 'Start date or end date is invalid',

        },

### 2) Date of end of rent session is weekend

dateStartPeriod = 09-04-2023 

dateEndPeriod = 09-23-2023 (sat)

status - 400

returt - {

          statusCode: 400,

          message: 'Start date or end date is invalid',

        },

### 3) Date of start and end are valid

dateStartPeriod = 09-04-2023 

dateEndPeriod = 09-12-2023



status - 200

result - 8750

### 4) Period is invalid

dateStartPeriod = 08-04-2023 

dateEndPeriod = 09-12-2023

status 400

returt - {

          statusCode: 400,

          message: 'Rent period is invalid',

        },

## GET:/rent-session/is-available

current DB state

+---------+-------------------+---------------+-----------+--------+

|   id    |  rent_start_date  | rent_end_date | rent_cost | car_id |

+---------+-------------------+---------------+-----------+--------+

|   1     |   2023-09-11      | 2023-09-25    | 14150     | 123    |

|   2     |   2023-09-01      | 2023-09-25    | 22750     | 1234   |

+---------+-------------------+---------------+-----------+--------+

### 1) Date of start new session is in exist period

------|***exist session***|-------------

-------------|***new session***|--------

dateStartPeriod = 09-15-2023 

dateEndPeriod = 09-29-2023

carId = 1234



status 200

result false

### 2) Date of end new session is in exist period

------|***exist session***|-------------

---|***new session***|---------------

dateStartPeriod = 09-01-2023 

dateEndPeriod = 09-22-2023

carId = 123

status 200

result false

### 3) New session wrap exist

------|***exist session*****|-------------

---|***new session************|----------

dateStartPeriod = 09-01-2023 

dateEndPeriod = 09-29-2023

carId = 123

status 200

result false

### 4) New period is valid

dateStartPeriod = 09-01-2023 

dateEndPeriod = 09-03-2023

carId = 123



status 200

result true

## GET:/rent-session/report-by-month

current DB

+---------+-------------------+---------------+-----------+--------+

|   id    |  rent_start_date  | rent_end_date | rent_cost | car_id |

+---------+-------------------+---------------+-----------+--------+

|   1     |   2023-09-11      | 2023-09-25    | 14150     | 123    |

|   2     |   2023-09-01      | 2023-09-25    | 22750     | 1234   |

+---------+-------------------+---------------+-----------+--------+

### 1) Month with rent sessions

month = 9

year = 2023


status 200

result [

  {

    "carId": 123,

    "usage": "50",

  },

    {

    "carId": 1234,

    "usage": "83",

  },

]

### 2) Month without rent sessions

month = 9

year = 2022


status 200

result []

## GET:/rent-session/report

Curretn DB

+---------+-------------------+---------------+-----------+--------+

|   id    |  rent_start_date  | rent_end_date | rent_cost | car_id |

+---------+-------------------+---------------+-----------+--------+

|   1     |   2023-09-11      | 2023-09-25    | 14150     | 123    |

|   2     |   2023-09-01      | 2023-09-25    | 22750     | 1234   |

+---------+-------------------+---------------+-----------+--------+


### 1) Month with rent sessions

dateStartPeriod = 09-01-2023

dateEndPeriod = 09-30-2023

status 200

result [

  {

    "carId": 123,

    "usage": "50",

  },

    {

    "carId": 1234,

    "usage": "83",

  },

]

### 2) Random period

dateStartPeriod = 08-01-2023

dateEndPeriod = 09-30-2023


status 200

result [

    {

        "carId": 1234,

        "usage": "40"

    },

    {

        "carId": 123,

        "usage": "24"

    }
    
]