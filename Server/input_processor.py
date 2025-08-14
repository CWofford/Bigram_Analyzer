import re
from collections import Counter
import nltk

nltk.download("punkt_tab")

def analyze_bigrams(text):
 
    words = nltk.word_tokenize(text.lower())
    words = [re.sub(r'[^a-z0-9]', '', w) for w in words if re.sub(r'[^a-z0-9]', '', w)]
    
    bigrams = list(zip(words, words[1:]))
    bigram_counts = Counter(bigrams)

    total_words = len(words)
    total_bigrams = len(bigrams)
    unique_bigrams = len(bigram_counts)

    results = [
        {
            "pair": list(pair),
            "frequency": freq,
            "percentage": (freq / total_bigrams) * 100 if total_bigrams > 0 else 0
        }
        for pair, freq in bigram_counts.most_common()
    ]

    return {
        "statistics": {
            "total_words": total_words,
            "total_bigrams": total_bigrams,
            "unique_bigrams": unique_bigrams
        },
        "bigrams": results
    }
