# Alaa-Yahia-NodeJS

A simple node.js program that reads a configuration JSON file, the JSON file contains the paths of several other files in text format.
The program reads the files one by one, and counts the words in them.
A word is counted if it's not blank or a space, and if it doesn't contain any special characters. Therefore, the word should consist of a-z characters only, in lower or upper case.
If any file, from the given file baths in the configuration file, doesn't exist we print number of words 0.

Example:

WorD : is a word.
word. : not a word because it ends with special character '.'.
235 : not a word.
a the or is : 4 valid words.
