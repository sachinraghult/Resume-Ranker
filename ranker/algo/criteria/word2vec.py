from gensim.models.keyedvectors import KeyedVectors


class Word2VecDownloader:

    model = KeyedVectors.load_word2vec_format("./weights/word2vec.bin", binary=True)
    print("Successfully Loaded word2vec weights")
