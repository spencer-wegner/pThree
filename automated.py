# -*- coding: utf-8 -*-

# Andy Sayler
# Summer 2014
# CSCI 3308
# University of Colorado
# Text Processing Module

"""
A simple module with various Text Processing Capabilities

"""

# Imports

import re #lol

# Exceptions

class TextProcError(Exception):
    """
    Base Class for TextProc Exceptions

    """

    def __init__(self, msg):
        """
        TextProcError Constructor

        :param msg: error message
        :return: TextProcError instance

        """

        super().__init__(msg)

# Public Classes

class Processor:
    """
    Class for Processing Strings

    """

    def __init__(self, text):
        """
        Test Processor Constructor

        :param str text: text string to process
        :return: Processor instance

        """

        if type(text) is not str:
            raise TextProcError("Processors require strings")

        self.text = text

    def __len__(self):
        """
        Length of text

        :return: Length

        """

        return len(self.text)

    def countSongs(self, songList):
        #n # of songs we want to return

        count = {}
        for song in songList:
            count[song] = 0

        for song in songList:
            count[song] += 1
            
        returnList = []
        for i in count:
            returnList.append((i, count[i]))
        return(returnList)


    def sortTupleList(self, tupleList):
        for i in range(len(tupleList)):
            for j in range(i, len(tupleList)):
                if tupleList[i][1] < tupleList[j][1]:
                    temp = tupleList[j]
                    tupleList[j] = (tupleList[i][0], tupleList[i][1])
                    tupleList[i] = temp
        return tupleList



    def count(self):
        """
        Count number of characters in text

        :return: Length

        """

        return len(self)

    def count_alpha(self):
        """
        Count number of alphabetic characters in text

        :return: Number of alphabetic characters

        """

        alpha = re.compile(r'[a-zA-Z]')
        return len(alpha.findall(self.text))

    def count_numeric(self):
        """
        Count number of numeric characters in text

        :return: Number of numeric characters

        """

        alpha = re.compile(r'[0-9]')
        return len(alpha.findall(self.text))

    def count_vowels(self):
        """
        Count number of vowels in text

        :return: Number of vowels

        """

        vowels = re.compile(r'[aeiou]', re.IGNORECASE)
        return len(vowels.findall(self.text))

    def is_phonenumber(self):
        """
        Check if text is a valid US phone number

        :return: True or False

        """

        phonenum = re.compile(r'^[0-9]{3}([\-.])*[0-9]{3}\1*[0-9]{4}$')
        if phonenum.match(self.text) is None:
            return False
        else:
            return True
