import torch


class Config:

    """
    Class to set configurations for Named Entity Recognition
    """

    def __init__(
        self, maxlen, batch_size, pretrained=True, use_scheduler=True, focal_model=True
    ):

        """
        Parameters:

        - maxlen: maximum sequence length for BERT

        - batch_size: no. of examples to be taken in a batch for NER

        - pretrained(default: True): pretrained weights for NER

        - use_scheduler(default: True): usage of scheduler

        """

        self.maxlen = maxlen
        self.batch_size = batch_size
        if focal_model:
            self.model_type = "BERTF_NER"
        else:
            self.model_type = "BERT_NER"

        self.tag_id = {
            "Name": 0,
            "College Name": 1,
            "Degree": 2,
            "Graduation Year": 3,
            "Years of Experience": 4,
            "Companies worked at": 5,
            "Designation": 6,
            "Skills": 7,
            "Location": 8,
            "Email Address": 9,
            "UNKNOWN": 10,
            "Empty": 11,
        }

        self.id_tag = dict((v, k) for k, v in self.tag_id.items())

        self.pretrained = pretrained
        self.use_scheduler = use_scheduler
        self.device = "cuda" if torch.cuda.is_available() else "cpu"


## Usage ##

# if __name__ == "__main__":
#     config = Config(maxlen=512, batch_size=1, pretrained=True, use_scheduler=True)
