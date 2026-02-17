# 7 Number Questions Answers

## 1) Null এবং Undefined এর পার্থক্য ?

- **Null**: Null হলো এমন একটি বিশেষ মান যা কোনও ভেরিয়েবল বা প্রপার্টির উদ্দেশ্যহীন বা "খালি" মান বোঝায়। এটি ইচ্ছাকৃতভাবে সেট করা হয়।
- **Undefined**: Undefined হলো যখন কোন ভ্যারিয়েবল ঘোষণা করা হয়েছে কিন্তু কোনো মান সেট করা হয়নি সে মান undefined ।

## 2) map() ফাংশনের ব্যবহার এবং forEach এর থেকে পার্থক্য ?

- **map()**: map() ফাংশনটি array এর প্রতিটি element এ operation করতে এবং নতুন array তৈরি করতে ব্যবহার করা হয়।

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
```

- **forEach()**: forEach() ফাংশনটি array এর প্রতিটি element এ operation করতে দেয়, কিন্তু কোনো নতুন array return করে না।

```javascript
const numbers = [1, 2, 3, 4, 5];
numbers.forEach((n) => console.log(n * 2));
```

## 3) == এবং === এর পার্থক্য

- **== (Equality Operator)**: == হলো Value check করে, type check করে না। type মিল না হলে auto conversion হয়।

- **=== (Strict Equality Operator)**: === হলো Value এবং type দুইটোকেই check করে।

## 4) Async/Await এর গুরুত্ব API data fetch এ

- **async/await**: async এবং await JavaScript-এ Promises এর সাথে কাজ করার একটি উন্নত পদ্ধতি যা কোডের asynchronous কার্যক্রম সাবলীল করার জন্য ব্যবহার করা হয়। যেন async/await ব্য়বহারের মাধ্যমে ডাটা প্রদর্শনকে বাহ্যত না করেই কাজ করা যায়।

```javascript
async function exampleData() {
  const res = await fetch("https://api.example.com/data");
  const data = await res.json();
  console.log(data);
}

exampleData();
```

## 5) JavaScript এ Scope এর ধারণা

- **Scope**: Scope হলো কোডের সেই এলাকা যেখানে ভ্যারিয়েবল অ্যাক্সেস করা যায়।

### 1. Global Scope

স্ক্রিপ্টের যেকোনো জায়গা থেকে অ্যাক্সেস করা যায়।

```javascript
let gWorld = "আমি global scope";
function testFunction() {
  console.log(gWorld);
}
testFunction();
```

### 2. Function Scope

শুধুমাত্র function এর ভিতর থেকে অ্যাক্সেস করা যায়।

```javascript
function myFunction() {
  let x = "Hello World";
  console.log(x);
}
myFunction();
```

### 3. Block Scope

শুধু মাত্র block (if, for, while) এর ভিতর থেকে অ্যাক্সেস করা যায়।

```javascript
if (true) {
  let blockScope = "I am JavaScript block scope";
  console.log(blockScope);
}
```
