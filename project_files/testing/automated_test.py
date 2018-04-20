#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# Team pThree
# Spring 2018
# CSCI 3308 Software Development Methods and Tools

import unittest
import automated

class AutomatedTestCase(unittest.TestCase):

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
        input = [1, 2, 3, 4, 5]
        p = automated.Automated(input)
        self.assertEqual(p.input, input, "'list' does not match input")

    def test_countSongs(self):
        input2 = [101, 254, 763, 101, 101, 254] # random sample input
        p = automated.Automated(input2)
        self.assertEqual(p.countSongs(), [(101, 3), (254, 2), (763, 1)], "'list' does not match input")

    def test_sortTupleList(self):
        input3 = [(101, 3), (254, 2), (763, 1)]
        p = automated.Automated(input3)
        self.assertEqual(p.sortTupleList(), [(101, 3), (254, 2), (763, 1)], "'list' does not match input")

# Main: Run Test Cases
if __name__ == '__main__':
    unittest.main()
