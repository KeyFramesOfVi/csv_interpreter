# csv_parser

WiP!

This was created with create-react-app, and as such has the same commands you would use for that.
To run in development mode, use `npm run start`
To run in production, use `npm run build`

The application uses List Virtualization in order to render subsets of the CSV file at once based on what part of the window the user is viewing. This allows users to run a much larger CSV file without the worry of massive delays in speed with the DOM. 

The application is currently being hosted at: 
`https://victor-cabrera.github.io/csv_interpreter/`

TODO:
* Select Every Row when you click the Row #
* Select Every Column when you click the Column label
* Fix the weird split that cells make sometimes when scrolling
* Slide cursor across menu options to toggle menu options
* update javascript event before redux updates (timeout probably)

ANY COLUMN:
Range, Count
NUM COLUMN:
mean, standard deviation,
