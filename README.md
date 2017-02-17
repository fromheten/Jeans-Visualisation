# Jeans Visualisation

This is a project to prove my coding prowness for James. Hope you like it!

## Basic Idea
I got the assignment a day before stepping on a flight to East Asia. That flight and the 5h in Istanbul airport gave me some time to think about ways to interact with sales data.
### Bussiness Intelligence knows SQL/LINQ
My good friend Tanja works in Bussiness Intelligence, and she excels in writing SQL queries to figure stuff out.

The assignment at hand is giving users novel ways to interact with data. For that reason I decided to write a interactive programming environment. Users get to edit programs ("Recipes") which determine how the data is displayed.

In these programs the user has at their hand the whole Javascript standard library, as well as the LINQ query language of .Net fame, and the Ramda library providing all functional programming you could wish for.

<blockquote>Don't cripple the user</blockquote>


## How to use
* Install all dependencies: `$ npm install`
* Start the app `$ npm start`
* Hit the "Simulate loading 100 sales from the server" a few times, so simulate doing AJAX. Random Sales are generated
* Hit the button for "Ben's Jeans sales to UK" recipe
* See all their UK sales.
* **... not comes the good part**
* Hit "Edit" next to the Recipe name
* Change the string `'UK'` to `'Sweden'`
* Instantly see your data for that country!

## Possible future features
Please know that this app is a hastework - a proof of concept. I trust you understand I can polished apps, but that is a proof of concept. I coded it together during idle times in my vacation, so any bugs found I blame on that fact ;-).

### Undo/Redo
Since all data in this app is immutable, implementing undo and redo for code editing is very easy. Haven't done it yet, but to do so one needs to keep a list of previous states and future state (for redo).

Then it's basically just a matter of `push()` and `pop()` states (which are immutable) onto those stacks.

## Liberties Taken
Since this project was written for you James, in order to show myself off as a coder, I took the liberty to write it in the way I'd like much software to be written. When reading the source, please know that I of course understand that I can't get away with being a benevolent dictator when working in a team.

In this project I chose to type check as good as can be done in JS. If it was all up to me, I would likely write the app in Elm where type unsafe code is impossible, but the Flow typechecker (based on OCaml) is also good enough.

To run the type checker, do `$ npm run flow` (after having ran `$ npm install`).

### Testing policy
The app contains tests - but not very many. That is because I don't believe in testing library functions, and not to tests things captured by the type system.

A wise man also said "If you get your data structures right, the rest falls into place". I think that is very true, and therefore designed the application thinking about data structures first. Because of this, there really isn't much magic going on in the app. It's basically `assoc()`-ing data from somewhere to somewhere else. I don't need to write a test for the `assoc` function, and therefore haven't.

When using a type system, there is also no need to test for type errors. So designing with data, and having zero (data)type errors, means very little bug surface area.

### Code Formatting
Reading the code you will notice that there is basically zero setting of state - but almost everything is done with pure functions.

You will also notice that I seldom put a newline before closing a brace. That is just a syndrom I aquired after being into Lisp - few JS coworkers would accept that style, which I understand and respect.

### Metaprogramming
This program is a interactive development environment - it's a code editor. To error-check and run the recipes I use the `eval()` function, which evaluates a string of Javascript code. Some people dogmatically say "eval is evil!" but that is a misunderstanding. Feel free to question me on that one if you disagree.

## How to Run
* Setting up dependencies: `$ npm install`
* Running the app locally: `$ npm start`
* Building: `$ npm run build`
* Running tests: `$ npm run test`
* Running typechecker: `$ npm run flow`
