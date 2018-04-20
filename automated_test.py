#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# Christoph Uhl
# Spring 2018
# CSCI 3308
# Univerity of Colorado
# Text Processing Module

#count_alpha: wasn't able to discover capital letters, put in regex for capital letters -> [a-zA-Z]
#count_numeric: didn't include 0 in regex, fixed with regex [0-9]
#count_vowels: didn't include 'i' in regex, fixed with regex [aeiou] (y != vowel)
#is_phonenumber: didn't include 0s and wasn't expecting 4 digits at the end, fixed with regex ^[0-9]{3}([\-.])*[0-9]{3}\1*[0-9]{4}$

import unittest
import textproc

class TextprocTestCase(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        pass

    @classmethod
    def tearDownClass(cls):
        pass

    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_init(self):
        text = "tesing123"
        p = textproc.Processor(text)
        self.assertEqual(p.text, text, "'text' does not match input")

    # Add Your Test Cases Here...


    def test_constructor(self):
        with self.assertRaises(TypeError):
            textproc.Processor()

    def test_self(self):
        word = "banana"
        p = textproc.Processor(word)
        self.assertEqual(p.count(), 6, "'count' does not match input")

    def test_count_alpha(self):
        word = "cp3O"
        p = textproc.Processor(word)
        self.assertEqual(p.count_alpha(), 3, "'count_alpha' does not match input")

    def test_count_numeric(self):
        word = "30"
        p = textproc.Processor(word)
        self.assertEqual(p.count_numeric(), 2, "'count_numeric' does not match input")       

    def test_count_vowels(self):
        word = "cp3O" 
        p = textproc.Processor(word)
        self.assertEqual(p.count_vowels(), 1, "'vowels' does not match input")

    def test_is_phonenumber(self):
        number = "801-556-5981"
        p = textproc.Processor(number)
        self.assertEqual(p.is_phonenumber(), True, "'is_phonenumber' does not classify the input as a phonenumber")

# Main: Run Test Cases
if __name__ == '__main__':
    unittest.main()
