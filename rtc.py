#!python3

import eel
import syllables
eel.init('web')

@eel.expose
def syllablescounter(data):
    totalsyllables=0
    length=len(data)
    for i in range(length):
        word=syllables.estimate(data[i])
        totalsyllables=totalsyllables+word
    return totalsyllables

eel.start('index.html', size=(500,400))
