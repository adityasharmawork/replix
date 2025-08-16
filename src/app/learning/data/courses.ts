// export const SAMPLE_COURSES = [
//   {
//     id: "python-basics",
//     lang: "Python",
//     title: "Python: From Zero to Building",
//     description: "Beginner-friendly, hands-on pathway to building real Python programs.",
//     level: "Beginner",
//     lessons: [
//       { id: "py-01", title: "Intro & Setup", length: 6, content: "# Python setup and first print statement" },
//       { id: "py-02", title: "Variables & Types", length: 12, content: "# Variables, numbers, strings" },
//     ],
//     quiz: { id: "py-q1", questions: [{ id: "q1", q: "What keyword defines a function in Python?", a: ["function", "def", "fn"], correct: 1 }] },
//     cheatsheet: ["print(value)", "def name(args):"],
//   },
//   {
//     id: "js-roadmap",
//     lang: "JavaScript",
//     title: "JavaScript Essentials",
//     description: "A practical path to modern JavaScript, DOM and Node basics.",
//     level: "Beginner",
//     lessons: [
//       { id: "js-01", title: "Intro & Setup", length: 6, content: "console.log('hello')" },
//       { id: "js-02", title: "Variables & Types", length: 10, content: "let a = 1" },
//     ],
//     quiz: { id: "js-q1", questions: [{ id: "q1", q: "Which keyword declares a block-scoped variable?", a: ["var", "let", "const"], correct: 1 }] },
//     cheatsheet: ["console.log(value)", "const a = 1;"],
//   },
// ];







// export const SAMPLE_COURSES = [
//   {
//     id: "python-basics",
//     lang: "Python",
//     title: "Python: From Zero to Building",
//     description: "A complete beginner-friendly pathway to learn Python syntax, step by step, with examples and practice problems.",
//     level: "Beginner",
//     lessons: [
//       { 
//         id: "py-01", 
//         title: "Intro & Setup", 
//         length: 6, 
//         content: "Python can be installed from python.org, or you can use an online editor like Replix. The first step in any programming language is to print something on the screen.", 
//         code: "print('Hello, Python!')" 
//       },
//       { 
//         id: "py-02", 
//         title: "Variables & Data Types", 
//         length: 12, 
//         content: "Variables store data values. Python supports integers, floats, strings, and booleans. No need to explicitly declare types.", 
//         code: "x = 10  # integer\ny = 3.14  # float\nname = 'Alex'  # string\nis_active = True  # boolean" 
//       },
//       { 
//         id: "py-03", 
//         title: "Input & Output", 
//         length: 8, 
//         content: "You can take input from the user using input(), and display output using print().", 
//         code: "name = input('Enter your name: ')\nprint('Hello', name)" 
//       },
//       { 
//         id: "py-04", 
//         title: "Operators", 
//         length: 10, 
//         content: "Python supports arithmetic operators (+, -, *, /, %), comparison operators (==, >, <), and logical operators (and, or, not).", 
//         code: "a, b = 10, 3\nprint(a+b, a-b, a*b, a/b, a%b)\nprint(a > b, a == b)\nprint(a > 5 and b < 5)" 
//       },
//       { 
//         id: "py-05", 
//         title: "Conditionals", 
//         length: 10, 
//         content: "Conditionals allow decision-making in programs using if, elif, and else.", 
//         code: "x = 7\nif x % 2 == 0:\n    print('Even')\nelif x % 3 == 0:\n    print('Divisible by 3')\nelse:\n    print('Other')" 
//       },
//       { 
//         id: "py-06", 
//         title: "Loops", 
//         length: 12, 
//         content: "Loops are used to repeat actions. Python supports for-loops and while-loops.", 
//         code: "for i in range(5):\n    print(i)\n\ncount = 0\nwhile count < 3:\n    print(count)\n    count += 1" 
//       },
//       { 
//         id: "py-07", 
//         title: "Functions", 
//         length: 12, 
//         content: "Functions let you reuse code. You define them with def and call them by name.", 
//         code: "def greet(name):\n    return f'Hello {name}'\n\nprint(greet('Alex'))" 
//       },
//       { 
//         id: "py-08", 
//         title: "Lists & Loops", 
//         length: 12, 
//         content: "Lists are ordered collections. You can loop through them easily.", 
//         code: "nums = [1, 2, 3, 4]\nfor n in nums:\n    print(n*n)" 
//       },
//       { 
//         id: "py-09", 
//         title: "Strings", 
//         length: 12, 
//         content: "Strings are sequences of characters. You can slice, concatenate, and apply methods like upper(), lower().", 
//         code: "s = 'Python'\nprint(s.upper(), s.lower())\nprint(s[0:3])" 
//       },
//       { 
//         id: "py-10", 
//         title: "Basic Problems", 
//         length: 15, 
//         content: "Practice problems: check if a number is prime, find factorial, generate Fibonacci series.", 
//         code: "# Factorial\nn = 5\nfact = 1\nfor i in range(1, n+1):\n    fact *= i\nprint('Factorial:', fact)" 
//       },
//       { 
//         id: "py-11", 
//         title: "Extra: Dictionaries & Sets", 
//         length: 12, 
//         content: "Dictionaries store key-value pairs, sets store unique values.", 
//         code: "person = { 'name': 'Alex', 'age': 21 }\nprint(person['name'])\nnums = {1, 2, 3, 1}\nprint(nums)" 
//       },
//       { 
//         id: "py-12", 
//         title: "Mini Project", 
//         length: 20, 
//         content: "A simple calculator program that demonstrates functions, loops, and user input.", 
//         code: "def add(a,b): return a+b\ndef sub(a,b): return a-b\n\nwhile True:\n    x = int(input('First: '))\n    y = int(input('Second: '))\n    print('Sum =', add(x,y))\n    if input('Continue? y/n ') == 'n':\n        break" 
//       },
//     ],
//     quiz: { 
//       id: "py-q1", 
//       questions: [
//         { id: "q1", q: "Which function is used for input in Python?", a: ["input()", "read()", "scan()"], correct: 0 },
//         { id: "q2", q: "Which keyword defines a function in Python?", a: ["function", "def", "fn"], correct: 1 },
//         { id: "q3", q: "What does range(5) produce?", a: ["[1,2,3,4,5]", "[0,1,2,3,4]", "[0..5]"], correct: 1 },
//       ]
//     },
//     cheatsheet: [
//       "print(value)",
//       "x = input('Enter: ')",
//       "def name(args): return ...",
//       "for i in range(n): ...",
//       "if cond: ... elif ... else ...",
//       "list = [1,2,3]"
//     ],
//   },

//   {
//     id: "js-roadmap",
//     lang: "JavaScript",
//     title: "JavaScript Essentials",
//     description: "A practical path to modern JavaScript, DOM and Node basics.",
//     level: "Beginner",
//     lessons: [
//       { id: "js-01", title: "Intro & Setup", length: 6, content: "console.log('Hello JS')" },
//       { id: "js-02", title: "Variables & Types", length: 10, content: "let a = 1;\nconst b = 'text';" },
//       { id: "js-03", title: "Functions", length: 10, content: "function greet(name) { return `Hello ${name}`; }" },
//       { id: "js-04", title: "Conditionals", length: 8, content: "if (a % 2 === 0) console.log('Even');" },
//       { id: "js-05", title: "Loops", length: 10, content: "for (let i=0; i<5; i++) console.log(i);" },
//     ],
//     quiz: { id: "js-q1", questions: [{ id: "q1", q: "Which keyword declares a block-scoped variable?", a: ["var", "let", "const"], correct: 1 }] },
//     cheatsheet: ["console.log(value)", "const a = 1;", "for (let i=0; i<n; i++)"],
//   },

//   {
//     id: "ts-roadmap",
//     lang: "TypeScript",
//     title: "TypeScript Basics",
//     description: "Learn typed JavaScript for safer coding.",
//     level: "Beginner",
//     lessons: [
//       { id: "ts-01", title: "Intro & Setup", length: 6, content: "let message: string = 'Hello TS';\nconsole.log(message);" },
//       { id: "ts-02", title: "Variables & Types", length: 10, content: "let age: number = 21;" },
//       { id: "ts-03", title: "Functions", length: 10, content: "function add(a: number, b: number): number { return a+b; }" },
//       { id: "ts-04", title: "Conditionals", length: 8, content: "if (age > 18) console.log('Adult');" },
//       { id: "ts-05", title: "Loops", length: 10, content: "for (let i=0; i<5; i++) console.log(i);" },
//     ],
//     quiz: { id: "ts-q1", questions: [{ id: "q1", q: "What type does 'let count: number = 5' assign?", a: ["string", "number", "boolean"], correct: 1 }] },
//     cheatsheet: ["let x: type = value;", "function fn(arg: type): type { }"],
//   },

//   {
//     id: "cpp-roadmap",
//     lang: "C++",
//     title: "C++ Fundamentals",
//     description: "Learn C++ basics for problem solving.",
//     level: "Beginner",
//     lessons: [
//       { id: "cpp-01", title: "Intro & Setup", length: 6, content: "#include <iostream>\nusing namespace std;\nint main(){ cout << 'Hello C++'; }" },
//       { id: "cpp-02", title: "Variables & Types", length: 10, content: "int a = 5;\nstring s = 'Hi';" },
//       { id: "cpp-03", title: "Functions", length: 10, content: "int add(int x, int y){ return x+y; }" },
//       { id: "cpp-04", title: "Conditionals", length: 8, content: "if(a%2==0) cout << 'Even';" },
//       { id: "cpp-05", title: "Loops", length: 10, content: "for(int i=0;i<5;i++) cout << i;" },
//     ],
//     quiz: { id: "cpp-q1", questions: [{ id: "q1", q: "Which header is needed for input/output in C++?", a: ["<stdio.h>", "<iostream>", "<string>"], correct: 1 }] },
//     cheatsheet: ["#include <iostream>", "int main()", "for(int i=0;i<n;i++)"],
//   },

//   {
//     id: "java-roadmap",
//     lang: "Java",
//     title: "Java Basics",
//     description: "A practical start to Java programming.",
//     level: "Beginner",
//     lessons: [
//       { id: "java-01", title: "Intro & Setup", length: 6, content: "public class Main{ public static void main(String[] args){ System.out.println('Hello Java'); } }" },
//       { id: "java-02", title: "Variables & Types", length: 10, content: "int x = 10; String s = 'Hi';" },
//       { id: "java-03", title: "Functions", length: 10, content: "static int add(int a, int b){ return a+b; }" },
//       { id: "java-04", title: "Conditionals", length: 8, content: "if(x%2==0) System.out.println('Even');" },
//       { id: "java-05", title: "Loops", length: 10, content: "for(int i=0;i<5;i++){ System.out.println(i); }" },
//     ],
//     quiz: { id: "java-q1", questions: [{ id: "q1", q: "Which keyword is used to define a class in Java?", a: ["class", "struct", "def"], correct: 0 }] },
//     cheatsheet: ["System.out.println()", "public static void main", "for(int i=0;i<n;i++)"],
//   },

//   {
//     id: "ruby-roadmap",
//     lang: "Ruby",
//     title: "Ruby Basics",
//     description: "Learn Ruby fundamentals with hands-on coding.",
//     level: "Beginner",
//     lessons: [
//       { id: "rb-01", title: "Intro & Setup", length: 6, content: "puts 'Hello Ruby'" },
//       { id: "rb-02", title: "Variables & Types", length: 10, content: "x = 5\ny = 'Hello'" },
//       { id: "rb-03", title: "Functions", length: 10, content: "def greet(name)\n  'Hello ' + name\nend" },
//       { id: "rb-04", title: "Conditionals", length: 8, content: "if x.even?\n  puts 'Even'\nend" },
//       { id: "rb-05", title: "Loops", length: 10, content: "5.times do |i|\n  puts i\nend" },
//     ],
//     quiz: { id: "rb-q1", questions: [{ id: "q1", q: "Which keyword defines a function in Ruby?", a: ["def", "function", "fn"], correct: 0 }] },
//     cheatsheet: ["puts value", "def name(args)", "n.times do |i| end"],
//   },

//   {
//     id: "swift-roadmap",
//     lang: "Swift",
//     title: "Swift Basics",
//     description: "Learn Apple’s Swift language step by step.",
//     level: "Beginner",
//     lessons: [
//       { id: "sw-01", title: "Intro & Setup", length: 6, content: "print(\"Hello Swift\")" },
//       { id: "sw-02", title: "Variables & Types", length: 10, content: "var x: Int = 10\nlet y: String = \"Hi\"" },
//       { id: "sw-03", title: "Functions", length: 10, content: "func add(a: Int, b: Int) -> Int { return a+b }" },
//       { id: "sw-04", title: "Conditionals", length: 8, content: "if x % 2 == 0 { print(\"Even\") }" },
//       { id: "sw-05", title: "Loops", length: 10, content: "for i in 0..<5 { print(i) }" },
//     ],
//     quiz: { id: "sw-q1", questions: [{ id: "q1", q: "Which keyword defines a constant in Swift?", a: ["let", "const", "var"], correct: 0 }] },
//     cheatsheet: ["print(value)", "func name(args) -> Type { }", "for i in 0..<n"],
//   },

//   {
//     id: "csharp-roadmap",
//     lang: "C#",
//     title: "C# Basics",
//     description: "Learn modern C# fundamentals quickly.",
//     level: "Beginner",
//     lessons: [
//       { id: "cs-01", title: "Intro & Setup", length: 6, content: "Console.WriteLine(\"Hello C#\");" },
//       { id: "cs-02", title: "Variables & Types", length: 10, content: "int x = 10; string s = \"Hi\";" },
//       { id: "cs-03", title: "Functions", length: 10, content: "static int Add(int a, int b){ return a+b; }" },
//       { id: "cs-04", title: "Conditionals", length: 8, content: "if(x%2==0) Console.WriteLine(\"Even\");" },
//       { id: "cs-05", title: "Loops", length: 10, content: "for(int i=0;i<5;i++){ Console.WriteLine(i); }" },
//     ],
//     quiz: { id: "cs-q1", questions: [{ id: "q1", q: "Which keyword is used to declare a method in C#?", a: ["function", "method", "static"], correct: 2 }] },
//     cheatsheet: ["Console.WriteLine()", "static returnType Method()", "for(int i=0;i<n;i++)"],
//   },

//   {
//     id: "go-roadmap",
//     lang: "Go",
//     title: "Go Basics",
//     description: "Learn Google’s Go language from scratch.",
//     level: "Beginner",
//     lessons: [
//       { id: "go-01", title: "Intro & Setup", length: 6, content: "package main\nimport \"fmt\"\nfunc main(){ fmt.Println(\"Hello Go\") }" },
//       { id: "go-02", title: "Variables & Types", length: 10, content: "var x int = 10\ny := \"Hello\"" },
//       { id: "go-03", title: "Functions", length: 10, content: "func add(a int, b int) int { return a+b }" },
//       { id: "go-04", title: "Conditionals", length: 8, content: "if x%2==0 { fmt.Println(\"Even\") }" },
//       { id: "go-05", title: "Loops", length: 10, content: "for i:=0; i<5; i++ { fmt.Println(i) }" },
//     ],
//     quiz: { id: "go-q1", questions: [{ id: "q1", q: "Which symbol declares a short variable in Go?", a: ["=", ":=", "::"], correct: 1 }] },
//     cheatsheet: ["fmt.Println()", "func name(args type) type { }", "for init; cond; inc { }"],
//   },

//   {
//     id: "rust-roadmap",
//     lang: "Rust",
//     title: "Rust Basics",
//     description: "Learn Rust syntax step by step.",
//     level: "Beginner",
//     lessons: [
//       { id: "rs-01", title: "Intro & Setup", length: 6, content: "fn main(){ println!(\"Hello Rust\"); }" },
//       { id: "rs-02", title: "Variables & Types", length: 10, content: "let x: i32 = 10;\nlet s: &str = \"Hi\";" },
//       { id: "rs-03", title: "Functions", length: 10, content: "fn add(a: i32, b: i32) -> i32 { a + b }" },
//       { id: "rs-04", title: "Conditionals", length: 8, content: "if x % 2 == 0 { println!(\"Even\"); }" },
//       { id: "rs-05", title: "Loops", length: 10, content: "for i in 0..5 { println!(\"{}\", i); }" },
//     ],
//     quiz: { id: "rs-q1", questions: [{ id: "q1", q: "Which keyword defines a function in Rust?", a: ["fn", "def", "func"], correct: 0 }] },
//     cheatsheet: ["println!(\"{}\");", "fn name(args) -> Type { }", "for i in 0..n { }"],
//   },
// ];


















export const SAMPLE_COURSES = [
  // Provided Python Course
  {
    id: "python-basics",
    lang: "Python",
    title: "Python: From Zero to Building",
    description: "A complete beginner-friendly pathway to learn Python syntax, step by step, with examples and practice problems.",
    level: "Beginner",
    lessons: [
      { id: "py-01", title: "Intro & Setup", length: 6, content: "Python can be installed from python.org, or you can use an online editor. The first step is to print something.", code: "print('Hello, Python!')" },
      { id: "py-02", title: "Variables & Data Types", length: 12, content: "Variables store data. Python supports integers, floats, strings, and booleans without explicit type declaration.", code: "x = 10\ny = 3.14\nname = 'Alex'\nis_active = True" },
      { id: "py-03", title: "Input & Output", length: 8, content: "You can take input from the user using input(), and display output using print().", code: "name = input('Enter your name: ')\nprint('Hello', name)" },
      { id: "py-04", title: "Operators", length: 10, content: "Python supports arithmetic (+, -, *, /), comparison (==, >), and logical (and, or) operators.", code: "a, b = 10, 3\nprint(a+b, a/b)\nprint(a > b)" },
      { id: "py-05", title: "Conditionals", length: 10, content: "Conditionals allow decision-making using if, elif, and else.", code: "x = 7\nif x % 2 == 0:\n    print('Even')\nelse:\n    print('Odd')" },
      { id: "py-06", title: "Loops", length: 12, content: "Loops repeat actions. Python supports for-loops and while-loops.", code: "for i in range(5):\n    print(i)" },
      { id: "py-07", title: "Functions", length: 12, content: "Functions let you reuse code. You define them with def.", code: "def greet(name):\n    return f'Hello {name}'\nprint(greet('Alex'))" },
      { id: "py-08", title: "Lists", length: 12, content: "Lists are ordered collections. You can loop through them easily.", code: "nums = [1, 2, 3, 4]\nfor n in nums:\n    print(n*n)" },
      { id: "py-09", title: "Strings", length: 12, content: "Strings are sequences of characters. You can slice and use methods like upper().", code: "s = 'Python'\nprint(s.upper(), s[0:3])" },
      { id: "py-10", title: "Dictionaries", length: 12, content: "Dictionaries store key-value pairs.", code: "person = { 'name': 'Alex', 'age': 21 }\nprint(person['name'])" },
    ],
    quiz: { 
      id: "py-q1", 
      questions: [
        { id: "q1", q: "Which function is used for input in Python?", a: ["input()", "read()", "scan()"], correct: 0 },
        { id: "q2", q: "Which keyword defines a function in Python?", a: ["function", "def", "fn"], correct: 1 },
        { id: "q3", q: "What does range(5) produce?", a: ["[1,2,3,4,5]", "[0,1,2,3,4]", "[0..5]"], correct: 1 },
      ]
    },
    cheatsheet: ["print(value)", "x = input('Enter: ')", "def name(args): ...", "for i in range(n): ...", "if cond: ... else: ...", "list = [1,2,3]"],
  },

  // JavaScript Course
  {
    id: "javascript-basics",
    lang: "JavaScript",
    title: "JavaScript: The Core Syntax",
    description: "Learn the fundamental syntax of JavaScript, the language of the web, from variables to functions.",
    level: "Beginner",
    lessons: [
      { id: "js-01", title: "Intro & Setup", length: 6, content: "JavaScript runs in any browser console. The first step is to log something to the console.", code: "console.log('Hello, JavaScript!');" },
      { id: "js-02", title: "Variables & Data Types", length: 12, content: "Use let for variables that can change and const for constants. JS has numbers, strings, booleans, etc.", code: "let age = 25;\nconst name = 'Alex';\nlet isActive = true;" },
      { id: "js-03", title: "Alert & Prompt", length: 8, content: "You can create a popup alert with alert() and take user input with prompt().", code: "let name = prompt('Enter your name:');\nalert('Hello, ' + name);" },
      { id: "js-04", title: "Operators", length: 10, content: "JS supports arithmetic (+, -, *), strict comparison (===), and logical (&&, ||) operators.", code: "let a = 10, b = 4;\nconsole.log(a + b, a / b);\nconsole.log(a > b && b > 0);" },
      { id: "js-05", title: "Conditionals", length: 10, content: "Conditionals allow decision-making using if, else if, and else.", code: "let num = 10;\nif (num % 2 === 0) {\n    console.log('Even');\n} else {\n    console.log('Odd');\n}" },
      { id: "js-06", title: "Loops", length: 12, content: "Loops are used to repeat actions. JS has for-loops and while-loops.", code: "for (let i = 0; i < 5; i++) {\n    console.log(i);\n}" },
      { id: "js-07", title: "Functions", length: 12, content: "Functions let you reuse code. You define them with the function keyword or as arrow functions.", code: "function greet(name) {\n    return `Hello, ${name}`;\n}\nconsole.log(greet('Alex'));" },
      { id: "js-08", title: "Arrays & Loops", length: 12, content: "Arrays are ordered lists. You can loop through them with for...of or methods like forEach.", code: "const nums = [1, 2, 3, 4];\nfor (const n of nums) {\n    console.log(n * n);\n}" },
      { id: "js-09", title: "Strings", length: 12, content: "Strings have useful methods like toUpperCase() and can be manipulated easily.", code: "let s = 'JavaScript';\nconsole.log(s.toUpperCase(), s.substring(0, 4));" },
      { id: "js-10", title: "Objects", length: 15, content: "Objects store data in key-value pairs, similar to dictionaries.", code: "const person = {\n    name: 'Alex',\n    age: 21\n};\nconsole.log(person.name);" },
    ],
    quiz: { 
      id: "js-q1", 
      questions: [
        { id: "q1", q: "How do you declare a constant variable?", a: ["let", "var", "const"], correct: 2 },
        { id: "q2", q: "Which operator checks for both value and type equality?", a: ["==", "===", "="], correct: 1 },
        { id: "q3", q: "How do you write to the browser console?", a: ["print()", "console.log()", "document.write()"], correct: 1 },
      ]
    },
    cheatsheet: ["console.log(value);", "let x = 10;", "const y = 'Hi';", "function name(args) { ... }", "if (cond) { ... } else { ... }", "for (let i=0; i<n; i++) { ... }"],
  },

  // TypeScript Course
  {
    id: "typescript-basics",
    lang: "TypeScript",
    title: "TypeScript: Adding Types",
    description: "Learn how TypeScript adds a powerful type system on top of JavaScript to catch errors early.",
    level: "Beginner",
    lessons: [
      { id: "ts-01", title: "Intro & Setup", length: 8, content: "TypeScript is a superset of JavaScript. You define types for your variables to add safety.", code: "let message: string = 'Hello, TypeScript!';" },
      { id: "ts-02", title: "Basic Types", length: 12, content: "Explicitly declare types like string, number, and boolean to prevent type errors.", code: "let age: number = 25;\nlet name: string = 'Alex';\nlet isActive: boolean = true;" },
      { id: "ts-03", title: "Type Inference", length: 8, content: "TypeScript can often infer the type, so you don't always have to write it.", code: "let count = 10; // Inferred as number\n// count = 'ten'; // This would cause an error!" },
      { id: "ts-04", title: "Arrays", length: 10, content: "You can define an array of a specific type.", code: "let scores: number[] = [98, 77, 89];\nlet names: string[] = ['Alex', 'Beth'];" },
      { id: "ts-05", title: "Functions with Types", length: 15, content: "Define types for function parameters and return values for robust code.", code: "function greet(name: string): string {\n    return `Hello, ${name}`;\n}\nconsole.log(greet('Alex'));" },
      { id: "ts-06", title: "Objects & Interfaces", length: 15, content: "An interface defines the shape of an object, ensuring it has the required properties.", code: "interface User {\n    name: string;\n    id: number;\n}\nconst user: User = { name: 'Alex', id: 1 };" },
      { id: "ts-07", title: "Union Types", length: 12, content: "A variable can be one of several types using the `|` symbol.", code: "function printId(id: number | string) {\n    console.log('Your ID is: ' + id);\n}" },
      { id: "ts-08", title: "Conditionals & Loops", length: 10, content: "The syntax for conditionals and loops is identical to JavaScript.", code: "let nums: number[] = [1,2,3];\nfor (const num of nums) {\n    if (num > 1) console.log(num);\n}" },
    ],
    quiz: { 
      id: "ts-q1", 
      questions: [
        { id: "q1", q: "How do you specify a variable as a string?", a: ["let name = 'Alex' as string;", "let name: string = 'Alex';", "string name = 'Alex';"], correct: 1 },
        { id: "q2", q: "What is a key benefit of TypeScript?", a: ["It runs faster than JS.", "It has a built-in database.", "It adds static typing to JS."], correct: 2 },
        { id: "q3", q: "What defines the shape of an object in TypeScript?", a: ["class", "interface", "struct"], correct: 1 },
      ]
    },
    cheatsheet: ["let name: string = 'Alex';", "let age: number = 30;", "let scores: number[] = [];", "function add(x: number, y: number): number { ... }", "interface User { name: string; }"],
  },

  // C++ Course
  {
    id: "cpp-basics",
    lang: "C++",
    title: "C++: Performance & Power",
    description: "Learn the fundamentals of C++, a powerful language used for system programming, game development, and high-performance applications.",
    level: "Beginner",
    lessons: [
      { id: "cpp-01", title: "Intro & Setup", length: 8, content: "C++ programs need to be compiled. The basic structure includes iostream for I/O and a main function.", code: "#include <iostream>\n\nint main() {\n    std::cout << \"Hello, C++!\\n\";\n    return 0;\n}" },
      { id: "cpp-02", title: "Variables & Data Types", length: 12, content: "You must declare the type of a variable, such as int, double, char, and std::string.", code: "int age = 25;\ndouble price = 19.99;\nstd::string name = \"Alex\";" },
      { id: "cpp-03", title: "Input & Output", length: 10, content: "Use std::cout to print to the console and std::cin to read user input.", code: "int number;\nstd::cout << \"Enter a number: \";\nstd::cin >> number;\nstd::cout << \"You entered: \" << number;" },
      { id: "cpp-04", title: "Operators", length: 10, content: "C++ supports standard arithmetic, comparison, and logical operators.", code: "int a = 10, b = 3;\nstd::cout << a / b; // Integer division\ndouble x = 10.0, y = 3.0;\nstd::cout << x / y; // Floating point division" },
      { id: "cpp-05", title: "Conditionals", length: 10, content: "Make decisions with if, else if, and else statements.", code: "int x = 7;\nif (x % 2 == 0) {\n    std::cout << \"Even\";\n} else {\n    std::cout << \"Odd\";\n}" },
      { id: "cpp-06", title: "Loops", length: 12, content: "Repeat code using for-loops and while-loops.", code: "for (int i = 0; i < 5; ++i) {\n    std::cout << i << \" \";\n}" },
      { id: "cpp-07", title: "Functions", length: 12, content: "Functions require a return type and types for all parameters.", code: "int add(int a, int b) {\n    return a + b;\n}\nint sum = add(5, 3);" },
      { id: "cpp-08", title: "Vectors (Dynamic Arrays)", length: 15, content: "std::vector is a flexible array that can grow in size.", code: "#include <vector>\nstd::vector<int> nums = {1, 2, 3};\nnums.push_back(4);\nfor (int n : nums) {\n    std::cout << n << \" \";\n}" },
    ],
    quiz: { 
      id: "cpp-q1", 
      questions: [
        { id: "q1", q: "Which header is required for console I/O?", a: ["<stdio>", "<iostream>", "<console>"], correct: 1 },
        { id: "q2", q: "How do you print to the console in C++?", a: ["cout <<", "printf()", "console.log()"], correct: 0 },
        { id: "q3", q: "What is the C++ equivalent of a dynamic list/array?", a: ["Array", "List", "vector"], correct: 2 },
      ]
    },
    cheatsheet: ["#include <iostream>", "std::cout << val;", "std::cin >> var;", "int x = 10;", "double y = 3.14;", "if (cond) { ... } else { ... }", "for (int i=0; i<n; ++i) { ... }"],
  },

  // Java Course
  {
    id: "java-basics",
    lang: "Java",
    title: "Java: Structured & Robust",
    description: "Discover the syntax of Java, a class-based, object-oriented language known for its 'write once, run anywhere' philosophy.",
    level: "Beginner",
    lessons: [
      { id: "java-01", title: "Intro & Setup", length: 8, content: "Java code runs inside a class. The main method is the entry point of any Java program.", code: "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, Java!\");\n    }\n}" },
      { id: "java-02", title: "Variables & Data Types", length: 12, content: "Java is statically typed. You must declare variable types like int, double, boolean, and String.", code: "int age = 25;\ndouble weight = 68.5;\nString name = \"Alex\";" },
      { id: "java-03", title: "Input & Output", length: 12, content: "Use System.out.println() for output and the Scanner class for input.", code: "import java.util.Scanner;\nScanner scanner = new Scanner(System.in);\nSystem.out.print(\"Enter name: \");\nString name = scanner.nextLine();" },
      { id: "java-04", title: "Operators", length: 10, content: "Java uses standard arithmetic, comparison, and logical operators similar to C++ and JS.", code: "int a = 11, b = 3;\nSystem.out.println(a / b); // Integer division\nSystem.out.println(a % b); // Modulo" },
      { id: "java-05", title: "Conditionals", length: 10, content: "Use if, else if, and else for decision-making.", code: "int score = 85;\nif (score >= 90) {\n    System.out.println(\"A\");\n} else {\n    System.out.println(\"B or lower\");\n}" },
      { id: "java-06", title: "Loops", length: 12, content: "Repeat actions with for-loops and while-loops.", code: "for (int i = 0; i < 5; i++) {\n    System.out.println(i);\n}" },
      { id: "java-07", title: "Methods", length: 12, content: "Methods (Java's term for functions) must have a return type and typed parameters.", code: "public static int add(int a, int b) {\n    return a + b;\n}\nint result = add(10, 5);" },
      { id: "java-08", title: "Arrays & ArrayLists", length: 15, content: "Arrays have a fixed size, while ArrayLists are dynamic.", code: "import java.util.ArrayList;\nArrayList<String> names = new ArrayList<>();\nnames.add(\"Alex\");\nnames.add(\"Maria\");" },
    ],
    quiz: { 
      id: "java-q1", 
      questions: [
        { id: "q1", q: "What is the entry point of a Java program?", a: ["start()", "main()", "run()"], correct: 1 },
        { id: "q2", q: "Which class is used for user input?", a: ["Input", "Console", "Scanner"], correct: 2 },
        { id: "q3", q: "How do you print to the console in Java?", a: ["System.out.println()", "console.log()", "print()"], correct: 0 },
      ]
    },
    cheatsheet: ["public class Main { ... }", "System.out.println(val);", "int x = 10;", "String s = \"Hi\";", "if (cond) { ... } else { ... }", "for (int i=0; i<n; i++) { ... }"],
  },

  // Ruby Course
  {
    id: "ruby-basics",
    lang: "Ruby",
    title: "Ruby: Elegant & Readable",
    description: "Learn the beautiful and developer-friendly syntax of Ruby, a language designed for productivity and happiness.",
    level: "Beginner",
    lessons: [
      { id: "rb-01", title: "Intro & Setup", length: 6, content: "Ruby focuses on simplicity. The puts command is the standard way to print output with a new line.", code: "puts 'Hello, Ruby!'" },
      { id: "rb-02", title: "Variables & Data Types", length: 10, content: "No type declarations are needed. Variables are created upon assignment.", code: "age = 25\nprice = 19.99\nname = 'Alex'" },
      { id: "rb-03", title: "Input & Output", length: 8, content: "Use puts for output and gets.chomp to read a line of text from the user.", code: "print 'Enter your name: '\nname = gets.chomp\nputs \"Hello, #{name}!\"" },
      { id: "rb-04", title: "Operators & Methods", length: 10, content: "Ruby uses standard operators. Everything is an object, so even numbers have methods.", code: "puts 10 + 3\nputs 5.times { print '*' } # A method on an integer" },
      { id: "rb-05", title: "Conditionals", length: 10, content: "Use if, elsif, and else for branching. The 'end' keyword closes the block.", code: "num = 7\nif num.even?\n  puts 'Even'\nelse\n  puts 'Odd'\nend" },
      { id: "rb-06", title: "Loops", length: 12, content: "Ruby has many ways to loop, with .each being one of the most common.", code: "5.times do |i|\n  puts i\nend\n\n[1, 2, 3].each { |n| puts n * 2 }" },
      { id: "rb-07", title: "Methods", length: 12, content: "Define methods with def and end. The last evaluated expression is automatically returned.", code: "def greet(name)\n  \"Hello, #{name}\"\nend\nputs greet('Alex')" },
      { id: "rb-08", title: "Arrays", length: 12, content: "Arrays are ordered lists of items. They are easy to create and manipulate.", code: "nums = [1, 2, 3, 4]\nnums.push(5)\nnums.each do |n|\n  puts n\nend" },
    ],
    quiz: { 
      id: "rb-q1", 
      questions: [
        { id: "q1", q: "How do you print output in Ruby?", a: ["print()", "console.log()", "puts"], correct: 2 },
        { id: "q2", q: "Which keyword is used to define a method?", a: ["def", "function", "method"], correct: 0 },
        { id: "q3", q: "What keyword closes an if statement or method block?", a: ["}", "done", "end"], correct: 2 },
      ]
    },
    cheatsheet: ["puts 'Hello'", "name = gets.chomp", "def my_method(arg)\n  ...\nend", "if cond\n  ...\nelse\n  ...\nend", "array = [1, 2, 3]", "array.each { |item| ... }"],
  },

  // Swift Course
  {
    id: "swift-basics",
    lang: "Swift",
    title: "Swift: Modern & Safe",
    description: "Learn the syntax of Swift, a modern, fast, and safe language developed by Apple for building apps across all its platforms.",
    level: "Beginner",
    lessons: [
      { id: "swift-01", title: "Intro & Setup", length: 6, content: "Swift code is clean and concise. Use print() to display output.", code: "print(\"Hello, Swift!\")" },
      { id: "swift-02", title: "Variables & Constants", length: 12, content: "Use 'let' to declare constants (preferred) and 'var' for variables. Swift has strong type inference.", code: "let name = \"Alex\" // Inferred as String\nvar age = 25 // Inferred as Int" },
      { id: "swift-03", title: "Data Types", length: 10, content: "You can explicitly declare types like String, Int, Double, and Bool.", code: "let pi: Double = 3.14159\nvar isActive: Bool = true" },
      { id: "swift-04", title: "Operators", length: 10, content: "Swift uses standard operators. It also has range operators (..< and ...).", code: "let a = 10, b = 3\nprint(a + b)\nfor i in 1...5 { print(i) } // Closed range 1 to 5" },
      { id: "swift-05", title: "Conditionals", length: 10, content: "Decision making is done with if, else if, and else. Parentheses are not required.", code: "let score = 88\nif score > 85 {\n    print(\"Good job!\")\n}" },
      { id: "swift-06", title: "Loops", length: 12, content: "The for-in loop is commonly used to iterate over sequences like ranges or arrays.", code: "let names = [\"Anna\", \"Alex\", \"Brian\"]\nfor name in names {\n    print(\"Hello, \\(name)!\")\n}" },
      { id: "swift-07", title: "Functions", length: 12, content: "Define functions with the 'func' keyword, specifying parameter and return types.", code: "func greet(person: String) -> String {\n    return \"Hello, \\(person)!\"\n}\nprint(greet(person: \"Alex\"))" },
      { id: "swift-08", title: "Arrays & Dictionaries", length: 15, content: "Arrays are ordered lists and Dictionaries are key-value collections.", code: "var numbers: [Int] = [1, 2, 3]\nnumbers.append(4)\nvar person = [\"name\": \"Alex\", \"age\": 21]" },
    ],
    quiz: { 
      id: "swift-q1", 
      questions: [
        { id: "q1", q: "How do you declare a constant in Swift?", a: ["const", "let", "var"], correct: 1 },
        { id: "q2", q: "Which keyword is used to define a function?", a: ["def", "function", "func"], correct: 2 },
        { id: "q3", q: "How do you include a variable inside a string?", a: ["'Hello ' + name", "`Hello ${name}`", "\"Hello \\(name)\""], correct: 2 },
      ]
    },
    cheatsheet: ["print(\"Hello\")", "let name = \"Alex\"", "var age = 25", "func greet(person: String) -> String { ... }", "if score > 80 { ... }", "for item in collection { ... }"],
  },

  // C# Course
  {
    id: "csharp-basics",
    lang: "C#",
    title: "C#: Versatile & Modern",
    description: "Explore the C# language, a modern, object-oriented language from Microsoft used for web apps, games, and Windows development.",
    level: "Beginner",
    lessons: [
      { id: "csharp-01", title: "Intro & Setup", length: 8, content: "C# programs have a Main method as an entry point. Console.WriteLine is used for output.", code: "using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine(\"Hello, C#!\");\n    }\n}" },
      { id: "csharp-02", title: "Variables & Data Types", length: 12, content: "C# is strongly typed. You declare variables with types like int, double, string, and bool.", code: "int age = 25;\nstring name = \"Alex\";\nbool isActive = false;" },
      { id: "csharp-03", title: "Input & Output", length: 10, content: "Use Console.WriteLine() for output and Console.ReadLine() for input.", code: "Console.Write(\"Enter your name: \");\nstring name = Console.ReadLine();\nConsole.WriteLine($\"Hello, {name}!\");" },
      { id: "csharp-04", title: "Operators", length: 10, content: "C# supports all standard arithmetic, comparison, and logical operators.", code: "int a = 10, b = 3;\nConsole.WriteLine(a / b); // 3 (integer division)\nConsole.WriteLine(a % b); // 1 (remainder)" },
      { id: "csharp-05", title: "Conditionals", length: 10, content: "Make decisions with if, else if, and else statements.", code: "int x = 7;\nif (x % 2 == 0) {\n    Console.WriteLine(\"Even\");\n} else {\n    Console.WriteLine(\"Odd\");\n}" },
      { id: "csharp-06", title: "Loops", length: 12, content: "Use for-loops, while-loops, and foreach loops to repeat actions.", code: "for (int i = 0; i < 5; i++) {\n    Console.WriteLine(i);\n}" },
      { id: "csharp-07", title: "Methods", length: 12, content: "Methods (C#'s term for functions) must have a return type and typed parameters.", code: "static int Add(int a, int b) {\n    return a + b;\n}\nint sum = Add(5, 3);" },
      { id: "csharp-08", title: "Lists", length: 15, content: "The List<T> class provides a dynamic array.", code: "using System.Collections.Generic;\n\nList<string> names = new List<string>();\nnames.Add(\"Alex\");\nforeach (var name in names) {\n    Console.WriteLine(name);\n}" },
    ],
    quiz: { 
      id: "csharp-q1", 
      questions: [
        { id: "q1", q: "How do you print to the console in C#?", a: ["System.out.println()", "Console.WriteLine()", "print()"], correct: 1 },
        { id: "q2", q: "What is the C# equivalent of a dynamic array/list?", a: ["ArrayList", "vector", "List<T>"], correct: 2 },
        { id: "q3", q: "How do you read a line of text from the user?", a: ["Console.ReadLine()", "gets.chomp", "input()"], correct: 0 },
      ]
    },
    cheatsheet: ["Console.WriteLine(val);", "string name = Console.ReadLine();", "int age = 30;", "if (cond) { ... } else { ... }", "for (int i = 0; i < n; i++) { ... }", "List<string> items = new List<string>();"],
  },

  // Go Lang Course
  {
    id: "go-basics",
    lang: "Go",
    title: "Go: Simple & Concurrent",
    description: "Learn Go (or Golang), a language from Google designed for simplicity, reliability, and efficient concurrency.",
    level: "Beginner",
    lessons: [
      { id: "go-01", title: "Intro & Setup", length: 8, content: "Go programs are organized into packages. The 'main' package is the entry point.", code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(\"Hello, Go!\")\n}" },
      { id: "go-02", title: "Variables", length: 12, content: "Declare variables with 'var' and a type. Or, use the short `:=` syntax for type inference within functions.", code: "var age int = 25\nname := \"Alex\" // Short declaration" },
      { id: "go-03", title: "Data Types", length: 10, content: "Go is statically typed with types like int, float64, string, and bool.", code: "var score float64 = 99.5\nvar isActive bool = true" },
      { id: "go-04", title: "Input & Output", length: 10, content: "The 'fmt' package handles I/O. Use Println for output and Scan for input.", code: "var name string\nfmt.Print(\"Enter name: \")\nfmt.Scan(&name)\nfmt.Printf(\"Hello, %s\\n\", name)" },
      { id: "go-05", title: "Conditionals", length: 10, content: "Go uses if and else. No parentheses are needed around conditions.", code: "x := 7\nif x%2 == 0 {\n    fmt.Println(\"Even\")\n} else {\n    fmt.Println(\"Odd\")\n}" },
      { id: "go-06", title: "Loops", length: 12, content: "Go has only one looping construct: the 'for' loop. It can be used in different ways.", code: "for i := 0; i < 5; i++ {\n    fmt.Println(i)\n}" },
      { id: "go-07", title: "Functions", length: 12, content: "Define functions with the 'func' keyword. Types come after variable names.", code: "func add(x int, y int) int {\n    return x + y\n}\nsum := add(5, 3)" },
      { id: "go-08", title: "Slices", length: 15, content: "Slices are a flexible view into an underlying array, providing dynamic arrays.", code: "nums := []int{1, 2, 3}\nnums = append(nums, 4)\nfmt.Println(nums)" },
    ],
    quiz: { 
      id: "go-q1", 
      questions: [
        { id: "q1", q: "Which package is used for formatted I/O?", a: ["io", "main", "fmt"], correct: 2 },
        { id: "q2", q: "What is Go's only looping keyword?", a: ["loop", "for", "while"], correct: 1 },
        { id: "q3", q: "What is the short variable declaration operator?", a: [":=", "=&", "->"], correct: 0 },
      ]
    },
    cheatsheet: ["package main", "import \"fmt\"", "fmt.Println(val)", "name := \"Alex\"", "func add(x int, y int) int { ... }", "if x > 0 { ... }", "for i := 0; i < n; i++ { ... }"],
  },

  // Rust Course
  {
    id: "rust-basics",
    lang: "Rust",
    title: "Rust: Safe & Performant",
    description: "Learn the fundamentals of Rust, a systems programming language focused on safety, speed, and concurrency.",
    level: "Beginner",
    lessons: [
      { id: "rust-01", title: "Intro & Setup", length: 8, content: "Rust programs start in the main function. println! is a macro used to print to the console.", code: "fn main() {\n    println!(\"Hello, Rust!\");\n}" },
      { id: "rust-02", title: "Variables", length: 12, content: "Variables are immutable by default. Use 'let' to declare them, and 'mut' to make them mutable.", code: "let x = 5; // Immutable\nlet mut y = 10; // Mutable\ny = 11;" },
      { id: "rust-03", title: "Data Types", length: 12, content: "Rust is statically typed, but the compiler can infer types. Common scalar types are i32, f64, bool, char.", code: "let count: i32 = -100;\nlet pi: f64 = 3.14;\nlet name: &str = \"Alex\";" },
      { id: "rust-04", title: "Input & Output", length: 12, content: "Handling I/O involves using the standard library's io module.", code: "use std::io;\n\nlet mut guess = String::new();\nio::stdin().read_line(&mut guess).expect(\"Failed to read line\");\nprintln!(\"You guessed: {}\", guess);" },
      { id: "rust-05", title: "Conditionals", length: 10, content: "Use if, else if, and else for branching. Parentheses are not required.", code: "let number = 7;\nif number % 2 == 0 {\n    println!(\"even\");\n} else {\n    println!(\"odd\");\n}" },
      { id: "rust-06", title: "Loops", length: 12, content: "Rust has 'loop' for infinite loops, 'while' for conditional loops, and 'for' for iterating.", code: "for i in 0..5 {\n    println!(\"{}\", i);\n}" },
      { id: "rust-07", title: "Functions", length: 12, content: "Define functions with 'fn'. Specify parameter types, and use `->` to specify the return type.", code: "fn add(x: i32, y: i32) -> i32 {\n    x + y // No semicolon means this is the return value\n}\nlet sum = add(5, 3);" },
      { id: "rust-08", title: "Vectors", length: 15, content: "Vectors (Vec<T>) are growable lists, similar to C++ vectors or Java ArrayLists.", code: "let mut nums: Vec<i32> = vec![1, 2, 3];\nnums.push(4);\nprintln!(\"{:?}\", nums);" },
    ],
    quiz: { 
      id: "rust-q1", 
      questions: [
        { id: "q1", q: "How are variables declared in Rust by default?", a: ["Mutable", "Constant", "Immutable"], correct: 2 },
        { id: "q2", q: "Which macro is used to print to the console?", a: ["print!()", "console.log!()", "println!()"], correct: 2 },
        { id: "q3", q: "What keyword makes a variable mutable?", a: ["mut", "var", "change"], correct: 0 },
      ]
    },
    cheatsheet: ["fn main() { ... }", "println!(\"Hello\");", "let x = 5;", "let mut y = 10;", "fn add(x: i32) -> i32 { ... }", "if cond { ... } else { ... }", "for i in 0..5 { ... }"],
  },
];