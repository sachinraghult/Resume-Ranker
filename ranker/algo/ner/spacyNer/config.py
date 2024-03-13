import torch


class Config:

    """
    Class to set configurations for Named Entity Recognition
    """

    def __init__(self):

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
        self.device = "cuda" if torch.cuda.is_available() else "cpu"


## Usage ##

# if __name__ == "__main__":
#     config = Config()
