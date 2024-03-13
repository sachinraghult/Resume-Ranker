from nltk.corpus import wordnet
from nltk.stem.wordnet import WordNetLemmatizer
from nltk.corpus import stopwords as stp
from sklearn.feature_extraction.text import CountVectorizer
import nltk


def stemmed_words(doc):
    return (
        WordNetLemmatizer().lemmatize(w, get_wordnet_pos(w))
        for w in CountVectorizer().build_analyzer()(doc)
        if w not in set(stp.words("english"))
    )


def get_wordnet_pos(word):
    tag = nltk.pos_tag([word])[0][1][0].upper()
    tag_dict = {
        "J": wordnet.ADJ,
        "N": wordnet.NOUN,
        "V": wordnet.VERB,
        "R": wordnet.ADV,
    }
    return tag_dict.get(tag, wordnet.NOUN)
