# -*- coding: utf-8 -*-

# Team pThree
# Spring 2018
# CSCI 3308 Software Development Methods and Tools

# Exceptions

class AutomatedError(Exception):
    """
    Base Class for Automated Exceptions

    """

    def __init__(self, msg):
        """
        AutomatedError Constructor

        :param msg: error message
        :return: Automated Error instance

        """

        super().__init__(msg)

# Public Classes

class Automated:

    def __init__(self, input):
        if type(input) is not list:
            raise AutomatedError("A list is required")
        self.input = input

    def countSongs(self):
        #n # of songs we want to return

        count = {}
        for song in self.input:
            count[song] = 0

        for song in self.input:
            count[song] += 1

        returnList = []
        for i in count:
            returnList.append((i, count[i]))
        return returnList

    def sortTupleList(self):
        for i in range(len(self.input)):
            for j in range(i, len(self.input)):
                if self.input[i][1] < self.input[j][1]:
                    temp = self.input[j]
                    self.input[j] = (self.input[i][0], self.input[i][1])
                    self.input[i] = temp
        return self.input
