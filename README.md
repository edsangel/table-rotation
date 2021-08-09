# table-rotation

`table-rotation` is a node js application table rotation engine written in TypeScript. This application runs via CLI and requires a CSV file that represents the table to validate and rotate.

The CSV file must have the columns `id` (of type `string`) and `json` (of type `JSON`), which contains a flat list of numbers.

**Example:**
|id |json         |
|---|-------------|
|1  |"[1,2,3,4]"  |
|2  |"[-1]"       |
|3  |"[1,2,3,4,5]"|

## I. Concept

The application parses the provided CSV, converting the `json` rows into two-dimentional arrays and validating if the arrays (tables) are valid. The validity relies on the following criteria:
1. could have at least 1 data (won't be rotated); or
2. if more than 1 data, it should make up a perfect square

Otherwise, the table shall be considered invalid and won't be rotated.

Once validated and passed, the rotation of the data shall take place. The rotation goes clockwise, moving the cell forward:

Given: [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

|     |     |     |
|:---:|:---:|:---:|
|  1  |  2  |  3  |
|  4  |  5  |  6  |
|  7  |  8  |  9  |

As the rotation takes place, each cell shall move once (clockwise; except the middle cell), thus

|     |     |     |
|:---:|:---:|:---:|
|  4  |  1  |  2  |
|  7  |  5  |  3  |
|  8  |  9  |  6  |

For a table with an equal number of rows and columns containining at least 16 cells, the rotation happens both in the outer and inner square:

Given: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ]
|     |     |     |     |
|:---:|:---:|:---:|:---:|
|  1  |  2  |  3  |  4  |
|  5  |  6  |  7  |  8  |
|  9  | 10  | 11  | 12  |
| 13  | 14  | 15  | 16  | 


Notice that the rotation takes place both in the outer and inner squares:
|     |     |     |     |
|:---:|:---:|:---:|:---:|
|  5  |  1  |  2  |  3  |
|  9  | 10  |  6  |  4  |
| 13  | 11  |  7  |  8  |
| 14  | 15  | 16  | 12  | 

After the rotation, the application parses the result and converts it onto a CSV file containing the `id`, `json` (rotated version), and `is_valid` that determines the validity of the table. If the table is invalid, `json` shall be assigned with `[]` instead.

**Example:**

Input
|id |json         |
|---|-------------|
|1  |"[1,2,3,4]"  |
|2  |"[1,2,3,4,5]"|


Output
|id |json         |is_valid|
|---|-------------|--------|
|1  |"[1,2,3,4]"  |true    |
|2  |"[]"         |false   |


## II. Building, Running and Testing the Application

### Prerequisite
Install the following:
1. [NodeJS](https://nodejs.org/en/)
2. [yarn](https://yarnpkg.com/getting-started/install)

### Build
To build the app, navigate to the root folder and execute the following command:
`yarn build`

The `/dist` folder shall be created once done.

## Running the Application

The application exposes a CLI that accepts a single argument, the CSV file.

To run, navigate to the `/dist` folder and execute the following command:
`node table-rotation.js sample.csv`


`sample.csv` is included in the build and is located in `src/dist/input`.

If you wish to run the application and provide ith with a CSV file outside the `dist/input` folder, you may execute the following command:
`node table-rotation.js ../sample.csv`.

**Disclaimer:**
Every time `yarn build` is executed, the `/dist` folder is removed. Ensure that you have a copy of your CSV file that you added in the `dist` folder.


## Unit Tests

To run the unit test, execute `jest` or `yarn test`;

## III. Additional Details

### Happy path
When the application is run and provided with a valid CSV file, the applicaiton shall be able to rotate the table as mentioned in the earlier part of this documentation. The application has the capability to dynamically check each row and rotate the tales accordingly.


### Error handling
The application has its `ErrorHandler` that throws errors that fall under the following types:
 - `FILE_NOT_FOUND` - as the name suggests, this error shall be thrown if the provided file is not found in the directory (i.e. `dist/input`).
 - `INVALID_FILE  ` - this error is thrown when an invalid filetype is provided.
 - `INVALID_NUMBER_OF_ARGUMENTS` - the application accepts only one argument following the application filename, otherwise, this error is thrown.
 - `INVALID_SYNTAX` - this is the generic error. The message could be overriden in the `ErrorOptions` that you will pass.


The error definition could be utilized as follow:
``` Javascript
function foo(bar: any) {
  if (!bar) {
    const errorOptions: ErrorOptions {
      message: 'This is an error.'
    };
    ErrorDefinition.throw(ERROR.INVALID_SYNTAX, errorOptions);
  }
}


// OUTPUT
// INVALID SYNTAX: This is an error.
```

The error messages are displayed in red to make it more dramatic :)
