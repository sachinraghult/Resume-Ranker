import math


class JobSwitchRankCriteria:
    """This class assigns the rank based on the no of job switches"""

    def __init__(
        self,
    ):
        pass

    def rank(self, companies):
        """
        Parameters:
            - Companies worked at : List of companies worked at extracted from NER model

        Applies a decreasing mathematical function with job-switches as input variable

        :return: Normalized score
        """
        if len(companies) == 0:
            job_switches = 0
        else:
            job_switches = len(companies)
        r = min(3.5, math.exp(-((job_switches / 4) - 2))) / 3.5
        return r


## Usage ##

# if __name__ == "__main__":
#     js_ranker = JobSwitchRankCriteria()
#     print(js_ranker.rank(companies=['Walmart', 'Wells Fargo', 'Netflix']))
