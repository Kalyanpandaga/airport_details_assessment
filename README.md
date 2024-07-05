# airport_details_assessment

This is a Node.js REST API that provides details about airports, including related city and country information, based on the IATA code.

## Setup

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Kalyanpandaga/airport_details_assessment.git
    cd airport_details_assessment
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the server:

    ```bash
    node get_airport_details.js
    ```
    or 
    ```bash
    npx nodemon get_airport_details.js
    ```

The server should now be running at `http://localhost:3000`.

## API Endpoint

### Get Airport Details

- **URL**: `/airport/:iata_code`
- **Method**: `GET`
- **URL Parameter**: `iata_code` (string)

#### Example Request

```http
GET http://localhost:3000/airport/AGR


Live Deployment
You can access the live version of this API at:

https://airport-details-codebash.onrender.com/airport/AGR
