__author__ = 'cechishi'

from bs4 import *
import urllib.request
import json

DEPTS = ['info', 'stat', 'cse', 'qmeth', 'engl']
OTHER_DEPT_CLASSES = ['stat311', 'cse142', 'cse143', 'cse373', 'qmeth201', 'engl131'];
BASE_URL = 'http://www.washington.edu/students/timeschd/AUT2015/'
RESULT = []

def fetch(dept):
	url = BASE_URL + dept
	content = urllib.request.urlopen(url).read()
	soup = BeautifulSoup(content, "html.parser")
	for link in soup.find_all('a'):
		name = link.get('name')
		if (dept is 'info' and name is not None) or (name in OTHER_DEPT_CLASSES):
			RESULT.append(name)

for dept in DEPTS:
	fetch(dept)

output = open('classOfferings.txt', 'w')
for _class in RESULT:
	output.write(_class + '\n')

output.close()