---
title: Explaining Polynomial, Exponential, and Pseudo-Polynomial Algorithms
date: '2020-09-20'
categories:
  - blog
published: true
---

One of the classes I’m signed up for this semester is Advanced Algorithms. Already, this is shaping up to be one of my favorite classes and I think it’s really going to take my understanding of algos to the next level. In just the first week, my understanding of runtime complexity has been revolutionized, thanks to a new concept called pseudo-polynomial runtime. It took me quite some time to really internalize this concept, so my goal with this blog post is to provide a clear example of how we classify algorithms as having pseudo-polynomial runtime.

So essentially in the field of algorithms, we generally classify specific algorithms as either polynomial-time or exponential-time algorithms, based on how long the algorithm takes relative to the input size. Finding an element in an unsorted array is “linear”, or O(n), because every time you double the size of the array, the runtime doubles. Running [selection sort](https://web.archive.org/web/20240302042328/https://en.wikipedia.org/wiki/Selection_sort) on an array is quadratic, or O(n^2). For example, every time you double the input array, runtime will increase by a factor of 4x, and tripling the input array size would increase runtime by 9x. Both n and n^2 are polynomial functions, so find-element and selection-sort are both polynomial-time functions.

On the other hand, we have certain problems where runtime increases faster than any possible polynomial function, like the solution to the [Travelling Salesman Problem](https://web.archive.org/web/20240302042328/https://en.wikipedia.org/wiki/Travelling_salesman_problem), and these are known as exponential functions. Generally, we consider polynomial-time solutions to problems as “efficient”, and exponential-time solutions to problems as “inefficient”.

So far, this has all been covered in previous algorithm classes. Here’s where we take things up a notch. Consider an algorithm, where the input to the algorithm is a single integer n, and all the algorithm does is print the phrase “Hello World” n times. What would you say the runtime of this algorithm is? If you think about the problem for a little bit, the answer should come to mind easily. If you double n, the algorithm will take twice as long, if you multiply n by 100, the algorithm will take 100x as long, and so on. So, this is a linear time algorithm, and hence efficient/polynomial. Simple, right?

![Pause-button-2](https://pndblog.typepad.com/.a/6a00e0099631d0883301b8d2851b1a970c-800wi)

If this were a Youtube video, this is the part where I would tell you to pause the video and think for 5 minutes. It turns out this algorithm is actually exponential! The key is understanding the “size of the input”. Internally, computers represent numbers in binary using bits, so the number 255 is represented as 11111111. If we double the size of the input, 255 doesn’t become 510, it becomes 65535 (1111111111111111 in binary). Doubling the size of the input didn’t cause a 2x increase in runtime, it caused a 257x increase in runtime! To put this in more mathy terms, the input to the algorithm can be expressed with size lg(n), and runtime of the algorithm is linear. Relative to a logarithmic input though, the linear runtime ends up being exponential (2^n in this case). Because the runtime seems polynomial at first but ends up being exponential, we can also call this type of algorithm pseudo-polynomial.

This concept of pseudo-polynomial runtime was quite mindblowing when I really understood it in class, and I hope you had just as much fun learning about it as I did.

Thanks for reading and see you next week!
